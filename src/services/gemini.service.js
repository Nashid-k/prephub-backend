import { aiService } from './ai.service.js';
import NodeCache from 'node-cache';
import Cache from '../models/Cache.js';

// Memory Cache for AI responses (TTL: 1 hour)
const memoryCache = new NodeCache({ stdTTL: 3600 });

/**
 * Get data from cache
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
 * Set data in cache
 */
const setCacheValue = async (key, value, ttlSeconds = 3600 * 24 * 7) => {
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
 * Detects topic context and returns specific "Elite" requirements based on Level
 */
const getEliteAnalysis = (topic, section, context = '', level = 'advanced') => {
  const combined = `${topic} ${section} ${context}`.toLowerCase();
  
  // 1. Determine Tech Stack & Hard Requirements (Stack specific remains same)
  let techRequirements = [];
  
  if (combined.includes('javascript') || combined.includes('node') || combined.includes('v8')) {
    techRequirements.push("Mention memory management (Garbage Collection implications).");
    if (level === 'advanced') {
      techRequirements.push("Discuss V8 Engine internals (Call Stack, Heap, Event Loop).");
    }
  }
  
  if (combined.includes('react') || combined.includes('frontend')) {
    techRequirements.push("Strictly separate logic (Hooks) from UI.");
    if (level === 'advanced') {
      techRequirements.push("Discuss Render Cycle and Reconciliation internals.");
    }
  }

  // 2. Determine "Persona" based on Experience Level
  let persona = "Senior Principal Engineer";
  let tone = "Authoritative, insightful, and practical.";
  let focus = "Internal mechanics, scaling, and trade-offs.";

  switch (level) {
    case 'beginner':
      persona = "Patient Mentor & Senior Teacher";
      tone = "Encouraging, clear, and analogy-rich. Avoids jargon where possible.";
      focus = "Foundational concepts, 'Mental Models', and 'Why this matters'.";
      techRequirements = ["Use real-world analogies.", "Explain 'magic' words simply."];
      break;
    
    case 'intermediate':
      persona = "Senior Colleague / Team Lead";
      tone = "Professional, pragmatic, and focused on best practices.";
      focus = "Clean code, common pitfalls, and industry standards.";
      techRequirements.push("Focus on 'How we do this in production'.");
      break;

    case 'advanced':
    default:
      persona = "Distinguished Systems Architect";
      tone = "Deeply technical, no-fluff, 'internals-first'.";
      focus = "Memory layout, assembly/bytecode, race conditions, and heavy trade-offs.";
      break;
  }

  return { techRequirements, persona, tone, focus };
};

/**
 * Generate ELITE AI explanation for a topic/section
 */
export const generateExplanation = async (topic, section, context = '', language = 'javascript', level = 'advanced') => {
  const contextHash = context ? Buffer.from(context).toString('base64').substring(0, 50) : 'no_context';
  const baseCacheKey = `explain_v2_${level}_${topic}_${section}_${contextHash}`;
  
  const cached = await getCacheValue(baseCacheKey);
  if (cached) return cached;

  const analysis = getEliteAnalysis(topic, section, context, level);

  const prompt = `
You are a ${analysis.persona}.
Your task is to write a guide on **"${section}"** (Topic: ${topic}) for a **${level.toUpperCase()}** audience.

**TARGET AUDIENCE**: 
${level === 'beginner' ? "Students asking 'Why?'. Identify confusion early." : 
  level === 'intermediate' ? "Junior Devs wanting to be Seniors. Focus on 'How to do it right'." : 
  "Elite Engineers wanting Internals. Focus on 'How it breaks'."}

**TONE & FOCUS**:
- ${analysis.tone}
- Focus: ${analysis.focus}

**TECHNICAL REQUIREMENTS**:
${analysis.techRequirements.map(req => `- ${req}`).join('\n')}
- Code Language: **${language.toUpperCase()}**

**CONTENT STRUCTURE (Strict Markdown)**:

### ${section}

#### ${level === 'beginner' ? '🌱 Concept' : '🏗️ Context'}
(${level === 'beginner' ? 'Simple explanation with an analogy.' : 'Architectural context and history.'})

#### ${level === 'beginner' ? '📝 How it Works' : '🔬 Internals'}
(${level === 'beginner' ? 'Step-by-step simple flow.' : 'Deep dive into memory/cpu/network.'})

#### ${level === 'beginner' ? '⚠️ Common Mistakes' : '⚔️ Trade-offs'}
(${level === 'beginner' ? 'What do beginners get wrong?' : 'When NOT to use this. Pros/Cons.'})

#### 💻 ${level === 'beginner' ? 'Simple Example' : 'Production Implementation'}
\`\`\`${language}
// ${level.toUpperCase()} Example
\`\`\`

#### ${level === 'beginner' ? '🧠 Remember This' : '🧠 Mental Model'}
(${level === 'beginner' ? 'A simple rule of thumb.' : 'A sophisticated framework for thinking about this.'})

Generate now:
`;

  try {
    const response = await aiService.generateText(prompt);
    await setCacheValue(baseCacheKey, response);
    return response;
  } catch (error) {
    console.error('❌ Explanation Generation Failed:', error.message);
    return `### ${section}\n\n> **⚠️ AI Offline**: Unable to generate elite content at this time.\n\nPlease consult official documentation regarding **${topic}**.`;
  }
};

/**
 * Answer a specific question - Elite Style
 */
export const answerQuestion = async (question, context = {}, language = 'javascript', level = 'advanced') => {
  const contextId = (context.topic || '') + (context.section || '');
  const questionHash = Buffer.from(question).toString('base64').substring(0, 40);
  const cacheKey = `answer_v2_${level}_${questionHash}_${contextId}`;

  const cached = await getCacheValue(cacheKey);
  if (cached) return cached;

  const analysis = getEliteAnalysis(context.topic || 'General', context.section || 'General', '', level);

  const prompt = `
You are a ${analysis.persona}.
QUESTION: "${question}"
LEVEL: ${level.toUpperCase()}
CODE CONTEXT: ${context.currentCode ? `\n\`\`\`${language}\n${context.currentCode}\n\`\`\`` : 'None'}

**INSTRUCTIONS**:
1. Answer for a ${level} Audience.
   - Beginner: Use analogies. Be encouraging.
   - Advanced: Be brief. Focus on internals/correctness.
2. If code is involved, use **${language.toUpperCase()}**.

**OUTPUT STRUCTURE**:

#### 💡 Answer
(${level === 'beginner' ? 'Simple explanation.' : 'Direct technical answer.'})

#### ${level === 'beginner' ? '📝 Explanation' : '🔬 Technical Detail'}
(${level === 'beginner' ? 'How it works step-by-step.' : 'Why? Internals? tradeoffs?'})

#### 💻 ${level === 'beginner' ? 'Example' : 'Solution'}
(Code example)
`;

  try {
    const response = await aiService.generateText(prompt);
    await setCacheValue(cacheKey, response);
    return response;
  } catch (error) {
    console.error('❌ Question Answer Failed:', error.message);
    return `### AI Offline\n\nPlease check system status.`;
  }
};

