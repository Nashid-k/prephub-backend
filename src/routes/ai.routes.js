import express from 'express';
import aiController from '../controllers/ai.controller.js';

import { aiLimiter } from '../middleware/security.js';
import { validateAIRequest } from '../middleware/validation.js';

const router = express.Router();

// Apply AI-specific rate limiting to all routes
router.use(aiLimiter);

// AI explanation and Q&A endpoints
router.post('/explain', validateAIRequest, aiController.explainTopic);
router.post('/ask', validateAIRequest, aiController.askQuestion);
router.post('/quiz', validateAIRequest, aiController.generateQuiz);

export default router;
