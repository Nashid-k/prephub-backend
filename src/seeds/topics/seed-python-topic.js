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

const pythonData = {
  "Python_Basics": {
    "01_language_fundamentals": {
      "core_concepts": [
        "Python - Interpreted, High-level Language",
        "Dynamic Typing vs Static Typing",
        "Python's Design Philosophy (Zen of Python)",
        "Python 2 vs Python 3 Key Differences"
      ],
      "execution_environment": [
        "Virtual Environments (venv)",
        "PIP Package Management",
        "Requirements.txt and Dependency Management",
        "Python Path and Module Resolution"
      ]
    },

    "02_basic_syntax": {
      "syntax_rules": [
        "Indentation (4 spaces convention)",
        "Comments and Docstrings",
        "Naming Conventions (PEP 8)",
        "Import Statements and Best Practices"
      ],
      "code_organization": [
        "Modules vs Packages",
        "__init__.py Files",
        "Relative vs Absolute Imports",
        "if __name__ == '__main__': Pattern"
      ]
    }
  },

  "Data_Types_And_Structures": {
    "01_basic_types": {
      "primitive_types": [
        "int - Integer Type",
        "float - Floating Point",
        "str - String (Immutable)",
        "bool - Boolean (True/False)",
        "NoneType - Null Value"
      ],
      "type_operations": [
        "Type Checking (type() vs isinstance())",
        "Type Conversion/Casting",
        "Truthy and Falsy Values",
        "Identity vs Equality (is vs ==)"
      ]
    },

    "02_collections": {
      "lists": [
        "List Creation and Basic Operations",
        "List Methods (append, extend, insert, remove, pop)",
        "List Slicing and Indexing",
        "List Comprehension Syntax"
      ],
      "tuples": [
        "Tuple Creation and Immutability",
        "When to Use Tuples vs Lists",
        "Tuple Unpacking",
        "Namedtuples"
      ],
      "dictionaries": [
        "Dictionary Creation and Access",
        "Common Dict Methods (get, keys, values, items)",
        "Dictionary Comprehensions",
        "Handling Missing Keys (setdefault, get)"
      ],
      "sets": [
        "Set Creation and Properties",
        "Set Operations (union, intersection, difference)",
        "Removing Duplicates Using Sets",
        "Frozenset (Immutable Set)"
      ]
    },

    "03_memory_management": [
      "Mutable vs Immutable Objects",
      "Shallow Copy vs Deep Copy",
      "Reference Counting Basics",
      "Memory Optimization Tips"
    ]
  },

  "Control_Flow": {
    "01_conditionals": [
      "if, elif, else Statements",
      "Ternary Conditional Operator",
      "match-case Statement (Python 3.10+)",
      "Boolean Operators (and, or, not)"
    ],

    "02_loops": [
      "for Loops (with range, enumerate)",
      "while Loops",
      "break, continue, pass Statements",
      "for-else and while-else Patterns"
    ],

    "03_comprehensions": [
      "List Comprehensions",
      "Dictionary Comprehensions",
      "Set Comprehensions",
      "Generator Expressions"
    ]
  },

  "Functions": {
    "01_function_basics": [
      "Defining and Calling Functions",
      "Positional and Keyword Arguments",
      "Default Parameter Values",
      "Docstrings and Function Documentation"
    ],

    "02_advanced_functions": [
      "*args and **kwargs",
      "Lambda Functions",
      "Higher-Order Functions (map, filter, reduce)",
      "zip() and enumerate() Functions"
    ],

    "03_functional_programming": [
      "Pure Functions",
      "Closures",
      "Decorators",
      "functools Module Basics"
    ]
  },

  "Object_Oriented_Programming": {
    "01_oop_fundamentals": [
      "Classes and Objects",
      "__init__ Method (Constructor)",
      "self Parameter and Instance Variables",
      "Class Variables vs Instance Variables"
    ],

    "02_encapsulation": [
      "Public, Protected, Private Attributes",
      "Getter and Setter Methods",
      "@property Decorator",
      "Name Mangling"
    ],

    "03_inheritance_polymorphism": [
      "Inheritance Syntax",
      "Method Overriding",
      "super() Function",
      "Multiple Inheritance and MRO"
    ],

    "04_special_methods": [
      "__str__ vs __repr__",
      "Operator Overloading",
      "Context Managers (__enter__, __exit__)",
      "Iterable Objects (__iter__, __next__)"
    ],

    "05_advanced_oop": [
      "Abstract Base Classes (ABC)",
      "Class Methods vs Static Methods",
      "Dataclasses",
      "Singleton Pattern Implementation"
    ]
  },

  "Error_Handling": {
    "exception_handling": [
      "try-except Blocks",
      "Multiple Exception Types",
      "else and finally Clauses",
      "Raising Exceptions (raise)"
    ],

    "custom_exceptions": [
      "Creating Custom Exception Classes",
      "Exception Chaining",
      "Best Practices for Error Handling",
      "Common Built-in Exceptions"
    ]
  },

  "File_Operations": {
    "file_handling": [
      "open() Function and Modes",
      "Reading Files (read, readline, readlines)",
      "Writing Files",
      "Context Managers for Files"
    ],

    "file_formats": [
      "CSV File Handling",
      "JSON Serialization/Deserialization",
      "Pickling Objects",
      "Working with Text Files"
    ]
  },

  "String_Operations": {
    "string_manipulation": [
      "String Methods (split, join, strip, replace)",
      "String Formatting (f-strings, format())",
      "String Slicing and Indexing",
      "Checking String Properties"
    ],

    "string_algorithms": [
      "Palindrome Checking",
      "Anagram Detection",
      "Character Frequency Counting",
      "String Reversal"
    ]
  },

  "Useful_Modules": {
    "standard_library": [
      "os - Operating System Interface",
      "sys - System Parameters",
      "datetime - Date and Time",
      "collections - Specialized Containers",
      "itertools - Iterator Tools",
      "math - Mathematical Functions"
    ],

    "data_processing": [
      "json - JSON Handling",
      "csv - CSV File Operations",
      "re - Regular Expressions",
      "random - Random Number Generation"
    ]
  },

  "Advanced_Features": {
    "generators": [
      "Generator Functions (yield)",
      "Generator Expressions",
      "Lazy Evaluation Benefits",
      "Infinite Sequences"
    ],

    "iterators": [
      "Iterator Protocol",
      "Creating Custom Iterators",
      "Iterators vs Iterables"
    ],

    "context_managers": [
      "with Statement",
      "Creating Custom Context Managers",
      "contextlib Utilities"
    ],

    "concurrency_basics": [
      "GIL (Global Interpreter Lock) Overview",
      "Threading Basics",
      "Multiprocessing Basics",
      "async/await Introduction"
    ]
  },

  "Practical_Skills": {
    "01_common_patterns": {
      "data_processing": [
        "List/Dict Comprehensions for Transformation",
        "Filtering and Mapping Data",
        "Grouping and Aggregating",
        "Data Cleaning Patterns"
      ],
      "code_organization": [
        "Separating Concerns",
        "Function Composition",
        "Configurable Functions",
        "Utility Functions"
      ]
    },

    "02_debugging_testing": [
      "print() Debugging",
      "Using breakpoint()",
      "Basic Unit Testing (unittest/pytest)",
      "Logging Basics"
    ],

    "03_performance": [
      "Time Complexity Awareness",
      "Memory Usage Considerations",
      "Profiling Basics",
      "Common Performance Pitfalls"
    ]
  },

  "Essential_Problems": {
    "must_solve_problems": {
      "string_manipulation": [
        "Reverse a string",
        "Check palindrome",
        "Find first non-repeating character",
        "Count vowel/consonants"
      ],
      "list_operations": [
        "Find second largest element",
        "Remove duplicates",
        "Find common elements between lists",
        "Flatten nested lists"
      ],
      "dictionary_operations": [
        "Count word frequency",
        "Merge dictionaries",
        "Invert dictionary",
        "Sort dictionary by value"
      ],
      "oop_problems": [
        "Bank account class",
        "Student management system",
        "Shopping cart system",
        "Shape hierarchy (circle, rectangle)"
      ],
      "function_problems": [
        "Factorial (recursive/iterative)",
        "Fibonacci sequence",
        "Prime number checker",
        "File word counter"
      ]
    }
  },

  "Development_Best_Practices": {
    "code_quality": [
      "Follow PEP 8 Guidelines",
      "Write Readable Code",
      "Use Meaningful Names",
      "Keep Functions Small and Focused"
    ],
    "maintainability": [
      "Write Documentation and Comments",
      "Use Version Control Effectively",
      "Write Tests",
      "Handle Edge Cases"
    ],
    "project_structure": [
      "Organize Code into Modules",
      "Use Virtual Environments",
      "Manage Dependencies",
      "Configuration Management"
    ]
  },

  "Interview_Preparation": {
    "common_topics": [
      "Mutable vs Immutable Types",
      "List vs Tuple vs Set vs Dict",
      "List Comprehensions and Generator Expressions",
      "Decorators and Their Uses",
      "Context Managers",
      "GIL and Concurrency",
      "Inheritance and Polymorphism",
      "Error Handling Patterns"
    ],
    "practical_exercises": [
      "Implement Common Data Structures",
      "Solve Algorithm Problems in Python",
      "Write Clean, Production-ready Code",
      "Debug and Optimize Existing Code"
    ]
  }
};

