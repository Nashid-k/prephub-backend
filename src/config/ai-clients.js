import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI (Multi-Key Support)
const geminiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2
].filter(Boolean);

export const geminiModels = geminiKeys.map((key, index) => {
  const genAI = new GoogleGenerativeAI(key);
  // Both keys use 2.0-flash as 1.5-flash is unavailable for these preview keys
  const modelName = 'gemini-2.0-flash';
  return {
    instance: genAI.getGenerativeModel({ model: modelName }),
    modelName: modelName,
    id: `gemini-${index}`
  };
});

// Initialize Groq AI (Multi-Key Support)
const groqKeys = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
  process.env.GROQ_API_KEY_4
].filter(Boolean);

export const groqClients = groqKeys.map(key => new Groq({ apiKey: key }));

// Individual exports for backwards compatibility (uses primary)
export const geminiModel = geminiModels[0]?.instance; 
export const groqClient = groqClients[0];

// Hugging Face API configuration
export const hfApiKey = process.env.HUGGING_FACE_API_KEY;

console.log('✅ AI clients initialized');
