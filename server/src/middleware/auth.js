import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const bearerToken = header.startsWith('Bearer ') ? header.slice(7) : '';
  const cookieToken = req.cookies?.[env.authCookieName] || '';
  const token = bearerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret, {
      algorithms: ['HS256'],
      issuer: env.jwtIssuer,
      audience: env.jwtAudience
    });
    req.auth = payload;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
