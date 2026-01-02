
const reactCurriculum = {

  "00_ui_engineering_and_react_mental_model": {
    "why_react": [
      "Problems React Solves in UI Engineering",
      "Imperative vs Declarative UI",
      "React as a Rendering Engine",
      "Component-Based Thinking"
    ],
    "react_basics": [
      "React - JavaScript Library for Building User Interfaces",
      "Library vs Framework Difference",
      "Virtual DOM Concept",
      "Why React Is Not MVC"
    ]
  },

  "01_environment_and_tooling": {
    "project_setup": [
      "Vite vs Create-React-App",
      "Project Structure Overview",
      "Package.json and Dependencies",
      "Development Server Lifecycle"
    ],
    "build_tools": [
      "ESModules vs CommonJS",
      "Babel Transpilation",
      "Vite Configuration Basics",
      "Webpack Concepts (Mental Model)"
    ],
    "environment": [
      "Environment Variables (.env)",
      "Development vs Production Builds",
      "Deployment Configuration"
    ]
  },

  "02_jsx_and_rendering_basics": {
    "jsx_core": [
      "JSX Syntax (JavaScript XML)",
      "JSX vs HTML Differences",
      "Embedding Expressions with {}",
      "JSX Rules (Single Root, className)",
      "Fragments (<></>, <Fragment>)"
    ],
    "rendering_rules": [
      "What JSX Compiles To",
      "Render Purity",
      "Re-render Triggers"
    ]
  },

  "03_components_and_composition": {
    "component_models": [
      "Functional Components (Modern Default)",
      "Class Components (Legacy Awareness)",
      "Component Composition",
      "Component Reusability"
    ],
    "component_structure": [
      "Component Naming (PascalCase)",
      "Import and Export Patterns",
      "Return Requirements",
      "Separation of Concerns"
    ]
  },

  "04_props_and_data_flow": {
    "props_fundamentals": [
      "Props as Component Inputs",
      "One-Way Data Flow",
      "Props Immutability",
      "Default Props",
      "PropTypes (Runtime Validation)"
    ],
    "props_patterns": [
      "Children Prop (props.children)",
      "Props Destructuring",
      "Spread Operator with Props",
      "Composition over Inheritance"
    ]
  },

  "05_state_and_reactivity": {
    "state_fundamentals": [
      "What State Represents",
      "State vs Props",
      "Immutability Principles",
      "Local Component State"
    ],
    "useState": [
      "useState Syntax and Usage",
      "Functional Updates",
      "Object and Array State Updates",
      "Lazy Initialization"
    ],
    "state_patterns": [
      "Lifting State Up",
      "Prop Drilling (Trade-offs)",
      "Local vs Global State Decisions"
    ]
  },

  "06_event_handling_and_user_interaction": {
    "event_system": [
      "Synthetic Events",
      "Event Object Properties",
      "Prevent Default Behavior"
    ],
    "event_patterns": [
      "Inline Handlers",
      "Arrow Functions in Events",
      "Event Delegation in React",
      "Legacy Event Pooling"
    ]
  },

  "07_conditional_and_dynamic_rendering": {
    "conditional_rendering": [
      "if-else in JSX",
      "Ternary Operator",
      "Logical && Operator",
      "Conditional Returns",
      "Rendering null or Empty Fragments"
    ],
    "lists_and_keys": [
      "Rendering Lists with map()",
      "Key Prop Purpose",
      "Why Index Is a Bad Key",
      "Key Stability and Performance"
    ]
  },

  "08_forms_and_user_input": {
    "controlled_forms": [
      "Controlled Components",
      "Input Binding with State",
      "Form Submission Handling",
      "Validation Patterns"
    ],
    "uncontrolled_forms": [
      "useRef for Form Access",
      "File Inputs",
      "When Uncontrolled Is Better"
    ]
  },

  "09_hooks_core_system": {
    "hooks_introduction": [
      "What Are Hooks",
      "Why Hooks Replaced Classes",
      "Rules of Hooks",
      "Hooks vs Lifecycle Methods"
    ],
    "useEffect": [
      "useEffect Purpose",
      "Dependency Array Semantics",
      "Cleanup Functions",
      "Lifecycle Simulation",
      "API Calls in useEffect"
    ],
    "useContext": [
      "Context API Fundamentals",
      "createContext and Provider",
      "useContext Usage",
      "Context Performance Caveats"
    ]
  },

  "10_hooks_advanced_and_performance": {
    "memoization_hooks": [
      "useMemo",
      "useCallback",
      "React.memo",
      "Dependency Pitfalls"
    ],
    "ref_hooks": [
      "useRef for DOM Access",
      "useRef for Mutable Values",
      "forwardRef",
      "useImperativeHandle"
    ],
    "advanced_hooks": [
      "useReducer",
      "useLayoutEffect",
      "useId",
      "useDebugValue",
      "useDeferredValue",
      "useTransition",
      "useSyncExternalStore",
      "useInsertionEffect"
    ]
  },

  "11_custom_hooks_and_logic_reuse": {
    "custom_hooks": [
      "Building Custom Hooks",
      "Extracting Logic vs State",
      "Reusable Hook Patterns",
      "Common Hooks (useFetch, useForm, useLocalStorage)"
    ]
  },

  "12_routing_and_navigation": {
    "react_router_basics": [
      "React Router Setup",
      "BrowserRouter vs HashRouter",
      "Route Configuration",
      "Link and NavLink"
    ],
    "routing_features": [
      "Nested Routes",
      "Outlet",
      "Route Params (useParams)",
      "Query Params (useSearchParams)",
      "Programmatic Navigation (useNavigate)"
    ],
    "routing_advanced": [
      "Protected Routes",
      "Lazy Loaded Routes",
      "404 Handling"
    ]
  },

  "13_data_fetching_and_server_state": {
    "http_basics": [
      "Fetch API",
      "Axios",
      "Interceptors",
      "AbortController"
    ],
    "data_fetching_patterns": [
      "Loading and Error States",
      "Caching Strategies",
      "Authentication Tokens",
      "Secure Storage (HttpOnly Cookies)"
    ],
    "server_state_libraries": [
      "TanStack Query (useQuery, useMutation)",
      "Query Invalidation",
      "Caching and Stale Time",
      "SWR and Stale-While-Revalidate"
    ]
  },

  "14_global_state_management": {
    "context_api": [
      "When Context Is Enough",
      "Performance Trade-offs",
      "Context Patterns"
    ],
    "redux_core": [
      "Redux Principles",
      "Store, Actions, Reducers",
      "Immutable Updates",
      "Redux Data Flow"
    ],
    "redux_toolkit": [
      "Redux Toolkit",
      "createSlice",
      "configureStore",
      "RTK Query"
    ],
    "alternatives": [
      "Zustand",
      "Recoil",
      "Jotai",
      "Choosing the Right Tool"
    ]
  },

  "15_react_internals_and_concurrent_rendering": {
    "reconciliation": [
      "Virtual DOM",
      "Diffing Algorithm",
      "Keys in Reconciliation"
    ],
    "fiber_architecture": [
      "React Fiber",
      "Render Phase vs Commit Phase",
      "Scheduling and Priority"
    ],
    "modern_react": [
      "Concurrent Features",
      "Automatic Batching",
      "Suspense for Data Fetching",
      "React 19 Actions and use() Hook"
    ]
  },

  "16_error_handling_and_resilience": {
    "error_boundaries": [
      "Error Boundary Classes",
      "Fallback UI",
      "Recovery Strategies"
    ],
    "error_patterns": [
      "try-catch in Effects",
      "Error State Modeling",
      "Logging and Monitoring"
    ]
  },

  "17_testing_and_quality": {
    "testing_basics": [
      "React Testing Library",
      "Component Testing",
      "User Event Simulation",
      "Snapshot Testing"
    ],
    "testing_advanced": [
      "Mocking APIs",
      "Testing Custom Hooks",
      "Testing Redux",
      "Coverage Strategy"
    ]
  },

  "18_styling_and_ui_systems": {
    "css_methods": [
      "Global CSS",
      "CSS Modules",
      "Inline Styles",
      "classnames Utility"
    ],
    "css_in_js": [
      "Styled Components",
      "Emotion",
      "Theming"
    ],
    "utility_first": [
      "Tailwind CSS",
      "Dynamic Classes",
      "clsx and tailwind-merge"
    ]
  },

  "19_accessibility_and_user_experience": {
    "a11y_basics": [
      "Semantic HTML",
      "aria-* Attributes",
      "Keyboard Navigation",
      "Focus Management"
    ],
    "a11y_testing": [
      "eslint-plugin-jsx-a11y",
      "jest-axe",
      "Accessible UI Patterns"
    ]
  },

  "20_animation_and_interaction_design": {
    "framer_motion": [
      "motion Components",
      "AnimatePresence",
      "Gestures",
      "Variants"
    ],
    "react_spring": [
      "Physics-based Animations",
      "useSpring",
      "Interpolation",
      "Transition Group (Legacy)"
    ]
  },

  "21_architecture_and_scalable_frontend_design": {
    "design_patterns": [
      "Atomic Design",
      "Container vs Presentational",
      "Compound Components",
      "Control Props",
      "Render Props"
    ],
    "project_structure": [
      "Feature-based Architecture",
      "Layered Architecture",
      "Shared Components",
      "Barrel Exports"
    ]
  },

  "22_projects_and_real_world_practice": {
    "beginner_projects": [
      "Todo App",
      "Counter",
      "Calculator",
      "Weather App"
    ],
    "intermediate_projects": [
      "E-commerce UI",
      "Authentication Flow",
      "Dashboard with Charts",
      "Real-time Chat UI"
    ],
    "advanced_projects": [
      "Full-stack Application",
      "Social Media Clone",
      "Admin Dashboard",
      "Complex Form Systems"
    ]
  },

  "23_best_practices_and_interviews": {
    "best_practices": [
      "Code Organization",
      "Performance Monitoring",
      "Security (XSS, Validation)",
      "Maintainability and Refactoring"
    ],
    "interview_preparation": [
      "Hooks Rules and Pitfalls",
      "State vs Props",
      "Context vs Redux",
      "Memoization Strategies",
      "Debugging React Apps"
    ]
  }

};

export { reactCurriculum };
