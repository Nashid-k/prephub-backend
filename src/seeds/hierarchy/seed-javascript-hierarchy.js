import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import slugify from 'slugify';

dotenv.config();

const javascriptCurriculum = {
  "01_javascript_foundations": {
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
    ],
    "typing_system": [
      "Static vs Dynamic Typing",
      "Type Coercion (Implicit & Explicit)",
      "Boxing and Unboxing",
      "Primitive vs Reference Types",
      "typeof and instanceof"
    ],
    "special_values": [
      "null vs undefined",
      "NaN (Not a Number)",
      "Infinity behavior",
      "Truthy and Falsy Values"
    ]
  },
  "02_variables_scope": {
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
    "call_stack_lifecycle": [
      "Stack Frames",
      "Push and Pop Operations",
      "Stack Overflow",
      "Recursion and Stack",
      "Error Stack Traces"
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
    "strict_mode": [
      "Purpose of 'use strict'",
      "Enabling Strict Mode",
      "Restrictions in Strict Mode",
      "this in Strict Mode",
      "Secure JavaScript"
    ]
  },
  "03_operators_expressions": {
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
    "bitwise_operators": [
      "Bitwise AND (&)",
      "Bitwise OR (|)",
      "Bitwise XOR (^)",
      "Bitwise NOT (~)",
      "Left Shift (<<)",
      "Right Shift (>>)",
      "Zero-fill Right Shift (>>>)"
    ],
    "assignment_operators": [
      "Assignment (=)",
      "Addition Assignment (+=)",
      "Subtraction Assignment (-=)",
      "Multiplication Assignment (*=)",
      "Division Assignment (/=)",
      "Modulus Assignment (%=)"
    ]
  },
  "04_control_flow": {
    "conditional_statements": [
      "if Statement",
      "if-else Statement",
      "if-else if-else Statement",
      "Switch Statement",
      "Ternary Operator",
      "Nested Conditionals"
    ],
    "loops_iteration": [
      "Entry-controlled vs Exit-controlled Loops",
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
  "05_functions": {
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
    ]
  },
  "06_closures": {
    "closure_concepts": [
      "What are Closures",
      "How Closures Work",
      "Lexical Scoping in Closures",
      "Closure Examples"
    ],
    "closure_applications": [
      "Data Privacy (Module Pattern)",
      "Function Factories",
      "Event Handlers with Closures",
      "Currying Implementation"
    ],
    "closure_considerations": [
      "Memory Management with Closures",
      "Potential Memory Leaks",
      "Performance Considerations"
    ]
  },
  "07_arrays": {
    "array_basics": [
      "Array Creation",
      "Array Mutability",
      "Array Length Property",
      "Array Indexing"
    ],
    "array_methods_modification": [
      "push() - Add to end",
      "pop() - Remove from end",
      "shift() - Remove from beginning",
      "unshift() - Add to beginning",
      "splice() - Add/remove elements",
      "slice() - Extract portion"
    ],
    "array_methods_iteration": [
      "forEach() - Iterate elements",
      "map() - Transform elements",
      "filter() - Filter elements",
      "reduce() - Accumulate values",
      "some() - Test any element",
      "every() - Test all elements",
      "find() - Find element",
      "findIndex() - Find index"
    ],
    "array_methods_searching": [
      "indexOf() - Find index",
      "lastIndexOf() - Find last index",
      "includes() - Check inclusion",
      "Array.isArray() - Type check"
    ],
    "array_methods_transformation": [
      "concat() - Merge arrays",
      "join() - Join to string",
      "reverse() - Reverse order",
      "sort() - Sort elements",
      "flat() - Flatten nested",
      "flatMap() - Map and flatten"
    ],
    "array_operations": [
      "Array Destructuring",
      "Spread Operator with Arrays",
      "Multidimensional Arrays",
      "Array.from() and Array.of()"
    ],
    "practical_array_problems": [
      "Remove Duplicates",
      "Find Maximum/Minimum",
      "Find Second Largest",
      "Reverse Array",
      "Array Rotation",
      "Array Intersection/Union",
      "Custom map/filter Implementation",
      "Pattern Problems"
    ]
  },
  "08_objects": {
    "object_basics": [
      "Object Creation (Object Literal, Constructor, Class)",
      "Properties and Methods",
      "Property Access (Dot vs Bracket)",
      "Property Existence Checking"
    ],
    "object_methods": [
      "Object.keys()",
      "Object.values()",
      "Object.entries()",
      "Object.assign()",
      "Object.create()",
      "Object.freeze()",
      "Object.seal()",
      "Object.isFrozen()",
      "Object.isSealed()"
    ],
    "object_operations": [
      "Object Destructuring",
      "Spread Operator with Objects",
      "Property Shorthand",
      "Method Shorthand",
      "Computed Property Names"
    ],
    "object_immutability": [
      "Shallow Copy vs Deep Copy",
      "Object Immutability Patterns",
      "Structured Clone API",
      "JSON.parse(JSON.stringify()) Limitations"
    ],
    "object_iteration": [
      "for...in Loop",
      "Object.entries() with for...of",
      "Object.keys() with forEach()"
    ]
  },
  "09_object_oriented_javascript": {
    "oop_concepts": [
      "Encapsulation",
      "Abstraction",
      "Polymorphism",
      "Inheritance"
    ],
    "constructor_functions": [
      "Constructor Pattern",
      "new Keyword",
      "Instance Properties",
      "Prototype Property"
    ],
    "classes": [
      "Class Declaration",
      "Class Expression",
      "Constructor Method",
      "Instance Methods",
      "Static Methods",
      "Getters and Setters",
      "Class Inheritance (extends)",
      "super Keyword"
    ],
    "factory_functions": [
      "Factory Function Pattern",
      "Benefits of Factory Functions"
    ]
  },
  "10_prototypes_inheritance": {
    "prototype_concepts": [
      "Prototype Object",
      "__proto__ vs prototype",
      "Constructor Functions",
      "Prototype-based Inheritance"
    ],
    "prototype_chain": [
      "The Prototype Chain Mechanism",
      "Property Shadowing on Chain",
      "End of Prototype Chain (null)",
      "Performance and Lookup Time",
      "Modifying Built-in Prototypes (Polyfills)"
    ],
    "prototype_methods": [
      "Object.getPrototypeOf()",
      "Object.setPrototypeOf()",
      "Object.hasOwnProperty()",
      "instanceof Operator",
      "Object.create()"
    ],
    "inheritance_patterns": [
      "Constructor Inheritance",
      "Class Inheritance",
      "Mixin Pattern",
      "Composition over Inheritance",
      "Prototypal Inheritance vs Classical"
    ]
  },
  "11_this_context": {
    "this_binding": [
      "this in Global Context",
      "this in Function Context",
      "this in Object Method",
      "this in Constructor",
      "this in Arrow Functions",
      "this in Event Handlers"
    ],
    "explicit_binding": [
      "call() Method",
      "apply() Method",
      "bind() Method",
      "Function Borrowing"
    ],
    "this_patterns": [
      "Self Pattern (that = this)",
      "Arrow Function Pattern",
      "bind() in Event Handlers"
    ]
  },
  "12_asynchronous_javascript": {
    "async_concepts": [
      "Synchronous vs Asynchronous",
      "Single-threaded Nature",
      "Blocking vs Non-blocking Operations",
      "Concurrency Model"
    ],
    "event_loop_mechanics": [
      "Call Stack vs Callback Queue",
      "Microtasks vs Macrotasks",
      "Render Cycle and Event Loop",
      "Event Loop Visualization",
      "Starvation handling"
    ],
    "job_queues": [
      "Promise Jobs (Microtasks)",
      "Script Jobs (Macrotasks)",
      "Queue Priority Order",
      "nextTick (Node.js)"
    ],
    "timers": [
      "setTimeout()",
      "setInterval()",
      "clearTimeout()",
      "clearInterval()",
      "Zero-delay setTimeout",
      "requestAnimationFrame"
    ]
  },
  "13_promises": {
    "promise_concepts": [
      "Promise States (Pending, Fulfilled, Rejected)",
      "Promise Creation",
      "Promise Chaining",
      "Error Handling in Promises"
    ],
    "promise_methods": [
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
    ]
  },
  "14_callbacks": {
    "callback_patterns": [
      "Callback Functions",
      "Error-first Callbacks (Node.js Pattern)",
      "Callback Hell (Pyramid of Doom)"
    ],
    "callback_conversion": [
      "Converting Callbacks to Promises",
      "Promisify Utility",
      "Async/Await with Callbacks"
    ]
  },
  "15_error_handling": {
    "error_types": [
      "Error Object",
      "SyntaxError",
      "ReferenceError",
      "TypeError",
      "RangeError",
      "URIError",
      "EvalError"
    ],
    "error_handling_syntax": [
      "try-catch Block",
      "try-catch-finally Block",
      "throw Statement",
      "Custom Error Classes"
    ],
    "async_error_handling": [
      "Error Handling in Promises",
      "Error Handling with async/await",
      "Global Error Handlers"
    ]
  },
  "16_browser_apis": {
    "fetch_api": [
      "Fetch API Basics",
      "GET, POST, PUT, DELETE Requests",
      "Request Headers",
      "Response Handling",
      "Error Handling with Fetch"
    ],
    "web_storage": [
      "localStorage",
      "sessionStorage",
      "Storage Methods (setItem, getItem, removeItem, clear)",
      "Storage Events"
    ],
    "other_apis": [
      "Geolocation API",
      "Notification API",
      "Clipboard API",
      "Web Audio API"
    ]
  },
  "17_dom_manipulation": {
    "dom_concepts": [
      "DOM vs BOM",
      "DOM Tree Structure",
      "Node Types (Element, Text, Comment)",
      "Live vs Static NodeLists"
    ],
    "shadow_dom": [
      "What is Shadow DOM",
      "Shadow Root and Shadow Host",
      "Encapsulation and Styling",
      "Slots and Templates",
      "Open vs Closed Mode"
    ],
    "virtual_dom_concepts": [
      "Concept of Virtual DOM",
      "Reconciliation Process",
      "Diffing Algorithm Basics",
      "Real DOM vs Virtual DOM Performance"
    ],
    "dom_selection": [
      "getElementById()",
      "querySelector() / querySelectorAll()",
      "Closest() method",
      "matches() method"
    ],
    "dom_manipulation": [
      "createElement()",
      "appendChild()",
      "removeChild()",
      "replaceChild()",
      "innerHTML vs textContent",
      "classList API",
      "setAttribute() / getAttribute()"
    ],
    "dom_traversal": [
      "parentNode / parentElement",
      "children vs childNodes",
      "firstElementChild / lastElementChild",
      "nextElementSibling / previousElementSibling"
    ]
  },
  "18_events": {
    "event_concepts": [
      "Event Listeners",
      "Event Object",
      "Event Types (click, submit, keydown, etc.)"
    ],
    "event_flow": [
      "Event Bubbling",
      "Event Capturing",
      "Event Propagation",
      "stopPropagation()",
      "stopImmediatePropagation()",
      "preventDefault()"
    ],
    "event_patterns": [
      "Event Delegation",
      "Custom Events",
      "Event Throttling",
      "Event Debouncing"
    ]
  },
  "19_advanced_concepts": {
    "generators_iterators": [
      "Iterator Protocol",
      "Iterable Protocol",
      "Generator Functions (function*)",
      "yield and next()",
      "Async Iterators"
    ],
    "proxies_reflection": [
      "Proxy Object Fundamentals",
      "Handler and Traps (get, set, apply)",
      "Reflect API Usage",
      "Data Validation with Proxies",
      "Observables Pattern"
    ],
    "modules": [
      "ES Modules (import/export)",
      "CommonJS vs ES Modules",
      "Circular Dependencies",
      "Dynamic Imports (import())",
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
  "20_web_workers": {
     "core_concepts": [
      "Web Workers Basics",
      "Dedicated Workers",
      "Shared Workers",
      "Service Workers",
      "Message Passing",
      "Worker Scope"
    ]
  },
  "21_memory_management": {
    "garbage_collection": [
      "Garbage Collection in JavaScript",
      "Reference Counting",
      "Mark-and-Sweep Algorithm",
      "Memory Leaks Detection"
    ],
    "memory_patterns": [
      "Common Memory Leaks",
      "Circular References",
      "Detached DOM Elements",
      "Closures and Memory"
    ]
  },
  "22_design_patterns": {
    "creational_patterns": [
      "Singleton Pattern",
      "Factory Pattern",
      "Builder Pattern"
    ],
    "structural_patterns": [
      "Module Pattern",
      "Proxy Pattern",
      "Decorator Pattern"
    ],
    "behavioral_patterns": [
      "Observer Pattern",
      "Strategy Pattern",
      "Command Pattern"
    ]
  },
  "23_performance_optimization": {
    "optimization_techniques": [
      "Debouncing Implementation",
      "Throttling Implementation",
      "Lazy Loading",
      "Code Splitting",
      "Tree Shaking"
    ],
    "performance_tools": [
      "Chrome DevTools Profiler",
      "Memory Snapshots",
      "Performance API",
      "Lighthouse Audits"
    ]
  },
  "24_tooling_ecosystem": {
    "package_management": [
      "npm",
      "yarn",
      "pnpm",
      "package.json Configuration"
    ],
    "build_tools": [
      "Webpack",
      "Babel",
      "ESLint",
      "Prettier"
    ],
    "testing": [
      "Unit Testing (Jest, Mocha)",
      "Integration Testing",
      "End-to-End Testing (Cypress, Playwright)"
    ]
  },
  "25_practical_workouts": {
    "basic_problems": [
      "FizzBuzz Implementation",
      "Palindrome Checker",
      "Factorial Calculator",
      "Fibonacci Sequence"
    ],
    "array_object_problems": [
      "Deep Object Comparison",
      "Array Flattening",
      "Object Deep Cloning",
      "Array Grouping"
    ],
    "async_problems": [
      "Sequential API Calls",
      "Parallel API Calls",
      "Retry Logic Implementation",
      "Timeout Wrapper"
    ],
    "dom_problems": [
      "Infinite Scroll Implementation",
      "Modal Dialog Component",
      "Form Validation",
      "Dynamic Table Generation"
    ],
    "algorithm_problems": [
      "Sorting Algorithms",
      "Searching Algorithms",
      "String Manipulation",
      "Data Structure Implementation"
    ]
  },
  "26_best_practices": {
    "coding_standards": [
      "Code Style Guidelines",
      "Naming Conventions",
      "Commenting Practices",
      "Error Handling Strategy"
    ],
    "security_practices": [
      "XSS Prevention",
      "CSRF Protection",
      "Input Validation",
      "Secure Coding Practices"
    ],
    "maintenance": [
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

    // 3. Process new structure
    console.log('🏗️ Building new hierarchy...');
    
    let categoryOrder = 1;
    let totalSections = 0;

    for (const [catKey, sectionsObj] of Object.entries(javascriptCurriculum)) {
      // Format Category Name: "01_javascript_foundations" -> "JavaScript Foundations"
      let catName = catKey.replace(/^\d+_/, '').split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Fix potential odd naming like "Javascript Foundations" -> "JavaScript Foundations"
      catName = catName.replace('Javascript', 'JavaScript');

      const category = await Category.create({
        name: catName,
        slug: slugify(catName, { lower: true, strict: true }),
        topicId: topic._id,
        order: categoryOrder++,
        description: `Master ${catName}`
      });

      console.log(`  📂 Created Category: ${category.name}`);

      let sectionOrder = 1;

      // Handle both array (simple list) and object (subcategories) structures
      // Note: User's JSON mostly has objects, but "20_web_workers" was an array in original input 
      // I converted it to an object above to be consistent, but let's handle both just in case.
      const sectionsToProcess = Array.isArray(sectionsObj) 
        ? { "Core Concepts": sectionsObj } 
        : sectionsObj;

      for (const [secKey, keyPoints] of Object.entries(sectionsToProcess)) {
        // Format Section Title
        let secTitle = secKey.split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Determine difficulty
        const difficulty = categorizeDifficulty(secTitle, catName);

        // Generate a description from key points
        const description = `Learn about ${keyPoints.slice(0, 3).join(', ')}...`;

        await Section.create({
          title: secTitle,
          slug: slugify(`${catName}-${secTitle}`, { lower: true, strict: true }),
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
    console.log(`   - Categories: ${categoryOrder - 1}`);
    console.log(`   - Sections: ${totalSections}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedHierarchy();
