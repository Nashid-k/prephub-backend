import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const javascriptData = {
  "JavaScript_Fundamentals": {
    "01_introduction": {
      "core_concepts": [
        "What is JavaScript - Dynamic, Single-threaded Language",
        "JavaScript Runtime Environment",
        "Client-side vs Server-side JavaScript",
        "ECMAScript and Version History"
      ]
    },

    "02_data_types": {
      "primitive_types": [
        "Number (int, float)",
        "String (immutable)",
        "Boolean (true/false)",
        "Undefined",
        "Null",
        "Symbol (ES6)",
        "BigInt (ES2020)"
      ],
      "non_primitive": [
        "Object (mutable)",
        "Array (special object)",
        "Function (callable object)",
        "Date, RegExp"
      ],
      "type_operations": [
        "typeof Operator",
        "instanceof Operator",
        "Type Conversion (Explicit)",
        "Type Coercion (Implicit)",
        "== vs === (Loose vs Strict Equality)",
        "Truthy and Falsy Values"
      ]
    },

    "03_variables_scopes": {
      "declaration": [
        "var (Function-scoped, Hoisted)",
        "let (Block-scoped, TDZ)",
        "const (Block-scoped, Immutable Binding)"
      ],
      "scope_types": [
        "Global Scope",
        "Function Scope",
        "Block Scope (ES6)",
        "Lexical Scope/Environment"
      ],
      "scope_concepts": [
        "Hoisting (Variables and Functions)",
        "Temporal Dead Zone (TDZ)",
        "Variable Shadowing",
        "Illegal Shadowing",
        "Scope Chain"
      ]
    }
  },

  "Functions": {
    "01_function_basics": [
      "Function Declaration (Hoisted)",
      "Function Expression",
      "Arrow Functions (ES6)",
      "Anonymous Functions",
      "IIFE (Immediately Invoked Function Expression)"
    ],

    "02_function_types": [
      "Named Functions",
      "First-class Functions",
      "Higher-order Functions",
      "Pure Functions (No Side Effects)",
      "Callback Functions"
    ],

    "03_function_features": [
      "Parameters (Default, Rest)",
      "Return Statement",
      "Function Scope",
      "Closures",
      "Currying (Partial Application)"
    ],

    "04_advanced_concepts": [
      "Function Composition",
      "Memoization (Caching)",
      "Generator Functions (function*)",
      "Async Functions (async/await)"
    ]
  },

  "Objects": {
    "01_object_basics": [
      "Object Literal Syntax",
      "Property Access (Dot vs Bracket)",
      "Methods (Functions as Properties)",
      "this Keyword Context"
    ],

    "02_object_operations": [
      "Adding/Removing Properties",
      "Object.keys(), .values(), .entries()",
      "Object.assign() (Shallow Copy)",
      "Object.freeze() vs Object.seal()"
    ],

    "03_object_patterns": [
      "Factory Functions",
      "Constructor Functions (new keyword)",
      "Prototypal Inheritance",
      "Object.create()"
    ],

    "04_advanced_objects": [
      "Getters and Setters",
      "Property Descriptors",
      "Proxy Objects (ES6)",
      "Reflect API (ES6)"
    ]
  },

  "Arrays": {
    "01_array_basics": [
      "Array Creation and Initialization",
      "Indexing and Length",
      "Basic Operations (push, pop, shift, unshift)",
      "Array.isArray()"
    ],

    "02_array_iteration": [
      "for Loop",
      "forEach() Method",
      "for...of Loop (ES6)",
      "for...in Loop (for objects)"
    ],

    "03_array_methods": {
      "transformation": [
        "map() - Transform each element",
        "filter() - Select elements",
        "reduce() - Accumulate values",
        "flat() and flatMap() (ES2019)"
      ],
      "searching": [
        "find() and findIndex()",
        "some() and every()",
        "includes() (ES7)",
        "indexOf() and lastIndexOf()"
      ],
      "manipulation": [
        "slice() - Copy portion",
        "splice() - Modify array",
        "concat() - Merge arrays",
        "sort() and reverse()"
      ]
    }
  },

  "Asynchronous_JavaScript": {
    "01_callbacks": [
      "Callback Pattern",
      "Error-first Callbacks",
      "Callback Hell (Pyramid of Doom)",
      "Event Listeners as Callbacks"
    ],

    "02_promises": {
      "promise_basics": [
        "Promise States (Pending, Fulfilled, Rejected)",
        "Creating Promises (new Promise())",
        ".then() and .catch()",
        "Promise Chaining"
      ],
      "promise_methods": [
        "Promise.all() - All succeed",
        "Promise.allSettled() - All complete",
        "Promise.race() - First to settle",
        "Promise.any() - First to fulfill"
      ]
    },

    "03_async_await": [
      "async Function Declaration",
      "await Keyword",
      "Error Handling (try/catch)",
      "Parallel Execution with Promise.all()"
    ],

    "04_timers_events": [
      "setTimeout() and clearTimeout()",
      "setInterval() and clearInterval()",
      "setImmediate() (Node.js)",
      "process.nextTick() (Node.js)"
    ]
  },

  "OOP_Prototypes": {
    "01_prototype_basics": [
      "Prototype Chain",
      "__proto__ Property",
      "prototype Property (Functions)",
      "Object.getPrototypeOf()"
    ],

    "02_inheritance": [
      "Constructor Inheritance",
      "Class Syntax (ES6)",
      "extends Keyword",
      "super() Constructor"
    ],

    "03_oop_concepts": [
      "Encapsulation",
      "Abstraction",
      "Inheritance",
      "Polymorphism"
    ],

    "04_classes": [
      "Class Declaration",
      "Constructor Method",
      "Instance Methods",
      "Static Methods",
      "Getters and Setters in Classes"
    ]
  },

  "DOM_Manipulation": {
    "01_dom_basics": [
      "Document Object Model (DOM) Tree",
      "Window and Document Objects",
      "Selecting Elements (getElementById, querySelector)",
      "Traversing DOM (parent, children, siblings)"
    ],

    "02_dom_operations": [
      "Creating Elements (createElement)",
      "Adding/Removing Elements (append, remove)",
      "Modifying Content (innerHTML, textContent)",
      "Changing Styles (style property)"
    ],

    "03_events": {
      "event_handling": [
        "addEventListener()",
        "Event Object Properties",
        "Event Types (click, submit, keydown)"
      ],
      "event_flow": [
        "Event Bubbling",
        "Event Capturing",
        "Event Delegation Pattern",
        "stopPropagation() and preventDefault()"
      ]
    }
  },

  "Browser_APIs": {
    "01_storage": [
      "localStorage (Persistent)",
      "sessionStorage (Session-only)",
      "Cookies (document.cookie)",
      "IndexedDB (Advanced)"
    ],

    "02_web_apis": [
      "Fetch API (Modern)",
      "XMLHttpRequest (Legacy)",
      "Geolocation API",
      "Web Workers (Background threads)"
    ],

    "03_browser_object": [
      "window Object",
      "navigator Object",
      "location Object",
      "history Object"
    ]
  },

  "Modern_JavaScript": {
    "01_es6_features": [
      "let and const",
      "Template Literals (`${}`)",
      "Destructuring (Array and Object)",
      "Spread (...) and Rest (...) Operators",
      "Default Parameters"
    ],

    "02_es7_es8": [
      "Array.includes() (ES7)",
      "Exponentiation Operator (**)",
      "async/await (ES8)",
      "Object.values(), Object.entries()"
    ],

    "03_es9_es10": [
      "Promise.finally() (ES9)",
      "Object Rest/Spread (ES9)",
      "Array.flat() and flatMap() (ES10)",
      "Object.fromEntries() (ES10)"
    ],

    "04_es2020_plus": [
      "Optional Chaining (?.)",
      "Nullish Coalescing (??)",
      "BigInt",
      "Promise.allSettled()"
    ]
  },

  "Error_Handling": {
    "error_types": [
      "SyntaxError",
      "ReferenceError",
      "TypeError",
      "RangeError"
    ],

    "handling_mechanisms": [
      "try...catch...finally",
      "throw Statement",
      "Custom Error Classes",
      "Error Propagation in Promises"
    ]
  },

  "Memory_Management": {
    "memory_basics": [
      "Garbage Collection",
      "Memory Leaks",
      "Circular References",
      "WeakMap and WeakSet"
    ],

    "copy_mechanisms": [
      "Shallow Copy (Spread, Object.assign)",
      "Deep Copy (JSON methods, structuredClone)",
      "Copy Patterns and Pitfalls"
    ]
  },

  "Performance_Patterns": {
    "optimization": [
      "Debouncing (Delay execution)",
      "Throttling (Rate limiting)",
      "Memoization (Caching)",
      "Lazy Loading"
    ],

    "best_practices": [
      "Avoiding Global Variables",
      "Minimizing DOM Manipulation",
      "Event Delegation for Performance",
      "Efficient Loops and Iteration"
    ]
  },

  "Modules": {
    "module_systems": [
      "CommonJS (require/module.exports)",
      "ES6 Modules (import/export)",
      "Named vs Default Exports",
      "Module Bundlers Overview"
    ]
  },

  "Essential_Practical_Skills": {
    "must_know_problems": {
      "array_manipulation": [
        "Remove duplicates from array",
        "Find max/min in array",
        "Flatten nested arrays",
        "Reverse array in-place"
      ],
      "string_manipulation": [
        "Reverse a string",
        "Check palindrome",
        "Count character frequency",
        "Capitalize words in sentence"
      ],
      "object_manipulation": [
        "Check if object is empty",
        "Find key with max value",
        "Merge multiple objects",
        "Deep clone object"
      ],
      "functional_programming": [
        "Sum of array using reduce",
        "Filter even/odd numbers",
        "Map array to new format",
        "Find unique values"
      ]
    },

    "async_problems": [
      "Fetch and display API data",
      "Implement loading states",
      "Handle multiple API calls",
      "Create polling mechanism"
    ],

    "dom_problems": [
      "Create dynamic list",
      "Implement search filter",
      "Build simple form validation",
      "Create modal/popup"
    ]
  },

  "Interview_Preparation": {
    "core_concepts": [
      "Event Loop and Call Stack",
      "Closures and Scope",
      "Prototypal Inheritance",
      "this Binding Rules",
      "Promise Execution Order",
      "Hoisting and TDZ"
    ],

    "common_questions": [
      "Difference: var, let, const",
      "map vs forEach vs filter",
      "Shallow vs Deep Copy",
      "Callback vs Promise vs async/await",
      "Event Bubbling vs Capturing",
      "Object.freeze() vs Object.seal()"
    ],

    "problem_solving": [
      "Implement Array methods (map, filter, reduce)",
      "Debounce and Throttle functions",
      "Deep clone implementation",
      "Promise polyfill",
      "Currying function"
    ]
  },

  "Development_Tools": {
    "debugging": [
      "Console Methods (log, error, warn)",
      "Debugger Statement",
      "Chrome DevTools",
      "Breakpoints and Step-through"
    ],

    "testing": [
      "Console.assert()",
      "Basic Unit Testing Concepts",
      "Debugging Async Code"
    ],

    "code_quality": [
      "Linters (ESLint)",
      "Formatters (Prettier)",
      "Strict Mode ('use strict')",
      "Type Checking (TypeScript basics)"
    ]
  }
};

