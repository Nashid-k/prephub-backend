import compression from 'compression';
import NodeCache from 'node-cache';

// Initialize response cache (5 minute default TTL)
const responseCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

/**
 * Compression middleware configuration
 * Compresses all responses > 1KB
 */
export const compressionMiddleware = compression({
  level: 6, // Balance between compression ratio and speed
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
});

/**
 * Response caching middleware
 * Caches GET requests to reduce database load
 * 
 * @param {number} duration - Cache duration in seconds
 * @returns {Function} Express middleware
 */
export const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedResponse = responseCache.get(key);

    if (cachedResponse) {
      console.log(`✅ Cache HIT: ${key}`);
      return res.json(cachedResponse);
    }

    // Store original res.json
    const originalJson = res.json.bind(res);

    // Override res.json
    res.json = (body) => {
      responseCache.set(key, body, duration);
      console.log(`📦 Cache SET: ${key} (TTL: ${duration}s)`);
      return originalJson(body);
    };

    next();
  };
};

/**
 * Clear cache for a specific pattern
 * @param {string} pattern - URL pattern to clear
 */
export const clearCache = (pattern) => {
  const keys = responseCache.keys();
  const matchingKeys = keys.filter(key => key.includes(pattern));
  
  matchingKeys.forEach(key => {
    responseCache.del(key);
    console.log(`🗑️  Cache CLEARED: ${key}`);
  });

  return matchingKeys.length;
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  return {
    keys: responseCache.keys().length,
    hits: responseCache.getStats().hits,
    misses: responseCache.getStats().misses,
    ksize: responseCache.getStats().ksize,
    vsize: responseCache.getStats().vsize
  };
};

export default {
  compressionMiddleware,
  cacheMiddleware,
  clearCache,
  getCacheStats
};
