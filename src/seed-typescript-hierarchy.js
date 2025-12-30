
const typescriptCurriculum = {
    "learning_approach": {
      "progression_path": [
        "Start with JavaScript fundamentals",
        "Learn TypeScript syntax and basic types",
        "Master type system and advanced features",
        "Practice with real-world projects",
        "Study design patterns and best practices"
      ],
      "practice_strategy": [
        "Convert existing JavaScript code to TypeScript",
        "Build small projects from scratch",
        "Practice type inference and narrowing",
        "Work with third-party library types",
        "Implement TypeScript in team projects"
      ],
      "skill_levels": {
        "beginner": "Basic syntax, types, interfaces, classes",
        "intermediate": "Generics, decorators, advanced types, error handling",
        "advanced": "Type system mastery, design patterns, performance optimization",
        "expert": "Custom type utilities, compiler API, language service"
      }
    },
    "01_typescript_foundations": {
      "introduction": [
        { "topic": "What is TypeScript", "practice": "Convert simple JS file to TS" },
        { "topic": "TypeScript vs JavaScript comparison", "practice": "Identify benefits for different project types" },
        { "topic": "TypeScript design goals and philosophy", "practice": "Analyze when to use TypeScript vs JavaScript" },
        { "topic": "TypeScript compiler architecture", "practice": "Examine compiled JavaScript output" }
      ],
      "setup_development": [
        { "topic": "TypeScript installation (npm, yarn)", "practice": "Setup TypeScript in new project" },
        { "topic": "tsc compiler usage and flags", "practice": "Compile TypeScript with different options" },
        { "topic": "Compilation vs Transpilation concepts", "practice": "Compare Babel vs TypeScript compilation" },
        { "topic": "TypeScript playground usage", "practice": "Experiment with types in online editor" },
        { "topic": "Editor/IDE support (VSCode, WebStorm)", "practice": "Configure IDE for TypeScript development" }
      ]
    },
    "02_configuration_management": {
      "tsconfig_json": [
        { "topic": "tsconfig.json structure and purpose", "practice": "Create basic tsconfig from scratch" },
        { "topic": "Compiler options overview", "practice": "Configure project for different targets" },
        { "topic": "Target ECMAScript versions", "practice": "Compare output for ES5 vs ES2020" },
        { "topic": "Module system configuration", "practice": "Configure CommonJS vs ES modules" },
        { "topic": "Strict mode and its implications", "practice": "Enable strict mode gradually" }
      ],
      "project_configuration": [
        { "topic": "Path mapping and baseUrl", "practice": "Setup absolute imports" },
        { "topic": "Source map generation", "practice": "Debug TypeScript in browser" },
        { "topic": "Declaration files generation", "practice": "Create library with type definitions" },
        { "topic": "Watch mode and incremental compilation", "practice": "Configure fast development builds" },
        { "topic": "Project references for monorepos", "practice": "Setup multi-project configuration" }
      ]
    },
    "03_type_system_fundamentals": {
      "basic_types": [
        { "topic": "Primitive types: string, number, boolean", "practice": "Type basic variables and functions" },
        { "topic": "Special types: any, unknown, never, void", "practice": "Choose correct special type for scenarios" },
        { "topic": "Array and tuple types", "practice": "Create typed arrays and fixed-length tuples" },
        { "topic": "Object and Function types", "practice": "Type objects and function signatures" },
        { "topic": "Literal types and const assertions", "practice": "Create precise literal type constraints" }
      ],
      "type_annotations": [
        { "topic": "Variable type annotations", "practice": "Explicitly type all variables in a function" },
        { "topic": "Function parameter and return types", "practice": "Add complete type signatures to functions" },
        { "topic": "Type inference mechanisms", "practice": "Let TypeScript infer types where possible" },
        { "topic": "Contextual typing", "practice": "Observe type inference in callbacks" }
      ]
    },
    // ... including all other sections implicitly via iteration
    "04_interfaces_and_type_aliases": {
      "interface_declaration": [
        { "topic": "Interface syntax and usage", "practice": "Create interfaces for API responses" },
        { "topic": "Optional and readonly properties", "practice": "Design flexible but constrained interfaces" },
        { "topic": "Index signatures", "practice": "Create dynamic object structures" },
        { "topic": "Function and callable interfaces", "practice": "Type higher-order functions" },
        { "topic": "Construct signatures", "practice": "Type class constructors" }
      ],
      "type_aliases": [
        { "topic": "Type alias vs interface comparison", "practice": "Choose between type and interface" },
        { "topic": "Union and intersection types", "practice": "Combine types for complex scenarios" },
        { "topic": "Type composition patterns", "practice": "Build complex types from simple ones" },
        { "topic": "Declaration merging behavior", "practice": "Extend existing type definitions" }
      ]
    },
    "05_classes_and_oop": {
      "class_syntax": [
        { "topic": "Class declaration and instantiation", "practice": "Create class-based data models" },
        { "topic": "Access modifiers: public, private, protected", "practice": "Implement encapsulation in classes" },
        { "topic": "Readonly properties", "practice": "Create immutable class properties" },
        { "topic": "Static members and methods", "practice": "Implement utility methods on classes" },
        { "topic": "Getters and setters with type safety", "practice": "Create computed properties" }
      ],
      "inheritance_and_polymorphism": [
        { "topic": "Class inheritance with extends", "practice": "Build class hierarchies" },
        { "topic": "Abstract classes and methods", "practice": "Create base classes with required implementations" },
        { "topic": "Interface implementation with implements", "practice": "Ensure class contract compliance" },
        { "topic": "Method overriding and super calls", "practice": "Extend parent class functionality" },
        { "topic": "Polymorphism in TypeScript", "practice": "Use interfaces for polymorphic behavior" }
      ]
    },
    "06_generics": {
      "generic_fundamentals": [
        { "topic": "Generic functions and type parameters", "practice": "Create reusable typed functions" },
        { "topic": "Generic classes and interfaces", "practice": "Build type-safe data structures" },
        { "topic": "Generic constraints with extends", "practice": "Limit generic type possibilities" },
        { "topic": "Default type parameters", "practice": "Provide fallback types for generics" },
        { "topic": "Type inference with generics", "practice": "Let TypeScript infer generic types" }
      ],
      "advanced_generics": [
        { "topic": "Generic utility types creation", "practice": "Build custom mapped types" },
        { "topic": "Conditional types", "practice": "Create type-dependent logic" },
        { "topic": "Infer keyword usage", "practice": "Extract types from other types" },
        { "topic": "Distributive conditional types", "practice": "Work with union types in conditionals" },
        { "topic": "Variance annotations for generics", "practice": "Control type assignment compatibility" }
      ]
    },
    "07_advanced_type_system": {
      "type_manipulation": [
        { "topic": "Mapped types syntax and usage", "practice": "Transform object types programmatically" },
        { "topic": "Template literal types", "practice": "Create type-safe string templates" },
        { "topic": "Recursive type definitions", "practice": "Type nested data structures" },
        { "topic": "Branded/nominal types", "practice": "Create distinct type aliases" },
        { "topic": "Type predicates and user-defined type guards", "practice": "Implement custom type checking" }
      ],
      "type_narrowing": [
        { "topic": "Control flow based type narrowing", "practice": "Use if/switch for type discrimination" },
        { "topic": "Discriminated unions", "practice": "Create type-safe state machines" },
        { "topic": "Exhaustiveness checking with never", "practice": "Ensure all union cases are handled" },
        { "topic": "Assertion functions", "practice": "Create runtime type assertions" },
        { "topic": "Type narrowing with typeof and instanceof", "practice": "Handle multiple type possibilities" }
      ]
    },
    "08_utility_types": {
      "builtin_utilities": [
        { "topic": "Partial, Required, Readonly", "practice": "Make types optional or required" },
        { "topic": "Pick, Omit, Extract, Exclude", "practice": "Select and filter type properties" },
        { "topic": "Record and key mapping", "practice": "Create type-safe dictionaries" },
        { "topic": "Parameters and ReturnType", "practice": "Extract types from functions" },
        { "topic": "Awaited type for promises", "practice": "Unwrap promise types" }
      ],
      "custom_utilities": [
        { "topic": "Creating custom utility types", "practice": "Build project-specific type helpers" },
        { "topic": "Type composition patterns", "practice": "Combine multiple utility types" },
        { "topic": "Type inference in utilities", "practice": "Create intelligent type helpers" },
        { "topic": "Utility types for API responses", "practice": "Standardize API type patterns" }
      ]
    },
    "09_modules_and_namespaces": {
      "module_system": [
        { "topic": "ES Modules import/export syntax", "practice": "Organize code into modules" },
        { "topic": "Default vs named exports", "practice": "Choose appropriate export strategy" },
        { "topic": "Barrel files and re-exports", "practice": "Create clean public APIs" },
        { "topic": "Dynamic imports with types", "practice": "Type code splitting imports" },
        { "topic": "Module resolution strategies", "practice": "Configure complex import paths" }
      ],
      "declaration_files": [
        { "topic": ".d.ts declaration files", "practice": "Add types to JavaScript libraries" },
        { "topic": "Ambient declarations", "practice": "Declare global variables and types" },
        { "topic": "Module augmentation", "practice": "Extend third-party library types" },
        { "topic": "Triple-slash directives", "practice": "Manage type dependencies" }
      ]
    },
    "10_decorators_and_metaprogramming": {
      "decorator_basics": [
        { "topic": "Decorator syntax and application", "practice": "Add decorators to classes and methods" },
        { "topic": "Class, method, property decorators", "practice": "Implement different decorator types" },
        { "topic": "Parameter and accessor decorators", "practice": "Decorate constructor parameters" },
        { "topic": "Decorator factories", "practice": "Create configurable decorators" },
        { "topic": "Decorator composition and order", "practice": "Apply multiple decorators" }
      ],
      "practical_decorators": [
        { "topic": "Validation decorators", "practice": "Add runtime validation to properties" },
        { "topic": "Logging and profiling decorators", "practice": "Add automatic logging to methods" },
        { "topic": "Dependency injection decorators", "practice": "Implement simple DI framework" },
        { "topic": "ORM/model decorators", "practice": "Create database model definitions" }
      ]
    },
    "11_error_handling_and_async": {
      "type_safe_errors": [
        { "topic": "Typed error handling patterns", "practice": "Create error hierarchy with types" },
        { "topic": "Result/Either pattern implementation", "practice": "Handle errors without exceptions" },
        { "topic": "Custom error classes with types", "practice": "Create typed error instances" },
        { "topic": "Error boundary types", "practice": "Type React error boundaries" }
      ],
      "async_types": [
        { "topic": "Promise typing patterns", "practice": "Type async functions and promises" },
        { "topic": "Async/await type inference", "practice": "Use async functions with proper types" },
        { "topic": "Handling Promise rejections", "practice": "Type error cases in async code" },
        { "topic": "Concurrent promise typing", "practice": "Type Promise.all and similar methods" }
      ]
    },
    "12_design_patterns": {
      "creational_patterns": [
        { "pattern": "Factory Pattern", "implementation": "Create typed factory functions" },
        { "pattern": "Singleton Pattern", "implementation": "Implement type-safe singletons" },
        { "pattern": "Builder Pattern", "implementation": "Create fluent, typed builders" },
        { "pattern": "Prototype Pattern", "implementation": "Use TypeScript's type system for cloning" }
      ],
      "structural_patterns": [
        { "pattern": "Adapter Pattern", "implementation": "Create type adapters for libraries" },
        { "pattern": "Decorator Pattern", "implementation": "Implement using TypeScript decorators" },
        { "pattern": "Facade Pattern", "implementation": "Create simplified typed interfaces" },
        { "pattern": "Composite Pattern", "implementation": "Build tree structures with proper types" }
      ],
      "behavioral_patterns": [
        { "pattern": "Observer Pattern", "implementation": "Create type-safe event systems" },
        { "pattern": "Strategy Pattern", "implementation": "Implement interchangeable algorithms" },
        { "pattern": "Command Pattern", "implementation": "Create typed command objects" },
        { "pattern": "State Pattern", "implementation": "Implement state machines with types" }
      ]
    },
    "13_solid_principles": {
      "principles": [
        { "principle": "Single Responsibility", "practice": "Refactor classes to have single reasons to change" },
        { "principle": "Open/Closed", "practice": "Extend functionality without modifying existing code" },
        { "principle": "Liskov Substitution", "practice": "Ensure derived classes can substitute base classes" },
        { "principle": "Interface Segregation", "practice": "Create specific interfaces instead of general ones" },
        { "principle": "Dependency Inversion", "practice": "Depend on abstractions, not concretions" }
      ],
      "type_safe_implementation": [
        { "topic": "Dependency Injection with types", "practice": "Implement DI container with type safety" },
        { "topic": "Repository pattern typing", "practice": "Create typed data access layer" },
        { "topic": "Service layer typing", "practice": "Type business logic services" },
        { "topic": "DTO typing patterns", "practice": "Create type-safe data transfer objects" }
      ]
    },
    "14_practical_projects": {
      "beginner_projects": [
        { "project": "Typed Todo List Application", "focus": "Basic types, interfaces, classes" },
        { "project": "Type-safe Calculator", "focus": "Function types, union types" },
        { "project": "API Client Library", "focus": "Promise types, error handling" },
        { "project": "Form Validation Library", "focus": "Generic types, type predicates" }
      ],
      "intermediate_projects": [
        { "project": "State Management Library", "focus": "Generics, decorators, observables" },
        { "project": "REST API Framework", "focus": "Decorators, middleware types" },
        { "project": "Database ORM", "focus": "Advanced generics, mapped types" },
        { "project": "CLI Tool with TypeScript", "focus": "Configuration types, command parsing" }
      ],
      "advanced_projects": [
        { "project": "Full-stack Application", "focus": "Shared types between frontend and backend" },
        { "project": "Plugin System", "focus": "Dynamic types, module augmentation" },
        { "project": "Code Generation Tool", "focus": "Compiler API, AST manipulation" },
        { "project": "TypeScript Language Service Plugin", "focus": "Custom type checking, refactoring" }
      ]
    },
    "15_performance_and_best_practices": {
      "performance_optimization": [
        { "topic": "Compiler performance tuning", "practice": "Configure incremental compilation" },
        { "topic": "Type checking performance", "practice": "Avoid expensive type operations" },
        { "topic": "Bundle size optimization", "practice": "Use type-only imports" },
        { "topic": "Build time optimization", "practice": "Setup project references" }
      ],
      "best_practices": [
        { "topic": "Type naming conventions", "practice": "Follow consistent naming patterns" },
        { "topic": "Documentation with JSDoc", "practice": "Add type documentation" },
        { "topic": "Testing TypeScript code", "practice": "Write tests that verify types" },
        { "topic": "Code organization patterns", "practice": "Structure large TypeScript projects" },
        { "topic": "Migration strategies from JavaScript", "practice": "Gradual TypeScript adoption" }
      ]
    },
    "16_tooling_and_ecosystem": {
      "development_tools": [
        { "tool": "ESLint with TypeScript", "usage": "Setup linting for TypeScript code" },
        { "tool": "Prettier configuration", "usage": "Format TypeScript code consistently" },
        { "tool": "Jest for TypeScript testing", "usage": "Write and run TypeScript tests" },
        { "tool": "Webpack/TypeScript integration", "usage": "Bundle TypeScript applications" }
      ],
      "build_tools": [
        { "tool": "ts-node for development", "usage": "Run TypeScript without compilation" },
        { "tool": "tsc --watch for development", "usage": "Enable fast development workflow" },
        { "tool": "TypeScript compiler API", "usage": "Create custom build tools" },
        { "tool": "Babel with TypeScript", "usage": "Use Babel for transpilation" }
      ]
    },
    "assessment_checkpoints": {
      "beginner_assessment": [
        "Can create basic types and interfaces",
        "Understands type inference basics",
        "Can configure tsconfig.json",
        "Able to convert simple JavaScript to TypeScript"
      ],
      "intermediate_assessment": [
        "Comfortable with generics and advanced types",
        "Can implement design patterns with types",
        "Understands type narrowing and guards",
        "Able to create custom utility types"
      ],
      "advanced_assessment": [
        "Can create complex type transformations",
        "Understands variance and type compatibility",
        "Able to optimize TypeScript performance",
        "Can mentor others on TypeScript best practices"
      ]
    }
  };

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';
import slugify from 'slugify';

