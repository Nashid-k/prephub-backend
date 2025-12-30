import { geminiModels, groqClients, hfApiKey } from '../config/ai-clients.js';
import NodeCache from 'node-cache';
import axios from 'axios';
import Cache from '../models/Cache.js';

// Memory Cache for AI responses (TTL: 1 hour) - Fast but non-persistent
const memoryCache = new NodeCache({ stdTTL: 3600 });

/**
 * Get data from cache (Memory first, then MongoDB)
 */
const getCacheValue = async (key) => {
  // Check memory cache first
  const cachedMemory = memoryCache.get(key);
  if (cachedMemory) return cachedMemory;

  // Check MongoDB cache
  try {
    const cachedDb = await Cache.findOne({ key });
    if (cachedDb && cachedDb.expiresAt > new Date()) {
      // Backfill memory cache
      memoryCache.set(key, cachedDb.value);
      return cachedDb.value;
    }
  } catch (err) {
    console.error('Cache Retrieval Error:', err);
  }
  return null;
};

/**
 * Set data in cache (Both Memory and MongoDB)
 */
const setCacheValue = async (key, value, ttlSeconds = 3600 * 24 * 7) => { // Default persistent cache for 7 days
  // Set in memory cache
  memoryCache.set(key, value);

  // Set in MongoDB cache
  try {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    await Cache.findOneAndUpdate(
      { key },
      { value, expiresAt },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error('Cache Storage Error:', err);
  }
};

/**
 * Try Groq AI as fallback
 */
const tryGroqFallback = async (prompt, client = groqClient) => {
  try {
    console.log('🔄 Trying Groq AI as fallback...');
    const completion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 2000
    });
    
    console.log('✅ Groq AI succeeded');
    return completion.choices[0]?.message?.content || 'No response generated';
  } catch (groqError) {
    console.error('❌ Groq AI also failed:', groqError.message);
    throw groqError;
  }
};

/**
 * Try Hugging Face Inference API as tertiary fallback
 */
const tryHuggingFaceFallback = async (prompt) => {
  if (!hfApiKey) {
    throw new Error('Hugging Face API key not configured');
  }

  try {
    console.log('🤗 Trying Hugging Face fallback...');
    // Using Mistral-7B-Instruct via HF Inference API (Router URL)
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        inputs: `<s>[INST] ${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 2000,
          temperature: 0.7,
          return_full_text: false
        }
      },
      {
        headers: { Authorization: `Bearer ${hfApiKey}` }
      }
    );

    const result = response.data;
    console.log('✅ Hugging Face AI succeeded');
    
    // HF returns an array of objects generally
    return Array.isArray(result) ? result[0].generated_text : result.generated_text;
  } catch (hfError) {
    console.error('❌ Hugging Face AI also failed:', hfError.message, hfError.response?.status);
    throw hfError;
  }
};

/**
 * Generate AI explanation for a topic/section with fallback
 */
export const generateExplanation = async (topic, section, context = '') => {
  // Include context in cache key to allow different prompts to generate fresh content
  const contextHash = context ? Buffer.from(context).toString('base64').substring(0, 20) : 'default';
  const cacheKey = `explain_${topic}_${section}_${contextHash}`;
  
  // Check cache first
  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached response');
    return cached;
  }

  const prompt = `
You are an expert MERN stack instructor. Explain the following topic in a clear, structured way:

Topic: ${topic}
Section: ${section}
${context ? `Context: ${context}` : ''}

Provide:
1. A brief overview (2-3 sentences)
2. Key concepts (bullet points) - If specific key points are provided in the context, YOU MUST EXPLAIN EACH ONE individually with a short definition/explanation.
3. 2-3 practical code examples with explanations
4. Best practices
5. Common pitfalls to avoid

Format your response in markdown. Make code examples practical and production-ready.
`;

// Try Gemini models (Primary -> Secondary)
  for (const client of geminiModels) {
    try {
      console.log(`🤖 Trying Gemini AI via ${client.id} (${client.modelName})...`);
      const result = await client.instance.generateContent(prompt);
      const response = result.response.text();
      
      console.log(`✅ Gemini AI succeeded (${client.id})`);
      await setCacheValue(cacheKey, response);
      return response;
    } catch (geminiError) {
      console.error(`❌ Gemini AI failed (${client.id}):`, geminiError.message);
      // Continue to next model if available
    }
  }

  // Try Groq clients (Primary -> Secondary)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`⚠️ TRIGGERING GROQ FALLBACK (Key ${index + 1})...`);
      const completion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        max_tokens: 2000
      });
      
      console.log(`✅ Groq AI succeeded (Key ${index + 1})`);
      const response = completion.choices[0]?.message?.content || 'No response generated';
      await setCacheValue(cacheKey, response);
      return response;
    } catch (groqError) {
      console.error(`❌ Groq AI failed (Key ${index + 1}):`, groqError.message);
    }
  }

  // Try Hugging Face fallback (Tertiary)
  try {
    const response = await tryHuggingFaceFallback(prompt);
    await setCacheValue(cacheKey, response);
    return response;
  } catch (hfError) {
     console.error('❌ All AI providers failed. Returning mock response.');
     return `
### ${topic} - ${section} (Offline Mode)

**Note:** We utilize advanced AI models (Gemini, Groq, Hugging Face) to generate these explanations. Currently, all services are experiencing high traffic or invalid configuration. Here is a general overview:

**Overview**
${topic} is a fundamental concept in software development. Understanding ${section} is crucial for building robust applications.

**Key Concepts**
*   **Fundamental Principle**: Core building block of the technology.
*   **Usage**: Widely used in modern web development.
*   **Best Practice**: Always follow standard conventions.

**Example**
\`\`\`javascript
// Basic Example
const example = "${section}";
console.log(example);
\`\`\`

*Please check your internet connection or API keys and try again later.*
`;
  }
};

