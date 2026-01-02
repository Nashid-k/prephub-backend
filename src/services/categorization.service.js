import { aiService } from './ai.service.js';
import NodeCache from 'node-cache';
import Cache from '../models/Cache.js';

// Memory Cache for categorization (TTL: 30 days)
const memoryCache = new NodeCache({ stdTTL: 3600 * 24 * 30 });

/**
 * Get categorization from cache 
 */
const getCacheValue = async (key) => {
  const cachedMemory = memoryCache.get(key);
  if (cachedMemory) return cachedMemory;

  try {
    const cachedDb = await Cache.findOne({ key });
    if (cachedDb && cachedDb.expiresAt > new Date()) {
      memoryCache.set(key, cachedDb.value);
      return cachedDb.value;
    }
  } catch (err) {
    console.error('Cache Retrieval Error:', err.message);
  }
  return null;
};

/**
 * Set categorization in cache
 */
const setCacheValue = async (key, value, ttlSeconds = 3600 * 24 * 30) => {
  memoryCache.set(key, value);
  try {
    await Cache.findOneAndUpdate(
      { key },
      { value, expiresAt: new Date(Date.now() + ttlSeconds * 1000) },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error('Cache Storage Error:', err.message);
  }
};

/**
 * AI-powered category group assignment
 */
export const assignGroupWithAI = async (categoryName, topicSlug = '') => {
  const cacheKey = `category_group_${topicSlug}_${categoryName}`;
  
  const cached = await getCacheValue(cacheKey);
  if (cached) return cached;

  const prompt = `
You are an expert in software engineering curricula.
TASK: Create a SPECIFIC, MEANINGFUL category group name for:
- Category: "${categoryName}"
- Topic: "${topicSlug || 'general'}"

PRIORITIES:
1. STUDY ORDER (01-03=Fundamentals, 04+=Intermediate).
2. SPECIFIC NAMES (e.g. "JavaScript Functions", not "Functions").
3. Include Topic Name in Group Name.

OUTPUT JSON ONLY:
{
  "group": "Specific Descriptive Name",
  "confidence": 90,
  "reasoning": "Explanation"
}
`;

  try {
    const result = await aiService.generateJSON(prompt);
    
    // Validate structure
    if (result && result.group && typeof result.confidence === 'number') {
        if (result.confidence >= 40) {
            await setCacheValue(cacheKey, result);
            return result;
        } else {
             console.warn(`⚠️ Low confidence (${result.confidence}%) for ${categoryName}`);
        }
    }
  } catch (error) {
    console.error('❌ Categorization AI Failed:', error.message);
  }

  return null;
};

export default assignGroupWithAI;
