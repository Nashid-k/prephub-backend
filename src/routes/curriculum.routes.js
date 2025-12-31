import express from 'express';
import curriculumController from '../controllers/curriculum.controller.js';
import { optionalProtect } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/performance.js';

const router = express.Router();

// Curriculum endpoints
router.get('/topics', optionalProtect, curriculumController.getAllTopics);
router.get('/topics/:slug', curriculumController.getTopicBySlug);
router.get('/sections/:topicSlug/:sectionSlug', curriculumController.getSectionBySlug);

// Aggregation endpoints for performance (includes user progress)
router.get('/aggregate/topic/:slug', optionalProtect, curriculumController.getTopicAggregate);
router.get('/aggregate/category/:topicSlug/:categorySlug', optionalProtect, curriculumController.getCategoryAggregate);
router.get('/aggregate/section/:topicSlug/:sectionSlug', optionalProtect, curriculumController.getSectionAggregate);

// Static endpoints (NO user progress - globally cacheable across all users)
// Cache for 10 minutes - these are read-only and rarely change
router.get('/static/topic/:slug', cacheMiddleware(600), curriculumController.getTopicStatic);
router.get('/static/category/:topicSlug/:categorySlug', cacheMiddleware(600), curriculumController.getCategoryStatic);
router.get('/static/section/:topicSlug/:sectionSlug', cacheMiddleware(600), curriculumController.getSectionStatic);

export default router;