/**
 * Answer a specific question with context and fallback
 */
export const answerQuestion = async (question, context = {}) => {
  const contextId = context.topic + context.section + (context.currentCode ? Buffer.from(context.currentCode).toString('base64').substring(0, 20) : '');
  const cacheKey = `answer_${Buffer.from(question).toString('base64').substring(0, 30)}_${contextId}`;

  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached answer');
    return cached;
  }

  const prompt = `
You are an expert MERN stack instructor. Your goal is to help the student learn the specific topic they are currently studying.

Context:
Topic: ${context.topic || 'General'}
Section: ${context.section || 'General'}
${context.section ? `Section: ${context.section}` : ''}
${context.description ? `Description: ${context.description}` : ''}
${context.keyPoints ? `Key Learning Points: ${JSON.stringify(context.keyPoints)}` : ''}
${context.currentCode ? `\nCURRENT CODE IN EDITOR:\n\`\`\`javascript\n${context.currentCode}\n\`\`\`\n\n(The student may be asking about this code)` : ''}

Student Input: ${question}

Instructions:
1. If the student asks for "questions" (practical or theory), generate 3-5 relevant questions *specifically* about the provided Topic and Section. Do NOT generate random questions.
2. If the student asks for an answer to a previous question, provide a clear, detailed, and correct explanation.
3. If the student asks a general question, answer it in the context of the current Topic and Section if possible.
4. Keep answers concise, practical, and easy to understand.
5. Use code examples where relevant.

Format your response in markdown.
`;

  // Try Gemini models (Primary -> Secondary)
  for (const client of geminiModels) {
    try {
      console.log(`🤖 Trying Gemini AI via ${client.id} (${client.modelName})...`);
      const result = await client.instance.generateContent(prompt);
      const response = result.response.text();
      console.log(`✅ Gemini AI succeeded (${client.id})`);
      await setCacheValue(cacheKey, response);
      return response;
    } catch (geminiError) {
      console.error(`❌ Gemini AI failed (${client.id}):`, geminiError.message);
    }
  }

  // Try Groq clients (Primary -> Secondary)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`⚠️ TRIGGERING GROQ FALLBACK (Key ${index + 1})...`);
      const response = await tryGroqFallback(prompt, client);
      await setCacheValue(cacheKey, response);
      return response;
    } catch (groqError) {
      console.error(`❌ Groq AI failed (Key ${index + 1}):`, groqError.message);
    }
  }

  // Try Hugging Face fallback
  try {
    const response = await tryHuggingFaceFallback(prompt);
    await setCacheValue(cacheKey, response);
    return response;
  } catch (hfError) {
     console.error('❌ All AI providers failed. Returning mock response.');
     return `
### AI Assistant (Offline Mode)

I'm currently unable to connect to my brain (AI services are down or misconfigured).

**You asked:** "${question}"

**Short Answer:**
This appears to be a question about **${context.topic || 'coding'}**. Since I'm offline, I recommend checking:
1.  The official documentation.
2.  Your current code syntax.
3.  Console logs for errors.

*Please try again later or check your API keys.*
`;
  }
};

/**
 * Generate follow-up questions based on a topic with fallback
 */
export const generateFollowUpQuestions = async (topic, section, difficulty = 'medium') => {
  const cacheKey = `followup_${topic}_${section}_${difficulty}`;
  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached follow-up questions');
    return cached;
  }

  const prompt = `
Generate 5 follow-up practice questions for students learning:

