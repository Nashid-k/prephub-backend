import express from 'express';
import searchController from '../controllers/search.controller.js';
import { validateSlug } from '../middleware/validation.js';

const router = express.Router();

// Search endpoints
router.get('/search', searchController.searchContent);
router.get('/suggestions', searchController.getSearchSuggestions);

export default router;
