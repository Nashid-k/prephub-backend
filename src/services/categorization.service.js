import { geminiModels, groqClients, hfApiKey } from '../config/ai-clients.js';
import NodeCache from 'node-cache';
import axios from 'axios';
import Cache from '../models/Cache.js';

// Memory Cache for categorization (TTL: 30 days) - Categorizations are stable
const memoryCache = new NodeCache({ stdTTL: 3600 * 24 * 30 });

// Helper for delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get categorization from cache (Memory first, then MongoDB)
 */
const getCacheValue = async (key) => {
  // Check memory cache first
  const cachedMemory = memoryCache.get(key);
  if (cachedMemory) {
    console.log('📦 Returning cached categorization (memory)');
    return cachedMemory;
  }

  // Check MongoDB cache
  try {
    const cachedDb = await Cache.findOne({ key });
    if (cachedDb && cachedDb.expiresAt > new Date()) {
      console.log('📦 Returning cached categorization (MongoDB)');
      // Backfill memory cache
      memoryCache.set(key, cachedDb.value);
      return cachedDb.value;
    }
  } catch (err) {
    console.error('Cache Retrieval Error:', err.message);
  }
  return null;
};

/**
 * Set categorization in cache (Both Memory and MongoDB)
 */
const setCacheValue = async (key, value, ttlSeconds = 3600 * 24 * 30) => {
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
    console.error('Cache Storage Error:', err.message);
  }
};

/**
 * Try Groq AI for categorization
 */
const tryGroqCategorization = async (prompt, client) => {
  const completion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.1-8b-instant',
    temperature: 0.3, // Lower temperature for more consistent categorization
    max_tokens: 300
  });
  
  return completion.choices[0]?.message?.content || null;
};

/**
 * Try Gemini AI for categorization
 */
const tryGeminiCategorization = async (prompt, client) => {
  const result = await client.instance.generateContent(prompt);
  return result.response.text();
};

/**
 * Try Hugging Face for categorization
 */
const tryHuggingFaceCategorization = async (prompt) => {
  if (!hfApiKey) {
    throw new Error('Hugging Face API key not configured');
  }

  const response = await axios.post(
    "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3",
    {
      inputs: `<s>[INST] ${prompt} [/INST]`,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.3,
        return_full_text: false
      }
    },
    {
      headers: { Authorization: `Bearer ${hfApiKey}` }
    }
  );

  const result = response.data;
  return Array.isArray(result) ? result[0].generated_text : result.generated_text;
};

/**
 * Parse AI response to extract categorization JSON
 */
