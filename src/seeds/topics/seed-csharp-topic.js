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

const csharpData = {
  "C#_Fundamentals": {
    "01_introduction": {
      "core_concepts": [
        "C# - Modern Object-Oriented Language",
        ".NET Ecosystem (.NET Framework, .NET Core, .NET 5+)",
        "C# vs Java Comparison",
        "Common Application Types (Web, Desktop, Mobile)"
      ],
      "development_environment": [
        "Visual Studio Installation",
        "Visual Studio Code Setup",
        ".NET SDK Installation",
        "First Console Application"
      ]
    },

    "02_basic_syntax": {
      "data_types": [
        "Value Types (int, double, bool, char)",
        "Reference Types (string, object, arrays)",
        "Nullable Types (int?, string?)",
        "Type Inference (var keyword)"
      ],
      "variables_constants": [
        "Variable Declaration and Initialization",
        "Constants (const)",
        "Readonly Fields",
        "Scope and Lifetime"
      ]
    }
  },

  "Operators_Control_Flow": {
    "operators": [
      "Arithmetic Operators",
      "Comparison Operators",
      "Logical Operators",
      "Null-coalescing Operator (??)",
      "Null-conditional Operator (?.)",
      "Ternary Operator"
    ],

    "control_flow": {
      "conditionals": [
        "if-else Statements",
        "switch Statement",
        "Pattern Matching (C# 8+)",
        "Switch Expressions"
      ],
      "loops": [
        "for Loop",
        "foreach Loop",
        "while Loop",
        "do-while Loop",
        "Loop Control (break, continue)"
      ]
    }
  },

  "Arrays_Collections": {
    "arrays": [
      "Single-dimensional Arrays",
      "Multi-dimensional Arrays",
      "Jagged Arrays",
      "Array Methods and Properties"
    ],

    "collections": {
      "generic_collections": [
        "List<T> (Dynamic Arrays)",
        "Dictionary<TKey, TValue> (Key-Value Pairs)",
        "HashSet<T> (Unique Elements)",
        "Queue<T> and Stack<T>"
      ],
      "collection_operations": [
        "Adding and Removing Elements",
        "Iterating Collections",
        "Collection Initializers",
        "LINQ with Collections"
      ]
    }
  },

  "Object_Oriented_Programming": {
    "01_classes_objects": [
      "Class Definition",
      "Object Creation (new keyword)",
      "Constructors (Default, Parameterized)",
      "Access Modifiers (public, private, protected, internal)"
    ],

    "02_properties_methods": {
      "properties": [
        "Auto-implemented Properties",
        "Properties with Logic",
        "Read-only Properties",
        "Property Initializers"
      ],
      "methods": [
        "Method Declaration",
        "Parameters (value, ref, out, params)",
        "Method Overloading",
        "Extension Methods"
      ]
    },

    "03_inheritance_polymorphism": [
      "Inheritance (base class, derived class)",
      "Method Overriding (virtual, override)",
      "Abstract Classes and Methods",
      "Sealed Classes and Methods"
    ],

    "04_static_members": [
      "Static Classes",
      "Static Methods and Fields",
      "Static Constructors",
      "Singleton Pattern"
    ],

    "05_interfaces": [
      "Interface Definition and Implementation",
      "Explicit Interface Implementation",
      "Default Interface Methods (C# 8+)",
      "Common Interfaces (IEnumerable, IDisposable)"
    ]
  },

  "Exception_Handling": {
    "exception_basics": [
      "try-catch-finally Blocks",
      "Exception Hierarchy",
      "Common Exception Types",
      "Multiple Catch Blocks"
    ],

    "exception_operations": [
      "throw Statement",
      "Custom Exception Classes",
      "Exception Filtering",
      "Resource Management (using statement)"
    ]
  },

  "Delegates_Events_Lambdas": {
    "delegates": [
      "Delegate Declaration",
      "Func and Action Delegates",
      "Multicast Delegates",
      "Delegate Usage Patterns"
    ],

    "events": [
      "Event Declaration (event keyword)",
      "EventHandler Pattern",
      "Publisher-Subscriber Model",
      "Custom EventArgs"
    ],

    "lambda_expressions": [
      "Lambda Syntax",
      "Anonymous Methods",
      "Expression-bodied Members",
      "Lambda Best Practices"
    ]
  },

  "Generics": {
    "generics_basics": [
      "Generic Classes",
      "Generic Methods",
      "Type Constraints (where T)",
      "Generic Collections"
    ],

    "advanced_generics": [
      "Covariance and Contravariance (in, out)",
      "Generic Interfaces",
      "Default Values for Generic Types",
      "Generic Delegates"
    ]
  },

  "LINQ": {
    "01_linq_basics": [
      "What is LINQ (Language Integrated Query)",
      "Query Syntax vs Method Syntax",
      "Deferred vs Immediate Execution",
      "LINQ Providers"
    ],

    "02_linq_operations": [
      "Filtering (Where)",
      "Projection (Select, SelectMany)",
      "Ordering (OrderBy, ThenBy)",
      "Grouping (GroupBy)",
      "Aggregation (Sum, Average, Count)"
    ],

    "03_advanced_linq": [
      "Joins (Join, GroupJoin)",
      "Set Operations (Union, Intersect, Except)",
      "Element Operations (First, Last, Single)",
      "Quantifiers (Any, All)"
    ]
  },

  "Asynchronous_Programming": {
    "01_async_await": [
      "async and await Keywords",
      "Task and Task<T>",
      "Async Method Patterns",
      "Exception Handling in Async Methods"
    ],

    "02_task_operations": [
      "Task Creation",
      "Task Continuation (ContinueWith)",
      "Task Cancellation (CancellationToken)",
      "Task.WhenAll, Task.WhenAny"
    ],

    "03_async_patterns": [
      "Async Streams (IAsyncEnumerable)",
      "ValueTask for Performance",
      "Async Main Method",
      "ConfigureAwait(false) Usage"
    ]
  },

  "Memory_Management": [
    "Garbage Collection Basics",
    "IDisposable Interface",
    "using Statement for Resource Management",
    "Memory Leak Prevention",
    "Weak References"
  ],

  "File_IO_Serialization": {
    "file_operations": [
      "File Class (Static Methods)",
      "FileInfo Class (Instance Methods)",
      "Directory Operations",
      "Stream Reading and Writing"
    ],

    "serialization": [
      "JSON Serialization (System.Text.Json)",
      "XML Serialization",
      "Binary Serialization",
      "Custom Serialization"
    ]
  },

  "Multithreading": {
    "01_thread_basics": [
      "Thread Class",
      "ThreadPool Usage",
      "Background vs Foreground Threads",
      "Thread Synchronization Basics"
    ],

    "02_synchronization": [
      "lock Statement",
      "Monitor Class",
      "Mutex and Semaphore",
      "ReaderWriterLockSlim"
    ],

    "03_concurrent_collections": [
      "ConcurrentDictionary",
      "ConcurrentQueue and ConcurrentStack",
      "BlockingCollection",
      "Thread-Safe Collections Usage"
    ]
  },

  "Modern_C#_Features": {
    "csharp_8_plus": [
      "Nullable Reference Types",
      "Pattern Matching Enhancements",
      "Ranges and Indices (.., ^)",
      "Default Interface Methods",
      "Async Streams"
    ],

    "csharp_9_plus": [
      "Records (Immutable Data Types)",
      "Init-only Setters",
      "Top-level Statements",
      "Pattern Matching Improvements"
    ],

    "csharp_10_plus": [
      "Record Structs",
      "Global Using Directives",
      "File-scoped Namespaces",
      "Extended Property Patterns"
    ]
  },

  "Reflection_Attributes": [
    "Type Class for Reflection",
    "Getting Type Information",
    "Custom Attributes",
    "Reading Attributes at Runtime",
    "Dynamic Type Creation"
  ],

  "Dependency_Injection": {
    "di_basics": [
      "Dependency Injection Principles",
      "Service Registration",
      "Service Lifetimes (Singleton, Scoped, Transient)",
      "Constructor Injection"
    ],

    "advanced_di": [
      "Factory Pattern with DI",
      "Options Pattern",
      "Service Provider Patterns",
      "DI Container Best Practices"
    ]
  },

  "Entity_Framework_Core": {
    "01_ef_basics": [
      "DbContext Configuration",
      "DbSet for Entity Collections",
      "Entity Configuration",
      "Migrations"
    ],

    "02_data_operations": [
      "CRUD Operations",
      "LINQ Queries with EF",
      "Change Tracking",
      "Eager vs Lazy Loading"
    ],

    "03_ef_patterns": [
      "Repository Pattern",
      "Unit of Work Pattern",
      "Code First Approach",
      "Database Relationships"
    ]
  },

  "ASP.NET_Core": {
    "01_web_api": [
      "Controller Classes",
      "Action Methods",
      "Routing Configuration",
      "Model Binding",
      "Middleware Pipeline"
    ],

    "02_authentication": [
      "JWT Authentication",
      "Identity Framework",
      "Authorization Policies",
      "Role-based Access Control"
    ],

    "03_web_development": [
      "Razor Pages",
      "Model-View-Controller Pattern",
      "Tag Helpers",
      "View Components"
    ]
  },

  "Testing": {
    "unit_testing": [
      "xUnit Test Framework",
      "Test Structure (Arrange-Act-Assert)",
      "Mocking with Moq",
      "Test Driven Development Basics"
    ],

    "integration_testing": [
      "Integration Test Setup",
      "Test Databases",
      "API Testing",
      "End-to-End Testing"
    ]
  },

  "Design_Patterns": {
    "common_patterns": [
      "Singleton Pattern",
      "Factory Pattern",
      "Repository Pattern",
      "Strategy Pattern",
      "Observer Pattern"
    ],

    "pattern_implementation": [
      "Pattern Selection Guidelines",
      "C# Specific Implementations",
      "Modern C# Features with Patterns"
    ]
  },

  "Best_Practices": {
    "01_code_quality": [
      "Naming Conventions",
      "Code Formatting",
      "XML Documentation Comments",
      "SOLID Principles Introduction"
    ],

    "02_performance": [
      "String Operations Best Practices",
      "Collection Selection Guidelines",
      "Memory Management Tips",
      "Async Performance Considerations"
    ],

    "03_security": [
      "Input Validation",
      "SQL Injection Prevention",
      "Authentication Best Practices",
      "Secure Coding Guidelines"
    ]
  },

  "Essential_Projects": {
    "learning_projects": [
      "Console Application (Task Manager, File Processor)",
      "REST API (Todo API, Product Catalog)",
      "Desktop Application (WPF/WinForms)",
      "Web Application (ASP.NET Core MVC)"
    ],

    "must_implement_features": [
      "CRUD Operations with Database",
      "Authentication and Authorization",
      "File Upload and Processing",
      "API Integration",
      "Async Operations"
    ]
  },

  "Development_Tools": {
    "ides": [
      "Visual Studio Features",
      "Visual Studio Code Extensions",
      "Debugging Tools",
      "Performance Profilers"
    ],

    "command_line": [
      "dotnet CLI Commands",
      "Package Management (NuGet)",
      "Build and Deployment",
      "Testing Commands"
    ]
  },

  "Interview_Preparation": {
    "core_concepts": [
      "OOP Principles in C#",
      "Memory Management",
      "Async Programming",
      "LINQ Queries",
      "Exception Handling"
    ],

    "practical_skills": [
      "Implement Data Access Layer",
      "Build REST API",
      "Handle Concurrent Operations",
      "Optimize C# Code",
      "Debug Common Issues"
    ],

    "common_problems": [
      "String Manipulation Problems",
      "Collection Processing",
      "Algorithm Implementation",
      "Design Pattern Application",
      "Database Operations"
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

const seedCSharp = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'csharp' });
        if (!topic) {
            console.log('Creating C# topic...');
            topic = await Topic.create({
                name: 'C#',
                slug: 'csharp',
                description: 'Master modern .NET development with C#',
                icon: '#️⃣',
                order: 12,
                color: '#239120'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing C# data');
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
        for (const [mainKey, mainValue] of Object.entries(csharpData)) {
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
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Entity Framework') || categoryName.includes('ASP.NET') ? 'advanced' : 
                               categoryName.includes('Introduction') || categoryName.includes('Fundamentals') || categoryName.includes('Basic') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ C# seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedCSharp();
