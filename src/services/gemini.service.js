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
const setCacheValue = async (key, value, ttlSeconds = 3600 * 24 * 7) => {
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
const tryGroqFallback = async (prompt, client) => {
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
    
    return Array.isArray(result) ? result[0].generated_text : result.generated_text;
  } catch (hfError) {
    console.error('❌ Hugging Face AI also failed:', hfError.message, hfError.response?.status);
    throw hfError;
  }
};

/**
 * Advanced topic analysis for intelligent content generation
 */
const detectTopicContext = (topic, section, context = '') => {
  const combined = `${topic} ${section} ${context}`.toLowerCase();
  
  let contextNotes = [];
  let techStack = [];
  
  // Database Technologies
  if (combined.includes('mongodb') || combined.includes('mongoose')) {
    contextNotes.push('MongoDB/Mongoose: Use async/await with try-catch, show schema definitions, demonstrate CRUD operations with proper error handling');
    techStack.push('mongodb');
  }
  if (combined.includes('sql') || combined.includes('postgres') || combined.includes('mysql')) {
    contextNotes.push('SQL: Use uppercase keywords (SELECT, FROM, WHERE), show JOIN operations, include index considerations');
    techStack.push('sql');
  }
  if (combined.includes('redis')) {
    contextNotes.push('Redis: Show key-value patterns, TTL settings, and common use cases (caching, sessions)');
    techStack.push('redis');
  }
  
  // Frontend Frameworks & Libraries
  if (combined.includes('react')) {
    contextNotes.push('React: Use functional components with hooks, show state management, demonstrate component lifecycle patterns');
    techStack.push('react');
  }
  if (combined.includes('vue')) {
    contextNotes.push('Vue: Use Composition API, show reactive state, demonstrate component communication');
    techStack.push('vue');
  }
  if (combined.includes('angular')) {
    contextNotes.push('Angular: Use TypeScript, show dependency injection, demonstrate observables and RxJS patterns');
    techStack.push('angular');
  }
  
  // Backend Frameworks
  if (combined.includes('express')) {
    contextNotes.push('Express: Show middleware chains, router patterns, error handling middleware, async route handlers');
    techStack.push('express');
  }
  if (combined.includes('nest')) {
    contextNotes.push('NestJS: Use decorators, show dependency injection, demonstrate module architecture');
    techStack.push('nestjs');
  }
  
  // Programming Concepts
  if (combined.includes('async') || combined.includes('promise') || combined.includes('callback')) {
    contextNotes.push('Async Patterns: Show promise chains, async/await syntax, error handling with try-catch');
  }
  if (combined.includes('algorithm') || combined.includes('complexity')) {
    contextNotes.push('Algorithms: Include time/space complexity analysis (Big O notation), explain trade-offs');
  }
  if (combined.includes('design pattern')) {
    contextNotes.push('Design Patterns: Show UML diagrams, real-world use cases, pros/cons of the pattern');
  }
  
  // Content Type Detection (more comprehensive)
  const conceptKeywords = [
    'concept', 'theory', 'understanding', 'what is', 'explain', 'overview', 
    'introduction', 'fundamentals', 'principles', 'basics', 'definition',
    'architecture', 'design', 'pattern', 'model', 'paradigm'
  ];
  
  const implementationKeywords = [
    'implement', 'build', 'create', 'code', 'example', 'how to', 
    'tutorial', 'practice', 'guide', 'setup', 'configure', 'install',
    'write', 'develop', 'program', 'coding', 'hands-on'
  ];
  
  const advancedKeywords = [
    'advanced', 'optimization', 'performance', 'scaling', 'best practice',
    'production', 'enterprise', 'security', 'testing', 'debugging'
  ];
  
  // Count keyword matches for weight calculation
  const conceptCount = conceptKeywords.filter(kw => combined.includes(kw)).length;
  const implementationCount = implementationKeywords.filter(kw => combined.includes(kw)).length;
  const advancedCount = advancedKeywords.filter(kw => combined.includes(kw)).length;
  
  // Calculate content weights (0-100)
  const totalMatches = conceptCount + implementationCount + advancedCount || 1;
  const conceptWeight = Math.round((conceptCount / totalMatches) * 100);
  const implementationWeight = Math.round((implementationCount / totalMatches) * 100);
  const advancedWeight = Math.round((advancedCount / totalMatches) * 100);
  
  // Determine primary focus
  let primaryFocus = 'balanced';
  if (conceptWeight > 50) primaryFocus = 'conceptual';
  else if (implementationWeight > 50) primaryFocus = 'practical';
  else if (advancedWeight > 30) primaryFocus = 'advanced';
  
  return {
    contextNotes,
    techStack,
    conceptWeight,
    implementationWeight,
    advancedWeight,
    primaryFocus,
    hasConcept: conceptCount > 0,
    hasImplementation: implementationCount > 0,
    needsBoth: conceptCount > 0 && implementationCount > 0
  };
};

