// Redis cache manager - Distributed caching for production
// Replaces dual cache (memory + MongoDB) with industry-standard Redis
import Redis from 'ioredis';
import logger from './logger.js';

// Redis client configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: process.env.REDIS_DB || 0,
  
  // Connection options
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  
  // Timeouts
  connectTimeout: 10000,
  maxRetriesPerRequest: 3,
  
  // Enable offline queue
  enableOfflineQueue: true,
  
  // Lazy connect (wait for first command)
  lazyConnect: true
};

// Create Redis client
const redis = new Redis(redisConfig);

// Event handlers
redis.on('connect', () => {
  logger.info('Redis connected', { host: redisConfig.host, port: redisConfig.port });
});

redis.on('error', (error) => {
  logger.error(error, { context: 'Redis connection' });
});

redis.on('ready', () => {
  logger.info('Redis ready to accept commands');
});

// Cache wrapper with error handling
export class RedisCache {
  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {Promise<any>} - Parsed value or null
   */
  static async get(key) {
    try {
      const value = await redis.get(key);
      if (!value) return null;
      
      logger.debug('Cache HIT', { key });
      return JSON.parse(value);
    } catch (error) {
      logger.error(error, { operation: 'cache.get', key });
      return null; // Graceful degradation
    }
  }

  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in seconds (default: 3600)
   */
  static async set(key, value, ttl = 3600) {
    try {
      const serialized = JSON.stringify(value);
      await redis.setex(key, ttl, serialized);
      
      logger.debug('Cache SET', { key, ttl });
      return true;
    } catch (error) {
      logger.error(error, { operation: 'cache.set', key });
      return false;
    }
  }

  /**
   * Delete key from cache
   * @param {string} key - Cache key
   */
  static async del(key) {
    try {
      const deleted = await redis.del(key);
      logger.debug('Cache DEL', { key, deleted });
      return deleted;
    } catch (error) {
      logger.error(error, { operation: 'cache.del', key });
      return 0;
    }
  }

  /**
   * Delete multiple keys matching pattern
   * @param {string} pattern - Key pattern (e.g., "user:*")
   */
  static async delPattern(pattern) {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length === 0) return 0;
      
      const deleted = await redis.del(...keys);
      logger.info('Cache Pattern DEL', { pattern, count: deleted });
      return deleted;
    } catch (error) {
      logger.error(error, { operation: 'cache.delPattern', pattern });
      return 0;
    }
  }

  /**
   * Check if key exists
   * @param {string} key - Cache key
   */
  static async exists(key) {
    try {
      return await redis.exists(key);
    } catch (error) {
      logger.error(error, { operation: 'cache.exists', key });
      return 0;
    }
  }

  /**
   * Set expiration on existing key
   * @param {string} key - Cache key
   * @param {number} ttl - Time to live in seconds
   */
  static async expire(key, ttl) {
    try {
      return await redis.expire(key, ttl);
    } catch (error) {
      logger.error(error, { operation: 'cache.expire', key });
      return 0;
    }
  }

  /**
   * Get cache statistics
   */
  static async getStats() {
    try {
      const info = await redis.info('stats');
      const dbSize = await redis.dbsize();
      
      return {
        totalKeys: dbSize,
        hits: info.keyspace_hits || 0,
        misses: info.keyspace_misses || 0,
        hitRate: info.keyspace_hits / (info.keyspace_hits + info.keyspace_misses) || 0
      };
    } catch (error) {
      logger.error(error, { operation: 'cache.getStats' });
      return null;
    }
  }

  /**
   * Clear all cache
   */
  static async flushAll() {
    try {
      await redis.flushdb();
      logger.warn('Cache FLUSHED - all keys deleted');
      return true;
    } catch (error) {
      logger.error(error, { operation: 'cache.flushAll' });
      return false;
    }
  }

  /**
   * Disconnect Redis
   */
  static async disconnect() {
    try {
      await redis.quit();
      logger.info('Redis disconnected gracefully');
    } catch (error) {
      logger.error(error, { operation: 'cache.disconnect' });
    }
  }
}

// Helper: Cache with automatic invalidation
export const cacheWithInvalidation = async (
  key,
  fetchFn,
  ttl = 3600,
  invalidationKeys = []
) => {
  // Try to get from cache
  let cached = await RedisCache.get(key);
  if (cached) return cached;
  
  // Fetch fresh data
  const data = await fetchFn();
  
  // Store in cache
  await RedisCache.set(key, data, ttl);
  
  // Store invalidation mapping
  for (const invKey of invalidationKeys) {
    await redis.sadd(`inv:${invKey}`, key);
    await redis.expire(`inv:${invKey}`, ttl);
  }
  
  return data;
};

// Helper: Invalidate by tag
export const invalidateByTag = async (tag) => {
  const keys = await redis.smembers(`inv:${tag}`);
  if (keys.length > 0) {
    await redis.del(...keys);
    await redis.del(`inv:${tag}`);
    logger.info('Cache invalidated by tag', { tag, count: keys.length });
  }
};

export default redis;
