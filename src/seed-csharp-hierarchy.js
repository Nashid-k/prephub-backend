import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';

dotenv.config();

const csharpHierarchy = {
  "Foundations & Basics": {
    "C# Overview": [
      "What is C#?",
      ".NET Framework vs .NET Core vs .NET 5+",
      "C# vs Java vs C++",
      "Features of C#",
      "C# Version History",
      "Common Use Cases"
    ],
    "Environment Setup": [
      "Visual Studio Installation",
      "Visual Studio Code Setup",
      ".NET SDK Installation",
      "Creating First Console Application",
      "Project Structure in .NET"
    ],
    "Basic Syntax": [
      "Hello World Program",
      "Namespace Declaration",
      "Class Structure",
      "Main Method Entry Point",
      "Comments"
    ]
  },
  "Variables & Data Types": {
    "Value Types": [
      "Integral Types (byte, short, int, long)",
      "Floating-point (float, double, decimal)",
      "Character (char)",
      "Boolean (bool)",
      "Struct Types"
    ],
    "Reference Types": [
      "Class Types",
      "Interface Types",
      "Array Types",
      "Delegate Types",
      "Object and String Types"
    ],
    "Variables": [
      "Variable Declaration and Initialization",
      "Implicitly Typed Variables (var)",
      "Constants (const)",
      "Readonly Variables",
      "Scope and Lifetime"
    ],
    "Type Conversion": [
      "Implicit Conversion",
      "Explicit Conversion (Casting)",
      "Convert Class Methods",
      "Parse and TryParse Methods",
      "Boxing and Unboxing"
    ]
  },
  "Operators & Control Flow": {
    "Operators": [
      "Arithmetic Operators",
      "Relational Operators",
      "Logical Operators",
      "Bitwise Operators",
      "Assignment Operators",
      "Conditional Operator (?:)",
      "Null-coalescing Operators (??, ??=)",
      "Null-conditional Operators (?., ?[])"
    ],
    "Conditional Statements": [
      "if Statement",
      "if-else Statement",
      "if-else-if Ladder",
      "switch Statement",
      "switch Expression (C# 8+)",
      "Pattern Matching in switch"
    ],
    "Looping": [
      "for Loop",
      "foreach Loop",
      "while Loop",
      "do-while Loop",
      "Nested Loops"
    ],
    "Jump Statements": [
      "break Statement",
      "continue Statement",
      "goto Statement",
      "return Statement"
    ]
  },
  "Arrays & Collections": {
    "Arrays": [
      "Single-dimensional Arrays",
      "Multi-dimensional Arrays",
      "Jagged Arrays",
      "Array Initialization",
      "Array Properties and Methods"
    ],
    "Generic Collections": [
      "List<T>",
      "Dictionary<TKey, TValue>",
      "HashSet<T>",
      "Queue<T> and Stack<T>",
      "LinkedList<T>",
      "SortedDictionary and SortedSet"
    ],
    "Non-Generic Collections": [
      "ArrayList",
      "Hashtable",
      "Queue and Stack"
    ],
    "Concurrent Collections": [
      "ConcurrentDictionary<TKey, TValue>",
      "ConcurrentQueue<T>",
      "BlockingCollection<T>"
    ],
    "Collection Operations": [
      "Iterating Collections",
      "LINQ with Collections",
      "Collection Initializers"
    ]
  },
  "Object-Oriented Programming": {
    "Classes & Objects": [
      "Class Definition",
      "Object Creation (new keyword)",
      "Constructors",
      "Destructors (Finalizers)",
      "this Keyword",
      "Access Modifiers"
    ],
    "Properties & Indexers": [
      "Auto-implemented Properties",
      "Properties with Backing Fields",
      "Read-only Properties",
      "Indexers"
    ],
    "Methods": [
      "Method Declaration",
      "Parameters (Value, ref, out, params)",
      "Optional and Named Parameters",
      "Method Overloading",
      "Extension Methods"
    ],
    "Inheritance": [
      "Base and Derived Classes",
      "Method Overriding (virtual, override)",
      "Sealed Classes and Methods",
      "Abstract Classes and Methods",
      "base Keyword"
    ],
    "Polymorphism": [
      "Compile-time Polymorphism",
      "Runtime Polymorphism",
      "Interface Polymorphism"
    ],
    "Static Members": [
      "Static Classes",
      "Static Methods and Variables",
      "Static Constructors"
    ]
  },
  "Interfaces": {
    "Interface Basics": [
      "Interface Definition",
      "Implementing Interfaces",
      "Explicit Interface Implementation",
      "Interface Inheritance"
    ],
    "Modern Interfaces": [
      "Default Interface Methods (C# 8+)",
      "Static Members in Interfaces"
    ],
    "Common Interfaces": [
      "IEnumerable, IEnumerator",
      "ICollection, IList",
      "IComparable, IComparer",
      "IDisposable",
      "IEquatable"
    ]
  },
  "Delegates & Events": {
    "Delegates": [
      "Delegate Declaration",
      "Delegate Instantiation",
      "Multicast Delegates",
      "Func, Action, Predicate Delegates"
    ],
    "Events": [
      "Event Declaration",
      "Event Handlers",
      "Publisher-Subscriber Pattern",
      "Custom EventArgs"
    ],
    "Lambda Expressions": [
      "Anonymous Methods",
      "Lambda Expressions",
      "Expression-bodied Members"
    ]
  },
  "Exception Handling": {
    "Exception Basics": [
      "Exception Hierarchy",
      "try-catch Block",
      "Multiple catch Blocks",
      "finally Block",
      "throw Statement"
    ],
    "Exception Types": [
      "System.Exception Base Class",
      "Common Exception Types",
      "Custom Exception Classes"
    ],
    "Best Practices": [
      "Exception Handling Strategies",
      "When to Catch vs Throw",
      "Using Blocks for Resource Management"
    ]
  },
  "Generics": {
    "Generic Basics": [
      "Generic Classes",
      "Generic Methods",
      "Generic Constraints (where T: class, new(), struct)",
      "Covariance and Contravariance (in, out)"
    ],
    "Advanced Generics": [
      "Generic Delegates",
      "Generic Interfaces",
      "Default Keyword with Generics"
    ]
  },
  "LINQ": {
    "LINQ Basics": [
      "What is LINQ?",
      "Query Syntax vs Method Syntax",
      "Deferred Execution",
      "Immediate Execution"
    ],
    "LINQ Providers": [
      "LINQ to Objects",
      "LINQ to SQL",
      "LINQ to XML",
      "Entity Framework (LINQ to Entities)"
    ],
    "LINQ Operators - Filtering": [
      "Where",
      "OfType"
    ],
    "LINQ Operators - Projection": [
      "Select",
      "SelectMany"
    ],
    "LINQ Operators - Ordering": [
      "OrderBy, OrderByDescending",
      "ThenBy, Reverse"
    ],
    "LINQ Operators - Grouping": [
      "GroupBy",
      "ToLookup"
    ],
    "LINQ Operators - Aggregation": [
      "Count, Sum, Min, Max, Average",
      "Aggregate"
    ],
    "LINQ Operators - Set Operations": [
      "Distinct, Union, Intersect, Except"
    ],
    "LINQ Operators - Conversion": [
      "ToArray, ToList, ToDictionary",
      "Cast, AsEnumerable"
    ]
  },
  "Asynchronous Programming": {
    "Async/Await": [
      "async and await Keywords",
      "Task and Task<T>",
      "Async Method Return Types",
      "ConfigureAwait"
    ],
    "Task Parallel Library": [
      "Task Creation",
      "Task Continuation",
      "Task Cancellation (CancellationToken)",
      "Parallel Class",
      "PLINQ (Parallel LINQ)"
    ],
    "Advanced Async": [
      "ValueTask<T>",
      "IAsyncEnumerable (C# 8+)",
      "Async Streams",
      "Async Main Method"
    ]
  },
  "Memory Management": {
    "Garbage Collection": [
      "GC Fundamentals",
      "Generations (Gen 0, 1, 2)",
      "GC.Collect()",
      "Finalizers vs Dispose Pattern"
    ],
    "Memory Patterns": [
      "IDisposable Interface",
      "Using Statement",
      "Memory Leak Detection",
      "Weak References"
    ]
  },
  "Reflection & Attributes": {
    "Reflection": [
      "Type Class",
      "Assembly Class",
      "Getting Type Information",
      "Dynamic Method Invocation",
      "Activator Class"
    ],
    "Attributes": [
      "Built-in Attributes",
      "Custom Attributes",
      "Attribute Targets",
      "Reading Attributes at Runtime"
    ],
    "Dynamic": [
      "dynamic Keyword",
      "Dynamic Language Runtime (DLR)",
      "ExpandoObject"
    ]
  },
  "File I/O": {
    "File Operations": [
      "File Class",
      "Directory Class",
      "Path Class",
      "FileStream",
      "StreamReader and StreamWriter"
    ],
    "Serialization": [
      "Binary Serialization",
      "XML Serialization",
      "JSON Serialization (System.Text.Json, Newtonsoft.Json)"
    ]
  },
  "Multithreading": {
    "Thread Basics": [
      "Thread Class",
      "Thread Lifecycle",
      "Thread Pool",
      "Background vs Foreground Threads"
    ],
    "Synchronization": [
      "lock Statement",
      "Monitor Class",
      "Mutex",
      "Semaphore",
      "ReaderWriterLockSlim"
    ],
    "Concurrent Programming": [
      "Concurrent Collections",
      "Interlocked Class",
      "Volatile Keyword",
      "Thread-local Storage"
    ]
  },
  ".NET Framework APIs": {
    "Collections": [
      "System.Collections",
      "System.Collections.Generic",
      "System.Collections.Concurrent"
    ],
    "Diagnostics": [
      "Debug Class",
      "Trace Class",
      "Stopwatch"
    ],
    "Networking": [
      "HttpClient",
      "WebClient",
      "Sockets"
    ],
    "Security": [
      "Cryptography",
      "SecureString",
      "Hashing"
    ]
  },
  "Design Patterns": {
    "Creational Patterns": [
      "Singleton",
      "Factory",
      "Builder",
      "Prototype"
    ],
    "Structural Patterns": [
      "Adapter",
      "Decorator",
      "Facade",
      "Proxy"
    ],
    "Behavioral Patterns": [
      "Observer",
      "Strategy",
      "Command",
      "Template Method"
    ]
  },
  "Entity Framework": {
    "EF Core": [
      "DbContext",
      "DbSet",
      "Migrations",
      "LINQ Queries with EF",
      "Change Tracking"
    ],
    "Patterns": [
      "Repository Pattern",
      "Unit of Work",
      "Code First vs Database First"
    ]
  },
  "ASP.NET Core": {
    "Web API": [
      "Controller Classes",
      "Routing",
      "Model Binding",
      "Middleware Pipeline",
      "Dependency Injection in ASP.NET Core"
    ],
    "MVC": [
      "Model-View-Controller Pattern",
      "Razor Views",
      "Tag Helpers",
      "View Components"
    ],
    "Advanced Web": [
      "Authentication and Authorization",
      "JWT Tokens",
      "CORS",
      "Swagger/OpenAPI"
    ]
  },
  "Testing": {
    "Unit Testing": [
      "xUnit",
      "NUnit",
      "MSTest",
      "Mocking with Moq"
    ],
    "Integration Testing": [
      "Test Servers",
      "Test Databases"
    ],
    "TDD": [
      "Test-Driven Development Principles"
    ]
  },
  "Dependency Injection": {
    "DI Basics": [
      "Service Lifetime (Singleton, Scoped, Transient)",
      "Service Registration",
      "Service Resolution"
    ],
    "Advanced DI": [
      "Factory Pattern with DI",
      "Options Pattern"
    ]
  },
  "C# Versions": {
    "C# 8": [
      "Nullable Reference Types",
      "Default Interface Methods",
      "Async Streams",
      "Ranges and Indices"
    ],
    "C# 9": [
      "Records",
      "Init-only Properties",
      "Pattern Matching Enhancements",
      "Top-level Statements"
    ],
    "C# 10": [
      "Record Structs",
      "Global Using Directives",
      "File-scoped Namespaces",
      "Lambda Improvements"
    ],
    "C# 11": [
      "Raw String Literals",
      "Generic Attributes",
      "UTF-8 String Literals"
    ],
    "C# 12": [
      "Primary Constructors",
      "Collection Expressions",
      "Inline Arrays"
    ]
  },
  "Development Tools": {
    "IDEs": [
      "Visual Studio",
      "Visual Studio Code",
      "Rider"
    ],
    "Build Tools": [
      "MSBuild",
      "dotnet CLI"
    ],
    "NuGet": [
      "Package Management",
      "Creating NuGet Packages"
    ]
  },
  "Best Practices": {
    "Coding Standards": [
      "Naming Conventions",
      "Code Formatting",
      "XML Documentation"
    ],
    "Performance": [
      "Performance Profiling",
      "Memory Optimization",
      "Async Best Practices"
    ],
    "Security": [
      "Input Validation",
      "SQL Injection Prevention",
      "Cross-site Scripting Prevention"
    ]
  },
  "Practical Projects": {
    "Console Apps": [
      "Task Manager",
      "Budget Tracker",
      "File Organizer"
    ],
    "Web Apps": [
      "E-commerce Site",
      "Blog Platform",
      "API Gateway"
    ],
    "Desktop Apps": [
      "Inventory Management",
      "Student Information System",
      "Media Player"
    ]
  }
};

const seedCSharpHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create C# topic
    let csharpTopic = await Topic.findOne({ slug: 'csharp' });
    if (!csharpTopic) {
      const topicCount = await Topic.countDocuments();
      csharpTopic = await Topic.create({
        name: 'C#',
        slug: 'csharp',
        description: 'Master C# programming - from .NET fundamentals to ASP.NET Core, Entity Framework, and modern C# features.',
        icon: '🔷',
        order: topicCount + 1,
        estimatedHours: 65
      });
      console.log('✅ Created C# topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(csharpHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '').replace(/#/g, 'sharp');
        
        let category = await Category.findOne({
          topicId: csharpTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: csharpTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName} in C#`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = `${categorySlug}-${sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,&/]/g, '')
            .replace(/:/g, '')
            .replace(/#/g, 'sharp')
            .replace(/</g, '')
            .replace(/>/g, '')
            .replace(/\+/g, '-plus')}`;

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: csharpTopic._id,
              title: sectionTitle,
              slug: sectionSlug,
              order: sectionOrder++,
              description: `Learn about ${sectionTitle}`,
              difficulty: 'intermediate',
              estimatedTime: 35
            });
          }
        }
      }
    }

    console.log('🎉 C# hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding C#:', error);
    process.exit(1);
  }
};

seedCSharpHierarchy();