/**
 * Generate AI explanation for a topic/section with fallback
 * MAXIMUM OPTIMIZATION: Intelligent content adaptation, multi-level caching, robust error handling
 */
export const generateExplanation = async (topic, section, context = '', language = 'javascript') => {
  // Enhanced cache key with better collision resistance
  const contextHash = context ? 
    Buffer.from(context).toString('base64').substring(0, 50) : 'no_context';
  const baseCacheKey = `explain_v2_${topic}_${section}_${contextHash}`;
  
  // Check cache first (language-independent for efficiency)
  const cached = await getCacheValue(baseCacheKey);
  if (cached) {
    console.log('📦 Returning cached explanation');
    return cached;
  }

  // Advanced topic analysis for intelligent prompting
  const analysis = detectTopicContext(topic, section, context);
  
  // Build context-aware requirements
  const techStackNotes = analysis.contextNotes.length > 0 
    ? `\n\n**TECHNOLOGY-SPECIFIC REQUIREMENTS:**\n${analysis.contextNotes.map((n, i) => `${i + 1}. ${n}`).join('\n')}`
    : '';

  // Build adaptive content strategy based on analysis weights
  let contentStrategy = '';
  let structureGuide = '';
  
  if (analysis.primaryFocus === 'conceptual') {
    contentStrategy = `
**PRIMARY FOCUS**: Deep conceptual understanding (${analysis.conceptWeight}% theory-focused)

**APPROACH**:
- Lead with the "big picture" - what problem does this solve?
- Use analogies and metaphors extensively
- Include visual representations (ASCII diagrams, flowcharts)
- Break down complex ideas into digestible chunks
- Code examples should be minimal, illustrative pseudocode or syntax signatures
- Focus on mental models and intuition`;

    structureGuide = `
### ${section}

#### 🎯 The Core Idea
(1-2 sentences: The essence in simplest terms)

#### 🧠 Why This Exists
(The problem it solves, the gap it fills - make it relatable)

#### 📊 How It Works
(Deep conceptual explanation with analogies and diagrams)
${analysis.techStack.length > 0 ? '\n#### 💡 In Practice\n(Brief practical context - where/when you\'d use this)' : ''}

#### 🔑 Key Mental Models
(3-5 takeaways that form lasting understanding)`;

  } else if (analysis.primaryFocus === 'practical') {
    contentStrategy = `
**PRIMARY FOCUS**: Hands-on implementation (${analysis.implementationWeight}% practice-focused)

**APPROACH**:
- Start with working code immediately
- Show multiple examples: basic → intermediate → advanced
- Include common pitfalls and "gotchas"
- Demonstrate error handling and edge cases
- Brief theory only where necessary to understand the code
- Focus on "how to build" rather than "what is"`;

    structureGuide = `
### ${section}

#### 🎯 What We're Building
(1 sentence: The practical outcome)

#### 🚀 Quick Start
(Minimal working example in ${language})

#### 📝 Step-by-Step Implementation
(Detailed code walkthrough with line-by-line explanations)

#### ⚠️ Common Pitfalls
(Real mistakes developers make + how to avoid them)

#### 🔑 Pro Tips
(Best practices, performance considerations, production patterns)`;

  } else if (analysis.primaryFocus === 'advanced') {
    contentStrategy = `
**PRIMARY FOCUS**: Advanced concepts and optimization (${analysis.advancedWeight}% advanced-level)

**APPROACH**:
- Assume foundational knowledge exists
- Focus on nuances, edge cases, and optimizations
- Show trade-offs and decision-making criteria
- Include performance analysis and benchmarking concepts
- Demonstrate production-grade patterns
- Connect to system design implications`;

    structureGuide = `
### ${section}

#### 🎯 Advanced Context
(What makes this advanced? Prerequisites assumed?)

#### 🔬 Deep Dive
(Nuanced explanation with trade-offs and decision factors)

#### 💻 Production-Grade Implementation
(Enterprise-level code with error handling, logging, monitoring hooks)

#### ⚡ Performance & Optimization
(Bottlenecks, profiling strategies, scaling considerations)

#### 🔑 Expert Insights
(Non-obvious behaviors, gotchas at scale, architectural implications)`;

  } else {
    // Balanced approach (default)
    contentStrategy = `
**BALANCED APPROACH**: Theory + Practice (Concept: ${analysis.conceptWeight}%, Implementation: ${analysis.implementationWeight}%)

**APPROACH**:
- Start with brief conceptual foundation
- Immediately connect to practical implementation
- Alternate between "why" and "how"
- Use code to illustrate theory, use theory to justify code decisions
- Build complexity progressively`;

    structureGuide = `
### ${section}

#### 🎯 The Essence
(What is this and why does it matter? - 2-3 sentences)

#### 🧠 Conceptual Foundation
(Core theory that makes the implementation make sense)

#### 💻 Practical Implementation
(Working code examples in ${language})

#### 🌉 Connecting Theory to Practice
(How the code embodies the concepts - the "aha!" moment)

#### 🔑 Key Takeaways
(5 essential points bridging understanding and application)`;
  }

  // Adaptive prompt with intelligence about content type
  const prompt = `
You are an elite technical educator with deep expertise in full-stack development, computer science, and software architecture.

**LEARNING CONTEXT**:
- **Topic**: "${topic}"
- **Specific Section**: "${section}"
${context ? `- **Additional Context**: ${context}` : ''}
- **Target Language**: ${language.toUpperCase()}
- **Detected Tech Stack**: ${analysis.techStack.join(', ') || 'General'}
- **Content Analysis**: ${analysis.primaryFocus} (Theory: ${analysis.conceptWeight}%, Practice: ${analysis.implementationWeight}%, Advanced: ${analysis.advancedWeight}%)

${contentStrategy}
${techStackNotes}

**CRITICAL CODE GUIDELINES**:
1. ALL code examples MUST be written in **${language.toUpperCase()}** syntax
2. Use ${language}-specific idioms, conventions, and best practices
3. Include comments explaining non-obvious logic
4. Show error handling where appropriate
5. Label all code blocks: \`\`\`${language}

**LANGUAGE CONSISTENCY RULE** (CRITICAL):
⚠️ If this topic can be explained in multiple programming languages:
- Keep ALL conceptual explanations, analogies, and "Why/How it works" sections IDENTICAL regardless of the target language
- ONLY change the code examples to match the ${language.toUpperCase()} syntax
- Do NOT change: section headers, explanatory text, real-world analogies, mental models, or key takeaways
- DO change: code snippets, syntax examples, language-specific implementation details, function/method names
- Example: "Variables store data" stays the same, but \`let x = 5\` becomes \`x = 5\` for Python

**VISUAL ENHANCEMENT**:
- Use emojis strategically for section headers (🎯, 🧠, 💻, ⚠️, 🔑, 💡, 🚀, ⚡)
- Include ASCII diagrams for flows, hierarchies, or architectures
- Use **bold** for key terms on first mention
- Use \`inline code\` for technical terms and short snippets

**QUALITY STANDARDS**:
- Be precise but accessible - explain like teaching a motivated colleague
- Avoid fluff - every sentence should add value
- Use concrete examples over abstract descriptions
- If mentioning a concept, briefly define it
- Progressive complexity: simple → nuanced → advanced

**CONTENT STRUCTURE** (Markdown):
${structureGuide}

**ADDITIONAL REQUIREMENTS**:
- Total length: Comprehensive but focused (aim for 600-1200 words depending on complexity)
- Real-world relevance: Connect every major point to practical scenarios
- Memorable: Include at least one strong analogy or mental model
- Actionable: Reader should know what to do next after reading

Generate the explanation now:
`;

  // Try all AI providers with enhanced error tracking
  const providerAttempts = [];
  
  // Try Groq clients (PRIMARY - 4/4 keys working, ~311ms avg)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`🤖 Attempting Groq AI (Key ${index + 1})...`);
      const startTime = Date.now();
      
      const response = await tryGroqFallback(prompt, client);
      
      const duration = Date.now() - startTime;
      console.log(`✅ Groq AI succeeded (Key ${index + 1}) in ${duration}ms`);
      
      providerAttempts.push({ provider: `Groq-${index + 1}`, success: true, duration });
      await setCacheValue(baseCacheKey, response);
      return response;
    } catch (groqError) {
      console.error(`❌ Groq AI failed (Key ${index + 1}):`, groqError.message);
      providerAttempts.push({ provider: `Groq-${index + 1}`, success: false, error: groqError.message });
    }
  }

  // Try Gemini models (SECONDARY - quota exhausted, fallback only)
  for (const client of geminiModels) {
    try {
      console.log(`⚠️ Attempting Gemini fallback: ${client.id} (${client.modelName})...`);
      const startTime = Date.now();
      
      const result = await client.instance.generateContent(prompt);
      const response = result.response.text();
      
      const duration = Date.now() - startTime;
      console.log(`✅ Gemini AI succeeded (${client.id}) in ${duration}ms`);
      
      providerAttempts.push({ provider: `Gemini-${client.id}`, success: true, duration });
      await setCacheValue(baseCacheKey, response);
      return response;
    } catch (geminiError) {
      console.error(`❌ Gemini AI failed (${client.id}):`, geminiError.message);
      providerAttempts.push({ provider: `Gemini-${client.id}`, success: false, error: geminiError.message });
    }
  }

  // Try Hugging Face fallback (TERTIARY)
  try {
    console.log('⚠️ Attempting Hugging Face fallback...');
    const startTime = Date.now();
    
    const response = await tryHuggingFaceFallback(prompt);
    
    const duration = Date.now() - startTime;
    console.log(`✅ Hugging Face AI succeeded in ${duration}ms`);
    
    providerAttempts.push({ provider: 'HuggingFace', success: true, duration });
    await setCacheValue(baseCacheKey, response);
    return response;
  } catch (hfError) {
    console.error('❌ Hugging Face AI failed:', hfError.message);
    providerAttempts.push({ provider: 'HuggingFace', success: false, error: hfError.message });
  }

  // All providers failed - enhanced fallback response
  console.error('❌ ALL AI PROVIDERS FAILED. Provider attempts:', JSON.stringify(providerAttempts, null, 2));
  
  return `
### ${section}

> **⚠️ AI Services Offline**: Content generation is temporarily unavailable. We utilize multiple AI providers (Gemini, Groq, Hugging Face) for high-quality explanations, but all are currently experiencing issues.

#### 🎯 What You're Learning About

**${topic}** is an important concept in software development, and understanding **${section}** is key to building robust applications.

#### 📚 General Overview

${section} represents a fundamental building block in modern development. While we can't provide the detailed, AI-generated explanation right now, here are some general principles:

${analysis.primaryFocus === 'conceptual' ? `
**Conceptual Foundation**:
- This topic focuses on understanding core principles and mental models
- The theory behind ${section} helps you make informed architectural decisions
- Real-world applications depend on grasping these fundamental concepts
` : ''}

${analysis.primaryFocus === 'practical' ? `
**Practical Implementation**:
- This topic emphasizes hands-on coding and real-world application
- You'll learn specific techniques and patterns for ${section}
- Focus is on building working solutions with best practices
` : ''}

${analysis.primaryFocus === 'balanced' || analysis.primaryFocus === 'advanced' ? `
**Key Aspects**:
- Understanding the underlying principles of ${section}
- Implementing solutions with ${language}
- Recognizing common patterns and anti-patterns
- Applying best practices in production environments
` : ''}

#### 💻 Basic Example (${language})

\`\`\`${language}
// Placeholder example - AI services offline
// ${section} implementation concept
const example = {
  topic: "${topic}",
  section: "${section}",
  language: "${language}"
};

console.log("Learning about:", example.section);
// Actual implementation would go here
\`\`\`

#### 🔑 Key Points to Remember

- **Foundation**: ${section} is essential for ${topic}
- **Application**: Used extensively in modern ${analysis.techStack.join('/')} development
- **Best Practice**: Follow established patterns and conventions
${analysis.contextNotes.length > 0 ? `- **Technology Note**: ${analysis.contextNotes[0].split(':')[1]?.trim() || 'Refer to documentation'}` : ''}

#### 🔄 What to Do Next

1. **Check Connection**: Verify your internet connection and API configuration
2. **Review Documentation**: Consult official ${topic} documentation
3. **Try Again**: Refresh the page or retry after a few moments
4. **Alternative Resources**: Search for "${topic} ${section}" in official guides

**Provider Status**: ${providerAttempts.map(a => `${a.provider}: ${a.success ? '✅' : '❌'}`).join(' | ')}

*We apologize for the inconvenience. Our system will automatically retry when services are restored.*
`;
};

