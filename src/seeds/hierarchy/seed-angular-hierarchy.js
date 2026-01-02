
const angularCurriculum = {

  "01_angular_foundations": {
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

  "02_components_and_templates": {
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

  "03_directives": {
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

  "04_services_and_dependency_injection": {
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

  "05_modules_and_project_structure": {
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

  "06_routing_and_navigation": {
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

  "07_forms_and_validation": {
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

  "08_http_and_api_integration": {
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

  "09_rxjs_and_reactive_programming": {
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

  "10_state_management": {
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

  "11_pipes_and_lifecycle": {
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
    ],

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

  "12_dom_rendering_and_events": {
    "dom_concepts": [
      "DOM vs BOM",
      "DOM Tree Structure",
      "Node Types (Element, Text, Comment)",
      "Live vs Static NodeLists"
    ],

    "shadow_dom": [
      "What is Shadow DOM",
      "Shadow Root and Shadow Host",
      "Encapsulation and Styling",
      "Slots and Templates",
      "Open vs Closed Mode"
    ],

    "virtual_dom_concepts": [
      "Concept of Virtual DOM",
      "Reconciliation Process",
      "Diffing Algorithm Basics",
      "Real DOM vs Virtual DOM Performance"
    ]
  },

  "13_events_and_interaction": {
    "event_concepts": [
      "Event Listeners",
      "Event Object",
      "Event Types (click, submit, keydown, etc.)"
    ],

    "event_flow": [
      "Event Bubbling",
      "Event Capturing",
      "Event Propagation",
      "stopPropagation()",
      "stopImmediatePropagation()",
      "preventDefault()"
    ],

    "event_patterns": [
      "Event Delegation",
      "Custom Events",
      "Event Throttling",
      "Event Debouncing"
    ]
  },

  "14_performance_optimization": {
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

  "15_testing": {
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

  "16_advanced_angular_features": {
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

  "17_security": {
    "security_basics": [
      "XSS Prevention",
      "Sanitization and Security",
      "Content Security Policy",
      "Authentication Best Practices"
    ]
  },

  "18_deployment_and_operations": {
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

  "19_best_practices": {
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

  "20_projects_and_interview": {
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
    ],

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


export { angularCurriculum };
