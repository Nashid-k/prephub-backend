import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const angularData = {
  "Angular_Fundamentals": {
    "01_introduction_setup": {
      "core_concepts": [
        "What is Angular - Framework Overview",
        "Angular vs React vs Vue Comparison",
        "Angular Architecture (Components, Modules, Services)",
        "Angular CLI Basics"
      ],
      "project_setup": [
        "Angular Project Creation (ng new)",
        "Project Structure Overview",
        "Angular.json Configuration",
        "Development Server (ng serve)"
      ]
    },

    "02_typescript_basics": [
      "TypeScript in Angular",
      "Type Annotations",
      "Interfaces and Types",
      "Classes and Decorators",
      "ES6+ Features Used in Angular"
    ]
  },

  "Components_Templates": {
    "01_component_basics": [
      "Component Structure (@Component)",
      "Template and Styles",
      "Component Selector",
      "View Encapsulation"
    ],

    "02_data_binding": [
      "Interpolation {{ }}",
      "Property Binding [ ]",
      "Event Binding ( )",
      "Two-way Binding [( )]"
    ],

    "03_template_syntax": [
      "Template Variables (#var)",
      "ng-template and ng-container",
      "ng-content (Content Projection)",
      "Template Reference Variables"
    ],

    "04_component_communication": [
      "@Input() - Parent to Child",
      "@Output() - Child to Parent",
      "EventEmitter for Custom Events",
      "Service-based Communication"
    ]
  },

  "Directives": {
    "01_structural_directives": [
      "*ngIf - Conditional Rendering",
      "*ngFor - List Rendering",
      "trackBy for Performance",
      "*ngSwitch - Multiple Conditions"
    ],

    "02_attribute_directives": [
      "[ngClass] - Dynamic CSS Classes",
      "[ngStyle] - Dynamic Styles",
      "[ngModel] - Two-way Data Binding",
      "RouterLink for Navigation"
    ],

    "03_custom_directives": [
      "Creating Attribute Directives",
      "Creating Structural Directives",
      "@HostListener and @HostBinding",
      "Directive Use Cases"
    ]
  },

  "Services_Dependency_Injection": {
    "01_services": [
      "Service Creation (@Injectable)",
      "Singleton Services",
      "Service vs Component",
      "Business Logic in Services"
    ],

    "02_dependency_injection": [
      "DI Container in Angular",
      "Provider Configuration",
      "@Injectable and providedIn",
      "Hierarchical Injector"
    ],

    "03_injection_tokens": [
      "InjectionToken Usage",
      "Configuration with DI",
      "Factory Providers",
      "Value Providers"
    ]
  },

  "Modules": {
    "01_module_basics": [
      "NgModule Structure",
      "Declarations, Imports, Exports",
      "AppModule (Root Module)",
      "Feature Modules"
    ],

    "02_module_types": [
      "Shared Modules",
      "Core Modules",
      "Routing Modules",
      "Lazy-loaded Modules"
    ],

    "03_module_strategies": [
      "Lazy Loading Configuration",
      "Preloading Strategies",
      "Module Organization Patterns",
      "Standalone Components"
    ]
  },

  "Routing": {
    "01_routing_basics": [
      "Router Configuration",
      "RouterOutlet Directive",
      "RouterLink Navigation",
      "Route Parameters"
    ],

    "02_advanced_routing": [
      "Child Routes",
      "Route Guards (CanActivate)",
      "Route Resolvers",
      "Wildcard Routes"
    ],

    "03_navigation_features": [
      "Programmatic Navigation",
      "Query Parameters",
      "Fragment Navigation",
      "Route Events"
    ]
  },

  "Forms": {
    "01_template_driven_forms": [
      "Template-driven Forms Basics",
      "ngModel and ngForm",
      "Form Validation",
      "Form Submission"
    ],

    "02_reactive_forms": [
      "ReactiveFormsModule",
      "FormGroup and FormControl",
      "FormBuilder Service",
      "FormArray for Dynamic Forms"
    ],

    "03_form_validation": [
      "Built-in Validators",
      "Custom Validators",
      "Cross-field Validation",
      "Validation Feedback"
    ],

    "04_form_operations": [
      "setValue() and patchValue()",
      "Form Status Properties",
      "Value Changes Observables",
      "Custom Form Controls"
    ]
  },

  "HTTP_Client": {
    "01_http_basics": [
      "HttpClientModule Setup",
      "GET, POST, PUT, DELETE Requests",
      "Request Headers",
      "Response Handling"
    ],

    "02_advanced_http": [
      "HTTP Interceptors",
      "Error Handling",
      "Request/Response Transformation",
      "Progress Events"
    ],

    "03_api_integration": [
      "Service Layer for APIs",
      "Type-safe API Responses",
      "Error Handling Patterns",
      "Loading States"
    ]
  },

  "RxJS_Reactive_Programming": {
    "01_observables_basics": [
      "Observables in Angular",
      "Observable vs Promise",
      "Async Pipe",
      "Unsubscribe Strategies"
    ],

    "02_rxjs_operators": [
      "map, filter, tap",
      "switchMap, mergeMap, concatMap",
      "catchError for Error Handling",
      "debounceTime and distinctUntilChanged"
    ],

    "03_subjects": [
      "Subject and BehaviorSubject",
      "Service with Subjects",
      "Multicasting Observables",
      "State Management with RxJS"
    ]
  },

  "State_Management": {
    "01_component_state": [
      "Local Component State",
      "Service-based State",
      "BehaviorSubject Pattern",
      "Simple State Management"
    ],

    "02_ngrx_basics": [
      "NgRx Store Setup",
      "Actions, Reducers, Selectors",
      "State Shape Design",
      "Dispatching Actions"
    ],

    "03_ngrx_advanced": [
      "Effects for Side Effects",
      "Entity State Management",
      "Feature State",
      "NgRx DevTools"
    ],

    "04_authentication_state": [
      "JWT Token Management",
      "Auth Guards",
      "User State Management",
      "Token Refresh"
    ]
  },

  "Pipes": {
    "built_in_pipes": [
      "DatePipe for Date Formatting",
      "CurrencyPipe and DecimalPipe",
      "UpperCase, LowerCase Pipes",
      "AsyncPipe for Observables"
    ],

    "custom_pipes": [
      "Creating Custom Pipes",
      "Pure vs Impure Pipes",
      "Pipe Parameters",
      "Pipe Performance"
    ]
  },

  "Lifecycle_Hooks": {
    "component_lifecycle": [
      "ngOnInit - Initialization",
      "ngOnChanges - Input Changes",
      "ngOnDestroy - Cleanup",
      "ngAfterViewInit - View Ready"
    ],

    "lifecycle_usage": [
      "When to Use Each Hook",
      "Memory Management",
      "Performance Considerations",
      "Lifecycle Best Practices"
    ]
  },

  "Performance_Optimization": {
    "01_change_detection": [
      "Change Detection Strategy",
      "OnPush Strategy Benefits",
      "Change Detection Triggers",
      "Manual Change Detection"
    ],

    "02_bundle_optimization": [
      "Lazy Loading Modules",
      "Tree Shaking",
      "AOT Compilation",
      "Bundle Analysis"
    ],

    "03_runtime_optimization": [
      "trackBy in ngFor",
      "Pure Pipes",
      "Memoization",
      "Virtual Scrolling"
    ]
  },

  "Testing": {
    "01_unit_testing": [
      "Jasmine Framework",
      "Component Testing",
      "Service Testing",
      "Test Bed Configuration"
    ],

    "02_testing_utilities": [
      "async and fakeAsync",
      "Component Fixtures",
      "Mock Services",
      "Testing Forms and Routing"
    ]
  },

  "Advanced_Features": {
    "01_angular_specific": [
      "ViewChild and ContentChild",
      "Dynamic Component Loading",
      "Angular Elements",
      "Internationalization (i18n)"
    ],

    "02_signals": [
      "Signal-based Components",
      "Computed Signals",
      "Effect Functions",
      "Signal Best Practices"
    ]
  },

  "Security": {
    "security_basics": [
      "XSS Prevention",
      "Sanitization and Security",
      "Content Security Policy",
      "Authentication Best Practices"
    ]
  },

  "Deployment": {
    "01_build_process": [
      "Production Build (ng build)",
      "Environment Configurations",
      "Polyfills and Browser Support",
      "Build Optimization Flags"
    ],

    "02_deployment_options": [
      "Static File Hosting",
      "Docker Containerization",
      "CI/CD Pipeline",
      "Monitoring and Analytics"
    ]
  },

  "Best_Practices": {
    "01_project_structure": [
      "Feature-based Organization",
      "Shared Module Organization",
      "Core vs Shared Services",
      "Utility Functions"
    ],

    "02_code_organization": [
      "Component Design Patterns",
      "Service Layer Patterns",
      "State Management Strategy",
      "Error Handling Strategy"
    ],

    "03_development_workflow": [
      "Code Quality Tools",
      "Commit Guidelines",
      "Pull Request Process",
      "Documentation Practices"
    ]
  },

  "Essential_Projects": {
    "learning_projects": [
      "Todo Application (CRUD, State Management)",
      "E-commerce Product Listing (API Integration)",
      "Admin Dashboard (Routing, Forms, Charts)",
      "Authentication System (JWT, Guards)"
    ],

    "must_implement_features": [
      "Form with Validation",
      "API Integration with Error Handling",
      "Route Protection",
      "State Management Solution",
      "Responsive UI Components"
    ]
  },

  "Interview_Preparation": {
    "common_topics": [
      "Component Lifecycle",
      "Change Detection",
      "Dependency Injection",
      "RxJS Operators",
      "State Management",
      "Routing and Guards",
      "Forms (Template vs Reactive)"
    ],

    "practical_skills": [
      "Build a CRUD Application",
      "Implement Authentication",
      "Optimize Performance",
      "Write Unit Tests",
      "Debug Angular Applications"
    ]
  }
};