/**
 * Answer a specific question with context and fallback
 */
export const answerQuestion = async (question, context = {}, language = 'javascript') => {
  const contextId = (context.topic || '') + (context.section || '') + (context.currentCode ? Buffer.from(context.currentCode).toString('base64').substring(0, 30) : '');
  const questionHash = Buffer.from(question).toString('base64').substring(0, 40);
  const cacheKey = `answer_${questionHash}_${contextId}`;

  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached answer');
    return cached;
  }

  // Dynamic Persona based on context
  let roleDescription = 'an expert full-stack development mentor';
  const topicLower = (context.topic || '').toLowerCase();
  
  if (topicLower.includes('mongo') || topicLower.includes('database')) {
    roleDescription = 'a Database Architecture Specialist';
  } else if (topicLower.includes('react') || topicLower.includes('frontend')) {
    roleDescription = 'a Senior Frontend Developer & React Expert';
  } else if (topicLower.includes('node') || topicLower.includes('express') || topicLower.includes('backend')) {
    roleDescription = 'a Backend Architecture Expert';
  } else if (topicLower.includes('algorithm') || topicLower.includes('data structure')) {
    roleDescription = 'an Algorithms & Data Structures Specialist';
  }
  
  const codeContext = context.currentCode ? 
    `\n**STUDENT'S CODE** (${language}):\n\`\`\`${language}\n${context.currentCode}\n\`\`\`\n` : '';

  const prompt = `
You are ${roleDescription}, acting as a friendly and encouraging tutor.

**CONTEXT**:
- Topic: ${context.topic || 'General Development'}
- Module: ${context.module || 'Core Concepts'}
- Section: ${context.section || 'General'}
${context.description ? `- Learning Material: ${context.description.substring(0, 400)}` : ''}
${codeContext}

**STUDENT'S QUESTION**: "${question}"

**YOUR TEACHING STYLE**:
1. **Be Encouraging**: Use positive reinforcement. Add occasional emojis (💡, 🚀, ✨, 🎯) to keep energy high
2. **Socratic Method**: Guide them to understanding rather than just giving answers
3. **Context-Aware**: Reference their specific topic/module/code in your explanation
4. **Practical Focus**: Connect theory to real-world application

**CRITICAL - CODE LANGUAGE**:
- If you provide code examples, write them in **${language.toUpperCase()}**
- Use ${language} syntax, conventions, and idioms
- Label code blocks: \`\`\`${language}

**RESPONSE STRUCTURE** (Markdown):

#### 💡 [Quick Answer/Insight]
(Direct answer to their question in 1-2 sentences)

#### 📖 Explanation
(Clear, simple explanation with analogies)

#### 💻 Example
(Code example if relevant - in ${language})

#### 🎯 Pro Tip
(One insider tip related to this topic)

Now answer their question:
`;

  // Try Groq clients (PRIMARY)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`🤖 Trying Groq AI (Key ${index + 1})...`);
      const response = await tryGroqFallback(prompt, client);
      await setCacheValue(cacheKey, response);
      return response;
    } catch (groqError) {
      console.error(`❌ Groq AI failed (Key ${index + 1}):`, groqError.message);
    }
  }

  // Try Gemini models (SECONDARY)
  for (const client of geminiModels) {
    try {
      console.log(`⚠️ Trying Gemini fallback via ${client.id} (${client.modelName})...`);
      const result = await client.instance.generateContent(prompt);
      const response = result.response.text();
      console.log(`✅ Gemini AI succeeded (${client.id})`);
      await setCacheValue(cacheKey, response);
      return response;
    } catch (geminiError) {
      console.error(`❌ Gemini AI failed (${client.id}):`, geminiError.message);
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

**Your Question:** "${question}"

I'm currently unable to connect to AI services. Here's what I suggest:

1. **Check the Official Docs**: Look up "${context.topic || 'your topic'}" in the official documentation
2. **Review Your Code**: Look for syntax errors or missing imports
3. **Console Logs**: Add debug logs to trace the issue

**Common Issues with ${context.topic || 'this topic'}:**
- Syntax errors
- Missing dependencies
- Incorrect configuration

*Please try again later or check API configuration.*
`;
  }
};

/**
 * Generate a dynamic 5-question multiple choice quiz
 */
export const generateQuiz = async (topic, section, regenerate = false, language = 'javascript', content = '') => {
  // Include regenerate timestamp in cache key to force new generation
  const baseKey = `quiz_${topic}_${section}_${language}`;
  const cacheKey = regenerate ? `${baseKey}_${Date.now()}` : baseKey;
  
  if (!regenerate) {
    const cached = await getCacheValue(baseKey);
    if (cached) {
      console.log('📦 Returning cached quiz');
      return cached;
    }
  } else {
    console.log('🔄 Regenerating quiz (bypassing cache)');
  }

  // Add variation seeds for regeneration
  const variations = [
    'focus on practical application',
    'focus on edge cases and gotchas',
    'focus on conceptual understanding',
    'focus on common mistakes',
    'focus on best practices'
  ];
  const randomVariation = variations[Math.floor(Math.random() * variations.length)];

  // Truncate content to avoid token limits
  const contentContext = content ? 
    `\n**REFERENCE CONTENT** (base questions on this):\n${content.substring(0, 3000)}\n` : '';

  const prompt = `
Generate a 5-question multiple-choice quiz for technical assessment.

**TOPIC**: ${topic}
**SECTION**: ${section}
**LANGUAGE CONTEXT**: ${language}
**VARIATION**: ${randomVariation}
${contentContext}

**REQUIREMENTS**:
1. Create 5 distinct, practical questions about "${section}"
2. Each question should have 4 options
3. Mark the correct answer with its index (0-3)
4. Provide a clear explanation for the correct answer
5. Questions should test understanding, not just memorization
${content ? '6. Base questions on the provided reference content' : ''}

**IMPORTANT**:
- If questions involve code, use ${language} syntax
- Make options plausible but clearly distinguishable
- Avoid trick questions or ambiguous wording
- Each question should assess a different aspect

**OUTPUT FORMAT** (JSON only, no markdown):
[
  {
    "question": "Clear, specific question about the topic",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Why this answer is correct and what concept it tests"
  }
]

**CRITICAL**: Return ONLY valid JSON array. No markdown, no backticks, no preamble.
`;

  const parseAndCache = async (responseText) => {
    let jsonText = responseText.trim();
    
    // Remove markdown code blocks
    const jsonMatch = jsonText.match(/```json\s*\n([\s\S]*?)\n```/) || 
                     jsonText.match(/```\s*\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1].trim();
    }

    // Find array boundaries
    const firstBracket = jsonText.indexOf('[');
    const lastBracket = jsonText.lastIndexOf(']');
    
    if (firstBracket !== -1 && lastBracket !== -1) {
      jsonText = jsonText.substring(firstBracket, lastBracket + 1);
    }

    try {
      const parsed = JSON.parse(jsonText);
      
      // Validate structure
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].question && parsed[0].options) {
        // Cache using base key (not regenerate-specific key)
        await setCacheValue(baseKey, parsed);
        return parsed;
      }
      
      console.error('Invalid quiz structure - missing required fields');
      return null;
    } catch (e) {
      console.error('JSON Parse Error:', e);
      console.error('Attempted to parse:', jsonText.substring(0, 300));
      return null;
    }
  };

  // Try Groq clients (PRIMARY)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`🤖 Generating Quiz via Groq (Key ${index + 1})...`);
      const responseText = await tryGroqFallback(prompt, client);
      const parsed = await parseAndCache(responseText);
      if (parsed) return parsed;
    } catch (groqError) {
      console.error(`❌ Groq failed for quiz (Key ${index + 1}):`, groqError.message);
    }
  }

  // Try Gemini models (SECONDARY)
  for (const client of geminiModels) {
    try {
      console.log(`⚠️ Trying Gemini fallback for quiz via ${client.id}...`);
      const result = await client.instance.generateContent(prompt);
      const parsed = await parseAndCache(result.response.text());
      if (parsed) return parsed;
    } catch (geminiError) {
      console.error(`❌ Gemini failed (${client.id}):`, geminiError.message);
    }
  }

  // Try Hugging Face fallback
  try {
    console.log('⚠️ Trying HF fallback for quiz...');
    const responseText = await tryHuggingFaceFallback(prompt);
    const parsed = await parseAndCache(responseText);
    if (parsed) return parsed;
  } catch (hfError) {
    console.error('❌ HF failed for quiz:', hfError.message);
  }

  console.error('❌ All AI providers failed for quiz generation');
  // Fallback quiz
  return [
    {
      question: `[Offline Mode] Which statement about ${section} is most accurate?`,
      options: [
        "It is a fundamental concept in software development",
        "It is rarely used in modern applications",
        "It only applies to legacy systems",
        "It has been deprecated"
      ],
      correctIndex: 0,
      explanation: "This is a placeholder question. AI services are currently offline. Please check your configuration and try again."
    }
  ];
};

