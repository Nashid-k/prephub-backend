import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const golangHierarchy = {

  "01_go_language_foundations": {
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

  "02_basic_syntax_and_types": {
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

  "03_control_flow_and_functions": {
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
    ],
    "Function Basics": [
      "Function Declaration",
      "Multiple Return Values",
      "Named Return Values",
      "Variadic Functions",
      "Anonymous Functions",
      "Closures",
      "Higher-Order Functions"
    ]
  },

  "04_error_handling_and_execution_flow": {
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

  "05_core_data_structures": {
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

  "06_structs_methods_and_memory_model": {
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
    ],
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

  "07_interfaces_and_generics": {
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

  "08_concurrency_and_parallelism": {
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

  "09_standard_library_and_io": {
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

  "10_advanced_runtime_concepts": {
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

  "11_web_and_cli_development": {
    "HTTP Basics": [
      "net/http Package",
      "HTTP Server Creation",
      "HTTP Client",
      "HTTP Stateless Nature"
    ],
    "Advanced HTTP": [
      "Middleware Implementation",
      "Rate Limiter",
      "Graceful Shutdown",
      "HTTP Status Codes"
    ],
    "Web Frameworks": [
      "Gin Framework",
      "Echo Framework",
      "Chi Router"
    ],
    "CLI Applications": [
      "Creating CLI Apps",
      "flag Package",
      "Cobra Library"
    ]
  },

  "12_database_interaction": {
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

  "13_testing_benchmarking_and_debugging": {
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

  "14_best_practices_and_architecture": {
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

  "15_devops_and_cloud_integration": {
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

  "16_practical_problem_solving": {
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
