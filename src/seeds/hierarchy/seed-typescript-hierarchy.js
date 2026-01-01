
const typescriptCurriculum = {
  "TypeScript": {
    "01_foundations": {
      "concepts": [
        "What is TypeScript",
        "TypeScript vs JavaScript",
        "Advantages of TypeScript",
        "Disadvantages of TypeScript",
        "Statically typed language",
        "Dynamically typed language",
        "Static type checker",
        "Tooling in TypeScript",
        "Erased types",
        "Installation and configuration of TypeScript",
        "Compiling TypeScript to JavaScript",
        "Compilation vs Transpilation",
        "tsc compiler",
        "tsc flags"
      ]
    },

    "02_configuration": {
      "tsconfig": [
        "tsconfig.json",
        "target option",
        "module types",
        "strict flag",
        "noEmitOnError flag",
        "noImplicitAny flag",
        "strictNullChecks",
        "allowImplicitAny",
        "strictPropertyInitialization",
        "outFile option",
        "watch mode",
        "Tree shaking in TypeScript"
      ]
    },

    "03_basic_types": [
      "string type",
      "number type",
      "boolean type",
      "array type",
      "null type",
      "undefined type",
      "bigint type",
      "symbol type",
      "object type",
      "Function type",
      "any type",
      "unknown type",
      "never type",
      "void type"
    ],

    "04_advanced_types": {
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
        "Conditional types",
        "Indexed access types",
        "keyof operator",
        "typeof operator",
        "in operator",
        "Infer keyword",
        "Distributive conditional types"
      ],
      "type_modifiers": [
        "Optional properties",
        "Readonly properties",
        "ReadonlyArray",
        "Index signatures",
        "Excess property checking"
      ]
    },

    "05_type_management": {
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
      ],
      "type_narrowing": [
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

    "06_interfaces": {
      "concepts": [
        "What is Interface",
        "Anonymous types",
        "Duck typing / Structural typing",
        "Interface vs Type",
        "Interface inheritance",
        "Interface extension",
        "Declaration merging",
        "Reopening of interface",
        "Extends vs Intersection",
        "Merging Interfaces"
      ],
      "implementation": [
        "Optional properties in interfaces",
        "Readonly properties in interfaces",
        "Function interfaces",
        "Call signatures",
        "Method signatures",
        "Construct signature"
      ]
    },

    "07_classes": {
      "oop_concepts": [
        "Class definition",
        "Object creation",
        "Constructor",
        "Constructor chaining",
        "Access modifiers (public, private, protected)",
        "Static keyword",
        "Static methods",
        "Static properties",
        "Getters and Setters",
        "Abstract class",
        "Concrete method",
        "Readonly vs const"
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

    "08_generics": {
      "concepts": [
        "What are Generics",
        "Generic functions",
        "Generic classes",
        "Generic constraints",
        "Generic parameter defaults",
        "Type argument inference",
        "Generic identity function",
        "Application of generics"
      ],
      "advanced": [
        "Generic object types",
        "Keyof with generics",
        "Conditional types with generics",
        "Variance annotations",
        "Mapped types with generics"
      ]
    },

    "09_functions": {
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
      "advanced": [
        "Function overloading",
        "Declaring this in function",
        "Function type expressions",
        "Void return type",
        "Never return type",
        "Contextual typing for functions"
      ]
    },

    "10_decorators": {
      "concepts": [
        "What are Decorators",
        "Purpose of Decorators",
        "Decorator syntax",
        "Decorator evaluation order",
        "Decorator composition"
      ],
      "types": [
        "Class decorators",
        "Method decorators",
        "Accessor decorators",
        "Property decorators",
        "Parameter decorators"
      ],
      "implementation": [
        "Decorator factory",
        "Custom decorators",
        "Factory decorators",
        "Decorator evaluation"
      ]
    },

    "11_utility_types": [
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
    ],

    "12_mapped_types": {
      "concepts": [
        "What are Mapped Types",
        "Record type",
        "Homomorphic mapped types"
      ],
      "applications": [
        "Creating new types from existing ones",
        "Adding/removing modifiers",
        "Transforming property types"
      ]
    },

    "13_enums": {
      "concepts": [
        "What are Enums",
        "Advantages of Enums",
        "Numeric enums",
        "String enums",
        "Heterogeneous enums",
        "Constant vs computed enums"
      ]
    },

    "14_modules_namespaces": {
      "modules": [
        "Module definition",
        "Export keyword",
        "Import keyword",
        "Default exports",
        "Named exports",
        "Module types (CommonJS, ES6, etc.)",
        "Module augmentation"
      ],
      "namespaces": [
        "Namespace definition",
        "Namespace keyword",
        "Multi-file namespaces"
      ]
    },

    "15_error_handling": {
      "async": [
        "Asynchronous Programming in TypeScript",
        "Async/await syntax",
        "Promise type",
        "Promise that resolves to string"
      ],
      "null_undefined": [
        "Handling null and undefined",
        "Optional chaining operator (?.)",
        "Non-null assertion operator (!)",
        "strictNullChecks"
      ]
    },

    "16_design_patterns_principles": {
      "solid": [
        "SOLID principles",
        "Single Responsibility Principle",
        "Open/Closed Principle",
        "Liskov Substitution Principle",
        "Interface Segregation Principle",
        "Dependency Inversion Principle"
      ],
      "design_patterns": [
        "Factory pattern",
        "Singleton pattern",
        "Dependency Injection",
        "Inversion of Control",
        "Repository pattern",
        "Mixins",
        "Constrained Mixins"
      ]
    },

    "17_advanced_concepts": [
      "Declaration merging",
      "Ambient declarations",
      "Module augmentation",
      "Type only imports/exports",
      "Conditional types",
      "Template literal types",
      "String interpolation",
      "Iterators and Generators",
      "Symbol type"
    ],

    "18_practical_applications": [
      "API calls using Fetch or Axios in TypeScript",
      "Creating proper request and response models",
      "Error handling in TypeScript",
      "Debugging TypeScript files",
      "Best Practices of TypeScript",
      "Optimizing TypeScript performance",
      "Following coding conventions"
    ]
  }
}

export { typescriptCurriculum };
