import express from 'express';
import activityController from '../controllers/activity.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All activity routes require authentication
router.use(protect);

// Track user activity
router.post('/track', activityController.trackActivity);

// Get activity summary
router.get('/summary', activityController.getActivitySummary);

export default router;