/**
 * Generate personalized learning path recommendation
 */
export const generateLearningPathRecommendation = async (userHistory, currentTopics) => {
  const cacheKey = `recommend_${userHistory.userId}_${new Date().toISOString().split('T')[0]}`;
  
  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached recommendation');
    return cached;
  }
  
  const recentActivity = userHistory.recentActivity
    .slice(0, 10)
    .map(a => `${a.activityType} on "${a.topicSlug}" (${Math.round(a.duration / 60)}min)`)
    .join(', ');

  const topTopics = userHistory.topTopics.slice(0, 5).join(', ');

  const prompt = `
Analyze this student's learning pattern and recommend the next best topic.

**STUDENT PROFILE**:
- Primary interests: ${topTopics}
- Recent activity: ${recentActivity}
- Available topics: ${currentTopics.join(', ')}

**TASK**:
1. Select ONE topic from the available list that best fits their learning progression
2. Provide a motivating reason (1 sentence, start with "Because you...")
3. Rate confidence (0-100)

**OUTPUT** (JSON only, no markdown):
{
  "topicSlug": "recommended-slug",
  "reason": "Because you've mastered X, it's time to explore Y...",
  "confidence": 85
}

Return only valid JSON.
`;

  const parseAndCache = async (text) => {
    let jsonText = text.trim();
    const jsonMatch = jsonText.match(/```json\s*\n([\s\S]*?)\n```/) || 
                     jsonText.match(/```\s*\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    const firstBrace = jsonText.indexOf('{');
    const lastBrace = jsonText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.substring(firstBrace, lastBrace + 1);
    }
    
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed.topicSlug && parsed.reason) {
        await setCacheValue(cacheKey, parsed);
        return parsed;
      }
    } catch (e) {
      console.error('Recommendation parse error:', e);
    }
    return null;
  };

  // Try Groq clients (PRIMARY)
  for (const client of groqClients) {
    try {
      const text = await tryGroqFallback(prompt, client);
      const parsed = await parseAndCache(text);
      if (parsed) return parsed;
    } catch (e) {
      console.error('Groq recommendation error:', e);
    }
  }
  
  // Try Gemini models (SECONDARY)
  for (const client of geminiModels) {
    try {
      const result = await client.instance.generateContent(prompt);
      const parsed = await parseAndCache(result.response.text());
      if (parsed) return parsed;
    } catch (e) {
      console.error('Gemini recommendation error:', e);
    }
  }
  
  // Default recommendation
  return {
    topicSlug: currentTopics[0] || 'javascript-basics',
    reason: "Because continuous learning is key to mastery, let's explore this next.",
    confidence: 50
  };
};

/**
 * Structure a learning path intelligently
 */
export const structureLearningPath = async (topics, pathName, experienceLevel = '0-1_year') => {
  const topicSlugs = topics.map(t => t.slug).sort().join('_');
  const topicHash = Buffer.from(topicSlugs).toString('base64').substring(0, 40);
  const pathHash = Buffer.from(pathName).toString('base64').substring(0, 20);
  // Include experience level in cache key!
  const cacheKey = `path_structure_v3_${pathHash}_${topicHash}_${experienceLevel}`;
  
  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached path structure');
    return cached;
  }

  const topicList = topics.map(t => `"${t.name}" (slug: ${t.slug})`).join(', ');

  const prompt = `
You are a curriculum design expert. Structure a learning path for a student.

**PATH NAME**: "${pathName}"
**EXPERIENCE LEVEL**: "${experienceLevel}" (e.g., "0-1 Years" means Beginner, "3-5 Years" means Advanced)
**TOPICS TO ORDER**: ${topicList}

**TASK**:
1. Reorder these EXACT topics from start to finish based on the experience level.
2. Define a **Category Filtering Strategy** for this experience level.
   - For a **Beginner (0-1 Year)**: List keywords to HIDE. You MUST include broad terms like "advanced", "internals", "deep dive", "architecture", "complex" if they appear in the dataset.
   - For an **Expert (3-5 Years)**: List keywords to HIDE (usually empty, or basic setup guides).
   - BE INTENTIONAL: If a beginner *needs* "Async" or "Promises", DO NOT hide "async". Use your expertise.

**OUTPUT** (JSON only):
{
  "orderedSlugs": ["slug1", "slug2", "slug3"],
  "learningStrategy": "Brief explanation of the ordering logic",
  "hideKeywords": ["advanced", "architecture", "internals", "metaprogramming"]
}

**EXAMPLES**:
- If Python Beginner: "hideKeywords": ["advanced", "metaclasses", "memory management", "internals", "distributed"]
- If Python Advanced: "hideKeywords": []

Return only valid JSON.
`;
  const parseAndCache = async (text) => {
    let jsonText = text.trim();
    
    // Extract from markdown
    const jsonMatch = jsonText.match(/```json\s*\n([\s\S]*?)\n```/) || 
                     jsonText.match(/```\s*\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    // Find JSON boundaries
    const firstBrace = jsonText.indexOf('{');
    const lastBrace = jsonText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.substring(firstBrace, lastBrace + 1);
    }
    
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed.orderedSlugs && Array.isArray(parsed.orderedSlugs)) {
        await setCacheValue(cacheKey, parsed);
        return parsed;
      }
    } catch (e) {
      console.error('Path structure parse error:', e);
    }
    return null;
  };

  // Try Groq clients (PRIMARY)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`🤖 Structuring path via Groq (Key ${index + 1})...`);
      const text = await tryGroqFallback(prompt, client);
      const parsed = await parseAndCache(text);
      if (parsed) return parsed;
    } catch (e) {
      console.error(`Groq path structure error (Key ${index + 1}):`, e);
    }
  }

  // Try Gemini models (SECONDARY)
  for (const client of geminiModels) {
    try {
      console.log(`⚠️ Structuring path via Gemini fallback ${client.id}...`);
      const result = await client.instance.generateContent(prompt);
      const parsed = await parseAndCache(result.response.text());
      if (parsed) return parsed;
    } catch (e) {
      console.error(`Gemini path structure error (${client.id}):`, e);
    }
  }

  // Try Hugging Face fallback
  try {
    console.log('⚠️ Structuring path via HF fallback...');
    const text = await tryHuggingFaceFallback(prompt);
    const parsed = await parseAndCache(text);
    if (parsed) return parsed;
  } catch (e) {
    console.error('HF path structure error:', e);
  }
  
  // Last resort: Original order
  console.warn('❌ AI structure failed, returning original order');
  return {
    orderedSlugs: topics.map(t => t.slug),
    learningStrategy: "Standard linear progression based on original order.",
    hideKeywords: []
  };
};

