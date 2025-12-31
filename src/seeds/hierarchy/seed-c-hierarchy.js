import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const cHierarchy = {
  "Foundations & Basics": {
    "C Overview": [
      "What is C Programming?",
      "History and Importance of C",
      "Features of C Language",
      "C vs Other Languages",
      "Applications of C"
    ],
    "Environment Setup": [
      "Setting up C Compiler (GCC, Clang)",
      "IDE Setup",
      "Writing First C Program",
      "Compilation Process",
      "Compiler, Assembler, Linker"
    ],
    "Program Structure": [
      "Basic Structure of C Program",
      "Header Files (#include)",
      "Main Function (main())",
      "Comments"
    ]
  },
  "Variables & Data Types": {
    "Basic Data Types": [
      "int (Integer Types)",
      "float, double (Floating-point)",
      "char (Character)",
      "void (Void Type)"
    ],
    "Type Modifiers": [
      "signed and unsigned",
      "short and long",
      "Data Type Sizes (sizeof operator)",
      "Type Qualifiers (const, volatile)"
    ],
    "Variables": [
      "Variable Declaration and Initialization",
      "Local vs Global Variables",
      "Static Variables",
      "Register Variables",
      "External Variables (extern)"
    ],
    "Constants": [
      "Integer Constants",
      "Floating-point Constants",
      "Character Constants",
      "String Literals",
      "Defining Constants (#define, const)"
    ]
  },
  "Operators & Expressions": {
    "Arithmetic Operators": [
      "+, -, *, /, %",
      "Increment (++), Decrement (--)"
    ],
    "Relational Operators": [
      "==, !=, >, <, >=, <="
    ],
    "Logical Operators": [
      "&& (AND), || (OR), ! (NOT)"
    ],
    "Bitwise Operators": [
      "&, |, ^, ~",
      "Left Shift (<<), Right Shift (>>)"
    ],
    "Assignment Operators": [
      "=, +=, -=, *=, /=, %=",
      "&=, |=, ^=, <<=, >>="
    ],
    "Misc Operators": [
      "sizeof() Operator",
      "Ternary Operator (?:)",
      "Comma Operator (,)",
      "Address (&) and Pointer (*)"
    ],
    "Operator Precedence": [
      "Precedence and Associativity Rules"
    ]
  },
  "Input/Output": {
    "Standard I/O": [
      "printf() Function",
      "scanf() Function",
      "Format Specifiers",
      "Escape Sequences"
    ],
    "Character I/O": [
      "getchar() and putchar()",
      "gets() and puts()",
      "fgets() and fputs()"
    ],
    "File I/O": [
      "FILE Pointer",
      "fopen() and fclose()",
      "Reading from Files",
      "Writing to Files",
      "Binary File Operations"
    ]
  },
  "Control Statements": {
    "Decision Making": [
      "if Statement",
      "if-else Statement",
      "Nested if-else",
      "else-if Ladder",
      "switch Statement"
    ],
    "Looping": [
      "while Loop",
      "do-while Loop",
      "for Loop",
      "Nested Loops",
      "break and continue",
      "goto Statement"
    ]
  },
  "Arrays": {
    "One-Dimensional Arrays": [
      "Array Declaration and Initialization",
      "Accessing Array Elements",
      "Array Bounds and Memory Layout",
      "Array Operations"
    ],
    "Multi-Dimensional Arrays": [
      "2D Arrays (Matrices)",
      "Row-major and Column-major Order",
      "3D Arrays"
    ],
    "Character Arrays": [
      "Strings as Character Arrays",
      "String Initialization",
      "Null Terminator (\\0)"
    ]
  },
  "Pointers": {
    "Pointer Basics": [
      "Understanding Memory Addresses",
      "Pointer Declaration",
      "Address-of Operator (&)",
      "Dereference Operator (*)",
      "Pointer Arithmetic",
      "NULL Pointer"
    ],
    "Pointers & Arrays": [
      "Array Name as Pointer",
      "Pointer to Array",
      "Array of Pointers",
      "Pointer Arithmetic with Arrays"
    ],
    "Advanced Pointers": [
      "Pointer to Pointer (Double Pointer)",
      "Pointer to Function",
      "void Pointer",
      "Dangling Pointer",
      "Wild Pointer"
    ],
    "Dynamic Memory": [
      "malloc() Function",
      "calloc() Function",
      "realloc() Function",
      "free() Function",
      "Memory Leak Prevention"
    ]
  },
  "Functions": {
    "Function Basics": [
      "Function Declaration (Prototype)",
      "Function Definition",
      "Function Call",
      "Return Statement",
      "Parameters vs Arguments"
    ],
    "Parameter Passing": [
      "Pass by Value",
      "Pass by Reference (Using Pointers)",
      "Array as Function Parameter"
    ],
    "Function Types": [
      "Library Functions",
      "User-defined Functions",
      "Recursive Functions",
      "Inline Functions",
      "Static Functions"
    ],
    "Scope & Storage": [
      "Local vs Global Scope",
      "Block Scope",
      "Storage Classes (auto, register, static, extern)"
    ]
  },
  "Strings": {
    "String Operations": [
      "String Length (strlen())",
      "String Copy (strcpy(), strncpy())",
      "String Concatenation (strcat(), strncat())",
      "String Comparison (strcmp(), strncmp())",
      "String Search (strchr(), strstr())"
    ],
    "Character Handling": [
      "Character Classification (isalpha(), isdigit())",
      "Character Conversion (toupper(), tolower())"
    ],
    "Memory Functions": [
      "memcpy()",
      "memmove()",
      "memset()",
      "memcmp()"
    ]
  },
  "Structures & Unions": {
    "Structures": [
      "Structure Definition",
      "Structure Variable Declaration",
      "Accessing Structure Members",
      "Array of Structures",
      "Nested Structures",
      "Pointer to Structure (->)",
      "Structure Padding"
    ],
    "Unions": [
      "Union Definition",
      "Structure vs Union",
      "Union Memory Allocation"
    ],
    "Typedef & Enums": [
      "typedef Keyword",
      "Creating Aliases",
      "Enumeration Types (enum)",
      "Enum vs #define"
    ]
  },
  "Preprocessor Directives": {
    "File Inclusion": [
      "#include Directive",
      "Angle Brackets vs Quotes"
    ],
    "Macro Definitions": [
      "#define Directive",
      "Object-like Macros",
      "Function-like Macros",
      "# and ## Operators"
    ],
    "Conditional Compilation": [
      "#ifdef, #ifndef, #endif",
      "#if, #elif, #else",
      "#undef Directive",
      "Predefined Macros"
    ]
  },
  "Memory Management": {
    "Memory Layout": [
      "Text Segment (Code)",
      "Data Segment",
      "BSS Segment",
      "Stack Memory",
      "Heap Memory"
    ],
    "Stack Operations": [
      "Function Call Stack",
      "Stack Frame",
      "Stack Overflow"
    ],
    "Heap Management": [
      "Dynamic Memory Allocation",
      "Memory Fragmentation",
      "Memory Leak Detection",
      "Valgrind Tool"
    ]
  },
  "File Handling": {
    "File Modes": [
      "Text vs Binary Files",
      "File Opening Modes (r, w, a, r+, w+, a+)",
      "Binary Modes (rb, wb, ab)"
    ],
    "File Operations": [
      "Character I/O (fgetc(), fputc())",
      "String I/O (fgets(), fputs())",
      "Formatted I/O (fprintf(), fscanf())",
      "Binary I/O (fread(), fwrite())"
    ],
    "File Positioning": [
      "ftell() Function",
      "fseek() Function",
      "rewind() Function",
      "Random Access Files"
    ],
    "Error Handling": [
      "feof() Function",
      "ferror() Function",
      "perror() Function",
      "errno Variable"
    ]
  },
  "Advanced Concepts": {
    "Command Line Args": [
      "argc and argv Parameters",
      "Processing Command Line Arguments"
    ],
    "Bit Fields": [
      "Bit Field Declaration",
      "Memory Saving with Bit Fields"
    ],
    "Variable Arguments": [
      "stdarg.h Library",
      "va_list, va_start, va_arg, va_end"
    ],
    "Recursion": [
      "Recursive Function Design",
      "Base Case and Recursive Case",
      "Recursion vs Iteration"
    ]
  },
  "Data Structures": {
    "Linked Lists": [
      "Singly Linked List",
      "Doubly Linked List",
      "Circular Linked List",
      "Linked List Operations"
    ],
    "Stacks": [
      "Stack Implementation (Array-based)",
      "Stack Implementation (Linked List)",
      "Stack Operations (Push, Pop, Peek)"
    ],
    "Queues": [
      "Queue Implementation",
      "Circular Queue",
      "Priority Queue",
      "Queue Operations"
    ],
    "Trees": [
      "Binary Tree",
      "Binary Search Tree (BST)",
      "Tree Traversals",
      "AVL Trees (Introduction)"
    ],
    "Graphs": [
      "Graph Representation",
      "Graph Traversal (BFS, DFS)"
    ]
  },
  "Sorting & Searching": {
    "Sorting Algorithms": [
      "Bubble Sort",
      "Selection Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort",
      "Heap Sort"
    ],
    "Searching Algorithms": [
      "Linear Search",
      "Binary Search",
      "Complexity Analysis"
    ]
  },
  "C Standard Library": {
    "stdio.h": [
      "Standard I/O Functions",
      "File Operations"
    ],
    "stdlib.h": [
      "Memory Allocation",
      "Type Conversions",
      "Random Numbers"
    ],
    "string.h": [
      "String Manipulation Functions"
    ],
    "math.h": [
      "Mathematical Functions"
    ],
    "time.h": [
      "Date and Time Functions"
    ],
    "ctype.h": [
      "Character Handling Functions"
    ]
  },
  "Debugging & Testing": {
    "Debugging Techniques": [
      "Print Statement Debugging",
      "Debugger Tools (GDB)",
      "Core Dump Analysis"
    ],
    "Testing": [
      "Unit Testing Concepts",
      "Test Case Design",
      "Boundary Value Testing"
    ],
    "Error Handling": [
      "Return Value Checking",
      "Error Codes",
      "Robust Programming"
    ]
  },
  "System Programming": {
    "Process Management": [
      "Process Creation (fork())",
      "Process Termination",
      "Process Control"
    ],
    "IPC": [
      "Pipes (pipe())",
      "Signals",
      "Shared Memory"
    ],
    "System Calls": [
      "Understanding System Calls",
      "Common System Calls"
    ]
  },
  "Multithreading": {
    "Thread Basics": [
      "Thread vs Process",
      "POSIX Threads (pthreads)",
      "Thread Creation and Termination"
    ],
    "Synchronization": [
      "Mutex (Mutual Exclusion)",
      "Semaphores",
      "Race Conditions",
      "Deadlock Prevention"
    ]
  },
  "Best Practices": {
    "Coding Standards": [
      "Naming Conventions",
      "Code Formatting",
      "Commenting Guidelines"
    ],
    "Performance": [
      "Optimization Techniques",
      "Memory Optimization",
      "CPU Optimization"
    ],
    "Security": [
      "Buffer Overflow Prevention",
      "Secure Coding Practices",
      "Input Validation"
    ]
  },
  "Practical Projects": {
    "Beginner Projects": [
      "Calculator Program",
      "Student Record System",
      "Bank Account Management",
      "Library Management System"
    ],
    "Intermediate Projects": [
      "File Compression Utility",
      "Mini Database System",
      "Text Editor",
      "Chat Application"
    ],
    "Advanced Projects": [
      "Shell Implementation",
      "Memory Allocator",
      "Compiler for C Subset",
      "OS Components"
    ]
  }
};

const seedCHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create C topic
    let cTopic = await Topic.findOne({ slug: 'c-programming' });
    if (!cTopic) {
      const topicCount = await Topic.countDocuments();
      cTopic = await Topic.create({
        name: 'C Programming',
        slug: 'c-programming',
        description: 'Master C programming - the foundation of modern programming. From fundamentals to system programming and data structures.',
        icon: '🔤',
        order: topicCount + 1,
        estimatedHours: 60
      });
      console.log('✅ Created C Programming topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(cHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '');
        
        let category = await Category.findOne({
          topicId: cTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: cTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName} in C`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = `${categorySlug}-${sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,&/]/g, '')
            .replace(/:/g, '')
            .replace(/#/g, 'hash-')
            .replace(/\\/g, '')}`;

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: cTopic._id,
              title: sectionTitle,
              slug: sectionSlug,
              order: sectionOrder++,
              description: `Learn about ${sectionTitle}`,
              difficulty: 'beginner',
              estimatedTime: 30
            });
          }
        }
      }
    }

    console.log('🎉 C Programming hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding C Programming:', error);
    process.exit(1);
  }
};

seedCHierarchy();
