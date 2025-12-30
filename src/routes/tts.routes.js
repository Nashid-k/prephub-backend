import express from 'express';
import { generateSpeech } from '../controllers/tts.controller.js';

const router = express.Router();

// POST /api/tts/elevenlabs - Generate speech from text
router.post('/elevenlabs', generateSpeech);

export default router;
