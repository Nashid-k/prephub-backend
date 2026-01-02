// Circuit breaker and rate limiting for AI providers
// Prevents cascade failures and respects API rate limits
import CircuitBreaker from 'opossum';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiters for each provider (requests per minute)
const rateLimiters = {
  groq: new RateLimiterMemory({
    points: 30,        // 30 requests
    duration: 60,      // per 60 seconds
    blockDuration: 60  // block for 60s if exceeded
  }),
  
  gemini: new RateLimiterMemory({
    points: 15,        // 15 requests (free tier limit)
    duration: 60,
    blockDuration: 60
  }),
  
  huggingface: new RateLimiterMemory({
    points: 10,        // 10 requests (conservative)
    duration: 60,
    blockDuration: 60
  })
};

// Circuit breaker options (Netflix pattern)
const breakerOptions = {
  timeout: 30000,                    // 30s timeout per request
  errorThresholdPercentage: 50,      // Open circuit at 50% failure rate
  resetTimeout: 60000,               // Try again after 1 minute
  rollingCountTimeout: 10000,        // 10s window for error calculation
  rollingCountBuckets: 10,           // Divide window into 10 buckets
  name: 'ai-categorization-breaker'
};

// Circuit breaker instance
let circuitBreaker = null;

/**
 * Wrap AI function with circuit breaker and rate limiting
 * @param {Function} aiFunction - The AI function to protect
 * @param {string} provider - Provider name (groq, gemini, huggingface)
 * @returns {Function} Protected function with circuit breaker
 */
export const createProtectedAICall = (aiFunction, provider = 'groq') => {
  // Create circuit breaker if not exists
  if (!circuitBreaker) {
    circuitBreaker = new CircuitBreaker(async (fn, ...args) => {
      return await fn(...args);
    }, breakerOptions);

    // Event listeners for monitoring
    circuitBreaker.on('open', () => {
      console.error('🔴 Circuit breaker OPEN - AI calls suspended');
    });

    circuitBreaker.on('halfOpen', () => {
      console.warn('🟡 Circuit breaker HALF-OPEN - Testing recovery');
    });

    circuitBreaker.on('close', () => {
      console.log('🟢 Circuit breaker CLOSED - AI calls resumed');
    });

    circuitBreaker.on('timeout', () => {
      console.error('⏱️  Circuit breaker TIMEOUT - Request took >30s');
    });
  }

  // Return protected function
  return async (...args) => {
    const limiter = rateLimiters[provider.toLowerCase()] || rateLimiters.groq;

    try {
      // Check rate limit first
      await limiter.consume(provider, 1);
      
      // Execute through circuit breaker
      return await circuitBreaker.fire(aiFunction, ...args);
      
    } catch (error) {
      if (error.name === 'RateLimiterError') {
        const retryAfter = Math.round(error.msBeforeNext / 1000);
        throw new Error(
          `Rate limit exceeded for ${provider}. Retry after ${retryAfter}s`
        );
      }
      throw error;
    }
  };
};

/**
 * Get circuit breaker stats
 */
export const getCircuitStats = () => {
  if (!circuitBreaker) return null;
  
  const stats = circuitBreaker.stats;
  return {
    state: circuitBreaker.opened ? 'OPEN' : circuitBreaker.halfOpen ? 'HALF_OPEN' : 'CLOSED',
    failures: stats.failures,
    successes: stats.successes,
    rejects: stats.rejects,
    timeouts: stats.timeouts,
    fallbacks: stats.fallbacks
  };
};

/**
 * Get rate limiter stats for a provider
 */
export const getRateLimitStats = (provider = 'groq') => {
  const limiter = rateLimiters[provider.toLowerCase()];
  if (!limiter) return null;

  return {
    points: limiter.points,
    duration: limiter.duration,
    blockDuration: limiter.blockDuration
  };
};

/**
 * Reset circuit breaker (for testing or manual recovery)
 */
export const resetCircuit = () => {
  if (circuitBreaker) {
    circuitBreaker.close();
    console.log('🔄 Circuit breaker manually reset');
  }
};

export default {
  createProtectedAICall,
  getCircuitStats,
  getRateLimitStats,
  resetCircuit
};
