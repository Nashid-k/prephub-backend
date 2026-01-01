
const pythonCurriculum = {
  "Python_Foundations": {
    "language_basics": [
      "Python 2 vs Python 3",
      "Interpreter & Bytecode (CPython)",
      "PEP 8 Style Guide",
      "Dynamic Typing Philosophy",
      "Memory Management (Reference Counting)",
      "Garbage Collection Mechanics"
    ],
    "environment_setup": [
      "Virtual Environments (venv)",
      "Package Management (pip)",
      "Dependency Management (requirements.txt)",
      "Modern Packaging (Poetry/Pipenv)",
      "Jupyter Notebooks Setup"
    ],
    "syntax_deep_dive": [
      "Walrus Operator (:=)",
      "Pattern Matching (match/case)",
      "F-Strings Advanced Formatting",
      "Slicing & Striding",
      "Comprehensions (List, Dict, Set)"
    ]
  },
  "Data_Structures_Algorithms": {
    "built_in_types": [
      "Lists vs Tuples (Mutability)",
      "Dictionaries (Hash Tables)",
      "Sets (Theory & Operations)",
      "Collections Module (Counter, deque, namedtuple)",
      "Heapq (Priority Queues)"
    ],
    "algorithms_in_python": [
      "Sorting (Timsort Internals)",
      "Binary Search (bisect module)",
      "Recursion & Memoization",
      "Graph Traversal Implementations"
    ],
    "essential_problems": [
      "Reverse a string/list (Slicing vs Methods)",
      "Check Palindrome",
      "Find Anagrams",
      "Count Character Frequency",
      "Flatten Nested Lists",
      "Merge Dictionaries",
      "Fibonacci (Iterative vs Recursive)"
    ]
  },
  "Object_Oriented_Programming": {
    "oop_core": [
      "Classes & Instances",
      "Constructors (__init__ vs __new__)",
      "Instance vs Class vs Static Methods",
      "Property Decorators (@property)",
      "Magic Methods (Dunder Methods)"
    ],
    "oop_advanced": [
      "Inheritance & Composition",
      "Method Resolution Order (MRO)",
      "Abstract Base Classes (ABC)",
      "Mixins & Multiple Inheritance",
      "Dataclasses & Pydantic"
    ],
    "metaprogramming": [
      "Decorators (Function & Class)",
      "Context Managers (with statement)",
      "Descriptors Protocol",
      "Metaclasses (__metaclass__)",
      "Monkey Patching"
    ]
  },
  "Functional_Programming": {
    "functional_concepts": [
      "Lambda Functions",
      "Higher-Order Functions",
      "Map, Filter, Reduce",
      "Iterators & Generators",
      "Yield vs Yield From"
    ],
    "itertools_module": [
      "Infinite Iterators",
      "Combinatoric Iterators",
      "Terminating Iterators",
      "Functools (partial, lru_cache)",
      "Closure & Scope (LEGB Rule)"
    ]
  },
  "Concurrency_Parallelism": {
    "threading_multiprocessing": [
      "Global Interpreter Lock (GIL)",
      "Threading Module Basics",
      "Multiprocessing Module",
      "ProcessPoolExecutor",
      "ThreadPoolExecutor"
    ],
    "async_io": [
      "Async/Await Syntax",
      "Event Loop Fundamentals",
      "Coroutines & Tasks",
      "Asyncio Module Deep Dive",
      "Aiohttp for Async Requests"
    ]
  },
  "Web_Dev_Data_Science": {
    "web_frameworks": [
      "WSGI vs ASGI Standards",
      "Django (ORM, Admin, MVT)",
      "Flask (Blueprints, Patterns)",
      "FastAPI (Pydantic, Async)",
      "REST API Design"
    ],
    "data_science_stack": [
      "NumPy (Broadcasting, Arrays)",
      "Pandas (DataFrames, Cleaning)",
      "Matplotlib/Seaborn (Visualization)",
      "Jupyter Workflow"
    ],
    "testing_qa": [
      "Unittest vs Pytest",
      "Fixtures and Mocking",
      "Code Coverage",
      "Type Checking (Mypy)"
    ]
  },
  "Interview_Prep": {
    "core_concepts": [
      "Mutable vs Immutable Arguments",
      "List vs Tuple vs Set vs Dict Performance",
      "Deep Copy vs Shallow Copy",
      "Decorator Implementation",
      "Generator Memory Benefits",
      "GIL Impact on CPU-bound Tasks"
    ],
    "practical_projects": [
      "Web Scraper (BeautifulSoup/Scrapy)",
      "REST API with FastAPI",
      "File Organizer Script",
      "Task Manager CLI"
    ]
  }
};

export { pythonCurriculum };
