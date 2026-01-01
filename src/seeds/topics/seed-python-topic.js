import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import PathMap from '../../models/PathMap.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { assignGroup } from '../utils/categoryGrouping.js';

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

  "Advanced_Metaprogramming": {
    "metaclasses": [
      "Metaclass Basics (type)",
      "Custom Metaclasses",
      "__new__ vs __init__",
      "Abstract Base Classes (ABCs)",
      "Metaclass Conflicts"
    ],
    "descriptors": [
      "Descriptor Protocol (__get__, __set__)",
      "Data vs Non-Data Descriptors",
      "Property Decorator Implementation",
      "Lazy Properties"
    ],
    "dynamic_attributes": [
      "__getattr__ vs __getattribute__",
      "__setattr__ and __delattr__",
      "Dynamic Attribute Access",
      "Monkey Patching"
    ]
  },

  "Type_Hinting_And_Static_Analysis": {
    "type_hints_basics": [
      "Variable and Function Annotations",
      "Optional and Union Types",
      "List, Dict, and Set Typing",
      "Type Aliases"
    ],
    "advanced_typing": [
      "Generics (TypeVar)",
      "Callable and Protocol",
      "Literal and Final Types",
      "TypedDict",
      "Overloading Functions"
    ],
    "static_analysis_tools": [
      "MyPy Configuration and Usage",
      "Pylint and Flake8",
      "Runtime Type Checking",
      "Stub Files (.pyi)"
    ]
  },

  "Testing_And_TDD": {
    "unittest_framework": [
      "TestCase Structure",
      "Assertions and Test States",
      "Setup and Teardown",
      "Test Discovery",
      "Skipping Tests and Subtests"
    ],
    "pytest_framework": [
      "Pytest Fixtures and Scopes",
      "Parametrized Tests",
      "Marks and Plugins",
      "Conftest.py Configuration",
      "Testing Exceptions"
    ],
    "mocking_patching": [
      "unittest.mock Basics",
      "Patching Objects and Methods",
      "Mock Side Effects",
      "Spy Objects",
      "Dependency Injection"
    ]
  },

  "Web_Development_Ecosystem": {
    "web_foundations": [
      "WSGI vs ASGI",
      "HTTP Methods and Status Codes",
      "RESTful API Principles",
      "JSON Web Tokens (JWT)",
      "WebSockets Basics"
    ],
    "frameworks_overview": [
      "Django (Batteries Included)",
      "Flask (Microframework)",
      "FastAPI (Modern & Async)",
      "Choosing the Right Framework"
    ],
    "web_security": [
      "SQL Injection Prevention",
      "XSS and CSRF Protection",
      "Secure Password Hashing",
      "Rate Limiting"
    ]
  },

  "Database_Interaction": {
    "sql_databases": [
      "SQLite (Built-in)",
      "PostgreSQL Integration (psycopg2)",
      "Connection Pooling",
      "Parameterized Queries (Security)"
    ],
    "orms": [
      "SQLAlchemy Core vs ORM",
      "Django ORM Basics",
      "Tortoise ORM (Async)",
      "Migration Management (Alembic)"
    ],
    "nosql_databases": [
      "MongoDB with PyMongo",
      "Redis for Caching",
      "Key-Value Stores"
    ]
  },

  "Concurrency_And_Parallelism_Advanced": {
    "asyncio_deep_dive": [
      "Event Loops and Tasks",
      "Async Context Managers",
      "Async Iterators",
      "Synchronization Primitives",
      "Integrating Sync and Async Code"
    ],
    "multiprocessing_advanced": [
      "Shared Memory and Queues",
      "Process Pools",
      "Inter-Process Communication (IPC)",
      "Avoid Global Interpreter Lock (GIL)"
    ]
  },

  "Data_Science_Fundamentals": {
    "numpy_basics": [
      "ndarray Creation and Indexing",
      "Vectorization and Broadcasting",
      "Mathematical Operations",
      "Reshaping and Slicing"
    ],
    "pandas_basics": [
      "Series and DataFrame",
      "Reading/Writing CSV/Excel",
      "Data Cleaning and Filtering",
      "Grouping and Aggregation"
    ],
    "visualization": [
      "Matplotlib Basics",
      "Seaborn for Statistical Plots",
      "Plotting Line, Bar, Scatter Charts"
    ]
  },

  "Networking_And_Sockets": {
    "socket_programming": [
      "TCP vs UDP Sockets",
      "Creating Client and Server",
      "Blocking vs Non-Blocking Sockets",
      "Socket Options"
    ],
    "high_level_networking": [
      "Requests Library (HTTP Client)",
      "Session Objects",
      "Handling Cookies and Headers",
      "Web Scraping (BeautifulSoup)"
    ]
  },

  "Packaging_And_Distribution": {
    "dependency_management": [
      "Pipenv vs Poetry",
      "requirements.txt Best Practices",
      "Virtual Environment Strategies",
      "Dependency Resolution"
    ],
    "packaging_projects": [
      "setup.py and pyproject.toml",
      "Building Source Distributions",
      "Building Wheels",
      "Publishing to PyPI"
    ],
    "executable_creation": [
      "PyInstaller Basics",
      "Freezing Code",
      "Cross-Platform Distribution"
    ]
  },

  "Clean_Code_And_Architecture": {
    "design_patterns": [
      "Singleton and Factory Patterns",
      "Observer and Strategy Patterns",
      "Decorator and Adapter Patterns",
      "Dependency Injection Pattern"
    ],
    "architectural_patterns": [
      "MVC (Model-View-Controller)",
      "Microservices Concepts",
      "Event-Driven Architecture",
      "Hexagonal Architecture Overview"
    ],
    "refactoring_techniques": [
      "Extract Method/Class",
      "Rename Refactoring",
      "Simplifying Conditional Logic",
      "Removing Dead Code"
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
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
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
            const groupName = formatName(mainKey); // Use mainKey as group - maintains study order!
            
            // mainKey = "Python_Basics", mainValue = { "01_language_fundamentals": {...}, ... }
            
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: groupName, // "Python Basics", "Data Types And Structures" // Direct from seed structure!
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



        // --- PathMap Generation ---
        console.log('Generating PathMaps for Experience Levels...');

        const allCategories = await Category.find({ topicId: topic._id });
        const categoriesByGroup = {};
        allCategories.forEach(c => {
            if (!categoriesByGroup[c.group]) categoriesByGroup[c.group] = [];
            categoriesByGroup[c.group].push(c.slug);
        });

        const levels = {
            '0-1_year': [
                'Python Basics', 'Data Types And Structures', 'Control Flow', 'Functions', 'String Operations', 'File Operations', 
                'Useful Modules', 'Essential Problems', 'Development Best Practices'
            ],
            '1-3_years': [
                'Python Basics', 'Data Types And Structures', 'Control Flow', 'Functions', 'String Operations', 'File Operations', 
                'Useful Modules', 'Essential Problems', 'Development Best Practices',
                'Object Oriented Programming', 'Error Handling', 'Advanced Features', 'Practical Skills', 'Testing And TDD', 
                'Web Development Ecosystem', 'Database Interaction'
            ],
            '3-5_years': [
                'Python Basics', 'Data Types And Structures', 'Control Flow', 'Functions', 'String Operations', 'File Operations', 
                'Useful Modules', 'Essential Problems', 'Development Best Practices',
                'Object Oriented Programming', 'Error Handling', 'Advanced Features', 'Practical Skills', 'Testing And TDD', 
                'Web Development Ecosystem', 'Database Interaction',
                'Advanced Metaprogramming', 'Type Hinting And Static Analysis', 'Concurrency And Parallelism Advanced', 
                'Data Science Fundamentals', 'Networking And Sockets', 'Packaging And Distribution', 'Clean Code And Architecture', 'Interview Preparation'
            ]
        };

        for (const [level, groups] of Object.entries(levels)) {
            let visibleSlugs = [];
            groups.forEach(g => {
                const matchGroup = Object.keys(categoriesByGroup).find(k => k.toLowerCase() === g.toLowerCase());
                if (matchGroup && categoriesByGroup[matchGroup]) {
                    visibleSlugs = [...visibleSlugs, ...categoriesByGroup[matchGroup]];
                }
            });

            await PathMap.findOneAndUpdate(
                { topicId: topic._id, experienceLevel: level },
                { 
                    topicId: topic._id,
                    experienceLevel: level,
                    visibleCategorySlugs: visibleSlugs 
                },
                { upsert: true, new: true }
            );
            console.log(`Created PathMap for ${level}: ${visibleSlugs.length} categories`);
        }

        console.log('✅ Python seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedPython();
