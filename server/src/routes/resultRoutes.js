import { Router } from 'express';

import { calculateResult, getHistory, getLatestResult } from '../controllers/resultController.js';
import { requireAuth } from '../middleware/auth.js';
import { calculationLimiter } from '../middleware/rateLimiters.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { calculationSchema } from '../utils/validation.js';

const router = Router();

router.use(requireAuth);
router.get('/latest', getLatestResult);
router.get('/history', getHistory);
router.post('/calculate', calculationLimiter, validateRequest(calculationSchema), calculateResult);

export default router;
