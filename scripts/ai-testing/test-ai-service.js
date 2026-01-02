import dotenv from 'dotenv';
dotenv.config();

console.log('🔍 Diagnosing AI Service Integration\n');

// Step 1: Check environment variables
console.log('📋 STEP 1: Environment Variables');
console.log('================================');
const geminiKey = process.env.GEMINI_API_KEY;
const geminiKey2 = process.env.GEMINI_API_KEY_2;
const groqKey = process.env.GROQ_API_KEY;
const groqKey2 = process.env.GROQ_API_KEY_2;
const groqKey3 = process.env.GROQ_API_KEY_3;
const groqKey4 = process.env.GROQ_API_KEY_4;
const hfKey = process.env.HUGGING_FACE_API_KEY;

console.log(`GEMINI_API_KEY: ${geminiKey ? '✅ SET (***' + geminiKey.slice(-4) + ')' : '❌ NOT SET'}`);
console.log(`GEMINI_API_KEY_2: ${geminiKey2 ? '✅ SET (***' + geminiKey2.slice(-4) + ')' : '❌ NOT SET'}`);
console.log(`GROQ_API_KEY: ${groqKey ? '✅ SET (***' + groqKey.slice(-4) + ')' : '❌ NOT SET'}`);
console.log(`GROQ_API_KEY_2: ${groqKey2 ? '✅ SET (***' + groqKey2.slice(-4) + ')' : '❌ NOT SET'}`);
console.log(`GROQ_API_KEY_3: ${groqKey3 ? '✅ SET (***' + groqKey3.slice(-4) + ')' : '❌ NOT SET'}`);
console.log(`GROQ_API_KEY_4: ${groqKey4 ? '✅ SET (***' + groqKey4.slice(-4) + ')' : '❌ NOT SET'}`);
console.log(`HUGGING_FACE_API_KEY: ${hfKey ? '✅ SET (***' + hfKey.slice(-4) + ')' : '❌ NOT SET'}`);

// Step 2: Test AI client initialization
console.log('\n📋 STEP 2: AI Client Initialization');
console.log('=====================================');
try {
  const { geminiModels, groqClients, hfApiKey } = await import('../../src/config/ai-clients.js');
  console.log(`✅ AI clients imported successfully`);
  console.log(`   - Gemini models: ${geminiModels.length} configured`);
  console.log(`   - Groq clients: ${groqClients.length} configured`);
  console.log(`   - HF API Key: ${hfApiKey ? 'configured' : 'not configured'}`);
  
  geminiModels.forEach((model, i) => {
    console.log(`   - Gemini ${i}: ${model.modelName} (ID: ${model.id})`);
  });
} catch (error) {
  console.log(`❌ Failed to import AI clients: ${error.message}`);
  process.exit(1);
}

// Step 3: Test gemini service import
console.log('\n📋 STEP 3: Gemini Service Import');
console.log('==================================');
try {
  const geminiService = await import('../../src/services/gemini.service.js');
  console.log(`✅ Gemini service imported successfully`);
  console.log(`   - generateExplanation: ${typeof geminiService.generateExplanation}`);
  console.log(`   - answerQuestion: ${typeof geminiService.answerQuestion}`);
  console.log(`   - generateQuiz: ${typeof geminiService.generateQuiz}`);
  console.log(`   - default export: ${typeof geminiService.default}`);
} catch (error) {
  console.log(`❌ Failed to import gemini service: ${error.message}`);
  console.error(error);
  process.exit(1);
}

// Step 4: Test actual AI generation
console.log('\n📋 STEP 4: Test AI Generation (Quick Test)');
console.log('============================================');
try {
  const { generateExplanation } = await import('../../src/services/gemini.service.js');
  
  console.log('Testing generateExplanation with simple topic...');
  const result = await generateExplanation('JavaScript', 'Variables', 'Basic programming concept', 'javascript');
  
  if (result && result.length > 0) {
    console.log(`✅ AI Generation SUCCESS`);
    console.log(`   - Response length: ${result.length} characters`);
    console.log(`   - Preview: ${result.substring(0, 150)}...`);
  } else {
    console.log(`⚠️  AI returned empty response`);
  }
} catch (error) {
  console.log(`❌ AI Generation FAILED: ${error.message}`);
  console.error(error.stack);
}

console.log('\n✅ Diagnostic Complete\n');
