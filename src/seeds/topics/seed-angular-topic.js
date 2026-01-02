import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const angularHierarchy = {

  "00_angular_mental_model": {
    "angular_overview": [
      "What is Angular?",
      "Framework vs Library",
      "Angular vs React vs Vue",
      "Angular Versions and Features",
      "Angular CLI"
    ],
    "how_angular_works": [
      "How an Angular App Gets Loaded",
      "Compilation Pipeline (TS → JS)",
      "Angular Runtime Overview"
    ]
  },

  "01_project_setup_and_tooling": {
    "project_setup": [
      "Project Setup and First Project",
      "Folder and File Structure",
      "Angular.json Configuration",
      "Linking Bootstrap with Angular"
    ],
    "development_tools": [
      "Angular CLI Commands",
      "TypeScript Configuration",
      "ES6+ Features in Angular",
      "Source Maps"
    ]
  },

  "02_components_and_templates": {
    "component_basics": [
      "Components in Angular",
      "Creating Components",
      "Component Selector",
      "Component Templates and Styles",
      "View Encapsulation",
      "Standalone Components"
    ],
    "template_syntax": [
      "String Interpolation",
      "Property Binding",
      "Event Binding",
      "Two-Way Binding (ngModel)",
      "Dynamic Class/Style Binding"
    ]
  },

  "03_component_communication_and_views": {
    "component_communication": [
      "@Input Decorator",
      "@Output Decorator with EventEmitter",
      "Parent to Child Communication",
      "Child to Parent Communication",
      "Sibling Communication",
      "Passing Data Using Services"
    ],
    "template_features": [
      "ng-template",
      "ng-container",
      "Content Projection (ng-content)",
      "ViewChild and ViewChildren",
      "Dynamic Components"
    ]
  },

  "04_directives_and_dom_control": {
    "structural_directives": [
      "ngIf",
      "ngFor with trackBy",
      "ngSwitch"
    ],
    "attribute_directives": [
      "ngStyle vs ngClass",
      "ngModel",
      "RouterLink and RouterLinkActive"
    ],
    "custom_directives": [
      "Custom Attribute Directives",
      "Custom Structural Directives",
      "HostListener and HostBinding",
      "Directives vs Components"
    ]
  },

  "05_services_and_dependency_injection": {
    "services": [
      "What are Services?",
      "Creating Services",
      "Singleton Services",
      "@Injectable Decorator",
      "providedIn Property"
    ],
    "dependency_injection": [
      "Dependency Injection in Detail",
      "Advantages of DI",
      "Inject vs @Injectable",
      "Hierarchical Dependency Injection"
    ]
  },

  "06_modules_and_application_structure": {
    "modules": [
      "Angular Modules (NgModule)",
      "AppModule Role",
      "Feature Modules",
      "Shared Modules",
      "Bootstrapping Module"
    ],
    "module_loading": [
      "Lazy Loading vs Eager Loading",
      "Preloading Strategy"
    ]
  },

  "07_routing_and_navigation": {
    "routing_basics": [
      "Router Configuration",
      "RouterOutlet",
      "Route Parameters",
      "Query Parameters",
      "Wildcard Route"
    ],
    "advanced_routing": [
      "Child Routes",
      "Route Guards and Types",
      "CanActivate, CanDeactivate, Resolve"
    ],
    "navigation": [
      "Programmatic Navigation",
      "Relative vs Absolute Navigation"
    ]
  },

  "08_forms_and_user_input": {
    "template_driven_forms": [
      "Template-Driven Forms",
      "ngModel Directive",
      "Form Validation",
      "Form Submission"
    ],
    "reactive_forms": [
      "Reactive Forms vs Template-Driven",
      "FormGroup and FormControl",
      "FormBuilder Service",
      "FormArray",
      "setValue() vs patchValue()",
      "ControlValueAccessor"
    ]
  },

  "09_http_and_backend_communication": {
    "http_basics": [
      "HttpClient Module",
      "HTTP Methods (GET, POST, PUT, DELETE)",
      "HTTP Headers",
      "Error Handling"
    ],
    "http_interceptors": [
      "HTTP Interceptors",
      "Implementing Interceptors",
      "Request/Response Transformation"
    ]
  },

  "10_state_management_and_auth": {
    "component_state": [
      "Local Component State",
      "Service-Based State",
      "BehaviorSubject for State"
    ],
    "authentication": [
      "JWT Flow in Angular",
      "JWT Structure",
      "Token Authentication",
      "Refresh Tokens",
      "Authentication vs Authorization"
    ]
  },

  "11_rxjs_and_reactive_programming": {
    "observables": [
      "Observables in Angular",
      "Observable vs Promise",
      "Observable Architecture"
    ],
    "subjects": [
      "Subject vs BehaviorSubject",
      "AsyncSubject",
      "ReplaySubject",
      "Multicasting"
    ],
    "operators": [
      "mergeMap, switchMap, concatMap",
      "forkJoin",
      "takeUntil",
      "debounceTime"
    ],
    "advanced_rxjs": [
      "Hot vs Cold Observables",
      "Memory Leak Prevention",
      "Async Pipe"
    ]
  },

  "12_advanced_state_management_ngrx": {
    "ngrx_core": [
      "Why NgRx?",
      "NgRx Store",
      "Actions (createAction)",
      "Reducers (Pure Functions)",
      "Selectors",
      "NgRx Entity"
    ],
    "effects": [
      "Effects in NgRx",
      "Handling Asynchronous Actions",
      "API Calls with Effects"
    ]
  },

  "13_pipes_and_data_transformation": {
    "built_in_pipes": [
      "Date Pipe",
      "Currency Pipe",
      "Decimal Pipe",
      "JSON Pipe",
      "Async Pipe"
    ],
    "custom_pipes": [
      "Creating Custom Pipes",
      "Pure vs Impure Pipes",
      "Pipe vs Function"
    ]
  },

  "14_change_detection_and_performance": {
    "bundle_optimization": [
      "Improve Bundle Size",
      "AOT vs JIT Compilation",
      "Tree Shaking",
      "Code Splitting",
      "Lazy Loading"
    ],
    "change_detection": [
      "Change Detection in Angular",
      "Default vs OnPush Strategy",
      "Zones and Zone.js",
      "markForCheck()"
    ],
    "performance_tools": [
      "Angular Budgets",
      "Performance Profiling"
    ]
  },

  "15_lifecycle_hooks_and_memory": {
    "component_lifecycle": [
      "ngOnInit",
      "ngOnChanges",
      "ngDoCheck",
      "ngAfterViewInit",
      "ngAfterContentInit",
      "ngOnDestroy"
    ],
    "lifecycle_best_practices": [
      "When to Use Each Hook",
      "Memory Leak Prevention",
      "Handling Memory Leaks"
    ]
  },

  "16_signals_and_modern_angular": {
    "signals": [
      "Signals in Angular",
      "Signal-based Components",
      "Computed Signals",
      "Effect Functions"
    ]
  },

  "17_testing_and_quality": {
    "testing_types": [
      "Unit Testing",
      "Integration Testing",
      "E2E Testing"
    ],
    "testing_tools": [
      "Jasmine",
      "Karma",
      "Angular Testing Utilities",
      "Test Bed"
    ]
  },

  "18_security_and_deployment": {
    "security_practices": [
      "XSS Prevention",
      "CSRF Protection",
      "Content Security Policy"
    ],
    "build_configuration": [
      "Production Build",
      "Environment Files",
      "Polyfills"
    ],
    "deployment_options": [
      "Static Hosting",
      "Server Deployment",
      "Docker Deployment"
    ]
  },

  "19_decorators_metadata_and_architecture": {
    "decorators": [
      "Class Decorators",
      "Property Decorators",
      "Method Decorators",
      "Parameter Decorators"
    ],
    "common_decorators": [
      "@Component",
      "@Directive",
      "@Pipe",
      "@Injectable",
      "@Input",
      "@Output",
      "@ViewChild"
    ],
    "architecture_patterns": [
      "MVVM Architecture",
      "Component-Based Architecture",
      "Module-Based Architecture",
      "Singleton Pattern",
      "Factory Pattern",
      "Observer Pattern",
      "Dependency Injection Pattern",
      "Separation of Concerns",
      "Loosely Coupled Components",
      "Reusable Components"
    ]
  },

  "20_debugging_and_troubleshooting": {
    "common_issues": [
      "Memory Leaks Detection",
      "Change Detection Issues",
      "Performance Bottlenecks"
    ],
    "debugging_tools": [
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
    for (const [groupKey, categories] of Object.entries(angularHierarchy)) {
      // Fix group name formatting
      const groupName = groupKey.replace(/^\d+_/, '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

      // Create Group/Categories
      for (const [categoryKey, sections] of Object.entries(categories)) {
        const categoryName = categoryKey.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const categorySlug = generateUniqueSlug(`Angular ${categoryName}`);
        
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