dotenv.config();

const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('advanced') || 
      lowerName.includes('compiler') || 
      lowerName.includes('metaprogramming') || 
      lowerName.includes('design patterns') ||
      lowerName.includes('architecture') ||
      lowerName.includes('performance') ||
      lowerName.includes('utility types') ||
      lowerName.includes('solid')) {
    return 'advanced';
  }
  
  if (lowerName.includes('generics') || 
      lowerName.includes('interfaces') || 
      lowerName.includes('decorators') || 
      lowerName.includes('classes') ||
      lowerName.includes('configuration') ||
      lowerName.includes('async') ||
      lowerName.includes('tooling')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

// Mapping Formatters specifically for creating titles/descriptions from object items
const getTitle = (item) => {
    if (typeof item === 'string') return item;
    if (item.topic) return item.topic;
    if (item.pattern) return item.pattern;
    if (item.principle) return item.principle;
    if (item.project) return item.project;
    if (item.tool) return item.tool;
    if (typeof item === 'object') return Object.values(item)[0];
    return String(item);
};

const getContent = (item, secTitle) => {
    if (typeof item === 'string') return `## ${secTitle}\n\n${item}`;
    
    let content = `## ${secTitle}\n\n`;
    
    if (item.practice) content += `**Practice**: ${item.practice}\n\n`;
    if (item.implementation) content += `**Implementation**: ${item.implementation}\n\n`;
    if (item.focus) content += `**Focus Areas**: ${item.focus}\n\n`;
    if (item.usage) content += `**Usage**: ${item.usage}\n\n`;
    
    content += `In this section, we explore ${secTitle}. Use the Practice or AI Chat tabs to dive deeper.`;
    
    return content;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (TypeScript)
    let topic = await Topic.findOne({ slug: 'typescript' });
    if (!topic) {
        console.log('ℹ️ TypeScript topic not found, creating...');
        topic = await Topic.create({
          name: 'TypeScript',
          slug: 'typescript',
          description: 'TypeScript extends JavaScript by adding types',
          icon: '📘', // Blue book or TS logo color
          order: 3,
          isNew: false
        });
      }
    console.log(`📌 Using Topic: ${topic.name}`);

    // 2. Clear existing structure
    console.log('🧹 Clearing existing categories and sections...');
    const categories = await Category.find({ topicId: topic._id });
    const categoryIds = categories.map(c => c._id);
    await Section.deleteMany({ categoryId: { $in: categoryIds } });
    await Category.deleteMany({ topicId: topic._id });

    // 3. Process new DEEP structure
    console.log('🏗️ Building new DEEP hierarchy...');
    
    let categoryOrder = 1;
    let totalSections = 0;
    const usedSlugs = new Set(); // Track used slugs to prevent duplicates

    for (const [groupKey, groupParams] of Object.entries(typescriptCurriculum)) {
        // LEVEL 1: GROUP (Module)
        // e.g. "01_typescript_foundations"
        let groupName = groupKey.replace(/^\d+_/, '').split('_')
           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
           .join(' ');
        
        console.log(`  📦 Processing Group: ${groupName}`);
 
        let categoriesToProcess = groupParams;
        if (typeof groupParams === 'object' && !Array.isArray(groupParams) && !Object.keys(groupParams).some(k => Array.isArray(groupParams[k])) && Object.keys(groupParams).length === 0) {
            // Empty object or weird structure?
            continue;
        }

        // Handle flat key-value like Skill Levels which isn't { key: [Array] } but { key: "Value" }
        // Actually skill_levels is { beginner: "..." }
        // We'll treat the whole "skill_levels" object as a Category effectively?
        // Wait, "learning_approach" has "progression_path": [], "skill_levels": {}
        // So "progression_path" is normal (Array). "skill_levels" is Object.
        
        for (const [catKey, items] of Object.entries(groupParams)) {
            // LEVEL 2: CATEGORY (Chapter)
            // e.g. "introduction"
            let catName = catKey.split('_')
             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
             .join(' ');
 
            const category = await Category.create({
             name: catName,
             slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }),
             topicId: topic._id,
             order: categoryOrder++,
             description: `Chapter on ${catName}`,
             group: groupName // THIS IS KEY for the tabs!
            });
            
            console.log(`    📂 Created Category: ${catName} (Group: ${groupName})`);
 
            // LEVEL 3: SECTIONS (Lessons)
            let sectionItems = [];
            if (Array.isArray(items)) {
                sectionItems = items;
            } else if (typeof items === 'object') {
                // If items is object (like skill_levels), convert to array of objects with topic/practice for consistency?
                // Or just key/value pairs
                sectionItems = Object.entries(items).map(([k, v]) => ({ topic: k, practice: v }));
            } else {
                sectionItems = [items];
            }

            let sectionOrder = 1;
            for (const item of sectionItems) {
                const secTitle = getTitle(item);
                const secContent = getContent(item, secTitle);
                
                let baseSlug = slugify(secTitle, { lower: true, strict: true });
                let uniqueSlug = baseSlug;
                let counter = 1;
                
                while (usedSlugs.has(uniqueSlug)) {
                    uniqueSlug = `${baseSlug}-${counter}`;
                    counter++;
                }
                usedSlugs.add(uniqueSlug);
                
                await Section.create({
                   title: secTitle,
                   slug: uniqueSlug,
                   categoryId: category._id,
                   topicId: topic._id,
                   order: sectionOrder++,
                   description: `Learn about ${secTitle}`,
                   content: secContent,
                   difficulty: categorizeDifficulty(secTitle, groupName),
                   estimatedTime: 10,
                   isNew: false,
                   isPro: false,
                   keyPoints: [secTitle]
                });
                
                totalSections++;
            }
        }
     }
 
     console.log(`\n✅ Seeding Complete!`);
     console.log(`   - Categories: ${categoryOrder - 1}`);
     console.log(`   - Sections: ${totalSections}`);
 
     process.exit(0);
   } catch (error) {
     console.error('❌ Seeding failed:', error);
     process.exit(1);
   }
 };
 
 seedHierarchy();
