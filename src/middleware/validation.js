import { body, param, validationResult } from 'express-validator';

// Middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  next();
};

// Validation rules for AI endpoints
export const validateAIRequest = [
  body('topic').optional().trim().isLength({ min: 1, max: 200 }),
  body('section').optional().trim().isLength({ min: 1, max: 200 }),
  body('question').optional().trim().isLength({ min: 1, max: 1000 }),
  body('context').optional(),
  body('keyPoints').optional().isArray(),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced', 'easy', 'medium', 'hard']),
  validate
];

// Validation rules for compiler endpoints
export const validateCodeExecution = [
  body('language').trim().notEmpty().isLength({ max: 50 }).escape(),
  body('code').trim().notEmpty().isLength({ max: 50000 }),
  body('stdin').optional().isString().isLength({ max: 10000 }),
  validate
];

// Validation rules for curriculum endpoints
export const validateSlug = [
  param('slug').trim().notEmpty().isLength({ max: 200 }).matches(/^[a-z0-9-_]+$/i),
  validate
];

// Validation rules for progress endpoints
export const validateProgress = [
  body('sectionId').trim().notEmpty().isMongoId(),
  body('completed').optional().isBoolean(),
  body('timeSpent').optional().isInt({ min: 0 }),
  validate
];
