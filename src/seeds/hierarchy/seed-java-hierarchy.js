
const javaCurriculum = {
  "Java_Foundations": {
    "java_overview": [
      "History and Features",
      "JDK vs JRE vs JVM Overview",
      "Bytecode and Platform Independence",
      "Main Method Anatomy",
      "Java Editions (SE, EE, ME)"
    ],
    "syntax_basics": [
      "Data Types (Primitive vs Reference)",
      "Variables and Scope",
      "Operators and Expressions",
      "Control Flow (if-else, switch, loops)",
      "Arrays (Single vs Multi-dimensional)",
      "Strings (Immutable, Pooling)"
    ],
    "oop_concepts": [
      "Classes and Objects",
      "Constructors (No-arg, Parameterized)",
      "Inheritance (extends, super)",
      "Polymorphism (Overloading vs Overriding)",
      "Encapsulation (Access Modifiers)",
      "Abstraction (Abstract Classes vs Interfaces)"
    ]
  },
  "Java_Core_Libraries": {
    "collections_framework": [
      "Collection Interface Hierarchy",
      "List (ArrayList, LinkedList, Vector)",
      "Set (HashSet, TreeSet, LinkedHashSet)",
      "Map (HashMap, TreeMap, LinkedHashMap)",
      "Queue and Deque (PriorityQueue)",
      "Comparable vs Comparator",
      "Iterators and fail-fast behavior"
    ],
    "exception_handling": [
      "Exception Hierarchy (Checked vs Unchecked)",
      "Try-Catch-Finally Blocks",
      "Throw vs Throws",
      "Custom Exceptions",
      "Try-with-Resources (AutoCloseable)"
    ],
    "io_nio": [
      "File Handling (File Class)",
      "Byte Streams vs Character Streams",
      "Serialization vs Deserialization",
      "BufferedReader vs Scanner",
      "NIO (Buffers, Channels, Selectors)"
    ]
  },
  "Advanced_Java": {
    "concurrency_multithreading": [
      "Thread Lifecycle & States",
      "Runnable vs Thread Class",
      "Synchronization and Locks",
      "Volatile Keyword",
      "Executor Framework & Thread Pools",
      "Callable vs Runnable",
      "CompletableFuture",
      "Virtual Threads (Project Loom)"
    ],
    "jvm_internals": [
      "Classloader Subsystem",
      "Runtime Data Areas (Heap, Stack, Method Area)",
      "Garbage Collection Algorithms (G1, ZGC)",
      "Memory Leaks via VisualVM",
      "JIT Compiler (C1, C2)"
    ],
    "java_streams_api": [
      "Stream Creation and Pipeline",
      "Intermediate Operations (map, filter, flatMap)",
      "Terminal Operations (collect, reduce)",
      "Parallel Streams",
      "Functional Interfaces (Predicate, Consumer)"
    ]
  },
  "Modern_Java_Features": {
    "java_8_to_11": [
      "Lambda Expressions",
      "Method References (::)",
      "Optional Class",
      "Date and Time API (java.time)",
      "Var Keyword (Local Inference)",
      "Modules (Project Jigsaw)"
    ],
    "java_12_to_21": [
      "Switch Expressions",
      "Text Blocks (Multi-line Strings)",
      "Records (Data Classes)",
      "Sealed Classes",
      "Pattern Matching (instanceof, switch)",
      "Sequenced Collections"
    ]
  },
  "Professional_Development": {
    "spring_ecosystem": [
      "Spring Boot Intro (Starters, Auto-config)",
      "Dependency Injection (IoC)",
      "Spring Data JPA (Repository Pattern)",
      "REST Controllers",
      "Bean Scopes"
    ],
    "build_testing": [
      "Maven (POM, Lifecycles)",
      "Gradle Basics",
      "JUnit 5 (Annotations, Assertions)",
      "Mockito (Mocking dependencies)",
      "Test Driven Development (TDD)"
    ],
    "learning_projects": [
      "Bank Account Management System",
      "Library Management CLI",
      "Student Records with File I/O",
      "E-commerce Cart (Collections)",
      "Chat Application (Sockets/NIO)"
    ],
    "interview_prep_topics": [
      "String vs StringBuilder vs StringBuffer",
      "HashMap Internal Working (Collision)",
      "Equals vs HashCode Contract",
      "Singleton & Factory Patterns",
      "ACID in Database Transactions",
      "Memory Leaks in Java"
    ]
  }
};

export { javaCurriculum };