const formatName = (str) => {
    return str
        .replace(/^\\d+_/, '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedAngular = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'angular' });
        if (!topic) {
            console.log('Creating Angular topic...');
            topic = await Topic.create({
                name: 'Angular',
                slug: 'angular',
                description: 'Build enterprise-grade applications with Angular',
                icon: '🅰️',
                order: 9,
                color: '#DD0031'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ _id: { $in: categoryIds } });
            console.log('Cleared existing Angular data');
        }

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

        let order = 1;
        for (const [mainKey, mainValue] of Object.entries(angularData)) {
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: formatName(mainKey),
                    order: order++
                });

                let sections = [];
                if (Array.isArray(value)) {
                    sections = value;
                } else {
                    for (const [subKey, subItems] of Object.entries(value)) {
                        sections = [...sections, ...subItems];
                    }
                }

                const sectionDocs = sections.map((sectionTitle, index) => ({
                    title: sectionTitle,
                    slug: generateUniqueSlug(sectionTitle),
                    description: `Detailed explanation of ${sectionTitle}`,
                    content: 'Coming soon...',
                    categoryId: category._id,
                    topicId: topic._id,
                    order: index + 1,
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Performance') || categoryName.includes('NgRx') ? 'advanced' : 
                               categoryName.includes('Introduction') || categoryName.includes('Fundamentals') || categoryName.includes('Component Basics') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ Angular seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedAngular();