Topic: ${topic}
Section: ${section}
Difficulty: ${difficulty}

For each question, provide:
1. The question
2. A detailed answer with explanation
3. Code example if applicable

Format as JSON array with structure:
[
  {
    "question": "...",
    "answer": "...",
    "codeExample": "..."
  }
]

Make questions practical and interview-relevant.
`;

  const parseOrFallback = async (responseText) => {
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                       responseText.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : responseText;
      try {
        const parsed = JSON.parse(jsonText);
        await setCacheValue(cacheKey, parsed);
        return parsed;
      } catch (e) {
         return [{
          question: 'Failed to parse response. Please try again.',
          answer: 'Error occurred',
          codeExample: ''
        }];
      }
  };

  // Try Gemini models (Primary -> Secondary)
  for (const client of geminiModels) {
    try {
      console.log(`🤖 Trying Gemini AI via ${client.id} (${client.modelName})...`);
      const result = await client.instance.generateContent(prompt);
      const responseText = result.response.text();
      console.log(`✅ Gemini AI succeeded (${client.id})`);
      return await parseOrFallback(responseText);
    } catch (geminiError) {
       console.error(`❌ Gemini AI failed (${client.id}):`, geminiError.message);
    }
  }

  // Try Groq clients (Primary -> Secondary)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`⚠️ TRIGGERING GROQ FALLBACK (Key ${index + 1})...`);
      const responseText = await tryGroqFallback(prompt, client);
      return await parseOrFallback(responseText);
    } catch (groqError) {
       console.error(`❌ Groq AI failed (Key ${index + 1}):`, groqError.message);
    }
  }

  // Try Hugging Face fallback
  try {
     const responseText = await tryHuggingFaceFallback(prompt);
     return await parseOrFallback(responseText);
  } catch (hfError) {
    console.error('❌ All AI providers failed. Returning mock questions.');
    return [{
      question: '(Offline Mode) What is the main purpose of this concept?',
      answer: 'We are currently offline. Please check your internet or API keys. The main purpose is to solve X problem efficiently.',
      codeExample: '// Check documentation for examples'
    },
    {
      question: '(Offline Mode) How do you implement this in code?',
      answer: 'Since AI services are unavailable, please refer to the official documentation or your course notes.',
      codeExample: 'const offline = true;'
    }];
  }
};

/**
 * Generate interview questions (theory + practical) with fallback
 */
export const generateInterviewQuestions = async (topic, type = 'both', difficulty = 'medium', count = 30) => {
  const cacheKey = `interview_${topic}_${type}_${difficulty}_${count}`;
  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached interview questions');
    return cached;
  }

  const typeFilter = type === 'theory' ? 'theoretical' : 
                     type === 'practical' ? 'practical coding' : 'both theoretical and practical';
  
  // Custom context based on topic
  let topicContext = '';
  if (topic.toLowerCase().includes('frontend')) {
    topicContext = 'Focus heavily on React.js ecosystem (Hooks, Context, Redux, Performance), DOM manipulation, and modern CSS.';
  } else if (topic.toLowerCase().includes('backend')) {
    topicContext = 'Include questions on Node.js runtime (Event Loop, Streams), Express.js middleware, MongoDB (Aggregation, Indexing), and advanced JavaScript concepts.';
  } else if (topic.toLowerCase().includes('mern')) {
    topicContext = 'Cover the full stack: React frontend, Node/Express backend, and MongoDB database, including integration patterns.';
  }

  // Helper to generate a batch of questions
  const generateBatch = async (batchCount, batchIndex) => {
    const batchCacheKey = `${cacheKey}_batch_${batchIndex}`;
    const cachedBatch = await getCacheValue(batchCacheKey);
    if (cachedBatch) return cachedBatch;

    const prompt = `
Generate ${batchCount} unique ${typeFilter} interview questions for:

Topic: ${topic}
Difficulty: ${difficulty}
Batch: ${batchIndex + 1} (Ensure unique questions)

${topicContext}
${type === 'practical' ? 'Focus on coding challenges, system design, and implementation.' : ''}
${type === 'theory' ? 'Focus on concepts, architecture, and principles.' : ''}

For each question, provide:
1. The question
2. A comprehensive answer
3. Code example (if practical question)
4. Key points to mention in interview

Format strictly as a JSON array:
[
  {
    "type": "theory" or "practical",
    "question": "...",
    "answer": "...",
    "codeExample": "...",
    "keyPoints": ["point1", "point2"]
  }
]

