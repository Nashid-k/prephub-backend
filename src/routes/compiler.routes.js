import express from 'express';
import compilerController from '../controllers/compiler.controller.js';

import { compilerLimiter } from '../middleware/security.js';
import { validateCodeExecution } from '../middleware/validation.js';

const router = express.Router();

// Apply compiler-specific rate limiting
router.use(compilerLimiter);

// Compiler endpoints
router.get('/languages', compilerController.getLanguages);
router.post('/execute', validateCodeExecution, compilerController.executeCode);

export default router;