const formatName = (str) => {
    return str
        .replace(/^\\d+_/, '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedJavaScript = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'javascript' });
        if (!topic) {
            console.log('Creating JavaScript topic...');
            topic = await Topic.create({
                name: 'JavaScript',
                slug: 'javascript',
                description: 'Master the language of the web',
                icon: '🟨',
                order: 1,
                color: '#F7DF1E'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ _id: { $in: categoryIds } });
            console.log('Cleared existing JavaScript data');
        }

        const seenSlugs = new Set();
        const generateUniqueSlug = (title) => {
            let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            let slug = baseSlug;
            let counter = 1;
            while (seenSlugs.has(slug)) {
                counter++;
                slug = `${baseSlug}-${counter}`;
            }
            seenSlugs.add(slug);
            return slug;
        };

        let order = 1;
        for (const [mainKey, mainValue] of Object.entries(javascriptData)) {
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: formatName(mainKey),
                    order: order++
                });

                let sections = [];
                if (Array.isArray(value)) {
                    sections = value;
                } else {
                    for (const [subKey, subItems] of Object.entries(value)) {
                        sections = [...sections, ...subItems];
                    }
                }

                const sectionDocs = sections.map((sectionTitle, index) => ({
                    title: sectionTitle,
                    slug: generateUniqueSlug(sectionTitle),
                    description: `Detailed explanation of ${sectionTitle}`,
                    content: 'Coming soon...',
                    categoryId: category._id,
                    topicId: topic._id,
                    order: index + 1,
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Performance') || categoryName.includes('Memory') ? 'advanced' : 
                               categoryName.includes('Introduction') || categoryName.includes('Fundamentals') || categoryName.includes('Basics') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ JavaScript seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedJavaScript();
