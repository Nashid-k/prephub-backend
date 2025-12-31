import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const dartHierarchy = {
  "Language Fundamentals": {
    "Overview": [
      "What is Dart?",
      "Advantages of Dart",
      "Why Flutter uses Dart?",
      "Compiled vs Interpreted Language",
      "JIT vs AOT Compilation"
    ],
    "Program Structure": [
      "Main Function",
      "Comments",
      "Imports and Libraries",
      "Core Libraries in Dart"
    ]
  },
  "Variables & Data Types": {
    "Basic Types": [
      "int, double, num",
      "String",
      "bool and null",
      "Primitive vs Non-Primitive Types"
    ],
    "Type System": [
      "Type Inference",
      "Type Safety",
      "Type Checking (is, is!)",
      "Type Casting (as operator)",
      "Type Promotion",
      "Dynamic vs Object"
    ],
    "Type Modifiers": [
      "final (Runtime Constant)",
      "const (Compile-time Constant)",
      "late Keyword",
      "final + late Behavior"
    ]
  },
  "Operators & Expressions": {
    "Arithmetic": [
      "Basic Operators (+, -, *, /)",
      "Modulo (%) and Integer Division (~/)"
    ],
    "Equality & Relational": [
      "Comparison Operators (==, !=, >, <, >=, <=)"
    ],
    "Logical": [
      "Logical AND, OR, NOT (&&, ||, !)"
    ],
    "Type Test": [
      "is and is! operators",
      "as (Type Cast)"
    ],
    "Assignment": [
      "Assignment Operators (=, +=, -=, *=, /=)"
    ],
    "Conditional": [
      "Ternary Operator (? :)",
      "Null-aware Operators (??, ??=, ?.)"
    ],
    "Cascade": [
      "Cascade Operator (..)",
      "Null-aware Cascade (?..)"
    ],
    "Bitwise": [
      "Bitwise Operators (&, |, ^, ~, <<, >>)"
    ]
  },
  "Control Flow": {
    "Decision Making": [
      "if-else statements",
      "switch-case",
      "Enum with Switch"
    ],
    "Loops": [
      "for Loop",
      "for-in Loop",
      "while and do-while",
      "Entry vs Exit Control Loops"
    ],
    "Jump Statements": [
      "break, continue, return"
    ]
  },
  "Functions": {
    "Function Basics": [
      "Function Declaration",
      "Parameters and Arguments",
      "Return Types",
      "void Return Type"
    ],
    "Parameter Types": [
      "Required Positional Parameters",
      "Optional Positional Parameters ([])",
      "Named Parameters ({})",
      "Default Parameter Values",
      "Required Named Parameters"
    ],
    "Function Types": [
      "Anonymous Functions (Lambda)",
      "Arrow Functions (=>)",
      "Higher-Order Functions",
      "Closures",
      "Recursive Functions"
    ],
    "Special Functions": [
      "getters and setters",
      "Extension Methods",
      "Function Type Aliases (typedef)"
    ]
  },
  "Collections": {
    "Lists": [
      "List Basics",
      "Fixed-length vs Growable List",
      "List Properties and Methods",
      "firstWhere() vs singleWhere()"
    ],
    "Sets": [
      "Set Basics",
      "List vs Set Difference",
      "Set Operations"
    ],
    "Maps": [
      "Map Basics",
      "Map Literals",
      "Accessing Values",
      "Mixed Maps"
    ],
    "Collection Operators": [
      "Spread Operator (...)",
      "Null-aware Spread (...?)",
      "Collection if and for"
    ],
    "Collection Methods": [
      "forEach(), map(), where()",
      "reduce() and fold()",
      "map() vs forEach()"
    ]
  },
  "String Manipulation": {
    "String Basics": [
      "String Literals",
      "Multi-line Strings",
      "String Interpolation"
    ],
    "String Methods": [
      "length, isEmpty, isNotEmpty",
      "toUpperCase(), toLowerCase()",
      "trim(), split(), contains()",
      "replaceAll(), substring()",
      "indexOf(), lastIndexOf()"
    ],
    "Escape Sequences": [
      "Common Escape Characters"
    ]
  },
  "Object-Oriented Programming": {
    "OOP Concepts": [
      "Four Pillars of OOP",
      "Class and Object",
      "Instance vs Local Variables",
      "Static Variables and Methods",
      "super Keyword"
    ],
    "Constructors": [
      "Default Constructor",
      "Parameterized Constructor",
      "Named Constructors",
      "Factory Constructors",
      "Constant Constructors (const)",
      "Redirecting Constructors",
      "Private Constructors"
    ],
    "Inheritance": [
      "extends Keyword",
      "Method Overriding",
      "@override Annotation",
      "covariant Keyword",
      "super Constructor"
    ],
    "Interfaces": [
      "Implicit Interfaces",
      "implements Keyword",
      "Multiple Interface Implementation"
    ],
    "Abstraction": [
      "Abstract Classes",
      "Abstract Methods"
    ],
    "Mixins": [
      "Mixin Concept",
      "with Keyword",
      "Multiple Inheritance via Mixins",
      "Mixin Constraints (on keyword)"
    ],
    "Design Patterns": [
      "Singleton Pattern",
      "Factory Pattern",
      "Immutable Classes"
    ]
  },
  "Exception Handling": {
    "Exception Types": [
      "Exception vs Error",
      "Built-in Exceptions",
      "Custom Exceptions"
    ],
    "Handling Mechanisms": [
      "try-catch",
      "try-catch-on",
      "finally Block",
      "rethrow keyword"
    ],
    "Prevention": [
      "tryParse() vs parse()",
      "null-safety Operators",
      "assert Keyword"
    ]
  },
  "Asynchronous Programming": {
    "Futures": [
      "Future Basics",
      "async and await",
      "Future.then(), catchError()",
      "Future.delayed(), value(), error()"
    ],
    "Streams": [
      "Stream Basics",
      "Stream vs Future",
      "Single-subscription vs Broadcast",
      "async* and yield",
      "StreamController"
    ],
    "Generators": [
      "Synchronous Generators (sync*)",
      "Asynchronous Generators (async*)",
      "return vs yield"
    ]
  },
  "Concurrency": {
    "Isolates": [
      "Isolates vs Threads",
      "Creating Isolates",
      "Message Passing",
      "compute() Function"
    ],
    "Zones": [
      "Zone Concept",
      "Zone.current",
      "Zone.fork()",
      "Error Handling in Zones"
    ]
  },
  "Advanced Features": {
    "Generics": [
      "Generic Types",
      "Generic Classes and Methods",
      "Type Constraints"
    ],
    "Metadata": [
      "Annotations (@)",
      "Built-in Annotations",
      "Custom Annotations"
    ],
    "Enums": [
      "Enum Basics",
      "Enhanced Enums",
      "Enum Properties"
    ],
    "Immutability": [
      "Mutable vs Immutable Objects",
      "Creating Immutable Classes"
    ]
  },
  "File I/O": {
    "File Operations": [
      "Reading Files",
      "Writing Files",
      "Deleting Files"
    ],
    "Directories": [
      "Creating Directories",
      "Listing Contents",
      "Deleting Directories"
    ]
  },
  "Practical Applications": {
    "Data Structures": [
      "Linked Lists",
      "Trees and Graphs",
      "Hash Tables",
      "Sorting Algorithms"
    ],
    "Parsing": [
      "JSON Parsing",
      "XML Parsing",
      "CSV Parsing"
    ],
    "Math Operations": [
      "abs(), ceil(), floor(), round()",
      "Mathematical Operations"
    ]
  }
};

const seedDartHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create Dart topic
    let dartTopic = await Topic.findOne({ slug: 'dart' });
    if (!dartTopic) {
      const topicCount = await Topic.countDocuments();
      dartTopic = await Topic.create({
        name: 'Dart',
        slug: 'dart',
        description: 'Master Dart programming language - the foundation of Flutter. From fundamentals to advanced async patterns and OOP.',
        icon: '🎯',
        order: topicCount + 1,
        estimatedHours: 40
      });
      console.log('✅ Created Dart topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(dartHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '');
        
        let category = await Category.findOne({
          topicId: dartTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: dartTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName} in Dart`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = `${categorySlug}-${sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,&/]/g, '')
            .replace(/:/g, '')
            .replace(/!/g, '')}`;

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: dartTopic._id,
              title: sectionTitle,
              slug: sectionSlug,
              order: sectionOrder++,
              description: `Learn about ${sectionTitle}`,
              difficulty: 'beginner',
              estimatedTime: 25
            });
          }
        }
      }
    }

    console.log('🎉 Dart hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Dart:', error);
    process.exit(1);
  }
};

seedDartHierarchy();
