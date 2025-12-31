import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const geminiKey = process.env.GEMINI_API_KEY;

if (!geminiKey) {
  console.error('❌ GEMINI_API_KEY not found in environment');
  process.exit(1);
}

console.log('🔍 Checking Available Gemini Models\n');
console.log(`Using API Key: ***${geminiKey.slice(-4)}\n`);

const genAI = new GoogleGenerativeAI(geminiKey);

// Try different model names
const modelVariants = [
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash-001',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-pro',
  'gemini-2.0-flash-exp',
  'gemini-exp-1206'
];

console.log('Testing each model variant...\n');

for (const modelName of modelVariants) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say "OK" if you can read this.');
    const response = result.response.text();
    
    console.log(`✅ ${modelName.padEnd(25)} WORKS - Response: ${response.substring(0, 30).trim()}`);
  } catch (error) {
    const errorMsg = error.message.includes('404') ? '404 Not Found' : 
                     error.message.includes('429') ? '429 Quota Exceeded' :
                     error.message.substring(0, 50);
    console.log(`❌ ${modelName.padEnd(25)} FAILED - ${errorMsg}`);
  }
}

console.log('\n✅ Model check complete');