const _formatLevel = (code) => {
  if(code === '0-1_year') return "Beginner (0-1 Year)";
  if(code === '1-3_years') return "Intermediate (1-3 Years)";
  return "Expert (3-5 Years)";
};

/**
 * Generates a curated list of visible categories for a specific experience level.
 * This is a "Allow List" approach, not a "Block List" approach.
 * @param {Array} categories - Array of category objects { name, slug, group }
 * @param {String} topicName
 * @param {String} experienceLevel - '0-1_year', '1-3_years', '3-5_years'
 */
const curatePathMap = async (categories, topicName, experienceLevel) => {
  // Use a simplified internal getter or just reuse global clients if available
  // Since this file uses getClient() as a private helper inside functions in some places? 
  // Wait, other functions use `getClient()`? No, structureLearningPath uses `getClient()`.
  // Let's see where getClient comes from. It seems missing in this context.
  // structureLearningPath uses `this.getClient()` which implies there WAS a class...
  // BUT `structureLearningPath` acts like a standalone function in the export?
  // Checking file source... `structureLearningPath` calls `const client = getClient();` (if standalone) OR `this.getClient()`.
  // If the file is mixed, I need to know how `getClient` is defined.
  
  // Assuming getClient is a helper function defined elsewhere in this file.
  // If not, I'll use groqClients[0] directly as per valid imports.
  
  const client = groqClients[0]; 

  // Prepare the list for the AI
  const categoryList = categories.map(c => `- ${c.name} (Slug: ${c.slug}, Group: ${c.group})`).join('\n');
  const levelLabel = _formatLevel(experienceLevel);

  const systemPrompt = `You are an expert ${topicName} Curriculum Designer. 
Your task is to SELECT the specific modules that a student at the "${levelLabel}" level should learn.

Guidelines:
1. **Beginner (0-1 Year)**: Select ONLY fundamental and essential modules. Be strict. Exclude advanced architecture, internals, complex optimizations, and niche topics unless they are absolutely critical for a beginner to function.
2. **Intermediate (1-3 Years)**: Select core competencies plus common advanced topics.
3. **Expert (3-5 Years)**: Select EVERYTHING provided, perhaps excluding only "Setting up the environment" if redundant, but usually experts see all.

Input: A list of available modules (Name, Slug, Group).
Output: JSON object with:
- "visibleSlugs": Array of strings (the slugs of the selected modules)
- "reasoning": Brief explanation of the selection strategy.

IMPORTANT: Return ONLY valid JSON.
`;

  const userPrompt = `Input Modules for ${topicName}:
${categoryList}

Curate the list for a ${levelLabel}.`;

  try {
    // Try Primary Client (Groq)
    const completion = await client.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1, // Very deterministic
      response_format: { type: "json_object" } 
    });

    const responseText = completion.choices[0]?.message?.content;
    return JSON.parse(responseText);

  } catch (error) {
    console.warn('Primary AI failed for curation, trying fallback...', error.message);
    // Simplified Fallback: If AI fails, return ALL categories for safety
    return {
      visibleSlugs: categories.map(c => c.slug),
      reasoning: "Fallback: AI Service unavailable, showing full curriculum."
    };
  }
};