// Helper to format strings: "01_language_fundamentals" -> "Language Fundamentals"
const formatName = (str) => {
    return str
        .replace(/^\\d+_/, '') // Remove leading numbers
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedPython = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Create Topic
        let topic = await Topic.findOne({ slug: 'python' });
        if (!topic) {
            console.log('Creating Python topic...');
            topic = await Topic.create({
                name: 'Python',
                slug: 'python',
                description: 'Master Python programming from basics to advanced',
                icon: '🐍',
                order: 3,
                color: '#3776ab'
            });
        }

        // 2. Clear existing data
        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ _id: { $in: categoryIds } });
            console.log('Cleared existing Python data');
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

        // 3. Process Data
        let order = 1;
        for (const [mainKey, mainValue] of Object.entries(pythonData)) {
            // mainKey = "Python_Basics", mainValue = { "01_language_fundamentals": {...}, ... }
            
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: formatName(mainKey), // "Python Basics", "Data Types And Structures"
                    order: order++
                });

                // Handle value being Array (direct sections) or Object (subgroups which we flatten)
                let sections = [];
                if (Array.isArray(value)) {
                    sections = value; // Direct list of strings
                } else {
                    // Flatten values of object into a single list
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
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('OOP') ? 'advanced' : 
                               categoryName.includes('Basic') || categoryName.includes('Syntax') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ Python seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedPython();
