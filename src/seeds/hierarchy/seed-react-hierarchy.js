
const reactCurriculum = {
  "React_Fundamentals": {
    "01_introduction": {
      "core_concepts": [
        "React - JavaScript Library for Building User Interfaces",
        "Library vs Framework Difference",
        "Component-Based Architecture",
        "Virtual DOM Concept"
      ],
      "development_environment": [
        "Vite vs Create-React-App",
        "Project Setup and Structure",
        "Package.json and Dependencies",
        "Development Server"
      ]
    },

    "02_jsx_basics": [
      "JSX Syntax (JavaScript XML)",
      "JSX vs HTML Differences",
      "Embedding Expressions with Curly Braces {}",
      "JSX Rules (Single Parent Element, className vs class)",
      "Fragments (<></> or <Fragment>)"
    ],

    "03_components": {
      "component_types": [
        "Functional Components (Modern)",
        "Class Components (Legacy)",
        "Component Composition",
        "Component Reusability"
      ],
      "component_structure": [
        "Component Naming (PascalCase)",
        "Import/Export Statements",
        "Props System",
        "Component Return Requirements"
      ]
    }
  },

  "State_Management": {
    "01_state_basics": [
      "State Definition and Purpose",
      "useState Hook Syntax and Usage",
      "State vs Props Comparison",
      "State Immutability (Never Modify Directly)"
    ],

    "02_state_operations": [
      "Updating State with setState/useState",
      "State Batching and Updates",
      "Functional Updates for State",
      "State Initialization"
    ],

    "03_state_patterns": [
      "Lifting State Up (Parent-Child Communication)",
      "Prop Drilling (Pros and Cons)",
      "Local State vs Global State",
      "State Management Strategies"
    ]
  },

  "Props_System": {
    "props_basics": [
      "Props as Component Parameters",
      "Passing Data from Parent to Child",
      "Props Immutability",
      "Default Props and PropTypes"
    ],

    "props_advanced": [
      "Children Prop (props.children)",
      "Prop Validation with PropTypes",
      "Destructuring Props",
      "Spread Operator with Props"
    ]
  },

  "Hooks": {
    "00_hooks_intro": [
      "What are React Hooks?",
      "Why Hooks? (Solving Class Component Issues)",
      "Rules of Hooks (Top Level Only)",
      "Hooks vs Lifecycle Methods",
      "Types of Hooks (Built-in, Custom, 3rd Party)"
    ],

    "01_basic_hooks": {
      "usestate": [
        "useState Declaration and Usage",
        "Multiple State Variables",
        "State Update Patterns",
        "State Initialization Functions",
        "Object and Array State Updates"
      ],
      "useeffect": [
        "useEffect Syntax and Purpose",
        "Dependency Array Behavior",
        "Cleanup Function (Return Statement)",
        "Lifecycle Simulation (mount, update, unmount)",
        "API Calls in useEffect"
      ],
      "usecontext": [
        "Context API for Global State",
        "createContext, Provider, Consumer",
        "useContext Hook Usage",
        "Context Limitations and Performance"
      ]
    },

    "02_performance_hooks": [
      "useMemo for Expensive Calculations",
      "useCallback for Function Memoization",
      "Memoization Use Cases and Trade-offs",
      "Dependency Array Rules and Pitfalls",
      "React.memo vs useMemo"
    ],

    "03_reference_hooks": [
      "useRef for DOM References",
      "useRef for Mutable Values (Instance Variables)",
      "forwardRef for Component Refs",
      "Ref vs State Differences",
      "useImperativeHandle (Customizing Ref Exposure)"
    ],

    "04_advanced_hooks": [
      "useReducer (Complex State Logic)",
      "useLayoutEffect (DOM Measurements)",
      "useId (Unique IDs for Accessibility)",
      "useDebugValue (DevTools Labels)",
      "useDeferredValue (Non-urgent Updates)",
      "useTransition (Concurrent Rendering)",
      "useSyncExternalStore (Library Integration)",
      "useInsertionEffect (CSS-in-JS Libraries)"
    ],

    "05_custom_hooks": [
      "Building Your First Custom Hook",
      "Extracting Logic into Hooks",
      "Sharing State Logic vs State",
      "Common Use Cases (useFetch, useForm, useLocalStorage)"
    ]
  },

  "Component_Lifecycle": {
    "class_components": [
      "componentDidMount (Initial Render)",
      "componentDidUpdate (Props/State Changes)",
      "componentWillUnmount (Cleanup)",
      "Lifecycle Order and Timing"
    ],

    "functional_components": [
      "useEffect for Lifecycle Simulation",
      "Dependency Array Control",
      "Cleanup Functions",
      "Lifecycle Best Practices"
    ]
  },

  "Event_Handling": {
    "event_basics": [
      "Synthetic Events (Cross-browser Wrapper)",
      "Event Handlers (onClick, onChange)",
      "Event Object Properties",
      "Preventing Default Behavior (e.preventDefault())"
    ],

    "event_patterns": [
      "Inline Event Handlers",
      "Arrow Functions in Events",
      "Event Pooling (Legacy)",
      "Event Delegation in React"
    ]
  },

  "Forms": {
    "controlled_components": [
      "Form State Management",
      "Input Binding with State",
      "Form Submission Handling",
      "Validation Patterns"
    ],

    "uncontrolled_components": [
      "useRef for Form Access",
      "File Inputs Handling",
      "When to Use Uncontrolled",
      "Form Data Collection"
    ]
  },

  "Conditional_Rendering": {
    "methods": [
      "if-else in JSX",
      "Ternary Operator (condition ? true : false)",
      "Logical && Operator",
      "Conditional Return Statements",
      "Render Nothing (null or <></>)"
    ]
  },

  "Lists_Keys": {
    "list_rendering": [
      "Array.map() for List Generation",
      "Key Prop Requirements",
      "Unique and Stable Keys",
      "Key Prop Purpose in Reconciliation"
    ],

    "key_management": [
      "Why Index is Bad for Keys",
      "Generating Unique Keys",
      "Key Stability Considerations",
      "Performance Implications"
    ]
  },

  "React_Router": {
    "routing_basics": [
      "React Router Setup",
      "BrowserRouter vs HashRouter",
      "Route Configuration",
      "Link and NavLink Components"
    ],

    "routing_features": [
      "Nested Routes and Outlet",
      "Route Parameters (useParams)",
      "Query Parameters (useSearchParams)",
      "Programmatic Navigation (useNavigate)"
    ],

    "routing_advanced": [
      "Route Guards and Protection",
      "Lazy Loading Routes",
      "Route Transitions",
      "404 Handling"
    ]
  },

  "Performance_Optimization": {
    "01_memoization": [
      "React.memo for Component Memoization",
      "useMemo for Value Memoization",
      "useCallback for Function Memoization",
      "When to Use Each"
    ],

    "02_code_splitting": [
      "React.lazy() for Component Lazy Loading",
      "Dynamic Imports",
      "Suspense with Fallback",
      "Route-based Code Splitting"
    ],

    "03_rendering_optimization": [
      "Avoiding Unnecessary Re-renders",
      "Virtualization for Large Lists",
      "Debouncing and Throttling",
      "Performance Profiling"
    ],

    "04_other_optimizations": [
      "Image Optimization",
      "Bundle Size Reduction",
      "Tree Shaking",
      "Production Build Optimizations"
    ]
  },

  "Error_Handling": {
    "error_boundaries": [
      "Error Boundary Class Components",
      "Error Handling in Functional Components",
      "Fallback UI Display",
      "Error Recovery Strategies"
    ],

    "error_patterns": [
      "try-catch in useEffect",
      "Error State Management",
      "User-friendly Error Messages",
      "Logging and Monitoring"
    ]
  },

  "Advanced_Concepts": {
    "01_react_internals": [
      "Virtual DOM and Reconciliation",
      "Diffing Algorithm",
      "React Fiber Architecture",
      "Render Phases (Render and Commit)"
    ],

    "02_patterns": [
      "Higher-Order Components (HOC)",
      "Render Props Pattern",
      "Compound Components",
      "Custom Hooks Patterns"
    ],

    "03_apis": [
      "Context API Deep Dive",
      "Portals for DOM Escape",
      "Forwarding Refs",
      "Strict Mode Benefits"
    ]
  },

  "State_Management_Libraries": {
    "01_context_api": [
      "When to Use Context",
      "Context Limitations",
      "Performance Considerations",
      "Context Patterns"
    ],

    "02_redux_basics": {
      "redux_fundamentals": [
        "Redux Principles (Single Source of Truth)",
        "Store, Actions, Reducers",
        "Immutable Updates",
        "Redux Data Flow"
      ],
      "redux_toolkit": [
        "Redux Toolkit Advantages",
        "createSlice for Reducers",
        "configureStore Setup",
        "RTK Query Basics"
      ]
    },

    "03_redux_advanced": [
      "Middleware (Redux Thunk, Saga)",
      "Async Actions with createAsyncThunk",
      "Redux DevTools Usage",
      "Redux Persist for State Persistence"
    ],

    "04_alternatives": [
      "Zustand Basics",
      "Recoil Concepts",
      "Jotai Introduction",
      "Choosing State Management"
    ]
  },

  "API_Integration": {
    "data_fetching": [
      "useEffect for API Calls",
      "Loading and Error States",
      "AbortController for Cleanup",
      "Data Caching Strategies"
    ],

    "http_clients": [
      "Fetch API Usage",
      "Axios Configuration",
      "Interceptors for Headers",
      "Error Handling Patterns"
    ],

    "authentication": [
      "JWT Token Management",
      "Protected Routes",
      "Token Refresh Flow",
      "Secure Storage (HttpOnly Cookies)"
    ]
  },

  "Testing": {
    "testing_basics": [
      "React Testing Library Setup",
      "Component Testing",
      "User Event Simulation",
      "Snapshot Testing"
    ],

    "testing_patterns": [
      "Mocking API Calls",
      "Testing Custom Hooks",
      "Testing Redux",
      "Test Coverage Goals"
    ]
  },

  "Build_Tools": {
    "development_tools": [
      "Vite Configuration",
      "Webpack Basics",
      "Babel Transpilation",
      "ESModules vs CommonJS"
    ],

    "environment": [
      "Environment Variables (.env)",
      "Build Scripts",
      "Development vs Production Builds",
      "Deployment Configuration"
    ]
  },

  "Modern_React": {
    "react_18_features": [
      "Concurrent Features",
      "Automatic Batching",
      "Transitions (useTransition)",
      "Suspense for Data Fetching"
    ],

    "react_19_features": [
      "Actions and Form Handling",
      "use Hook for Resources",
      "Document Metadata",
      "Performance Improvements"
    ]
  },

  "Essential_Projects": {
    "beginner_projects": [
      "Todo List Application",
      "Counter with Multiple Features",
      "Simple Calculator",
      "Weather App with API"
    ],

    "intermediate_projects": [
      "E-commerce Product Listing",
      "Authentication Flow (Login/Register)",
      "Dashboard with Charts",
      "Real-time Chat Interface"
    ],

    "advanced_projects": [
      "Full-stack Application",
      "Social Media Clone",
      "Admin Dashboard",
      "Complex Form Management"
    ]
  },

  "Best_Practices": {
    "01_code_organization": [
      "Folder Structure Patterns",
      "Component Organization",
      "Reusable Component Library",
      "Code Splitting Strategy"
    ],

    "02_performance": [
      "Bundle Size Monitoring",
      "Image Optimization",
      "Code Splitting Implementation",
      "Performance Monitoring"
    ],

    "03_security": [
      "XSS Prevention",
      "Input Validation",
      "Secure API Calls",
      "Environment Variables Usage"
    ],

    "04_maintainability": [
      "Prop Types or TypeScript",
      "Documentation Practices",
      "Code Review Guidelines",
      "Refactoring Strategies"
    ]
  },

  "Interview_Preparation": {
    "core_concepts": [
      "Virtual DOM and Reconciliation",
      "Component Lifecycle",
      "State and Props Management",
      "Hooks Usage and Rules",
      "Performance Optimization"
    ],

    "common_questions": [
      "useEffect Dependency Array Behavior",
      "Controlled vs Uncontrolled Components",
      "Context API vs Redux",
      "React.memo vs useMemo vs useCallback",
      "Error Boundary Implementation"
    ],

    "practical_skills": [
      "Build a Component from Scratch",
      "Implement Custom Hook",
      "Optimize Existing Code",
      "Debug React Applications",
      "Test React Components"
    ]
  },
  "Styling_In_React": {
    "01_css_methods": [
      "CSS Stylesheets (Importing CSS)",
      "CSS Modules (Scoped Styling)",
      "Inline Styles (Style Object)",
      "Classnames Utility Pattern"
    ],
    "02_css_in_js": [
      "Styled Components Basics",
      "Emotion/CSS-in-JS Concepts",
      "Dynamic Styling based on Props",
      "Theming and ThemeProvider"
    ],
    "03_utility_first": [
      "Tailwind CSS Integration",
      "Utility Class Patterns",
      "Configuring Tailwind with React",
      "Handling Dynamic Classes (clsx/tailwind-merge)"
    ]
  },

  "Advanced_Forms": {
    "01_react_hook_form": [
      "React Hook Form Introduction",
      "register and handleSubmit",
      "Form Validation (Built-in)",
      "Integrating UI Libraries (Controller)",
      "Performance Benefits (Uncontrolled)"
    ],
    "02_validation_schemas": [
      "Zod Validation Integration",
      "Yup Schema Validation",
      "Formik (Legacy vs Modern)",
      "Handling Complex Form Data"
    ]
  },

  "React_Query_And_Data": {
    "01_tanstack_query": [
      "Why React Query? (Server State Management)",
      "useQuery for Fetching Data",
      "useMutation for Updating Data",
      "Query Invalidation and Refetching",
      "Caching and Stale Time configuration"
    ],
    "02_swr": [
      "SWR (Stale-While-Revalidate) Pattern",
      "useSWR Basics",
      "Global Configuration",
      "Optimistic UI Updates"
    ]
  },

  "React_With_TypeScript": {
    "01_component_typing": [
      "Typing Functional Components (usage of React.FC)",
      "Typing Props (Interfaces vs Types)",
      "Typing Children and ReactNode",
      "Typing Event Handlers"
    ],
    "02_hooks_typing": [
      "Typing useState (Inferred vs Explicit)",
      "Typing useReducer (Discriminated Unions)",
      "Typing useRef (DOM vs Mutable)",
      "Typing Custom Hooks"
    ],
    "03_context_typing": [
      "Typing Context and Providers",
      "Handling null in Context Types",
      "Generic Components with TypeScript"
    ]
  },

  "Accessibility_A11y": {
    "01_a11y_basics": [
      "Semantic HTML in React",
      "The `aria-*` Attributes",
      "Keyboard Navigation (tabIndex)",
      "Focus Management (useRef)"
    ],
    "02_testing_a11y": [
      "Testing with Screen Readers",
      "eslint-plugin-jsx-a11y",
      "Jest-axe for Accessibility Testing",
      "Accessible Design Patterns (Modals, Dropdowns)"
    ]
  },

  "Animation": {
    "01_framer_motion": [
      "Framer Motion Basics (motion.div)",
      "Animate Presence (Exit Animations)",
      "Gestures (Hover, Tap, Drag)",
      "Variants and Orchestration"
    ],
    "02_react_spring": [
      "Physics-based Animation Concepts",
      "useSpring Hook",
      "Interpolation",
      "React Transition Group (Legacy)"
    ]
  },

  "Architecture_Patterns": {
    "01_design_patterns": [
      "Atomic Design Principle (Atoms, Molecules)",
      "Container vs Presentational Components",
      "Compound Component Pattern",
      "Control Props Pattern",
      "Render Props Pattern"
    ],
    "02_project_structure": [
      "Feature-based Architecture",
      "Layered Architecture",
      "Managing Shared/Common Components",
      "Barrel Exports (index.js)"
    ]
  }
};

export { reactCurriculum };
