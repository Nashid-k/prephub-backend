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

const javaData = {
  "Java_Fundamentals": {
    "01_introduction": {
      "core_concepts": [
        "Java - Platform Independent Language",
        "JVM, JRE, JDK Architecture",
        "Java Features (OOP, Robust, Secure)",
        "Hello World Program"
      ],
      "development_environment": [
        "JDK Installation",
        "IDE Setup (IntelliJ, Eclipse)",
        "Compilation and Execution",
        "Java Project Structure"
      ]
    },

    "02_basic_syntax": {
      "variables_data_types": [
        "Primitive Types (int, double, boolean, char)",
        "Reference Types (String, Arrays, Objects)",
        "Variable Declaration and Initialization",
        "Type Casting and Conversion"
      ],
      "operators": [
        "Arithmetic Operators",
        "Relational Operators",
        "Logical Operators",
        "Assignment Operators",
        "Ternary Operator"
      ]
    }
  },

  "Control_Flow": {
    "conditionals": [
      "if-else Statements",
      "switch Statement",
      "Nested Conditionals",
      "Conditional Best Practices"
    ],

    "loops": [
      "for Loop",
      "while Loop",
      "do-while Loop",
      "Enhanced for Loop (for-each)",
      "break and continue"
    ]
  },

  "Arrays_Strings": {
    "arrays": [
      "Single-dimensional Arrays",
      "Multi-dimensional Arrays",
      "Array Operations (Sorting, Searching)",
      "Arrays Utility Class"
    ],

    "strings": [
      "String Class (Immutable)",
      "String Methods (length, substring, charAt)",
      "String Comparison (equals vs ==)",
      "StringBuilder and StringBuffer"
    ]
  },

  "Object_Oriented_Programming": {
    "01_classes_objects": [
      "Class Definition and Object Creation",
      "Constructors (Default, Parameterized)",
      "this Keyword",
      "static Keyword"
    ],

    "02_encapsulation": [
      "Access Modifiers (public, private, protected)",
      "Getter and Setter Methods",
      "Data Hiding Principles",
      "Java Beans Pattern"
    ],

    "03_inheritance": [
      "extends Keyword",
      "Method Overriding",
      "super Keyword",
      "IS-A Relationship"
    ],

    "04_polymorphism": [
      "Method Overloading",
      "Method Overriding",
      "Runtime Polymorphism",
      "Upcasting and Downcasting"
    ],

    "05_abstraction": [
      "Abstract Classes",
      "Abstract Methods",
      "Interfaces",
      "Default and Static Methods in Interfaces"
    ],

    "06_oop_principles": [
      "SOLID Principles Introduction",
      "Composition over Inheritance",
      "Cohesion and Coupling",
      "Object Class and Methods"
    ]
  },

  "Packages_Import": [
    "Package Declaration",
    "Import Statements",
    "Built-in Packages (java.lang, java.util)",
    "Classpath Configuration"
  ],

  "Exception_Handling": {
    "exception_basics": [
      "Exception Hierarchy",
      "Checked vs Unchecked Exceptions",
      "try-catch-finally",
      "Multiple Catch Blocks"
    ],

    "exception_operations": [
      "throw Keyword",
      "throws Clause",
      "Custom Exception Classes",
      "try-with-resources"
    ]
  },

  "Collections_Framework": {
    "01_collection_interfaces": [
      "Collection Interface",
      "List Interface (Ordered, Allows Duplicates)",
      "Set Interface (No Duplicates)",
      "Queue Interface (FIFO)",
      "Map Interface (Key-Value Pairs)"
    ],

    "02_implementations": {
      "lists": [
        "ArrayList (Dynamic Array)",
        "LinkedList (Doubly Linked List)",
        "Vector (Thread-safe List)"
      ],
      "sets": [
        "HashSet (Hash Table)",
        "LinkedHashSet (Maintains Insertion Order)",
        "TreeSet (Sorted Set)"
      ],
      "maps": [
        "HashMap (Hash Table Implementation)",
        "LinkedHashMap (Maintains Insertion Order)",
        "TreeMap (Sorted Map)"
      ],
      "queues": [
        "PriorityQueue (Priority Heap)",
        "ArrayDeque (Double-ended Queue)"
      ]
    },

    "03_collection_operations": [
      "Iterating Collections (Iterator, for-each)",
      "Sorting Collections (Comparable, Comparator)",
      "Collections Utility Class",
      "Stream API for Processing"
    ]
  },

  "Generics": {
    "generics_basics": [
      "Type Parameters",
      "Generic Classes",
      "Generic Methods",
      "Generic Interfaces"
    ],

    "advanced_generics": [
      "Bounded Type Parameters",
      "Wildcards (?, extends, super)",
      "Type Erasure",
      "Generic Best Practices"
    ]
  },

  "Input_Output": {
    "file_operations": [
      "File Class",
      "Reading and Writing Files",
      "Buffered Streams",
      "Scanner Class for Input"
    ],

    "serialization": [
      "Serializable Interface",
      "Object Serialization",
      "transient Keyword",
      "Serialization Best Practices"
    ]
  },

  "Multithreading": {
    "01_thread_basics": [
      "Thread Creation (extends Thread, implements Runnable)",
      "Thread States (NEW, RUNNABLE, etc.)",
      "Thread Methods (start, sleep, join)",
      "Daemon Threads"
    ],

    "02_synchronization": [
      "synchronized Keyword",
      "Synchronized Methods and Blocks",
      "volatile Keyword",
      "Thread-safe Collections"
    ],

    "03_concurrency_utilities": [
      "Executor Framework",
      "Callable and Future",
      "Thread Pools",
      "Concurrent Collections"
    ],

    "04_thread_coordination": [
      "wait, notify, notifyAll",
      "Producer-Consumer Pattern",
      "Deadlock Prevention",
      "ThreadLocal Class"
    ]
  },

  "Memory_Management": [
    "Heap and Stack Memory",
    "Garbage Collection Basics",
    "Memory Leak Prevention",
    "Performance Considerations"
  ],

  "Java_8_Features": {
    "lambda_expressions": [
      "Functional Interfaces",
      "Lambda Syntax",
      "Method References",
      "Functional Programming Concepts"
    ],

    "stream_api": [
      "Stream Creation",
      "Intermediate Operations (filter, map, sorted)",
      "Terminal Operations (collect, forEach, reduce)",
      "Parallel Streams"
    ],

    "other_features": [
      "Optional Class",
      "Default Methods in Interfaces",
      "Date and Time API (LocalDate, LocalTime)"
    ]
  },

  "Database_Connectivity": {
    "jdbc_basics": [
      "JDBC Architecture",
      "Database Connection",
      "Statement and PreparedStatement",
      "ResultSet Processing"
    ],

    "advanced_jdbc": [
      "Transaction Management",
      "Batch Processing",
      "Connection Pooling",
      "JDBC Best Practices"
    ]
  },

  "Unit_Testing": {
    "junit_framework": [
      "JUnit 5 Basics",
      "Test Annotations (@Test, @BeforeEach)",
      "Assertions",
      "Parameterized Tests"
    ],

    "testing_practices": [
      "Test Structure (Arrange-Act-Assert)",
      "Mocking with Mockito",
      "Test Coverage",
      "Integration Testing"
    ]
  },

  "Build_Tools": {
    "maven": [
      "Maven Project Structure (pom.xml)",
      "Dependency Management",
      "Build Lifecycle",
      "Maven Plugins"
    ],

    "gradle": [
      "Gradle Basics",
      "Build Configuration",
      "Dependency Management",
      "Gradle vs Maven"
    ]
  },

  "Spring_Framework": {
    "01_spring_core": [
      "Dependency Injection",
      "IoC Container",
      "Spring Bean Configuration",
      "@Component, @Service, @Repository"
    ],

    "02_spring_boot": [
      "Spring Boot Auto-configuration",
      "Spring Boot Starters",
      "@SpringBootApplication",
      "Spring Boot Actuator"
    ],

    "03_spring_data": [
      "Spring Data JPA",
      "Repository Pattern",
      "Entity Mapping",
      "CRUD Operations"
    ],

    "04_spring_security": [
      "Authentication Configuration",
      "Authorization Rules",
      "JWT Implementation",
      "Security Best Practices"
    ],

    "05_spring_web": [
      "REST Controller (@RestController)",
      "Request Mapping",
      "Exception Handling in Controllers",
      "Spring MVC Basics"
    ]
  },

  "Design_Patterns": {
    "creational": [
      "Singleton Pattern",
      "Factory Pattern",
      "Builder Pattern"
    ],
    "structural": [
      "Adapter Pattern",
      "Decorator Pattern",
      "Facade Pattern"
    ],
    "behavioral": [
      "Observer Pattern",
      "Strategy Pattern",
      "Template Method Pattern"
    ]
  },

  "Best_Practices": {
    "01_code_quality": [
      "Naming Conventions",
      "Code Formatting",
      "Commenting Guidelines",
      "Java Coding Standards"
    ],

    "02_performance": [
      "String Handling Best Practices",
      "Collection Selection Guidelines",
      "Memory Management Tips",
      "Performance Profiling"
    ],

    "03_security": [
      "Input Validation",
      "Secure Coding Practices",
      "Authentication and Authorization",
      "Data Protection"
    ]
  },

  "Essential_Projects": {
    "learning_projects": [
      "Bank Account Management System",
      "Library Management System",
      "E-commerce Cart System",
      "Student Management System"
    ],

    "must_implement_features": [
      "CRUD Operations",
      "File I/O Operations",
      "Database Integration",
      "Multithreading Implementation",
      "REST API Development"
    ]
  },

  "Interview_Preparation": {
    "core_concepts": [
      "OOP Principles",
      "Exception Handling",
      "Collections Framework",
      "Multithreading",
      "Memory Management"
    ],

    "practical_skills": [
      "String Manipulation Problems",
      "Array and Algorithm Problems",
      "Design Pattern Implementation",
      "Database Operations",
      "Spring Boot Application Development"
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

const seedJava = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'java' });
        if (!topic) {
            console.log('Creating Java topic...');
            topic = await Topic.create({
                name: 'Java',
                slug: 'java',
                description: 'Master enterprise Java development',
                icon: '☕',
                order: 5,
                color: '#007396'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ _id: { $in: categoryIds } });
            console.log('Cleared existing Java data');
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
        for (const [mainKey, mainValue] of Object.entries(javaData)) {
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
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Spring') || categoryName.includes('Design Patterns') ? 'advanced' : 
                               categoryName.includes('Introduction') || categoryName.includes('Fundamentals') || categoryName.includes('Basic') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ Java seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedJava();
