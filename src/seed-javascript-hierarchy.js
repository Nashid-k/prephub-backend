import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';

dotenv.config();

/**
 * Difficulty categorization for JavaScript topics
 */
const categorizeDifficulty = (categoryName) => {
  const advancedKeywords = [
    'closures', 'prototype', 'asynchronous', 'promises', 'event loop', 
    'generators', 'proxy', 'performance', 'design', 'patterns', 'worker'
  ];
  const intermediateKeywords = [
    'arrays', 'objects', 'this', 'dom', 'fetch', 'error handling', 
    'functions', 'scope'
  ];
  
  const lowerName = categoryName.toLowerCase();
  
  if (advancedKeywords.some(kw => lowerName.includes(kw))) return 'advanced';
  if (intermediateKeywords.some(kw => lowerName.includes(kw))) return 'intermediate';
  return 'beginner';
};

/**
 * JavaScript Complete Curriculum - 16 Chapters
 */
const javascriptCurriculum = {
  "01_JavaScript_Basics_&_Language_Fundamentals": [
    "What is JavaScript",
    "ECMAScript (ES versions, ES6+ overview)",
    "JavaScript engines (V8)",
    "JIT (Just-In-Time compilation)",
    "Static vs Dynamic typing",
    "Primitive vs Non-primitive data types",
    "Truthy and falsy values",
    "typeof, instanceof",
    "null, undefined, not defined",
    "Escape sequences",
    "Type casting",
    "Type coercion (implicit & explicit)",
    "== vs ===",
    "Boxing in JavaScript",
    "NaN behavior",
    "Predict outputs of coercion expressions",
    "Identify falsy values",
    "Convert types safely"
  ],
  "02_Variables_Scope_&_Execution_Model": [
    "var, let, const",
    "Redeclaration vs reassignment",
    "Scope types (Global, Function, Block)",
    "Scope chaining",
    "Lexical scope",
    "Lexical environment",
    "Variable shadowing",
    "Illegal shadowing",
    "Hoisting",
    "Temporal Dead Zone (TDZ)",
    "Execution context",
    "Call stack",
    "Shadowing examples",
    "Hoisting behavior in var vs let",
    "Predict execution order"
  ],
  "03_Operators_&_Control_Flow": [
    "Arithmetic operators",
    "Logical operators",
    "Short-circuiting (||, &&)",
    "Nullish coalescing (??)",
    "Ternary operator",
    "Bitwise operators",
    "Pre-increment vs Post-increment",
    "break, continue",
    "Conditional statements (if, switch)",
    "Entry vs Exit controlled loops",
    "for, while, do…while",
    "for...in vs for...of",
    "Rewrite if-else using ternary",
    "Use short-circuiting safely",
    "Loop-based array problems"
  ],
  "04_Functions_Core_&_Advanced": [
    "Function declaration vs expression",
    "Named functions",
    "Anonymous functions",
    "Arrow functions",
    "Arrow vs regular functions",
    "Limitations of arrow functions",
    "Parameters vs arguments",
    "Default parameters",
    "Rest parameters",
    "Spread operator",
    "Function return behavior",
    "First-class functions",
    "First-order vs Higher-order functions",
    "Pure vs Impure functions",
    "Side effects",
    "Convert normal functions to arrow functions",
    "Use rest/spread in functions",
    "Identify pure vs impure functions"
  ],
  "05_Closures_&_Functional_Patterns": [
    "Closure",
    "Applications of closure",
    "Limitations/drawbacks of closure",
    "Currying",
    "Benefits of currying",
    "Partial application",
    "Memoization",
    "Function composition"
  ],
  "06_Arrays_Deep_Dive": [
    "Array basics",
    "Mutability of arrays",
    "Array methods: map",
    "Array methods: filter",
    "Array methods: reduce",
    "Array methods: forEach",
    "Array methods: some, every",
    "Array methods: find",
    "Array methods: includes",
    "Array methods: slice",
    "Array methods: splice",
    "Array methods: push, pop",
    "Array methods: shift, unshift",
    "Array methods: flat, flatMap",
    "Array destructuring",
    "Spread with arrays",
    "Manual array operations (without built-ins)",
    "Remove duplicates",
    "Find max/min/second largest",
    "Reverse array",
    "Custom map / filter",
    "Pattern problems"
  ],
  "07_Objects_&_Object_Oriented_JavaScript": [
    "Object creation methods",
    "Object literals",
    "Properties & methods",
    "Method vs function",
    "Object destructuring",
    "Spread with objects",
    "Object iteration",
    "Object.keys, Object.values, Object.entries",
    "Object.assign",
    "Object immutability",
    "Object.freeze",
    "Object.seal",
    "Deep copy vs Shallow copy",
    "Structured cloning",
    "Factory functions",
    "Constructor functions",
    "new keyword",
    "Classes",
    "Getters & setters",
    "OOP principles: Abstraction",
    "OOP principles: Encapsulation",
    "OOP principles: Polymorphism",
    "Object manipulation tasks",
    "Remove/add properties",
    "Deep clone nested objects"
  ],
  "08_this_Call_Apply_&_Bind": [
    "this keyword",
    "this in global scope",
    "this in object methods",
    "this in arrow functions",
    "this in constructors",
    "Function borrowing",
    "call()",
    "apply()",
    "bind()",
    "Borrow methods between objects",
    "Fix this issues"
  ],
  "09_Prototype_&_Inheritance": [
    "Prototype",
    "Prototype chain",
    "Prototypal inheritance",
    "__proto__",
    "Object.create",
    "hasOwnProperty",
    "Static vs instance methods",
    "instanceof",
    "Prototype chaining examples",
    "Inheritance implementation"
  ],
  "10_Asynchronous_JavaScript": [
    "Synchronous vs Asynchronous programming",
    "Single-threaded nature of JavaScript",
    "Blocking vs Non-blocking",
    "Browser Web APIs",
    "Event loop",
    "Call stack",
    "Microtask queue",
    "Callback queue (Macrotask)",
    "Event loop starvation",
    "Predict execution order",
    "Timers + promises examples"
  ],
  "11_Callbacks_&_Promises": [
    "Callback functions",
    "Why callbacks are used",
    "Error-first callbacks",
    "Callback hell",
    "Promise",
    "Promise states",
    "Promise chaining",
    "Promise.all",
    "Promise.allSettled",
    "Promise.race",
    "Promise.any",
    "async / await",
    "Error handling in async code",
    "Convert callback hell to promises",
    "Promise chaining examples"
  ],
  "12_Error_Handling": [
    "try, catch, finally",
    "Throwing custom errors",
    "Error object properties",
    "Runtime vs Reference vs Type errors",
    "Custom error throwing",
    "Graceful async error handling"
  ],
  "13_Fetch_API_&_Web_APIs": [
    "Fetch API",
    "Fetch syntax",
    "Handling JSON",
    "Fetch error handling",
    "Async API calls",
    "Browser storage: localStorage",
    "Browser storage: sessionStorage",
    "Fetch and parse JSON",
    "Handle API failures"
  ],
  "14_DOM_&_Events": [
    "DOM vs BOM",
    "DOM manipulation methods",
    "Event listeners",
    "Event propagation",
    "Event bubbling",
    "Event capturing",
    "Event delegation",
    "preventDefault",
    "stopPropagation",
    "Button click handlers",
    "Toggle UI elements",
    "Event delegation tasks"
  ],
  "15_Advanced_Concepts": [
    "Generators",
    "Iterators",
    "WeakMap & WeakSet",
    "Proxy objects",
    "Polyfills",
    "Debouncing",
    "Throttling",
    "Memory leaks",
    "Garbage collection",
    "Web Workers",
    "Service Workers",
    "Modules: ES Modules",
    "Modules: Default vs Named exports",
    "Generator-based tasks",
    "Debounce/throttle implementation"
  ],
  "16_Design_&_Performance": [
    "Module pattern",
    "Factory pattern",
    "Observer pattern",
    "Singleton pattern",
    "Clean code principles",
    "Performance optimization basics",
    "Avoiding memory leaks",
    "Async script loading"
  ]
};

