import express from 'express';
import { getCategoriesByTopic, getCategoryWithSections } from '../controllers/category.controller.js';
import Topic from '../models/Topic.js';

const router = express.Router();

// Middleware to find topic
const findTopic = async (req, res, next) => {
  try {
    const topic = await Topic.findOne({ slug: req.params.topicSlug });
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    req.topic = topic;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

router.get('/:topicSlug/categories', findTopic, getCategoriesByTopic);
router.get('/:topicSlug/categories/:categorySlug', findTopic, getCategoryWithSections);

export default router;
