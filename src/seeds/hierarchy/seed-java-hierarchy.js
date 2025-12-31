import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const javaHierarchy = {
  "Foundations & Basics": {
    "Java Overview": [
      "What is Java?",
      "Java Platform (JVM, JRE, JDK)",
      "Features of Java",
      "Java Editions (SE, EE, ME)",
      "Java Version History"
    ],
    "Environment Setup": [
      "JDK Installation",
      "Environment Variables (JAVA_HOME, PATH)",
      "Choosing an IDE",
      "Compiling and Running Programs"
    ],
    "Basic Syntax": [
      "Hello World Program",
      "Java Program Structure",
      "Comments",
      "Identifiers and Keywords"
    ]
  },
  "Variables & Data Types": {
    "Primitive Types": [
      "byte, short, int, long",
      "float, double",
      "char",
      "boolean"
    ],
    "Reference Types": [
      "String Class",
      "Arrays",
      "Objects",
      "Wrapper Classes"
    ],
    "Variable Declaration": [
      "Variable Declaration and Initialization",
      "Local Variables",
      "Instance Variables",
      "Class Variables (static)",
      "Final Variables (constants)"
    ],
    "Type Conversion": [
      "Widening (Implicit) Casting",
      "Narrowing (Explicit) Casting",
      "Autoboxing and Unboxing",
      "Type Wrapper Methods"
    ]
  },
  "Operators & Control Flow": {
    "Operators": [
      "Arithmetic Operators",
      "Relational Operators",
      "Logical Operators",
      "Bitwise Operators",
      "Assignment Operators",
      "Ternary Operator",
      "instanceof Operator"
    ],
    "Conditional Statements": [
      "if Statement",
      "if-else Statement",
      "if-else-if Ladder",
      "switch Statement"
    ],
    "Looping": [
      "for Loop",
      "Enhanced for Loop (for-each)",
      "while Loop",
      "do-while Loop",
      "Nested Loops"
    ],
    "Jump Statements": [
      "break Statement",
      "continue Statement",
      "return Statement"
    ]
  },
  "Arrays & Strings": {
    "Arrays": [
      "Single-dimensional Arrays",
      "Multi-dimensional Arrays",
      "Array Declaration and Initialization",
      "Array Operations",
      "Jagged Arrays"
    ],
    "Strings": [
      "String Class (Immutable)",
      "String Creation (Literal vs new)",
      "String Methods",
      "String Comparison (== vs equals())",
      "StringBuffer and StringBuilder",
      "String Concatenation"
    ]
  },
  "Object-Oriented Programming": {
    "OOP Concepts": [
      "Classes and Objects",
      "Four Pillars of OOP",
      "Encapsulation",
      "Inheritance (IS-A Relationship)",
      "Polymorphism",
      "Abstraction"
    ],
    "Class Members": [
      "Constructors",
      "Method Overloading",
      "this Keyword",
      "static Keyword",
      "final Keyword"
    ],
    "Inheritance": [
      "extends Keyword",
      "Method Overriding",
      "super Keyword",
      "Covariant Return Types"
    ],
    "Polymorphism": [
      "Runtime Polymorphism",
      "Dynamic Method Dispatch",
      "Upcasting and Downcasting"
    ],
    "Abstraction": [
      "Abstract Classes",
      "Abstract Methods",
      "Interfaces",
      "Default and Static Methods",
      "Functional Interfaces",
      "@Override Annotation"
    ]
  },
  "Packages & Access Modifiers": {
    "Packages": [
      "Creating Packages",
      "Importing Packages",
      "Built-in Packages",
      "CLASSPATH Environment Variable"
    ],
    "Access Modifiers": [
      "private Access",
      "default (Package-private) Access",
      "protected Access",
      "public Access",
      "Access Modifier Scope"
    ]
  },
  "Exception Handling": {
    "Exception Hierarchy": [
      "Throwable Class",
      "Error vs Exception",
      "Checked vs Unchecked Exceptions",
      "Common Exception Classes"
    ],
    "Handling Mechanisms": [
      "try-catch Block",
      "Multiple catch Blocks",
      "try-catch-finally Block",
      "try-with-resources (Java 7+)",
      "throw and throws Keywords"
    ],
    "Custom Exceptions": [
      "Creating Custom Exception Classes",
      "Best Practices in Exception Handling"
    ]
  },
  "Collections Framework": {
    "Collection Interfaces": [
      "Collection Interface",
      "List Interface (ArrayList, LinkedList)",
      "Set Interface (HashSet, TreeSet)",
      "Queue Interface",
      "Map Interface (HashMap, TreeMap)"
    ],
    "Collection Classes": [
      "ArrayList vs LinkedList",
      "HashSet vs TreeSet",
      "HashMap vs TreeMap vs LinkedHashMap",
      "Vector vs ArrayList",
      "Hashtable vs HashMap"
    ],
    "Collection Operations": [
      "Iterating Collections",
      "Sorting Collections",
      "Collections Utility Class",
      "Arrays Utility Class"
    ],
    "Concurrent Collections": [
      "ConcurrentHashMap",
      "CopyOnWriteArrayList",
      "BlockingQueue"
    ]
  },
  "Generics": {
    "Generics Basics": [
      "Type Parameters",
      "Generic Classes",
      "Generic Methods",
      "Generic Interfaces"
    ],
    "Advanced Generics": [
      "Bounded Type Parameters",
      "Wildcards (?, extends, super)",
      "Type Erasure"
    ]
  },
  "Input/Output": {
    "Streams": [
      "Byte Streams",
      "Character Streams",
      "Standard Streams (System.in, System.out)"
    ],
    "File Handling": [
      "File Class",
      "Reading Files",
      "Writing Files",
      "RandomAccessFile"
    ],
    "Serialization": [
      "Serializable Interface",
      "Object Serialization",
      "transient Keyword",
      "serialVersionUID"
    ]
  },
  "Multithreading & Concurrency": {
    "Thread Basics": [
      "Process vs Thread",
      "Main Thread",
      "Creating Threads",
      "Thread Lifecycle and States"
    ],
    "Thread Synchronization": [
      "Synchronized Methods",
      "Synchronized Blocks",
      "volatile Keyword",
      "Thread Communication (wait, notify)"
    ],
    "Concurrency Utilities": [
      "Executor Framework",
      "Callable and Future",
      "ThreadPool",
      "Concurrent Collections"
    ],
    "Advanced Concurrency": [
      "Deadlock Prevention",
      "Race Conditions",
      "Atomic Variables",
      "Lock Interface"
    ]
  },
  "Memory Management": {
    "Garbage Collection": [
      "Garbage Collection Basics",
      "GC Algorithms",
      "System.gc() Method",
      "finalize() Method"
    ],
    "Memory Areas": [
      "Heap Memory",
      "Stack Memory",
      "Method Area",
      "Memory Leak Prevention"
    ]
  },
  "Java 8+ Features": {
    "Lambda Expressions": [
      "Functional Interfaces",
      "Lambda Syntax",
      "Method References"
    ],
    "Stream API": [
      "Stream Creation",
      "Intermediate Operations",
      "Terminal Operations",
      "Parallel Streams"
    ],
    "Other Features": [
      "Optional Class",
      "Default Methods in Interfaces",
      "Date and Time API (java.time)"
    ]
  },
  "Annotations & Reflection": {
    "Annotations": [
      "Built-in Annotations",
      "Creating Custom Annotations",
      "Meta-annotations"
    ],
    "Reflection": [
      "Class Class",
      "Accessing Class Information",
      "Invoking Methods Dynamically"
    ]
  },
  "Database Connectivity": {
    "JDBC Basics": [
      "JDBC Architecture",
      "JDBC Drivers",
      "Database Connection",
      "Connection Pooling"
    ],
    "JDBC Operations": [
      "Statement, PreparedStatement, CallableStatement",
      "ResultSet Handling",
      "Batch Processing",
      "Transaction Management"
    ]
  },
  "Unit Testing": {
    "Testing Frameworks": [
      "JUnit 4 and JUnit 5",
      "TestNG",
      "Mocking Frameworks (Mockito)"
    ],
    "Testing Concepts": [
      "Test Cases and Test Suites",
      "Assertions",
      "Test Annotations",
      "Parameterized Tests"
    ]
  },
  "Build Tools": {
    "Build Systems": [
      "Maven (pom.xml, Dependencies, Lifecycle)",
      "Gradle",
      "Ant"
    ]
  },
  "Design Patterns": {
    "Creational Patterns": [
      "Singleton Pattern",
      "Factory Pattern",
      "Builder Pattern",
      "Prototype Pattern"
    ],
    "Structural Patterns": [
      "Adapter Pattern",
      "Decorator Pattern",
      "Proxy Pattern",
      "Facade Pattern"
    ],
    "Behavioral Patterns": [
      "Observer Pattern",
      "Strategy Pattern",
      "Template Method Pattern",
      "Command Pattern"
    ]
  },
  "Spring Framework": {
    "Spring Core": [
      "Dependency Injection (DI)",
      "Inversion of Control (IoC)",
      "Spring Bean Configuration",
      "Bean Lifecycle",
      "Spring Annotations"
    ],
    "Spring Boot": [
      "Auto-configuration",
      "Spring Boot Starters",
      "@SpringBootApplication",
      "Spring Boot Actuator"
    ],
    "Spring Data": [
      "Spring Data JPA",
      "Repository Pattern",
      "CRUD Operations"
    ],
    "Spring Security": [
      "Authentication and Authorization",
      "JWT Implementation",
      "OAuth2 Integration"
    ]
  },
  "Advanced Topics": {
    "Networking": [
      "Socket Programming",
      "URL and URLConnection",
      "HTTP Client"
    ],
    "Performance": [
      "Profiling Tools",
      "Memory Optimization",
      "CPU Optimization"
    ],
    "Security": [
      "Java Security Manager",
      "Cryptography APIs",
      "Secure Coding Practices"
    ]
  },
  "Practical Projects": {
    "Project Ideas": [
      "Bank Management System",
      "Library Management System",
      "E-commerce Application",
      "RESTful Web Services",
      "Chat Application"
    ],
    "Coding Practice": [
      "String Manipulation Problems",
      "Array and Collection Problems",
      "OOP Design Problems",
      "Algorithm Implementation",
      "Data Structure Implementation"
    ]
  }
};

const seedJavaHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create Java topic
    let javaTopic = await Topic.findOne({ slug: 'java' });
    if (!javaTopic) {
      const topicCount = await Topic.countDocuments();
      javaTopic = await Topic.create({
        name: 'Java',
        slug: 'java',
        description: 'Master Java programming - from OOP fundamentals to Spring Framework, multithreading, and enterprise application development.',
        icon: '☕',
        order: topicCount + 1,
        estimatedHours: 70
      });
      console.log('✅ Created Java topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(javaHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '');
        
        let category = await Category.findOne({
          topicId: javaTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: javaTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName} in Java`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = `${categorySlug}-${sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,&/]/g, '')
            .replace(/:/g, '')
            .replace(/\+/g, '-plus')
            .replace(/@/g, '')}`;

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: javaTopic._id,
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

    console.log('🎉 Java hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Java:', error);
    process.exit(1);
  }
};

seedJavaHierarchy();
