import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars explicitly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('--- Checking Environment Variables ---');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? `Present (${process.env.GEMINI_API_KEY.slice(0, 4)}...)` : 'MISSING');
console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY ? `Present (${process.env.GROQ_API_KEY.slice(0, 4)}...)` : 'MISSING');
console.log('HUGGING_FACE_API_KEY:', process.env.HUGGING_FACE_API_KEY ? `Present (${process.env.HUGGING_FACE_API_KEY.slice(0, 4)}...)` : 'MISSING');

async function testGemini() {
    console.log('\n--- Testing Gemini ---');
    const keys = [
        { name: 'Primary (2.0-flash)', key: process.env.GEMINI_API_KEY, model: 'gemini-2.0-flash' },
        { name: 'Secondary (2.0-flash)', key: process.env.GEMINI_API_KEY_2, model: 'gemini-2.0-flash' }
    ].filter(k => k.key);

    for (const k of keys) {
        try {
            console.log(`Testing ${k.name}...`);
            const genAI = new GoogleGenerativeAI(k.key);
            const model = genAI.getGenerativeModel({ model: k.model });
            const result = await model.generateContent('Say hello');
            console.log(`✅ Success ${k.name}:`, result.response.text());
        } catch(e) {
             console.log(`⚠️ Failed ${k.name}:`, e.message.split('[')[0]);
             if (e.message.includes('404')) console.log('   (Suggestion: Model might not be available for this key)');
        }
    }
}

async function testGroq() {
    console.log('\n--- Testing Groq ---');
    const keys = [
         { name: 'Primary', key: process.env.GROQ_API_KEY },
         { name: 'Secondary', key: process.env.GROQ_API_KEY_2 }
    ].filter(k => k.key);

    for (const k of keys) {
        try {
            const groq = new Groq({ apiKey: k.key });
            const completion = await groq.chat.completions.create({
                messages: [{ role: 'user', content: 'Say hello' }],
                model: 'llama-3.1-8b-instant',
            });
            console.log(`✅ Success ${k.name}:`, completion.choices[0]?.message?.content);
        } catch (e) {
            console.error(`❌ Failed ${k.name}:`, e.message);
        }
    }
}

async function testHF() {
    console.log('\n--- Testing Hugging Face ---');
    try {
        if (!process.env.HUGGING_FACE_API_KEY) throw new Error('No Key');
        // Try Mistral 7B via HF Inference API (Standard Router URL)
        const response = await axios.post(
            "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3",
            { inputs: "Say hello" },
            { headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}` } }
        );
        console.log('✅ HF Success (Mistral 7B):', JSON.stringify(response.data).slice(0, 50));
    } catch (e) {
        console.error('❌ HF Failed:', e.message, e.response?.status);
    }
}

async function testFallbackChain() {
    console.log('\n--- Testing Full Fallback Chain ---');
    // Import the service dynamically to test the actual logic
    try {
        const { generateExplanation } = await import('./services/gemini.service.js');
        console.log('Testing generateExplanation (Expect: Gemini Fail -> Groq/HF Succeed)...');
        
        const result = await generateExplanation('Recursion', 'Basics', 'Test context');
        console.log('\n🎉 Final Result Length:', result.length);
        console.log('Sample:', result.slice(0, 100).replace(/\n/g, ' '));
        
    } catch (e) {
        console.error('❌ Fallback Chain Failed:', e.message);
    }
}

async function runTests() {
    await testGemini();
    await testGroq();
    await testHF();
    await testFallbackChain();
}

runTests();
