import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const golangHierarchy = {
  "Foundations & Setup": {
    "Go Overview": [
      "What is Go (Golang)?",
      "Why Golang? Features and Benefits",
      "Advantages of Golang",
      "Use Cases of Golang",
      "Golang vs Other Languages"
    ],
    "Installation & Setup": [
      "GOROOT (Go Installation Directory)",
      "GOPATH (Go Workspace)",
      "Go Modules (go.mod)",
      "go tidy Command",
      "go.sum File"
    ],
    "Development Tools": [
      "Go Command Line Tools",
      "IDE/Editor Setup",
      "Debugging Tools",
      "Code Formatting (gofmt)"
    ]
  },
  "Basic Syntax & Types": {
    "Variables & Constants": [
      "Variable Declaration (var, :=)",
      "Zero Values",
      "Constants (const)",
      "iota (Enumerated Constants)",
      "Variable Scope"
    ],
    "Basic Types": [
      "Integers (int, uint)",
      "Floating Point (float32, float64)",
      "Complex Numbers",
      "Boolean (bool)",
      "Byte and Rune"
    ],
    "Composite Types": [
      "String Type",
      "UTF-8 Encoding",
      "Rune vs String",
      "Mutable vs Immutable Types"
    ],
    "Operators": [
      "Arithmetic Operators",
      "Comparison Operators",
      "Logical Operators",
      "Bitwise Operators"
    ]
  },
  "Control Structures": {
    "Conditional Statements": [
      "if-else Statements",
      "switch Statements",
      "Type Switches",
      "fallthrough Keyword"
    ],
    "Loops": [
      "for Loop (Only Loop in Go)",
      "while-like Loop",
      "infinite Loop",
      "break and continue",
      "Range-based Loops"
    ]
  },
  "Functions & Error Handling": {
    "Function Basics": [
      "Function Declaration",
      "Multiple Return Values",
      "Named Return Values",
      "Variadic Functions",
      "Anonymous Functions",
      "Closures",
      "Higher-Order Functions"
    ],
    "Error Handling": [
      "Error Interface",
      "Returning Errors",
      "Custom Error Types",
      "Error Wrapping (fmt.Errorf)",
      "errors Package"
    ],
    "Panic & Recovery": [
      "panic Function",
      "recover Function",
      "defer Statement",
      "Defer Usage Patterns",
      "Defer Stack (LIFO)"
    ]
  },
  "Data Structures": {
    "Arrays": [
      "Array Declaration",
      "Fixed Size Arrays",
      "Multidimensional Arrays",
      "Array Operations"
    ],
    "Slices": [
      "Slice Declaration",
      "Slice vs Array",
      "Length (len) and Capacity (cap)",
      "Slice Operations (append, copy)",
      "Slice Internals"
    ],
    "Maps": [
      "Map Declaration",
      "Map Operations",
      "Checking Key Existence",
      "Nested Maps",
      "Map Iteration"
    ],
    "Strings": [
      "String Manipulation",
      "strings Package",
      "strconv Package"
    ]
  },
  "Structs & Methods": {
    "Struct Basics": [
      "Struct Definition",
      "Creating Structs",
      "Anonymous Structs",
      "Nested Structs",
      "Struct Embedding",
      "Struct Tags"
    ],
    "Methods": [
      "Method Declaration",
      "Value vs Pointer Receivers",
      "Method Expressions",
      "Changing Values with Methods"
    ]
  },
  "Interfaces & Generics": {
    "Interfaces": [
      "Interface Definition",
      "Why Interfaces?",
      "Polymorphism with Interfaces",
      "Empty Interface (interface{})",
      "Type Assertion",
      "Accessing Values from Interface"
    ],
    "Generics": [
      "Generic Functions",
      "Generic Types",
      "Type Parameters",
      "Constraints",
      "When to Use Generics"
    ]
  },
  "Pointers & Memory": {
    "Pointer Basics": [
      "Pointer Declaration",
      "Address Operator (&)",
      "Dereference Operator (*)",
      "Pointers to Structs"
    ],
    "Memory Management": [
      "Pass by Value vs Reference",
      "Garbage Collection in Go",
      "Escape Analysis",
      "Stack vs Heap Allocation"
    ]
  },
  "Concurrency & Parallelism": {
    "Concurrency Concepts": [
      "Concurrency vs Parallelism",
      "Goroutines",
      "Goroutine Lifecycle",
      "Go Scheduler (M:N Model)",
      "CPU Thread vs Goroutine"
    ],
    "Channels": [
      "Channel Declaration",
      "Unbuffered Channels",
      "Buffered Channels",
      "Channel Synchronization",
      "Channel Direction",
      "Closing Channels",
      "Select Statement"
    ],
    "Synchronization": [
      "sync Package",
      "WaitGroup",
      "Mutex (sync.Mutex, RWMutex)",
      "Atomic Operations",
      "Once (sync.Once)"
    ],
    "Patterns": [
      "Worker Pool Pattern",
      "Fan-out Fan-in Pattern",
      "Pipeline Pattern",
      "Generator Functions",
      "Rate Limiting"
    ],
    "Problems & Solutions": [
      "Deadlock Detection",
      "Race Conditions",
      "Handling Deadlocks"
    ]
  },
  "Packages & Standard Library": {
    "Common Packages": [
      "fmt Package",
      "os Package",
      "io Package",
      "strings Package",
      "strconv Package",
      "time Package",
      "sync Package",
      "context Package"
    ],
    "File Handling": [
      "File Operations (Read/Write)",
      "bufio Package",
      "Temporary File Creation"
    ],
    "Encoding": [
      "JSON Encoding & Decoding",
      "XML Encoding & Decoding",
      "Base64 Encoding"
    ]
  },
  "Advanced Concepts": {
    "Reflection": [
      "reflect Package",
      "Type Reflection",
      "Value Reflection",
      "Use Cases for Reflection"
    ],
    "Context Package": [
      "Context Interface",
      "Context with Timeout",
      "Context with Cancellation",
      "Context in HTTP Requests"
    ],
    "Exec Commands": [
      "os/exec Package",
      "Running External Commands",
      "Command Execution with Flags"
    ],
    "Profiling": [
      "CPU Profiling",
      "Memory Profiling",
      "Performance Evaluation"
    ]
  },
  "Web Development": {
    "HTTP Basics": [
      "net/http Package",
      "HTTP Server Creation",
      "HTTP Client",
      "HTTP Stateless Nature"
    ],
    "Web Frameworks": [
      "Gin Framework",
      "Echo Framework",
      "Chi Router"
    ],
    "Advanced HTTP": [
      "Middleware Implementation",
      "Rate Limiter",
      "Graceful Shutdown",
      "HTTP Status Codes"
    ],
    "CLI Applications": [
      "Creating CLI Apps",
      "flag Package",
      "Cobra Library"
    ]
  },
  "Database Interaction": {
    "Database Drivers": [
      "database/sql Package",
      "SQL Drivers",
      "NoSQL Drivers"
    ],
    "ORM Libraries": [
      "GORM",
      "SQLx",
      "ORM vs Raw SQL"
    ],
    "Transactions": [
      "Transaction Management",
      "ACID Properties"
    ]
  },
  "Testing & Debugging": {
    "Testing": [
      "testing Package",
      "Unit Testing",
      "Table-driven Tests",
      "Mocking",
      "Test Coverage"
    ],
    "Benchmarking": [
      "Benchmark Tests",
      "Performance Benchmarking",
      "Memory Benchmarking"
    ],
    "Debugging": [
      "Debugging Tools",
      "Stack Traces",
      "Error Investigation"
    ]
  },
  "Best Practices & Patterns": {
    "Design Patterns": [
      "Repository Pattern",
      "Factory Pattern",
      "Strategy Pattern",
      "Observer Pattern",
      "Clean Architecture"
    ],
    "Code Organization": [
      "Project Structure",
      "Package Organization",
      "Code Reusability"
    ],
    "Performance": [
      "Performance Optimization",
      "Memory Optimization",
      "CPU Optimization"
    ]
  },
  "DevOps Integration": {
    "Docker": [
      "Dockerizing Go Apps",
      "Dockerfile for Go",
      "Multi-stage Builds",
      "RUN vs CMD in Docker"
    ],
    "Kubernetes": [
      "Kubernetes Deployment",
      "Kubernetes Services",
      "PV vs PVC",
      "kubectl Commands"
    ],
    "Cloud Integration": [
      "AWS Lambda with Go",
      "Terraform with Go",
      "Environment Variables"
    ]
  },
  "Practical Problems": {
    "Array Problems": [
      "Second Largest Element",
      "Find Duplicates",
      "Remove Duplicates",
      "Find Largest Element"
    ],
    "String Problems": [
      "Check Substring",
      "Sort by Character Frequency",
      "Password Generator"
    ],
    "Map Problems": [
      "Merge Maps",
      "Nested Map Operations",
      "Update Interface Values"
    ],
    "Concurrency Problems": [
      "Print Alternating Patterns",
      "Worker Pool Implementation",
      "Pipeline Implementation"
    ]
  }
};

const seedGolangHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create Golang topic
    let golangTopic = await Topic.findOne({ slug: 'golang' });
    if (!golangTopic) {
      const topicCount = await Topic.countDocuments();
      golangTopic = await Topic.create({
        name: 'Golang',
        slug: 'golang',
        description: 'Master Go (Golang) programming - from fundamentals to concurrency, web development, and production-ready applications.',
        icon: '🐹',
        order: topicCount + 1,
        estimatedHours: 50
      });
      console.log('✅ Created Golang topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(golangHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '');
        
        let category = await Category.findOne({
          topicId: golangTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: golangTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName} in Go`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = `${categorySlug}-${sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,&/]/g, '')
            .replace(/:/g, '')}`;

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: golangTopic._id,
              title: sectionTitle,
              slug: sectionSlug,
              order: sectionOrder++,
              description: `Learn about ${sectionTitle}`,
              difficulty: 'intermediate',
              estimatedTime: 30
            });
          }
        }
      }
    }

    console.log('🎉 Golang hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Golang:', error);
    process.exit(1);
  }
};

seedGolangHierarchy();
