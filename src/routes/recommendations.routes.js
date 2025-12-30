import express from 'express';
import { getRecommendations } from '../controllers/recommendations.controller.js';

const router = express.Router();

// GET /api/recommendations
router.get('/', getRecommendations);

export default router;
