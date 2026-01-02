
const typescriptCurriculum = {

  "00_typescript_mental_model": {
    "why_typescript_exists": [
      "What is TypeScript",
      "TypeScript vs JavaScript",
      "Advantages of TypeScript",
      "Disadvantages of TypeScript",
      "Statically typed language",
      "Dynamically typed language",
      "Static type checker",
      "Erased types",
      "Tooling in TypeScript"
    ],
    "typescript_runtime_reality": [
      "TypeScript is not runtime",
      "Types disappear after compilation",
      "JavaScript is the final output",
      "Why types catch bugs before runtime"
    ]
  },

  "01_environment_and_compilation": {
    "setup_and_compilation": [
      "Installation and configuration of TypeScript",
      "Compiling TypeScript to JavaScript",
      "Compilation vs Transpilation",
      "tsc compiler",
      "tsc flags",
      "watch mode"
    ]
  },

  "02_tsconfig_and_project_control": {
    "compiler_configuration": [
      "tsconfig.json",
      "target option",
      "module types",
      "strict flag",
      "noEmitOnError flag",
      "noImplicitAny flag",
      "allowImplicitAny",
      "strictNullChecks",
      "strictPropertyInitialization",
      "outFile option",
      "Tree shaking in TypeScript"
    ]
  },

  "03_primitive_and_core_types": {
    "basic_types": [
      "string type",
      "number type",
      "boolean type",
      "null type",
      "undefined type",
      "bigint type",
      "symbol type",
      "void type",
      "never type"
    ],
    "structural_types": [
      "array type",
      "object type",
      "Function type"
    ],
    "escape_hatches": [
      "any type",
      "unknown type"
    ]
  },

  "04_type_inference_and_control": {
    "type_inference": [
      "Type annotation",
      "Type inference",
      "Contextual typing",
      "Literal inference",
      "Inference rules",
      "Return type annotation"
    ],
    "type_assertion": [
      "Type assertion using 'as'",
      "Type assertion using '<>'",
      "Force casting",
      "Non-null assertion operator (!)",
      "Type assertion vs Type casting"
    ]
  },

  "05_type_narrowing_and_safety": {
    "narrowing_strategies": [
      "Type narrowing",
      "Type guards",
      "Type predicate",
      "Truthiness narrowing",
      "Equality narrowing",
      "in operator narrowing",
      "instanceof narrowing",
      "Discriminated unions",
      "Control flow analysis",
      "Exhaustive checking",
      "Assertion functions"
    ]
  },

  "06_custom_type_construction": {
    "type_creation": [
      "Type aliases",
      "Literal types",
      "Tuple types",
      "Optional tuple elements",
      "Rest elements in tuples",
      "as const"
    ],
    "type_operators": [
      "Union types",
      "Intersection types",
      "Indexed access types",
      "keyof operator",
      "typeof operator",
      "in operator"
    ]
  },

  "07_interfaces_and_structural_typing": {
    "interface_concepts": [
      "What is Interface",
      "Anonymous types",
      "Duck typing / Structural typing",
      "Interface vs Type",
      "Interface inheritance",
      "Interface extension",
      "Extends vs Intersection",
      "Declaration merging",
      "Reopening of interface",
      "Merging Interfaces"
    ],
    "interface_implementation": [
      "Optional properties in interfaces",
      "Readonly properties in interfaces",
      "Function interfaces",
      "Call signatures",
      "Method signatures",
      "Construct signature"
    ]
  },

  "08_functions_and_call_signatures": {
    "function_types": [
      "Function declarations",
      "Arrow functions",
      "Lambda functions",
      "Anonymous functions",
      "Higher-order functions"
    ],
    "parameters": [
      "Parameter type annotation",
      "Optional parameters",
      "Default parameters",
      "Rest parameters",
      "Parameter destructuring",
      "Variadic functions"
    ],
    "advanced_functions": [
      "Function overloading",
      "Declaring this in function",
      "Function type expressions",
      "Contextual typing for functions",
      "Void return type",
      "Never return type"
    ]
  },

  "09_classes_and_oop_modeling": {
    "class_basics": [
      "Class definition",
      "Object creation",
      "Constructor",
      "Constructor chaining",
      "Readonly vs const"
    ],
    "class_features": [
      "Access modifiers (public, private, protected)",
      "Static keyword",
      "Static methods",
      "Static properties",
      "Getters and Setters",
      "Abstract class",
      "Concrete method"
    ],
    "inheritance": [
      "Types of inheritance",
      "Extends keyword",
      "Implements clause",
      "Super keyword",
      "Method overriding",
      "Override keyword",
      "Call parent class method from child class",
      "Call parent class constructor from child class",
      "Multiple inheritance implementation"
    ],
    "special_classes": [
      "Singleton class",
      "Static class",
      "Classes with index signature"
    ]
  },

  "10_generics_core_to_advanced": {
    "generics_basics": [
      "What are Generics",
      "Generic functions",
      "Generic classes",
      "Generic identity function",
      "Type argument inference",
      "Generic parameter defaults"
    ],
    "generics_constraints": [
      "Generic constraints",
      "Keyof with generics",
      "Generic object types"
    ]
  },

  "11_advanced_type_programming": {
    "conditional_and_computed_types": [
      "Conditional types",
      "Infer keyword",
      "Distributive conditional types",
      "Mapped types with generics",
      "Variance annotations"
    ],
    "mapped_types": [
      "What are Mapped Types",
      "Record type",
      "Homomorphic mapped types",
      "Creating new types from existing ones",
      "Adding/removing modifiers",
      "Transforming property types"
    ]
  },

  "12_built_in_utility_types": {
    "utility_types": [
      "Partial<T>",
      "Required<T>",
      "Readonly<T>",
      "Record<K, T>",
      "Pick<T, K>",
      "Omit<T, K>",
      "Exclude<T, U>",
      "Extract<T, U>",
      "NonNullable<T>",
      "Parameters<T>",
      "ReturnType<T>",
      "InstanceType<T>"
    ]
  },

  "13_modules_namespaces_and_code_organization": {
    "modules": [
      "Module definition",
      "Export keyword",
      "Import keyword",
      "Default exports",
      "Named exports",
      "Module types (CommonJS, ES6, etc.)",
      "Module augmentation",
      "Type only imports/exports"
    ],
    "namespaces": [
      "Namespace definition",
      "Namespace keyword",
      "Multi-file namespaces"
    ]
  },

  "14_async_error_null_safety": {
    "async_programming": [
      "Asynchronous Programming in TypeScript",
      "Async/await syntax",
      "Promise type",
      "Promise that resolves to string"
    ],
    "null_undefined_handling": [
      "Handling null and undefined",
      "Optional chaining operator (?.)",
      "Non-null assertion operator (!)",
      "strictNullChecks"
    ]
  },

  "15_decorators_and_meta_programming": {
    "decorator_concepts": [
      "What are Decorators",
      "Purpose of Decorators",
      "Decorator syntax",
      "Decorator evaluation order",
      "Decorator composition"
    ],
    "decorator_types": [
      "Class decorators",
      "Method decorators",
      "Accessor decorators",
      "Property decorators",
      "Parameter decorators"
    ],
    "decorator_implementation": [
      "Decorator factory",
      "Custom decorators",
      "Factory decorators",
      "Decorator evaluation"
    ]
  },

  "16_design_principles_and_patterns": {
    "solid": [
      "SOLID principles",
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle",
      "Dependency Inversion Principle"
    ],
    "patterns": [
      "Factory pattern",
      "Singleton pattern",
      "Dependency Injection",
      "Inversion of Control",
      "Repository pattern",
      "Mixins",
      "Constrained Mixins"
    ]
  },

  "17_advanced_language_features": [
    "Declaration merging",
    "Ambient declarations",
    "Module augmentation",
    "Template literal types",
    "String interpolation",
    "Iterators and Generators",
    "Symbol type"
  ],

  "18_real_world_typescript_usage": {
    "practical_applications": [
      "API calls using Fetch or Axios in TypeScript",
      "Creating proper request and response models",
      "Error handling in TypeScript",
      "Debugging TypeScript files",
      "Best Practices of TypeScript",
      "Optimizing TypeScript performance",
      "Following coding conventions"
    ]
  }

};


export { typescriptCurriculum };
