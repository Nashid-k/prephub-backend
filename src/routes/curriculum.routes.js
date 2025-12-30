import express from 'express';
import curriculumController from '../controllers/curriculum.controller.js';

const router = express.Router();

// Curriculum endpoints
router.get('/topics', curriculumController.getAllTopics);
router.get('/topics/:slug', curriculumController.getTopicBySlug);
router.get('/sections/:topicSlug/:sectionSlug', curriculumController.getSectionBySlug);

// Aggregation endpoints for performance (includes user progress)
router.get('/aggregate/topic/:slug', curriculumController.getTopicAggregate);
router.get('/aggregate/category/:topicSlug/:categorySlug', curriculumController.getCategoryAggregate);
router.get('/aggregate/section/:topicSlug/:sectionSlug', curriculumController.getSectionAggregate);

// Static endpoints (NO user progress - globally cacheable across all users)
router.get('/static/topic/:slug', curriculumController.getTopicStatic);
router.get('/static/category/:topicSlug/:categorySlug', curriculumController.getCategoryStatic);
router.get('/static/section/:topicSlug/:sectionSlug', curriculumController.getSectionStatic);

export default router;
