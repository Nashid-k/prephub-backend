import express from 'express';
import testCaseController from '../controllers/test-case.controller.js';

const router = express.Router();

// Generate test cases for a problem
router.post('/generate', testCaseController.generateTestCases);

export default router;