const parseCategorizationResponse = (responseText) => {
  let jsonText = responseText.trim();
  
  // Remove markdown code blocks
  const jsonMatch = jsonText.match(/```json\s*\n([\s\S]*?)\n```/) || 
                   jsonText.match(/```\s*\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1].trim();
  }

  // Find JSON object boundaries
  const firstBrace = jsonText.indexOf('{');
  const lastBrace = jsonText.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1) {
    jsonText = jsonText.substring(firstBrace, lastBrace + 1);
  }

  try {
    const parsed = JSON.parse(jsonText);
    
    // Validate structure
    if (parsed.group && typeof parsed.confidence === 'number') {
      return {
        group: parsed.group,
        confidence: parsed.confidence,
        reasoning: parsed.reasoning || ''
      };
    }
    
    console.error('Invalid categorization structure - missing required fields');
    return null;
  } catch (e) {
    console.error('JSON Parse Error:', e.message);
    console.error('Attempted to parse:', jsonText.substring(0, 200));
    return null;
  }
};

/**
 * AI-powered category group assignment
 * @param {string} categoryName - The name of the category to group
 * @param {string} topicSlug - The topic slug for context (e.g., 'typescript', 'react')
 * @returns {Promise<{group: string, confidence: number, reasoning: string} | null>}
 */
export const assignGroupWithAI = async (categoryName, topicSlug = '') => {
  // Generate cache key
  const cacheKey = `category_group_${topicSlug}_${categoryName}`;
  
  // Check cache first
  const cached = await getCacheValue(cacheKey);
  if (cached) {
    return cached;
  }

  // Build AI prompt with STUDY ORDER #1 + SPECIFIC NAMES #2
  const prompt = `
You are an expert in software engineering, computer science curricula, and knowledge organization.

**TASK**: Create a SPECIFIC, MEANINGFUL category group name for educational content.

**INPUT**:
- **Category Name**: "${categoryName}"
- **Topic Context**: "${topicSlug || 'general'}"

🚨 **DUAL PRIORITIES (IN ORDER)** 🚨

**PRIORITY #1: STUDY ORDER (MANDATORY)**
Categories are numbered to show LEARNING SEQUENCE. Students learn in order - can't skip ahead.

**Study Order Rules:**
- **01-03**: Early fundamentals → Use "Fundamentals" or "{Topic} Basics"
- **04-07**: Intermediate concepts → Use specific technical terms
- **08+**: Advanced topics → Use "Advanced {Topic}" or "Advanced Concepts"

**Keywords Override Numbers:**
- "Introduction" / "Basics" → ALWAYS early stage (Fundamentals)
- "Advanced" / "Optimization" → ALWAYS late stage (Advanced)

**PRIORITY #2: SPECIFIC, MEANINGFUL NAMES (CRITICAL)**
❌ NEVER use generic names like "Core Concepts", "Functions", "Data Structures"
✅ ALWAYS create CONTEXT-SPECIFIC names that include the topic

**Name Creation Rules:**
1. **Include the topic context** in the name when relevant
2. **Be descriptive** - user should know what they're learning from the name
3. **Use the category content** to inform the name

**EXAMPLES OF GOOD vs BAD NAMES:**

**For JavaScript:**
❌ BAD: "Core Concepts" → ✅ GOOD: "JavaScript Fundamentals"
❌ BAD: "Functions" → ✅ GOOD: "JavaScript Functions"  
❌ BAD: "Advanced Topics" → ✅ GOOD: "Advanced JavaScript Concepts"

**For TypeScript:**
❌ BAD: "Type System" → ✅ GOOD: "TypeScript Type System"
❌ BAD: "Core Concepts" → ✅ GOOD: "TypeScript Fundamentals"

**For React:**
❌ BAD: "State Management" → ✅ GOOD: "React State & Props"
❌ BAD: "Hooks" → ✅ GOOD: "React Hooks"

**For Python:**
❌ BAD: "OOP" → ✅ GOOD: "Python Object-Oriented Programming"

**NAMING PATTERNS BY STAGE:**

**Early Stage (01-03):**
- "{Topic} Fundamentals" (e.g., "JavaScript Fundamentals")
- "{Topic} Basics" (e.g., "TypeScript Basics")
- "Getting Started with {Topic}"

**Intermediate (04-07):**
- "{Topic} {Specific Feature}" (e.g., "JavaScript Functions", "React Hooks")
- "{Topic} {Technical Area}" (e.g., "TypeScript Type System", "Python OOP")

**Advanced (08+):**
- "Advanced {Topic} Concepts"
- "{Topic} Performance & Optimization"
- "{Topic} Design Patterns"

**YOUR PROCESS:**
1. Extract study order number (01, 02, etc.) → Determine learning stage
2. Look at category name content → Identify key topic  
3. Check topic context ("${topicSlug}") → Use it in the name
4. Create SPECIFIC name: "{Topic} + {Feature/Concept}"
5. Verify name is descriptive and not generic

**OUTPUT FORMAT** (JSON only):
{
  "group": "Specific Descriptive Name (never generic)",
  "confidence": 90,
  "reasoning": "Based on study order X and topic context"
}

**EXAMPLES FOR THIS INPUT** ("${categoryName}" in "${topicSlug}"):
- If topicSlug="javascript" and category="01 Introduction" → "JavaScript Fundamentals"
- If topicSlug="typescript" and category="04 Types" → "TypeScript Type System"  
- If topicSlug="react" and category="05 Hooks" → "React Hooks"
- If topicSlug="python" and category="08 Advanced" → "Advanced Python Concepts"

**CRITICAL**: 
1. Study order FIRST (respect numbering)
2. THEN create specific name (never generic)
3. Return ONLY valid JSON (no markdown)
`;

  // Try AI providers in order: Groq → Gemini → Hugging Face
  const providers = [];

  // Try Groq clients (PRIMARY)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`🤖 AI Categorization via Groq (Key ${index + 1})...`);
      const responseText = await tryGroqCategorization(prompt, client);
      const parsed = parseCategorizationResponse(responseText);
      
      if (parsed && parsed.confidence >= 40) { // Minimum threshold
        console.log(`✅ Categorized "${categoryName}" → "${parsed.group}" (${parsed.confidence}% confidence)`);
        await setCacheValue(cacheKey, parsed);
        return parsed;
      } else if (parsed) {
        console.log(`⚠️ Low confidence (${parsed.confidence}%) - trying next provider`);
      }
    } catch (groqError) {
      console.error(`❌ Groq failed (Key ${index + 1}):`, groqError.message);
      providers.push({ provider: `Groq-${index + 1}`, error: groqError.message });
      
      // If rate limited (429), wait before trying next key to be safe
      if (groqError.message.includes('429') || groqError.message.includes('Rate limit')) {
        console.log('⏳ Rate limit hit, cooling down for 2s...');
        await sleep(2000);
      }
    }
  }

  // Try Gemini models (SECONDARY)
  for (const client of geminiModels) {
    try {
      console.log(`🤖 AI Categorization via Gemini (${client.id})...`);
      const responseText = await tryGeminiCategorization(prompt, client);
      const parsed = parseCategorizationResponse(responseText);
      
      if (parsed && parsed.confidence >= 40) {
        console.log(`✅ Categorized "${categoryName}" → "${parsed.group}" (${parsed.confidence}% confidence)`);
        await setCacheValue(cacheKey, parsed);
        return parsed;
      }
    } catch (geminiError) {
      console.error(`❌ Gemini failed (${client.id}):`, geminiError.message);
      providers.push({ provider: `Gemini-${client.id}`, error: geminiError.message });
    }
  }

  // Try Hugging Face (TERTIARY)
  try {
    console.log('🤖 AI Categorization via Hugging Face...');
    const responseText = await tryHuggingFaceCategorization(prompt);
    const parsed = parseCategorizationResponse(responseText);
    
    if (parsed && parsed.confidence >= 40) {
      console.log(`✅ Categorized "${categoryName}" → "${parsed.group}" (${parsed.confidence}% confidence)`);
      await setCacheValue(cacheKey, parsed);
      return parsed;
    }
  } catch (hfError) {
    console.error('❌ Hugging Face failed:', hfError.message);
    providers.push({ provider: 'HuggingFace', error: hfError.message });
  }

  // All providers failed
  console.error('❌ All AI providers failed for categorization');
  return null;
};

export default assignGroupWithAI;