Make questions realistic to actual technical interviews. Ensure you provide exactly ${batchCount} questions.
`;

    const parseAndCache = async (responseText) => {
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                         responseText.match(/```\n([\s\S]*?)\n```/);
        const jsonText = jsonMatch ? jsonMatch[1] : responseText;
        try {
          const parsed = JSON.parse(jsonText);
          if (Array.isArray(parsed) && parsed.length > 0) {
            await setCacheValue(batchCacheKey, parsed);
          }
          return parsed;
        } catch (e) {
           console.error('JSON Parse Error in batch:', e);
           return [];
        }
    };

    // Try Gemini models
    for (const client of geminiModels) {
      try {
        console.log(`🤖 Batch ${batchIndex+1}: Trying Gemini (${client.modelName})...`);
        const result = await client.instance.generateContent(prompt);
        return await parseAndCache(result.response.text());
      } catch (geminiError) {
        console.error(`❌ Batch ${batchIndex+1} Gemini failed:`, geminiError.message);
      }
    }

    // Try Groq fallback
    for (const client of groqClients) {
      try {
        console.log(`⚠️ Batch ${batchIndex+1}: Triggering Groq Fallback...`);
        const responseText = await tryGroqFallback(prompt, client);
        return await parseAndCache(responseText);
      } catch (groqError) {
        console.error(`❌ Batch ${batchIndex+1} Groq failed:`, groqError.message);
      }
    }

    // Try Hugging Face fallback
    try {
      console.log(`⚠️ Batch ${batchIndex+1}: Triggering HF Fallback...`);
      const responseText = await tryHuggingFaceFallback(prompt);
      return await parseAndCache(responseText);
    } catch (hfError) {
      console.error(`❌ Batch ${batchIndex+1} HF failed:`, hfError.message);
    }

    return [];
  };

  // Split into batches of 10
  const BATCH_SIZE = 10;
  const batches = Math.ceil(count / BATCH_SIZE);
  const promises = [];

  for (let i = 0; i < batches; i++) {
    const currentBatchCount = Math.min(BATCH_SIZE, count - (i * BATCH_SIZE));
    promises.push(generateBatch(currentBatchCount, i));
  }

  console.log(`🚀 Starting generation of ${count} questions in ${batches} batches...`);
  const results = await Promise.all(promises);
  const allQuestions = results.flat();
  
  if (allQuestions.length === 0) {
      throw new Error('Failed to generate any questions after all attempts.');
  }

  await setCacheValue(cacheKey, allQuestions);
  console.log(`✅ Successfully generated ${allQuestions.length} questions total.`);
  return allQuestions;
};

/**
 * Generate test cases for LeetCode problems with fallback
 */
export const generateTestCases = async (prompt) => {
  const cacheKey = `testcases_${Buffer.from(prompt).toString('base64').substring(0, 30)}`;
  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached test cases');
    return cached;
  }

  const parseAndCache = async (responseText) => {
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                     responseText.match(/```\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : responseText;
    try {
      const parsed = JSON.parse(jsonText);
      await setCacheValue(cacheKey, parsed);
      return parsed;
    } catch (e) {
      console.error('JSON Parse Error:', e);
      return null;
    }
  };

  // Try Gemini models
  for (const client of geminiModels) {
    try {
      console.log(`🤖 Generating test cases via ${client.id}...`);
      const result = await client.instance.generateContent(prompt);
      const parsed = await parseAndCache(result.response.text());
      if (parsed) return parsed;
    } catch (geminiError) {
      console.error(`❌ Gemini failed (${client.id}):`, geminiError.message);
    }
  }

  // Try Groq fallback
  for (const client of groqClients) {
    try {
      console.log('⚠️ Trying Groq fallback for test cases...');
      const responseText = await tryGroqFallback(prompt, client);
      const parsed = await parseAndCache(responseText);
      if (parsed) return parsed;
    } catch (groqError) {
      console.error('❌ Groq failed for test cases:', groqError.message);
    }
  }

  // Try Hugging Face fallback
  try {
    console.log('⚠️ Trying HF fallback for test cases...');
    const responseText = await tryHuggingFaceFallback(prompt);
    const parsed = await parseAndCache(responseText);
    if (parsed) return parsed;
  } catch (hfError) {
    console.error('❌ HF failed for test cases:', hfError.message);
  }

  // Return fallback if all fail
  console.error('❌ All AI providers failed for test case generation');
  return {
    sampleCases: [
      { input: { nums: [1,2,3] }, expected: [1,2], description: "Sample test case" }
    ],
    hiddenCases: [
      { input: { nums: [4,5,6] }, expected: [4,5] },
      { input: { nums: [] }, expected: [] }
    ]
  };
};

export default {
  generateExplanation,
  answerQuestion,
  generateFollowUpQuestions,
  generateTestCases
};