/**
 * Seed JavaScript Hierarchy
 */
const seedJavascriptHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find JavaScript topic
    const jsTopic = await Topic.findOne({ slug: 'javascript' });
    
    if (!jsTopic) {
      console.error('❌ JavaScript topic not found! Please ensure Topic exists or run npm run seed first.');
      process.exit(1);
    }

    // Clear existing JavaScript categories and sections
    await Category.deleteMany({ topicId: jsTopic._id });
    await Section.deleteMany({ topicId: jsTopic._id });
    console.log('\n🗑️  Cleared existing JavaScript categories and sections');

    console.log('\n🌟 Creating 3-level hierarchy: Topic → Category → Section\n');

    let categoryOrder = 1;
    let totalSections = 0;

    for (const [chapterKey, topics] of Object.entries(javascriptCurriculum)) {
      // Format Chapter Name (e.g., "01_JavaScript_Basics..." -> "01 JavaScript Basics...")
      const chapterName = chapterKey.replace(/_/g, ' ');
      
      // Create Category
      const category = await Category.create({
        topicId: jsTopic._id,
        name: chapterName,
        slug: chapterKey.toLowerCase().replace(/_/g, '-').replace(/&/g, 'and'),
        order: categoryOrder++,
        description: `Master ${chapterName}`
      });

      console.log(`📚 Category ${categoryOrder - 1}: ${chapterName}`);

      // Create a single Section for this entire chapter to house the key points
      // This maps the user's 2-level structure (Chapter -> Topics) to our 3-level (Topic -> Category -> Section)
      // by treating the Chapter as the Category and creating a "Main Concepts" section.
      
      const difficulty = categorizeDifficulty(chapterName);
      const sectionTitle = "Core Concepts"; // Generic title for the single section in this category

      await Section.create({
        topicId: jsTopic._id,
        categoryId: category._id,
        title: sectionTitle,
        slug: `${category.slug}-core-concepts`,
        order: 1,
        description: `Deep dive into ${chapterName}`,
        difficulty: difficulty,
        keyPoints: topics
      });

      totalSections++;
      console.log(`      ✓ ${sectionTitle} (${difficulty})`);
      console.log('');
    }

    const totalCategories = await Category.countDocuments({ topicId: jsTopic._id });

    console.log('🎉 JavaScript 3-level hierarchy created successfully!');
    console.log('📊 Summary:');
    console.log(`   Categories: ${totalCategories}`);
    console.log(`   Sections: ${totalSections}`);
    console.log(`\n✨ Flow: JavaScript → ${totalCategories} Categories → ${totalSections} Sections\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedJavascriptHierarchy();