/**
 * Generate a specialized quiz
 */
export const generateQuiz = async (topic, section, regenerate = false, language = 'javascript', content = '', level = 'advanced') => {
  const baseKey = `quiz_v2_${level}_${topic}_${section}_${language}`;
  const cacheKey = regenerate ? `${baseKey}_${Date.now()}` : baseKey;
  
  if (!regenerate) {
    const cached = await getCacheValue(baseKey);
    if (cached) return cached;
  }

  const focus = level === 'beginner' ? "Fundamentals & Syntax" : 
                level === 'intermediate' ? "Patterns & Best Practices" : 
                "Internals, Trade-offs & Debugging";

  const prompt = `
Generate 5 **${level.toUpperCase()} LEVEL** Interview Questions.
TOPIC: ${topic}
SECTION: ${section}
FOCUS: ${focus}

**REQUIREMENTS**:
- Questions must be appropriate for a ${level} developer.
- Options: 4 choices.
- Explanation: Teaching moment for ${level} level.

**OUTPUT FORMAT** (JSON Only, Array):
[
  { 
    "question": "...", 
    "options": ["A", "B", "C", "D"], 
    "correctIndex": 0, 
    "explanation": "..." 
  }
]
`;

  try {
    const result = await aiService.generateJSON(prompt);
    if (Array.isArray(result)) {
        await setCacheValue(baseKey, result);
        return result;
    }
  } catch (error) {
    console.error('❌ Quiz Generation Failed:', error.message);
  }
  return [];
};

/**
 * Structure curriculum path
 */
