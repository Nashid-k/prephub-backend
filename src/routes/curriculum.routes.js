import express from 'express';
import curriculumController from '../controllers/curriculum.controller.js';

const router = express.Router();

// Curriculum endpoints
router.get('/topics', curriculumController.getAllTopics);
router.get('/topics/:slug', curriculumController.getTopicBySlug);
router.get('/sections/:topicSlug/:sectionSlug', curriculumController.getSectionBySlug);

// Aggregation endpoints for performance
router.get('/aggregate/topic/:slug', curriculumController.getTopicAggregate);
router.get('/aggregate/category/:topicSlug/:categorySlug', curriculumController.getCategoryAggregate);
router.get('/aggregate/section/:topicSlug/:sectionSlug', curriculumController.getSectionAggregate);

export default router;