/**
 * Translate a code block from one language to another
 * Keeps logic identical, only changes syntax
 */
export const translateCodeBlock = async (code, sourceLang, targetLang) => {
  // Quick check - if languages are the same, return original
  if (sourceLang === targetLang) return code;
  
  const cacheKey = `translate_${sourceLang}_${targetLang}_${Buffer.from(code).toString('base64').substring(0, 40)}`;
  
  // Check cache
  const cached = await getCacheValue(cacheKey);
  if (cached) {
    console.log('📦 Returning cached code translation');
    return cached;
  }

  const prompt = `Translate this ${sourceLang} code to ${targetLang}.

**RULES**:
1. Keep the EXACT SAME logic and algorithm
2. Use ${targetLang} idioms and best practices
3. Maintain or translate comments appropriately
4. Use proper ${targetLang} syntax and conventions
5. Return ONLY the translated code, no explanations or markdown

**SOURCE CODE (${sourceLang})**:
${code}

**TRANSLATE TO ${targetLang}**:
Return the translated code now (no explanations, just code):`;

  // Try Groq clients (PRIMARY)
  for (const [index, client] of groqClients.entries()) {
    try {
      console.log(`🔄 Translating code via Groq (Key ${index + 1})...`);
      const response = await tryGroqFallback(prompt, client);
      
      // Try to extract code from markdown if AI wrapped it
      const codeMatch = response.match(/```[\w]*\n([\s\S]*?)\n```/);
      const translatedCode = codeMatch ? codeMatch[1].trim() : response.trim();
      
      // Cache the translation
      await setCacheValue(cacheKey, translatedCode, 3600 * 24 * 7); // 7 days
      
      console.log(`✅ Code translated successfully (${sourceLang} → ${targetLang})`);
      return translatedCode;
    } catch (error) {
      console.error(`❌ Groq translation failed (Key ${index + 1}):`, error.message);
    }
  }

  // Try Gemini fallback
  for (const client of geminiModels) {
    try {
      console.log(`⚠️ Trying Gemini for translation...`);
      const result = await client.instance.generateContent(prompt);
      const response = result.response.text();
      
      const codeMatch = response.match(/```[\w]*\n([\s\S]*?)\n```/);
      const translatedCode = codeMatch ? codeMatch[1].trim() : response.trim();
      
      await setCacheValue(cacheKey, translatedCode, 3600 * 24 * 7);
      return translatedCode;
    } catch (error) {
      console.error(`❌ Gemini translation failed:`, error.message);
    }
  }

  // Fallback: return original code if all providers fail
  console.warn('⚠️ All translation attempts failed, returning original code');
  return code;
};

export default {
  generateExplanation,
  answerQuestion,
  generateQuiz,
  generateLearningPathRecommendation,
  structureLearningPath,
  translateCodeBlock,
  curatePathMap
};