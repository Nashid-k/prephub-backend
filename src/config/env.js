// Environment variable validation and configuration
// Prevents production deployment without required secrets
import { cleanEnv, str, url, num } from 'envalid';

export const env = cleanEnv(process.env, {
  // Database
  MONGODB_URI: url({
    desc: 'MongoDB connection string',
    example: 'mongodb+srv://user:pass@cluster.mongodb.net/prephub'
  }),

  // AI Providers (at least one required)
  GROQ_API_KEY: str({
    desc: 'Primary Groq API key',
    default: ''
  }),
  GROQ_API_KEY_2: str({ default: '' }),
  GROQ_API_KEY_3: str({ default: '' }),
  GROQ_API_KEY_4: str({ default: '' }),
  
  GEMINI_API_KEY: str({
    desc: 'Primary Google Gemini API key',
    default: ''
  }),
  GEMINI_API_KEY_2: str({ default: '' }),
  
  HUGGING_FACE_API_KEY: str({
    desc: 'Hugging Face API key',
    default: ''
  }),

  // Server Configuration
  PORT: num({
    desc: 'Server port',
    default: 5000,
    example: '5000'
  }),

  NODE_ENV: str({
    desc: 'Environment',
    choices: ['development', 'production', 'test'],
    default: 'development'
  }),

  // Optional: Cache configuration
  REDIS_URL: url({
    desc: 'Redis connection URL',
    default: 'redis://localhost:6379',
    devDefault: 'redis://localhost:6379'
  })
});

// Validate at least one AI provider is configured
export const validateAIProviders = () => {
  const hasGroq = env.GROQ_API_KEY || env.GROQ_API_KEY_2 || env.GROQ_API_KEY_3 || env.GROQ_API_KEY_4;
  const hasGemini = env.GEMINI_API_KEY || env.GEMINI_API_KEY_2;
  const hasHuggingFace = env.HUGGING_FACE_API_KEY;

  if (!hasGroq && !hasGemini && !hasHuggingFace) {
    throw new Error(
      'At least one AI provider API key must be configured. ' +
      'Set GROQ_API_KEY, GEMINI_API_KEY, or HUGGING_FACE_API_KEY'
    );
  }

  console.log('✅ Environment validation passed');
  console.log(`   - Groq: ${hasGroq ? '✓' : '✗'}`);
  console.log(`   - Gemini: ${hasGemini ? '✓' : '✗'}`);
  console.log(`   - Hugging Face: ${hasHuggingFace ? '✓' : '✗'}`);
};

// Production-only validations
if (env.NODE_ENV === 'production') {
  // Ensure no default fallback URLs
  if (env.MONGODB_URI.includes('localhost')) {
    throw new Error('MONGODB_URI cannot use localhost in production');
  }

  // Ensure at least 2 AI providers for resilience
  const providerCount = [
    env.GROQ_API_KEY,
    env.GEMINI_API_KEY,
    env.HUGGING_FACE_API_KEY
  ].filter(Boolean).length;

  if (providerCount < 2) {
    console.warn('⚠️  WARNING: Only 1 AI provider configured. Recommend 2+ for production resilience.');
  }
}

export default env;
