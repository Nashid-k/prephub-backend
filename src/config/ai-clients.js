import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

// === PRIMARY: GROQ (4/4 keys working, ~311ms avg response time) ===
const groqKeys = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
  process.env.GROQ_API_KEY_4
].filter(Boolean);

export const groqClients = groqKeys.map(key => new Groq({ apiKey: key }));

// === SECONDARY: GEMINI (0/2 keys working - quota exceeded, kept as fallback) ===
const geminiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2
].filter(Boolean);

export const geminiModels = geminiKeys.map((key, index) => {
  const genAI = new GoogleGenerativeAI(key);
  // API keys only support experimental 2.0 models, but quota is exhausted
  // Kept as fallback in case quota refreshes
  const modelName = 'gemini-2.0-flash-exp';
  return {
    instance: genAI.getGenerativeModel({ model: modelName }),
    modelName: modelName,
    id: `gemini-${index}`
  };
});

// === TERTIARY: HUGGING FACE (0/1 working - 404 error) ===
export const hfApiKey = process.env.HUGGING_FACE_API_KEY;

// Individual exports for backwards compatibility (uses primary = Groq now)
export const groqClient = groqClients[0];
export const geminiModel = geminiModels[0] && geminiModels[0].instance;

console.log(`✅ AI clients initialized: ${groqClients.length} Groq (PRIMARY) + ${geminiModels.length} Gemini (fallback) + ${hfApiKey ? '1' : '0'} HF`);