export const structureLearningPath = async (topics, pathName, level = 'advanced') => {
  const cacheKey = `path_structure_${level}_${pathName}_${topics ? topics.length : 0}`;
  
  const cached = await getCacheValue(cacheKey);
  if (cached) return cached;

  const prompt = `
    You are an expert curriculum designer.
    Goal: Create a structured learning path called "${pathName}".
    Target Audience: ${level}
    Topics to Include: ${JSON.stringify(topics)}

    Requirements:
    - Group topics into logical modules.
    - Provide a sensible order (dependencies first).
    - Estimate time for each module.

    Output (JSON):
    {
      "modules": [
        {
          "title": "Module 1: Name",
          "description": "Brief summary",
          "topics": ["topic_slug_1", "topic_slug_2"],
          "estimatedHours": 5
        }
      ],
      "totalEstimatedHours": 20
    }
  `;

  try {
    const result = await aiService.generateJSON(prompt);
    await setCacheValue(cacheKey, result);
    return result;
  } catch (error) {
    console.error('❌ Path Structuring Failed:', error.message);
    return { modules: [], error: 'Failed' };
  }
};

/**
 * Translate code blocks
 */
export const translateCodeBlock = async (code, sourceLanguage, targetLanguage) => {
  const codeHash = Buffer.from(code).toString('base64').substring(0, 50);
  const cacheKey = `translate_${sourceLanguage}_${targetLanguage}_${codeHash}`;
  
  const cached = await getCacheValue(cacheKey);
  if (cached) return cached;

  const prompt = `
    Translate the following ${sourceLanguage} code to ${targetLanguage}.
    
    RULES:
    1. Maintain logic, variable names, and comments exactly where possible.
    2. Adapt syntax to ${targetLanguage} idioms.
    3. If a library/feature doesn't exist, use the closest equivalent or add a comment.
    4. RETURN ONLY CODE. NO MARKDOWN. NO EXPLANATIONS.

    CODE:
    ${code}
  `;

  try {
    let translated = await aiService.generateText(prompt);
    // Cleanup markdown if present
    translated = translated.replace(/```[a-z]*\n?/ig, '').replace(/```$/g, '');
    
    await setCacheValue(cacheKey, translated);
    return translated;
  } catch (error) {
    console.error('❌ Translation Failed:', error.message);
    return code; // Fallback
  }
};

/**
 * Analyze Code (Review, Debug, Optimize) - Elite Agent
 */
export const analyzeCode = async (code, mode = 'review', language = 'javascript', level = 'advanced') => {
  const codeHash = Buffer.from(code).toString('base64').substring(0, 50);
  const cacheKey = `analyze_v2_${level}_${mode}_${language}_${codeHash}`;
  
  const cached = await getCacheValue(cacheKey);
  if (cached) return cached;

  let persona = "";
  let task = "";
  let tone = level === 'beginner' ? "Educational & Encouraging" : "Professional & Strict";

  // Customize Persona based on Mode AND Level
  switch(mode) {
    case 'debug':
      persona = level === 'beginner' ? "Friendly Debugging Mentor" : "Systems Debugger & Root Cause Analyst";
      task = level === 'beginner' 
        ? "Explain the bug simply. Show how to fix it step-by-step." 
        : "Find logic errors, race conditions. IGNORE style. Fix it efficiently.";
      break;
    
    case 'optimize':
      persona = level === 'beginner' ? "Code Optimization Guide" : "Performance Architect (HFT)";
      task = level === 'beginner'
        ? "Show a faster way to do this. Explain why loops are slow."
        : "Analyze Big O. Optimize for Cache Locality, Memory Allocations.";
      break;
    
    case 'review':
    default:
      persona = level === 'beginner' ? "Code Review Mentor" : "Principal Security Engineer";
      task = level === 'beginner'
        ? "Point out good things. Suggest 1-2 easy improvements."
        : "Strict Review. Security, Maintainability, Patterns.";
      break;
  }

  const prompt = `
You are a ${persona}.
TASK: ${task}
AUDIENCE: ${level.toUpperCase()}
TONE: ${tone}

CODE TO ANALYZE (${language}):
\`\`\`${language}
${code}
\`\`\`

**OUTPUT FORMAT (Markdown)**:

#### 🧐 Analysis
(What is happening? What is wrong? Be brief and punchy.)

#### 🛠️ Fix / Improvement
(The technical details. Why is this better?)

#### 💻 Refactored Code
(Production-ready code block)

#### 🛡️ Elite Best Practice
(One rule to never forget related to this pattern)
`;

  try {
    const response = await aiService.generateText(prompt);
    await setCacheValue(cacheKey, response);
    return response;
  } catch (error) {
    console.error('❌ Code Analysis Failed:', error.message);
    return `### Analysis Failed\n\nUnable to analyze code at this time.`;
  }
};