import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import axios from 'axios';

dotenv.config();

const TEST_PROMPT = 'Explain the concept of variables in programming in 2 sentences.';

console.log('🧪 COMPREHENSIVE AI PROVIDER TEST');
console.log('=' .repeat(60));
console.log('');

const results = {
  gemini: [],
  groq: [],
  huggingface: null
};

// Test Gemini Keys
console.log('📋 TESTING GEMINI API KEYS');
console.log('-'.repeat(60));

const geminiKeys = [
  { key: process.env.GEMINI_API_KEY, name: 'GEMINI_API_KEY' },
  { key: process.env.GEMINI_API_KEY_2, name: 'GEMINI_API_KEY_2' }
].filter(k => k.key);

for (const { key, name } of geminiKeys) {
  console.log(`\n🔑 Testing ${name} (***${key.slice(-4)})`);
  
  // Test multiple models
  const models = ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
  
  for (const modelName of models) {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: modelName });
      
      const startTime = Date.now();
      const result = await model.generateContent(TEST_PROMPT);
      const response = result.response.text();
      const duration = Date.now() - startTime;
      
      console.log(`   ✅ ${modelName.padEnd(25)} → SUCCESS (${duration}ms)`);
      console.log(`      Response: ${response.substring(0, 80)}...`);
      
      results.gemini.push({
        keyName: name,
        model: modelName,
        status: 'success',
        duration,
        responseLength: response.length
      });
      
      break; // Found a working model, no need to test others for this key
      
    } catch (error) {
      const errorType = error.message.includes('404') ? '404 Not Found' :
                       error.message.includes('429') ? '429 Quota Exceeded' :
                       error.message.includes('403') ? '403 Forbidden' :
                       'Error';
      
      console.log(`   ❌ ${modelName.padEnd(25)} → ${errorType}`);
      
      results.gemini.push({
        keyName: name,
        model: modelName,
        status: 'failed',
        error: errorType
      });
    }
  }
}

// Test Groq Keys
console.log('\n\n📋 TESTING GROQ API KEYS');
console.log('-'.repeat(60));

const groqKeys = [
  { key: process.env.GROQ_API_KEY, name: 'GROQ_API_KEY' },
  { key: process.env.GROQ_API_KEY_2, name: 'GROQ_API_KEY_2' },
  { key: process.env.GROQ_API_KEY_3, name: 'GROQ_API_KEY_3' },
  { key: process.env.GROQ_API_KEY_4, name: 'GROQ_API_KEY_4' }
].filter(k => k.key);

for (const { key, name } of groqKeys) {
  console.log(`\n🔑 Testing ${name} (***${key.slice(-4)})`);
  
  try {
    const client = new Groq({ apiKey: key });
    
    const startTime = Date.now();
    const completion = await client.chat.completions.create({
      messages: [{ role: 'user', content: TEST_PROMPT }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 200
    });
    const duration = Date.now() - startTime;
    
    const response = completion.choices[0]?.message?.content || '';
    
    console.log(`   ✅ llama-3.1-8b-instant      → SUCCESS (${duration}ms)`);
    console.log(`      Response: ${response.substring(0, 80)}...`);
    
    results.groq.push({
      keyName: name,
      model: 'llama-3.1-8b-instant',
      status: 'success',
      duration,
      responseLength: response.length
    });
    
  } catch (error) {
    const errorType = error.message.includes('429') ? '429 Rate Limit' :
                     error.message.includes('401') ? '401 Unauthorized' :
                     error.message.includes('403') ? '403 Forbidden' :
                     'Error';
    
    console.log(`   ❌ llama-3.1-8b-instant      → ${errorType}`);
    console.log(`      Error: ${error.message.substring(0, 100)}`);
    
    results.groq.push({
      keyName: name,
      model: 'llama-3.1-8b-instant',
      status: 'failed',
      error: errorType
    });
  }
}

// Test Hugging Face
console.log('\n\n📋 TESTING HUGGING FACE API');
console.log('-'.repeat(60));

const hfKey = process.env.HUGGING_FACE_API_KEY;

if (hfKey) {
  console.log(`\n🔑 Testing HUGGING_FACE_API_KEY (***${hfKey.slice(-4)})`);
  
  try {
    const startTime = Date.now();
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        inputs: `<s>[INST] ${TEST_PROMPT} [/INST]`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          return_full_text: false
        }
      },
      {
        headers: { Authorization: `Bearer ${hfKey}` }
      }
    );
    const duration = Date.now() - startTime;
    
    const result = response.data;
    const text = Array.isArray(result) ? result[0].generated_text : result.generated_text;
    
    console.log(`   ✅ Mistral-7B-Instruct       → SUCCESS (${duration}ms)`);
    console.log(`      Response: ${text.substring(0, 80)}...`);
    
    results.huggingface = {
      model: 'Mistral-7B-Instruct-v0.3',
      status: 'success',
      duration,
      responseLength: text.length
    };
    
  } catch (error) {
    const errorType = error.response?.status === 429 ? '429 Rate Limit' :
                     error.response?.status === 401 ? '401 Unauthorized' :
                     error.response?.status === 403 ? '403 Forbidden' :
                     'Error';
    
    console.log(`   ❌ Mistral-7B-Instruct       → ${errorType}`);
    console.log(`      Error: ${error.message.substring(0, 100)}`);
    
    results.huggingface = {
      model: 'Mistral-7B-Instruct-v0.3',
      status: 'failed',
      error: errorType
    };
  }
} else {
  console.log('   ⚠️  No API key configured');
}

