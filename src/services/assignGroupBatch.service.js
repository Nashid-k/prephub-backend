import { aiService } from './ai.service.js';
import NodeCache from 'node-cache';
import Cache from '../models/Cache.js';

// Memory Cache (TTL: 30 days)
const memoryCache = new NodeCache({ stdTTL: 3600 * 24 * 30 });

/**
 * Get batch categorization from cache
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
 * Set batch categorization in cache
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
 * Batch AI-powered category group assignment
 */
export const assignGroupBatch = async (categories, topicSlug = '') => {
  if (!categories || categories.length === 0) return new Map();

  const categoryKeys = categories.map(c => c.name).join('|');
  const cacheKey = `batch_category_group_${topicSlug}_${categoryKeys}`;
  
  const cached = await getCacheValue(cacheKey);
  if (cached) return new Map(Object.entries(cached));

  const orderedList = categories
    .sort((a, b) => a.order - b.order)
    .map((c, idx) => `${idx + 1}. ${c.name}${c.key ? ` (${c.key})` : ''}`)
    .join('\n');

  const prompt = `
You are an expert curriculum architect.
TASK: Organize ${categories.length} learning categories for "${topicSlug}" into 4-7 logical study groups.

CATEGORIES (IN STUDY ORDER):
${orderedList}

PRINCIPLES:
1. RESPECT STUDY ORDER (Early categories = Fundamentals).
2. Group by "Phase" of learning.
3. Groups: 4-7 total, 3-8 categories each.
4. Names: Specific technical domains (e.g. "01. Fundamentals"). Prevent generic names like "Basics".

OUTPUT JSON OBJECT ONLY:
{ "CategoryName": "GroupName" }
`;

  try {
    const result = await aiService.generateJSON(prompt);
    
    if (result) {
      const groupMap = new Map(Object.entries(result));
      await setCacheValue(cacheKey, result);
      return groupMap;
    }
  } catch (error) {
    console.error('❌ Batch Categorization Failed:', error.message);
  }

  return new Map();
};

export default assignGroupBatch;
