import bcrypt from 'bcrypt';

import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { createToken } from '../utils/token.js';

function buildAuthResponse(user) {
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate
    }
  };
}

function setSessionCookie(res, token) {
  res.cookie(env.authCookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
  });
}

function clearSessionCookie(res) {
  res.clearCookie(env.authCookieName, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production',
    path: '/'
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password, birthDate } = req.validatedBody;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'An account with that email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      passwordHash,
      birthDate
    });

    setSessionCookie(res, createToken(user));
    return res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.validatedBody;
    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    setSessionCookie(res, createToken(user));
    return res.json(buildAuthResponse(user));
  } catch (error) {
    return next(error);
  }
}

export async function logout(_req, res) {
  clearSessionCookie(res);
  return res.status(204).send();
}

export async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.auth.sub);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        birthDate: user.birthDate
      }
    });
  } catch (error) {
    return next(error);
  }
}
