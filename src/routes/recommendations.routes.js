import express from 'express';
import { getRecommendations } from '../controllers/recommendations.controller.js';

const router = express.Router();

import { optionalProtect } from '../middleware/auth.js';

// GET /api/recommendations
router.get('/', optionalProtect, getRecommendations);

export default router;
