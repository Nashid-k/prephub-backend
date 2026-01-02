
const pythonCurriculum = {

  "00_computational_thinking_and_python_philosophy": {
    "why_python": [
      "What Problems Python Solves Well",
      "Python Philosophy (Readability, Simplicity)",
      "Dynamic Typing Trade-offs",
      "Python in Backend, Data, Automation, AI"
    ],
    "python_versions": [
      "Python 2 vs Python 3",
      "Why Python 2 Was Deprecated",
      "Backward Compatibility Considerations"
    ]
  },

  "01_python_execution_model_and_runtime": {
    "execution_pipeline": [
      "Interpreter Workflow",
      "Source Code → Bytecode → Execution",
      "CPython Overview",
      "Why Python Is Interpreted but Compiled"
    ],
    "memory_management": [
      "Object Model in Python",
      "Reference Counting",
      "Garbage Collection Mechanics",
      "Memory Fragmentation"
    ],
    "code_quality": [
      "PEP 8 Style Guide",
      "Readable vs Clever Code"
    ]
  },

  "02_environment_and_project_setup": {
    "environment_isolation": [
      "Virtual Environments (venv)",
      "Why Isolation Matters"
    ],
    "dependency_management": [
      "pip Package Manager",
      "requirements.txt",
      "Poetry and Pipenv",
      "Dependency Locking"
    ],
    "developer_tools": [
      "Jupyter Notebooks Setup",
      "REPL Usage Patterns"
    ]
  },

  "03_core_language_syntax": {
    "syntax_basics": [
      "Variables and Binding",
      "Indentation and Blocks",
      "Truthiness Rules",
      "Short-Circuit Evaluation"
    ],
    "modern_python_syntax": [
      "Walrus Operator (:=)",
      "Pattern Matching (match/case)",
      "F-Strings Advanced Formatting",
      "Slicing and Striding"
    ],
    "comprehensions": [
      "List Comprehensions",
      "Dict Comprehensions",
      "Set Comprehensions",
      "Readability vs Overuse"
    ]
  },

  "04_builtin_data_structures": {
    "core_collections": [
      "Lists vs Tuples (Mutability)",
      "Dictionaries (Hash Table Internals)",
      "Sets (Theory and Operations)"
    ],
    "collections_module": [
      "Counter",
      "deque",
      "namedtuple",
      "defaultdict"
    ],
    "special_structures": [
      "heapq (Priority Queues)"
    ]
  },

  "05_algorithms_and_problem_solving_in_python": {
    "algorithmic_tools": [
      "Sorting (Timsort Internals)",
      "Binary Search (bisect Module)",
      "Recursion",
      "Memoization"
    ],
    "graph_and_search": [
      "Graph Traversal Implementations"
    ],
    "essential_problems": [
      "Reverse String/List (Slicing vs Methods)",
      "Check Palindrome",
      "Find Anagrams",
      "Character Frequency Counting",
      "Flatten Nested Lists",
      "Merge Dictionaries",
      "Fibonacci (Iterative vs Recursive)"
    ]
  },

  "06_object_oriented_programming_core": {
    "class_fundamentals": [
      "Classes and Instances",
      "Constructors (__init__ vs __new__)",
      "Instance vs Class vs Static Methods",
      "Property Decorators (@property)"
    ],
    "magic_methods": [
      "Dunder Methods (__str__, __repr__, __eq__, etc.)",
      "Operator Overloading"
    ]
  },

  "07_advanced_oop_and_design": {
    "inheritance_models": [
      "Inheritance vs Composition",
      "Method Resolution Order (MRO)",
      "Multiple Inheritance",
      "Mixins"
    ],
    "abstractions": [
      "Abstract Base Classes (ABC)",
      "Interface-like Design in Python"
    ],
    "data_modeling": [
      "Dataclasses",
      "Pydantic Models"
    ]
  },

  "08_metaprogramming_and_language_internals": {
    "decorators": [
      "Function Decorators",
      "Class Decorators",
      "Decorator Implementation"
    ],
    "context_management": [
      "Context Managers",
      "with Statement Internals"
    ],
    "advanced_runtime": [
      "Descriptors Protocol",
      "Metaclasses",
      "Monkey Patching"
    ]
  },

  "09_functional_programming_and_iteration": {
    "functional_primitives": [
      "Lambda Functions",
      "Higher-Order Functions",
      "Map, Filter, Reduce"
    ],
    "iterators_generators": [
      "Iterators",
      "Generators",
      "Yield vs Yield From"
    ],
    "itertools_functools": [
      "Infinite Iterators",
      "Combinatoric Iterators",
      "Terminating Iterators",
      "functools.partial",
      "functools.lru_cache",
      "Closures and LEGB Rule"
    ]
  },

  "10_concurrency_and_parallelism": {
    "threading_model": [
      "Global Interpreter Lock (GIL)",
      "Threading Module",
      "ThreadPoolExecutor"
    ],
    "multiprocessing_model": [
      "Multiprocessing Module",
      "ProcessPoolExecutor",
      "CPU-bound vs I/O-bound Tasks"
    ]
  },

  "11_async_and_event_driven_programming": {
    "async_fundamentals": [
      "Async/Await Syntax",
      "Event Loop Fundamentals",
      "Coroutines and Tasks"
    ],
    "asyncio_ecosystem": [
      "Asyncio Deep Dive",
      "Aiohttp for Async Requests"
    ]
  },

  "12_web_development_and_data_ecosystems": {
    "web_architecture": [
      "WSGI vs ASGI Standards",
      "REST API Design Principles"
    ],
    "web_frameworks": [
      "Flask (Blueprints, Patterns)",
      "Django (ORM, Admin, MVT)",
      "FastAPI (Pydantic, Async)"
    ],
    "data_science_stack": [
      "NumPy (Arrays, Broadcasting)",
      "Pandas (DataFrames, Cleaning)",
      "Matplotlib and Seaborn",
      "Jupyter Data Workflow"
    ]
  },

  "13_testing_quality_and_type_safety": {
    "testing_frameworks": [
      "Unittest",
      "Pytest",
      "Fixtures and Mocking"
    ],
    "quality_assurance": [
      "Code Coverage",
      "Static Analysis",
      "Type Checking with Mypy"
    ]
  },

  "14_system_level_thinking_and_interviews": {
    "core_concepts": [
      "Mutable vs Immutable Arguments",
      "List vs Tuple vs Set vs Dict Performance",
      "Deep Copy vs Shallow Copy",
      "Generator Memory Benefits",
      "GIL Impact on CPU-bound Tasks"
    ],
    "practical_projects": [
      "Web Scraper (BeautifulSoup or Scrapy)",
      "REST API with FastAPI",
      "File Organizer Script",
      "Task Manager CLI"
    ]
  }

};

export { pythonCurriculum };
