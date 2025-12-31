import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const pythonHierarchy = {
  "Python Fundamentals": {
    "Python Basics": [
      "What is Python",
      "Features of Python",
      "Dynamic typing",
      "CPython and its advantages",
      "PEP 8 coding conventions",
      "Python scope resolution"
    ],
    "Execution Environment": [
      "Virtual environment management",
      "PIP package management",
      "Import statements",
      "Environment variables"
    ]
  },
  "Data Types": {
    "Basic Types": [
      "int, float, str types",
      "bool and NoneType",
      "Type mutability",
      "Falsy values in Python"
    ],
    "Lists": [
      "List operations",
      "append() vs extend()",
      "List slicing",
      "List comprehension"
    ],
    "Tuples": [
      "Tuple immutability",
      "Tuple operations",
      "Converting tuples to dict"
    ],
    "Sets": [
      "Set operations",
      "Removing duplicates"
    ],
    "Dictionaries": [
      "Dictionary operations",
      "Dict comprehension",
      "Merging dictionaries",
      "Sorting dict items"
    ]
  },
  "Type System": {
    "Type Handling": [
      "Type annotation",
      "Type casting",
      "isinstance() and type()",
      "is vs == operator"
    ],
    "Memory & References": [
      "Reference counting",
      "Deep copy vs shallow copy",
      "Python memory model"
    ]
  },
  "Functions": {
    "Function Basics": [
      "Function definition",
      "*args and **kwargs",
      "Default parameters",
      "Lambda functions"
    ],
    "Built-in Functions": [
      "map(), filter(), reduce()",
      "zip(), enumerate()",
      "any() and all()"
    ],
    "Advanced Functions": [
      "Closures",
      "Decorators",
      "@property decorator",
      "Currying"
    ]
  },
  "Object-Oriented Programming": {
    "OOP Basics": [
      "Classes and Objects",
      "__init__ constructor",
      "Instance vs Class variables",
      "Self parameter"
    ],
    "Inheritance & Polymorphism": [
      "Types of inheritance",
      "Method overriding",
      "super() function",
      "MRO (Method Resolution Order)"
    ],
    "Access Control": [
      "Public, Protected, Private",
      "Getters and setters",
      "Encapsulation"
    ],
    "Special Methods": [
      "Magic methods",
      "__str__ vs __repr__",
      "Abstract Base Classes",
      "Metaclasses"
    ]
  },
  "Control Flow": {
    "Conditionals": [
      "if-elif-else",
      "Ternary operator",
      "match statement (3.10+)"
    ],
    "Loops": [
      "for and while loops",
      "for-else pattern",
      "break, continue, pass",
      "Loop comprehensions"
    ]
  },
  "Advanced Features": {
    "Generators & Iterators": [
      "Generator functions",
      "yield keyword",
      "Iterator protocol",
      "Generator expressions"
    ],
    "Context Managers": [
      "with statement",
      "File handling",
      "Custom context managers"
    ],
    "Concurrency": [
      "GIL (Global Interpreter Lock)",
      "Threading vs Multiprocessing",
      "async/await"
    ]
  },
  "Error Handling": {
    "Exceptions": [
      "try-except-finally",
      "Raising exceptions",
      "Custom exceptions",
      "Exception hierarchy"
    ]
  },
  "Modules & Packages": {
    "Module System": [
      "Importing modules",
      "Creating packages",
      "__init__.py files",
      "Common libraries (os, re, math)"
    ]
  },
  "File Operations": {
    "File Handling": [
      "open() and file modes",
      "Reading and writing files",
      "Pickling",
      "Context managers for files"
    ]
  },
  "String Operations": {
    "String Manipulation": [
      "String methods",
      "f-strings",
      "String slicing",
      "Common string problems"
    ]
  },
  "Practical Problems": {
    "Data Manipulation": [
      "List and dict operations",
      "Filtering and transforming",
      "Sorting algorithms",
      "Common coding patterns"
    ],
    "Algorithm Implementation": [
      "Reverse operations",
      "Palindrome checking",
      "Fibonacci series",
      "Prime numbers"
    ]
  }
};

const seedPythonHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create Python topic
    let pythonTopic = await Topic.findOne({ slug: 'python' });
    if (!pythonTopic) {
      const topicCount = await Topic.countDocuments();
      pythonTopic = await Topic.create({
        name: 'Python',
        slug: 'python',
        description: 'Master Python programming from fundamentals to advanced concepts, including OOP, data structures, and practical problem-solving.',
        icon: '🐍',
        order: topicCount + 1,
        estimatedHours: 45
      });
      console.log('✅ Created Python topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(pythonHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
        
        let category = await Category.findOne({
          topicId: pythonTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: pythonTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName}`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,]/g, '')
            .replace(/\//g, '-');

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: pythonTopic._id,
              title: sectionTitle,
              slug: sectionSlug,
              order: sectionOrder++,
              description: `Learn about ${sectionTitle}`,
              difficulty: 'beginner',
              estimatedTime: 20
            });
          }
        }
      }
    }

    console.log('🎉 Python hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Python:', error);
    process.exit(1);
  }
};

seedPythonHierarchy();
