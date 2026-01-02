import mongoose from 'mongoose';
import dotenv from 'dotenv';
import assignGroupBatch from '../../services/assignGroupBatch.service.js';

import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import slugify from 'slugify';

dotenv.config();

const javascriptCurriculum = {

  "01_language_origins_and_runtime": {
    "history_and_evolution": [
      "Origin of JavaScript",
      "Brendan Eich and Netscape",
      "The Browser Wars",
      "ECMAScript Standardization",
      "ES5 vs ES6+ Evolution"
    ],
    "js_engine_architecture": [
      "JavaScript Engine Overview",
      "V8 Engine (Chrome/Node.js)",
      "SpiderMonkey (Firefox)",
      "JavaScriptCore (Safari)",
      "Memory Heap",
      "Call Stack Overview"
    ],
    "jit_compilation": [
      "Interpretation vs Compilation",
      "Just-In-Time (JIT) Compilation",
      "Monitor & Profiler",
      "Optimization & Deoptimization",
      "Hot Functions",
      "Inline Caching"
    ]
  },

  "02_type_system_and_values": {
    "typing_system": [
      "Static vs Dynamic Typing",
      "Primitive vs Reference Types",
      "Type Coercion (Implicit & Explicit)",
      "Boxing and Unboxing",
      "typeof and instanceof"
    ],
    "special_values": [
      "null vs undefined",
      "NaN (Not a Number)",
      "Infinity behavior",
      "Truthy and Falsy Values"
    ]
  },

  "03_variables_scope_and_execution": {
    "variable_declarations": [
      "var vs let vs const",
      "Redeclaration Rules",
      "Reassignment Rules"
    ],
    "execution_context": [
      "Global Execution Context",
      "Function Execution Context",
      "Creation Phase vs Execution Phase",
      "The 'this' Binding",
      "Variable Environment"
    ],
    "scope_management": [
      "Global, Function, Block Scope",
      "Lexical (Static) Scope",
      "Scope Chain",
      "Variable Shadowing",
      "Illegal Shadowing"
    ],
    "hoisting_details": [
      "Variable Hoisting",
      "Function Hoisting",
      "Classes Hoisting",
      "Temporal Dead Zone (TDZ)",
      "Function Expressions vs Declarations"
    ],
    "call_stack_lifecycle": [
      "Stack Frames",
      "Push and Pop Operations",
      "Stack Overflow",
      "Recursion and Stack",
      "Error Stack Traces"
    ],
    "strict_mode": [
      "Purpose of 'use strict'",
      "Enabling Strict Mode",
      "Restrictions in Strict Mode",
      "this in Strict Mode",
      "Secure JavaScript"
    ]
  },

  "04_operators_and_control_flow": {
    "arithmetic_operators": [
      "Addition (+)",
      "Subtraction (-)",
      "Multiplication (*)",
      "Division (/)",
      "Modulus (%)",
      "Exponentiation (**)",
      "Increment (++)",
      "Decrement (--)",
      "Pre-increment vs Post-increment"
    ],
    "comparison_operators": [
      "Greater Than (>)",
      "Less Than (<)",
      "Greater Than or Equal (>=)",
      "Less Than or Equal (<=)"
    ],
    "logical_operators": [
      "Logical AND (&&)",
      "Logical OR (||)",
      "Logical NOT (!)",
      "Short-circuit Evaluation",
      "Nullish Coalescing Operator (??)",
      "Optional Chaining Operator (?.)"
    ],
    "equality_algorithms": [
      "Abstract Equality (==)",
      "Strict Equality (===)",
      "SameValueZero (Map/Set)",
      "SameValue (Object.is)",
      "Equality Comparison Table"
    ],
    "type_coercion": [
      "Implicit Coercion Rules",
      "Explicit Coercion",
      "ToPrimitive Operation",
      "valueOf vs toString",
      "Symbol.toPrimitive",
      "Corner Cases in Coercion"
    ],
    "assignment_operators": [
      "Assignment (=)",
      "Addition Assignment (+=)",
      "Subtraction Assignment (-=)",
      "Multiplication Assignment (*=)",
      "Division Assignment (/=)",
      "Modulus Assignment (%=)"
    ],
    "bitwise_operators": [
      "Bitwise AND (&)",
      "Bitwise OR (|)",
      "Bitwise XOR (^)",
      "Bitwise NOT (~)",
      "Left Shift (<<)",
      "Right Shift (>>)",
      "Zero-fill Right Shift (>>>)"
    ],
    "control_flow": [
      "if Statement",
      "if-else Statement",
      "if-else if-else Statement",
      "Switch Statement",
      "Ternary Operator",
      "Nested Conditionals",
      "for Loop",
      "while Loop",
      "do-while Loop",
      "for...in Loop (Objects)",
      "for...of Loop (Iterables)",
      "break Statement",
      "continue Statement",
      "Labeled Statements"
    ]
  },

  "05_functions_and_closures": {
    "function_types": [
      "Function Declarations",
      "Function Expressions",
      "Named Function Expressions",
      "Anonymous Functions",
      "Arrow Functions (ES6+)",
      "Arrow vs Regular Functions",
      "Arrow Function Limitations (No this, arguments, new, prototype)"
    ],
    "parameters_arguments": [
      "Parameters vs Arguments",
      "Default Parameters",
      "Rest Parameters (...args)",
      "Spread Operator (...array)",
      "Arguments Object"
    ],
    "function_properties": [
      "First-class Functions",
      "Higher-order Functions",
      "First-order Functions",
      "Pure Functions",
      "Impure Functions",
      "Side Effects",
      "Function Return Behavior"
    ],
    "functional_programming": [
      "Function Composition",
      "Currying",
      "Partial Application",
      "Memoization",
      "Benefits of Functional Programming"
    ],
    "closures": [
      "What are Closures",
      "How Closures Work",
      "Lexical Scoping in Closures",
      "Closure Examples",
      "Data Privacy (Module Pattern)",
      "Function Factories",
      "Event Handlers with Closures",
      "Currying Implementation",
      "Memory Management with Closures",
      "Potential Memory Leaks",
      "Performance Considerations"
    ]
  },

  "06_core_data_structures": {
    "arrays": [
      "Array Creation",
      "Array Mutability",
      "Array Length Property",
      "Array Indexing",
      "push() - Add to end",
      "pop() - Remove from end",
      "shift() - Remove from beginning",
      "unshift() - Add to beginning",
      "splice() - Add/remove elements",
      "slice() - Extract portion",
      "forEach()",
      "map()",
      "filter()",
      "reduce()",
      "some()",
      "every()",
      "find()",
      "findIndex()",
      "indexOf()",
      "lastIndexOf()",
      "includes()",
      "Array.isArray()",
      "concat()",
      "join()",
      "reverse()",
      "sort()",
      "flat()",
      "flatMap()",
      "Array Destructuring",
      "Spread Operator with Arrays",
      "Multidimensional Arrays",
      "Array.from()",
      "Array.of()"
    ],
    "objects": [
      "Object Creation (Object Literal, Constructor, Class)",
      "Properties and Methods",
      "Property Access (Dot vs Bracket)",
      "Property Existence Checking",
      "Object.keys()",
      "Object.values()",
      "Object.entries()",
      "Object.assign()",
      "Object.create()",
      "Object.freeze()",
      "Object.seal()",
      "Object.isFrozen()",
      "Object.isSealed()",
      "Object Destructuring",
      "Spread Operator with Objects",
      "Property Shorthand",
      "Method Shorthand",
      "Computed Property Names",
      "for...in Loop",
      "Object.entries() with for...of",
      "Object.keys() with forEach()",
      "Shallow Copy vs Deep Copy",
      "Structured Clone API",
      "JSON.parse(JSON.stringify()) Limitations"
    ]
  },

  "07_object_model_and_this": {
    "oop_concepts": [
      "Encapsulation",
      "Abstraction",
      "Polymorphism",
      "Inheritance"
    ],
    "constructors_and_classes": [
      "Constructor Pattern",
      "new Keyword",
      "Prototype Property",
      "Class Declaration",
      "Class Expression",
      "Constructor Method",
      "Instance Methods",
      "Static Methods",
      "Getters and Setters",
      "Class Inheritance (extends)",
      "super Keyword"
    ],
    "this_context": [
      "this in Global Context",
      "this in Function Context",
      "this in Object Method",
      "this in Constructor",
      "this in Arrow Functions",
      "this in Event Handlers",
      "call() Method",
      "apply() Method",
      "bind() Method",
      "Function Borrowing"
    ]
  },

  "08_prototypes_and_inheritance": {
    "prototype_system": [
      "Prototype Object",
      "__proto__ vs prototype",
      "Prototype-based Inheritance",
      "Prototype Chain Mechanism",
      "Property Shadowing on Chain",
      "End of Prototype Chain (null)",
      "Performance and Lookup Time"
    ],
    "prototype_utilities": [
      "Object.getPrototypeOf()",
      "Object.setPrototypeOf()",
      "Object.hasOwnProperty()",
      "instanceof Operator",
      "Modifying Built-in Prototypes (Polyfills)"
    ],
    "inheritance_patterns": [
      "Constructor Inheritance",
      "Class Inheritance",
      "Mixin Pattern",
      "Composition over Inheritance",
      "Prototypal Inheritance vs Classical"
    ]
  },

  "09_async_and_concurrency": {
    "async_foundations": [
      "Synchronous vs Asynchronous",
      "Single-threaded Nature",
      "Blocking vs Non-blocking Operations",
      "Concurrency Model"
    ],
    "event_loop": [
      "Call Stack vs Callback Queue",
      "Microtasks vs Macrotasks",
      "Render Cycle and Event Loop",
      "Event Loop Visualization",
      "Starvation handling"
    ],
    "callbacks": [
      "Callback Functions",
      "Error-first Callbacks",
      "Callback Hell",
      "Converting Callbacks to Promises"
    ],
    "promises": [
      "Promise States",
      "Promise Creation",
      "Promise Chaining",
      "Promise.all()",
      "Promise.allSettled()",
      "Promise.race()",
      "Promise.any()",
      "Promise.resolve()",
      "Promise.reject()"
    ],
    "async_await": [
      "async Functions",
      "await Expression",
      "Error Handling with try-catch",
      "Parallel Execution with Promise.all()"
    ],
    "timers": [
      "setTimeout()",
      "setInterval()",
      "clearTimeout()",
      "clearInterval()",
      "Zero-delay setTimeout",
      "requestAnimationFrame",
      "nextTick (Node.js)"
    ]
  },

  "10_error_memory_and_platform": {
    "error_handling": [
      "Error Object",
      "SyntaxError",
      "ReferenceError",
      "TypeError",
      "RangeError",
      "URIError",
      "EvalError",
      "try-catch",
      "try-catch-finally",
      "throw Statement",
      "Custom Error Classes",
      "Global Error Handlers"
    ],
    "memory_management": [
      "Garbage Collection",
      "Reference Counting",
      "Mark-and-Sweep Algorithm",
      "Common Memory Leaks",
      "Circular References",
      "Detached DOM Elements",
      "Closures and Memory"
    ],
    "browser_apis": [
      "Fetch API",
      "Request Headers",
      "Response Handling",
      "localStorage",
      "sessionStorage",
      "Storage Events",
      "Geolocation API",
      "Notification API",
      "Clipboard API",
      "Web Audio API"
    ]
  },

  "11_dom_events_and_workers": {
    "dom": [
      "DOM vs BOM",
      "DOM Tree Structure",
      "Node Types",
      "Live vs Static NodeLists",
      "getElementById()",
      "querySelector()",
      "querySelectorAll()",
      "createElement()",
      "appendChild()",
      "removeChild()",
      "replaceChild()",
      "innerHTML vs textContent",
      "classList API",
      "setAttribute()",
      "getAttribute()"
    ],
    "events": [
      "Event Listeners",
      "Event Object",
      "Event Bubbling",
      "Event Capturing",
      "Event Propagation",
      "stopPropagation()",
      "stopImmediatePropagation()",
      "preventDefault()",
      "Event Delegation",
      "Custom Events",
      "Event Throttling",
      "Event Debouncing"
    ],
    "workers": [
      "Web Workers Basics",
      "Dedicated Workers",
      "Shared Workers",
      "Service Workers",
      "Message Passing",
      "Worker Scope"
    ]
  },

  "12_advanced_language_and_architecture": {
    "iterators_generators": [
      "Iterator Protocol",
      "Iterable Protocol",
      "Generator Functions",
      "yield and next()",
      "Async Iterators"
    ],
    "proxies_and_reflection": [
      "Proxy Object Fundamentals",
      "Handler and Traps",
      "Reflect API Usage",
      "Data Validation with Proxies",
      "Observables Pattern"
    ],
    "modules": [
      "ES Modules",
      "CommonJS vs ES Modules",
      "Circular Dependencies",
      "Dynamic Imports",
      "Module Loading execution order"
    ],
    "collections": [
      "Map vs Object",
      "Set vs Array",
      "WeakMap Use Cases",
      "WeakSet Use Cases",
      "Garbage Collection in WeakRefs"
    ]
  },

  "13_design_performance_and_tooling": {
    "design_patterns": [
      "Singleton Pattern",
      "Factory Pattern",
      "Builder Pattern",
      "Module Pattern",
      "Proxy Pattern",
      "Decorator Pattern",
      "Observer Pattern",
      "Strategy Pattern",
      "Command Pattern"
    ],
    "performance_optimization": [
      "Debouncing Implementation",
      "Throttling Implementation",
      "Lazy Loading",
      "Code Splitting",
      "Tree Shaking"
    ],
    "tooling": [
      "npm",
      "yarn",
      "pnpm",
      "package.json Configuration",
      "Webpack",
      "Babel",
      "ESLint",
      "Prettier",
      "Chrome DevTools Profiler",
      "Memory Snapshots",
      "Performance API",
      "Lighthouse Audits"
    ]
  },

  "14_practice_and_professionalism": {
    "practical_workouts": [
      "FizzBuzz Implementation",
      "Palindrome Checker",
      "Factorial Calculator",
      "Fibonacci Sequence",
      "Deep Object Comparison",
      "Array Flattening",
      "Object Deep Cloning",
      "Array Grouping",
      "Sequential API Calls",
      "Parallel API Calls",
      "Retry Logic Implementation",
      "Timeout Wrapper",
      "Infinite Scroll Implementation",
      "Modal Dialog Component",
      "Form Validation",
      "Dynamic Table Generation"
    ],
    "best_practices": [
      "Code Style Guidelines",
      "Naming Conventions",
      "Commenting Practices",
      "Error Handling Strategy",
      "XSS Prevention",
      "CSRF Protection",
      "Input Validation",
      "Secure Coding Practices",
      "Code Organization",
      "Modular Architecture",
      "Documentation",
      "Version Control Practices"
    ]
  }
};


