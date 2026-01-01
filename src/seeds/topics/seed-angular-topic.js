import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const angularHierarchy = {
  "Foundations & Setup": {
    "Angular Overview": [
      "What is Angular?",
      "Angular vs React vs Vue",
      "Framework vs Library",
      "Angular Versions and Features",
      "Angular CLI"
    ],
    "Project Setup": [
      "Project Setup and First Project",
      "Folder and File Structure",
      "Angular.json Configuration",
      "How an Angular App Gets Loaded",
      "Linking Bootstrap with Angular"
    ],
    "Development Tools": [
      "Angular CLI Commands",
      "TypeScript Configuration",
      "ES6+ Features in Angular",
      "Source Maps"
    ]
  },
  "Components & Templates": {
    "Component Basics": [
      "Components in Angular",
      "Creating Components",
      "Component Selector",
      "Component Templates and Styles",
      "View Encapsulation",
      "Standalone Components"
    ],
    "Data Binding": [
      "String Interpolation",
      "Property Binding",
      "Event Binding",
      "Two-Way Binding (ngModel)",
      "Dynamic Class/Style Binding"
    ],
    "Component Communication": [
      "@Input Decorator",
      "@Output Decorator with EventEmitter",
      "Parent to Child Communication",
      "Child to Parent Communication",
      "Sibling Communication",
      "Passing Data Using Services"
    ],
    "Template Features": [
      "ng-template",
      "ng-container",
      "Content Projection (ng-content)",
      "ViewChild and ViewChildren",
      "Dynamic Components"
    ]
  },
  "Directives": {
    "Structural Directives": [
      "ngIf",
      "ngFor with trackBy",
      "ngSwitch"
    ],
    "Attribute Directives": [
      "ngStyle vs ngClass",
      "ngModel",
      "RouterLink and RouterLinkActive"
    ],
    "Custom Directives": [
      "Custom Attribute Directives",
      "Custom Structural Directives",
      "HostListener and HostBinding",
      "Directives vs Components"
    ]
  },
  "Services & Dependency Injection": {
    "Services": [
      "What are Services?",
      "Creating Services",
      "Singleton Services",
      "@Injectable Decorator",
      "providedIn Property"
    ],
    "Dependency Injection": [
      "Dependency Injection in Detail",
      "Advantages of DI",
      "Inject vs @Injectable",
      "Hierarchical Dependency Injection"
    ]
  },
  "Modules & Bootstrapping": {
    "Modules": [
      "Angular Modules (NgModule)",
      "AppModule Role",
      "Feature Modules",
      "Shared Modules",
      "Bootstrapping Module"
    ],
    "Module Loading": [
      "Lazy Loading vs Eager Loading",
      "Preloading Strategy"
    ]
  },
  "Routing & Navigation": {
    "Routing Basics": [
      "Router Configuration",
      "RouterOutlet",
      "Route Parameters",
      "Query Parameters",
      "Wildcard Route"
    ],
    "Advanced Routing": [
      "Child Routes",
      "Route Guards and Types",
      "CanActivate, CanDeactivate, Resolve"
    ],
    "Navigation": [
      "Programmatic Navigation",
      "Relative vs Absolute Navigation"
    ]
  },
  "Forms": {
    "Template-Driven Forms": [
      "Template-Driven Forms",
      "ngModel Directive",
      "Form Validation",
      "Form Submission"
    ],
    "Reactive Forms": [
      "Reactive Forms vs Template-Driven",
      "FormGroup and FormControl",
      "FormBuilder Service",
      "FormArray",
      "setValue() vs patchValue()",
      "ControlValueAccessor"
    ]
  },
  "HTTP Client & APIs": {
    "HTTP Basics": [
      "HttpClient Module",
      "HTTP Methods (GET, POST, PUT, DELETE)",
      "HTTP Headers",
      "Error Handling"
    ],
    "HTTP Interceptors": [
      "HTTP Interceptors",
      "Implementing Interceptors",
      "Request/Response Transformation"
    ]
  },
  "State Management": {
    "Component State": [
      "Local Component State",
      "Service-Based State",
      "BehaviorSubject for State"
    ],
    "NgRx": [
      "Why NgRx?",
      "NgRx Store",
      "Actions (createAction)",
      "Reducers (Pure Functions)",
      "Selectors",
      "NgRx Entity"
    ],
    "Effects": [
      "Effects in NgRx",
      "Handling Asynchronous Actions",
      "API Calls with Effects"
    ],
    "Authentication": [
      "JWT Flow in Angular",
      "JWT Structure",
      "Token Authentication",
      "Refresh Tokens",
      "Authentication vs Authorization"
    ]
  },
  "RxJS & Reactive Programming": {
    "Observables": [
      "Observables in Angular",
      "Observable vs Promise",
      "Observable Architecture"
    ],
    "Subjects": [
      "Subject vs BehaviorSubject",
      "AsyncSubject",
      "ReplaySubject",
      "Multicasting"
    ],
    "Operators": [
      "mergeMap, switchMap, concatMap",
      "forkJoin",
      "takeUntil",
      "debounceTime"
    ],
    "Advanced RxJS": [
      "Hot vs Cold Observables",
      "Memory Leak Prevention",
      "Async Pipe"
    ]
  },
  "Pipes": {
    "Built-in Pipes": [
      "Date Pipe",
      "Currency Pipe",
      "Decimal Pipe",
      "JSON Pipe",
      "Async Pipe"
    ],
    "Custom Pipes": [
      "Creating Custom Pipes",
      "Pure vs Impure Pipes",
      "Pipe vs Function"
    ]
  },
  "Performance Optimization": {
    "Bundle Optimization": [
      "Improve Bundle Size",
      "AOT vs JIT Compilation",
      "Tree Shaking",
      "Code Splitting",
      "Lazy Loading"
    ],
    "Change Detection": [
      "Change Detection in Angular",
      "Default vs OnPush Strategy",
      "Zones and Zone.js",
      "markForCheck()"
    ],
    "Performance Tools": [
      "Angular Budgets",
      "Performance Profiling"
    ]
  },
  "Testing": {
    "Testing Types": [
      "Unit Testing",
      "Integration Testing",
      "E2E Testing"
    ],
    "Testing Tools": [
      "Jasmine",
      "Karma",
      "Angular Testing Utilities",
      "Test Bed"
    ]
  },
  "Advanced Features": {
    "Internationalization": [
      "i18n in Angular",
      "Localization",
      "extract-i18n Command"
    ],
    "Server-Side Rendering": [
      "Angular Universal",
      "SSR Benefits"
    ],
    "Signals": [
      "Signals in Angular",
      "Signal-based Components",
      "Computed Signals",
      "Effect Functions"
    ]
  },
  "Security": {
    "Security Practices": [
      "XSS Prevention",
      "CSRF Protection",
      "Content Security Policy"
    ]
  },
  "Deployment": {
    "Build Configuration": [
      "Production Build",
      "Environment Files",
      "Polyfills"
    ],
    "Deployment Options": [
      "Static Hosting",
      "Server Deployment",
      "Docker Deployment"
    ]
  },
  "Lifecycle Hooks": {
    "Component Lifecycle": [
      "ngOnInit",
      "ngOnChanges",
      "ngDoCheck",
      "ngAfterViewInit",
      "ngAfterContentInit",
      "ngOnDestroy"
    ],
    "Lifecycle Best Practices": [
      "When to Use Each Hook",
      "Memory Leak Prevention",
      "Handling Memory Leaks"
    ]
  },
  "Decorators & Metadata": {
    "Decorator Types": [
      "Class Decorators",
      "Property Decorators",
      "Method Decorators",
      "Parameter Decorators"
    ],
    "Common Decorators": [
      "@Component",
      "@Directive",
      "@Pipe",
      "@Injectable",
      "@Input",
      "@Output",
      "@ViewChild"
    ]
  },
  "Architecture Patterns": {
    "Angular Architecture": [
      "MVVM Architecture",
      "Component-Based Architecture",
      "Module-Based Architecture"
    ],
    "Design Patterns": [
      "Singleton Pattern",
      "Factory Pattern",
      "Observer Pattern",
      "Dependency Injection Pattern"
    ],
    "Best Practices": [
      "Separation of Concerns",
      "Loosely Coupled Components",
      "Reusable Components"
    ]
  },
  "Debugging & Troubleshooting": {
    "Common Issues": [
      "Memory Leaks Detection",
      "Change Detection Issues",
      "Performance Bottlenecks"
    ],
    "Debugging Tools": [
      "Angular DevTools",
      "Browser DevTools",
      "Logging Strategies"
    ]
  }
};

const seedAngularHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create Angular topic
    let angularTopic = await Topic.findOne({ slug: 'angular' });
    if (!angularTopic) {
      const topicCount = await Topic.countDocuments();
      angularTopic = await Topic.create({
        name: 'Angular',
        slug: 'angular',
        description: 'Master Angular framework - from components and services to NgRx state management, RxJS, and production deployment.',
        icon: '🅰️',
        order: topicCount + 1,
        estimatedHours: 55
      });
      console.log('✅ Created Angular topic');
    }

    // Clear existing structure
    console.log('🧹 Clearing existing categories and sections...');
    await Section.deleteMany({ topicId: angularTopic._id });
    await Category.deleteMany({ topicId: angularTopic._id });

    // Seed hierarchy
    const seenSlugs = new Set();
    const generateUniqueSlug = (title) => {
        let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        let slug = baseSlug;
        let counter = 1;
        while (seenSlugs.has(slug)) {
            counter++;
            slug = `${baseSlug}-${counter}`;
        }
        seenSlugs.add(slug);
        return slug;
    };

    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(angularHierarchy)) {
      // Create Group/Categories
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = generateUniqueSlug(categoryName);
        
        const category = await Category.create({
          topicId: angularTopic._id,
          name: categoryName,
          slug: categorySlug,
          group: groupName,
          order: categoryOrder++,
          description: `Learn ${categoryName} in Angular`
        });
        console.log(`✅ Created category: ${categoryName}`);

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = generateUniqueSlug(`${categoryName}-${sectionTitle}`);

          await Section.create({
            categoryId: category._id,
            topicId: angularTopic._id,
            title: sectionTitle,
            slug: sectionSlug,
            order: sectionOrder++,
            description: `Learn about ${sectionTitle}`,
            difficulty: 'intermediate',
            estimatedTime: 35
          });
        }
      }
    }

    console.log('🎉 Angular hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Angular:', error);
    process.exit(1);
  }
};

seedAngularHierarchy();