// Summary
console.log('\n\n📊 SUMMARY & RECOMMENDATIONS');
console.log('='.repeat(60));

const geminiWorking = results.gemini.filter(r => r.status === 'success');
const groqWorking = results.groq.filter(r => r.status === 'success');
const hfWorking = results.huggingface?.status === 'success';

console.log(`\n✅ Working Providers:`);
console.log(`   Gemini:        ${geminiWorking.length}/2 keys working`);
console.log(`   Groq:          ${groqWorking.length}/4 keys working`);
console.log(`   Hugging Face:  ${hfWorking ? '1/1 working' : '0/1 working'}`);

console.log(`\n📈 Performance Comparison (Average Response Time):`);
if (geminiWorking.length > 0) {
  const avgGemini = geminiWorking.reduce((sum, r) => sum + r.duration, 0) / geminiWorking.length;
  console.log(`   Gemini:        ${avgGemini.toFixed(0)}ms`);
}
if (groqWorking.length > 0) {
  const avgGroq = groqWorking.reduce((sum, r) => sum + r.duration, 0) / groqWorking.length;
  console.log(`   Groq:          ${avgGroq.toFixed(0)}ms`);
}
if (hfWorking) {
  console.log(`   Hugging Face:  ${results.huggingface.duration}ms`);
}

console.log(`\n🎯 RECOMMENDATION:`);

if (groqWorking.length >= 2) {
  const avgGroq = groqWorking.reduce((sum, r) => sum + r.duration, 0) / groqWorking.length;
  console.log(`   ✅ Use GROQ as PRIMARY provider`);
  console.log(`      - ${groqWorking.length} working keys (excellent redundancy)`);
  console.log(`      - Average response time: ${avgGroq.toFixed(0)}ms`);
  console.log(`      - Reliable and fast`);
  console.log(`      - Working keys: ${groqWorking.map(r => r.keyName).join(', ')}`);
} else if (geminiWorking.length >= 1) {
  const avgGemini = geminiWorking.reduce((sum, r) => sum + r.duration, 0) / geminiWorking.length;
  console.log(`   ⚠️  Use GEMINI as PRIMARY provider`);
  console.log(`      - ${geminiWorking.length} working key(s)`);
  console.log(`      - Average response time: ${avgGemini.toFixed(0)}ms`);
  console.log(`      - Working models: ${geminiWorking.map(r => `${r.keyName} (${r.model})`).join(', ')}`);
} else if (hfWorking) {
  console.log(`   ⚠️  Use HUGGING FACE as PRIMARY provider`);
  console.log(`      - Only option available`);
  console.log(`      - Response time: ${results.huggingface.duration}ms`);
} else {
  console.log(`   ❌ NO WORKING PROVIDERS FOUND`);
  console.log(`      - Please check API keys and quotas`);
}

console.log(`\n💡 Implementation Suggestion:`);
console.log(`   Update ai-clients.js to prioritize working providers in this order:`);

const priorityOrder = [];
if (groqWorking.length > 0) priorityOrder.push(`1. Groq (${groqWorking.length} keys)`);
if (geminiWorking.length > 0) priorityOrder.push(`${priorityOrder.length + 1}. Gemini (${geminiWorking.length} keys)`);
if (hfWorking) priorityOrder.push(`${priorityOrder.length + 1}. Hugging Face`);

priorityOrder.forEach(item => console.log(`   ${item}`));

console.log('\n✅ Test Complete\n');