const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('closure') || 
      lowerName.includes('prototype') || 
      lowerName.includes('async') || 
      lowerName.includes('promise') ||
      lowerName.includes('performance') ||
      lowerName.includes('memory') ||
      lowerName.includes('design pattern')) {
    return 'advanced';
  }
  
  if (lowerName.includes('object') || 
      lowerName.includes('array') || 
      lowerName.includes('function') || 
      lowerName.includes('dom') ||
      lowerName.includes('event')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (JavaScript)
    let topic = await Topic.findOne({ slug: 'javascript' });
    if (!topic) {
      console.log('ℹ️ JavaScript topic not found, creating...');
      topic = await Topic.create({
        name: 'JavaScript',
        slug: 'javascript',
        description: 'The language of the web',
        icon: '💛',
        order: 1,
        isNew: false
      });
    }
    console.log(`📌 Using Topic: ${topic.name}`);

    // 2. Clear existing structure for this topic only
    console.log('🧹 Clearing existing categories and sections...');
    // 2. Clear existing structure for this topic only
    console.log('🧹 Clearing existing categories and sections...');
    // Delete ALL sections for this topic, regardless of category linkage
    await Section.deleteMany({ topicId: topic._id });
    await Category.deleteMany({ topicId: topic._id });

    // 3. Process new structure with AI-powered grouping
    console.log('🏗️ Building new hierarchy with AI categorization...');
    
    // STEP 1: Collect all category metadata
    console.log('📋 Step 1: Collecting category metadata...');
    const categoryMetadata = [];
    let categoryOrder = 1;
    
    for (const [catKey, sectionsObj] of Object.entries(javascriptCurriculum)) {
      // Format Category Name: "01_javascript_foundations" -> "JavaScript Foundations"
      let catName = catKey.replace(/^\d+_/, '').split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Fix potential odd naming like "Javascript Foundations" -> "JavaScript Foundations"
      catName = catName.replace('Javascript', 'JavaScript');
      
      categoryMetadata.push({
        key: catKey,
        name: catName,
        order: categoryOrder++,
        sectionsObj: sectionsObj
      });
    }
    
    // STEP 2: Get AI group assignments for all categories at once
    console.log(`🤖 Step 2: AI categorizing ${categoryMetadata.length} categories...`);
    const groupAssignments = await assignGroupBatch(categoryMetadata, topic.slug);
    
    console.log(`✅ Received ${groupAssignments.size} group assignments`);
    
    // STEP 3: Create categories with AI-assigned groups
    console.log('💾 Step 3: Creating categories and sections...');
    
    //DEBUG: Show what we're looking up
    console.log('\n🔍 DEBUG: Lookup Keys (first 3):');
    categoryMetadata.slice(0, 3).forEach(meta => {
      console.log(`   Looking for KEY: "${meta.key}"`);
      console.log(`   Found: ${groupAssignments.has(meta.key) ? `"${groupAssignments.get(meta.key)}"` : 'NOT FOUND'}`);
    });
    console.log('');
    
    let totalSections = 0;

    for (const meta of categoryMetadata) {
      // Get AI-assigned group using the ORIGINAL KEY (with numbers and underscores)
      // This matches whatthe AI received in the prompt
      const aiGroup = groupAssignments.get(meta.key);
      const finalGroup = aiGroup || `${meta.order <= 5 ? '01' : meta.order <= 15 ? '02' : '03'}. General`;
      
      if (!aiGroup) {
        console.warn(`⚠️  No AI group for "${meta.key}" (${meta.name}), using fallback: ${finalGroup}`);
      }

      const category = await Category.create({
        name: meta.name,
        slug: slugify(meta.name, { lower: true, strict: true }),
        topicId: topic._id,
        group: finalGroup,
        order: meta.order,
        description: `Master ${meta.name}`
      });

      console.log(`  📂 Created Category: ${category.name} [${finalGroup}]`);

      let sectionOrder = 1;

      // Handle both array (simple list) and object (subcategories) structures
      const sectionsToProcess = Array.isArray(meta.sectionsObj) 
        ? { "Core Concepts": meta.sectionsObj } 
        : meta.sectionsObj;

      for (const [secKey, keyPoints] of Object.entries(sectionsToProcess)) {
        // Format Section Title
        let secTitle = secKey.split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Determine difficulty
        const difficulty = categorizeDifficulty(secTitle, meta.name);

        // Generate a description from key points
        const description = `Learn about ${keyPoints.slice(0, 3).join(', ')}...`;

        await Section.create({
          title: secTitle,
          slug: slugify(`${meta.name}-${secTitle}`, { lower: true, strict: true }),
          categoryId: category._id,
          topicId: topic._id,
          order: sectionOrder++,
          description: description,
          content: `## ${secTitle}\n\n${description}\n\n### Key Concepts:\n${keyPoints.map(kp => `- ${kp}`).join('\n')}`,
          difficulty: difficulty,
          estimatedTime: 15 + (keyPoints.length * 2), // Rough estimate
          isNew: false,
          isPro: false
        });
        
        totalSections++;
      }
    }

    console.log(`\n✅ Seeding Complete!`);
    console.log(`   - Categories: ${categoryMetadata.length}`);
    console.log(`   - Sections: ${totalSections}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedHierarchy();
