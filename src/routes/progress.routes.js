import express from 'express';
import { toggleSectionCompletion, getSectionProgress, getCategoryProgress, getTopicProgress, getAllTopicsProgress, updateTimeSpent, getDueReviews, updateReview } from '../controllers/progress.controller.js';
import { optionalProtect } from '../middleware/auth.js';

const router = express.Router();

// Toggle completetion status
router.post('/toggle', optionalProtect, toggleSectionCompletion);

// Update time spent on section
router.post('/time', optionalProtect, updateTimeSpent);

// Spaced repetition routes
router.get('/reviews/due', optionalProtect, getDueReviews);
router.post('/reviews/update', optionalProtect, updateReview);

// Get global progress for all topics
router.get('/all', optionalProtect, getAllTopicsProgress);

// Get progress for all sections in a category
router.get('/category/:topicSlug/:categorySlug', optionalProtect, getCategoryProgress);

// Get progress for all categories in a topic
router.get('/topic/:topicSlug', optionalProtect, getTopicProgress);

// Get progress for a specific section (Generic catch-all last)
router.get('/:topicSlug/:sectionSlug', optionalProtect, getSectionProgress);

export default router;
