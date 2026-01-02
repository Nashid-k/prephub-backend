
const javaCurriculum = {

  "01_java_platform_and_language_basics": {
    "java_overview": [
      "History and Features",
      "Java Editions (SE, EE, ME)",
      "JDK vs JRE vs JVM Overview",
      "Bytecode and Platform Independence",
      "Main Method Anatomy"
    ]
  },

  "02_core_syntax_and_data_model": {
    "syntax_basics": [
      "Data Types (Primitive vs Reference)",
      "Variables and Scope",
      "Operators and Expressions",
      "Control Flow (if-else, switch, loops)",
      "Arrays (Single vs Multi-dimensional)",
      "Strings (Immutable, Pooling)"
    ]
  },

  "03_object_oriented_programming": {
    "oop_concepts": [
      "Classes and Objects",
      "Constructors (No-arg, Parameterized)",
      "Encapsulation (Access Modifiers)",
      "Inheritance (extends, super)",
      "Polymorphism (Overloading vs Overriding)",
      "Abstraction (Abstract Classes vs Interfaces)"
    ]
  },

  "04_exception_handling_and_resource_management": {
    "exception_handling": [
      "Exception Hierarchy (Checked vs Unchecked)",
      "Try-Catch-Finally Blocks",
      "Throw vs Throws",
      "Custom Exceptions",
      "Try-with-Resources (AutoCloseable)"
    ]
  },

  "05_collections_and_data_structures": {
    "collections_framework": [
      "Collection Interface Hierarchy",
      "List (ArrayList, LinkedList, Vector)",
      "Set (HashSet, TreeSet, LinkedHashSet)",
      "Map (HashMap, TreeMap, LinkedHashMap)",
      "Queue and Deque (PriorityQueue)",
      "Comparable vs Comparator",
      "Iterators and fail-fast behavior"
    ]
  },

  "06_input_output_and_nio": {
    "io_nio": [
      "File Handling (File Class)",
      "Byte Streams vs Character Streams",
      "BufferedReader vs Scanner",
      "Serialization vs Deserialization",
      "NIO (Buffers, Channels, Selectors)"
    ]
  },

  "07_concurrency_and_parallelism": {
    "concurrency_multithreading": [
      "Thread Lifecycle & States",
      "Runnable vs Thread Class",
      "Synchronization and Locks",
      "Volatile Keyword",
      "Executor Framework & Thread Pools",
      "Callable vs Runnable",
      "CompletableFuture",
      "Virtual Threads (Project Loom)"
    ]
  },

  "08_jvm_internals_and_performance": {
    "jvm_internals": [
      "Classloader Subsystem",
      "Runtime Data Areas (Heap, Stack, Method Area)",
      "Garbage Collection Algorithms (G1, ZGC)",
      "Memory Leaks via VisualVM",
      "JIT Compiler (C1, C2)"
    ]
  },

  "09_functional_and_stream_processing": {
    "java_streams_api": [
      "Stream Creation and Pipeline",
      "Intermediate Operations (map, filter, flatMap)",
      "Terminal Operations (collect, reduce)",
      "Parallel Streams",
      "Functional Interfaces (Predicate, Consumer)"
    ]
  },

  "10_modern_java_language_features": {
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

  "11_frameworks_build_and_testing": {
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
    ]
  },

  "12_practical_projects_and_professional_depth": {
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
