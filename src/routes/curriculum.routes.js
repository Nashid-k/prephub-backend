import express from 'express';
import curriculumController from '../controllers/curriculum.controller.js';

const router = express.Router();

// Curriculum endpoints
router.get('/topics', curriculumController.getAllTopics);
router.get('/topics/:slug', curriculumController.getTopicBySlug);
router.get('/sections/:topicSlug/:sectionSlug', curriculumController.getSectionBySlug);

export default router;
