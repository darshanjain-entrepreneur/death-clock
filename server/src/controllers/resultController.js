import { ResultSnapshot } from '../models/ResultSnapshot.js';
import { User } from '../models/User.js';
import { calculateLifespan } from '../utils/lifespanCalculator.js';

export async function calculateResult(req, res, next) {
  try {
    const user = await User.findById(req.auth.sub);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { responses, habitAdjustments } = req.validatedBody;
    const calculation = calculateLifespan({
      birthDate: user.birthDate,
      responses,
      habitAdjustments
    });

    const snapshot = await ResultSnapshot.create({
      user: user._id,
      responses,
      habitAdjustments,
      ...calculation
    });

    return res.status(201).json({ result: snapshot });
  } catch (error) {
    return next(error);
  }
}

export async function getLatestResult(req, res, next) {
  try {
    const result = await ResultSnapshot.findOne({ user: req.auth.sub }).sort({ createdAt: -1 });
    return res.json({ result });
  } catch (error) {
    return next(error);
  }
}

export async function getHistory(req, res, next) {
  try {
    const history = await ResultSnapshot.find({ user: req.auth.sub })
      .sort({ createdAt: -1 })
      .limit(12)
      .select('estimatedLifespan remainingYears lifeScore createdAt habitImpact quizImpact');

    return res.json({ history });
  } catch (error) {
    return next(error);
  }
}
