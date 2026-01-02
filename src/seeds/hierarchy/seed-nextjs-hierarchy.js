
const nextjsCurriculum = {

  "00_prerequisites_and_mental_models": {
    "web_fundamentals": [
      "How the Web Works (Request–Response Cycle)",
      "HTTP Methods, Headers, Status Codes",
      "Cookies vs Local Storage vs Sessions",
      "Browser Rendering Basics",
      "CSR vs SSR Mental Model"
    ],
    "react_fundamentals": [
      "What React Solves",
      "Components and JSX",
      "Props vs State",
      "Hooks Basics (useState, useEffect)",
      "Client-side Routing Limitations"
    ],
    "why_nextjs_exists": [
      "Problems with Pure React (SEO, Performance)",
      "What Next.js Adds on Top of React",
      "Framework vs Library Mindset"
    ]
  },

  "01_nextjs_foundations": {
    "introduction": [
      "What is Next.js (React Meta-Framework)",
      "Key Features and Advantages",
      "Next.js vs Create React App",
      "When NOT to Use Next.js",
      "Real-World Use Cases"
    ],
    "project_setup": [
      "create-next-app CLI",
      "Project Structure Overview",
      "TypeScript Setup",
      "Development Server Workflow"
    ]
  },

  "02_routing_fundamentals": {
    "routing_models_overview": [
      "Pages Router vs App Router",
      "Why App Router Was Introduced",
      "Server-First Routing Philosophy"
    ],

    "pages_router_basics": [
      "pages Directory Structure",
      "Index Routes",
      "Nested Routes",
      "Dynamic Routes [slug]",
      "Catch-all Routes [...slug]",
      "Optional Catch-all Routes [[...slug]]"
    ],

    "app_router_basics": [
      "app Directory Structure",
      "page.tsx vs layout.tsx",
      "Nested Layouts",
      "Route Segments",
      "Loading and Error Files"
    ],

    "navigation": [
      "Link Component",
      "useRouter and usePathname",
      "Programmatic Navigation",
      "Prefetching Behavior",
      "Active Link Styling"
    ]
  },

  "03_rendering_and_component_models": {
    "rendering_strategies": [
      "Client-Side Rendering (CSR)",
      "Server-Side Rendering (SSR)",
      "Static Site Generation (SSG)",
      "Incremental Static Regeneration (ISR)"
    ],

    "component_types": [
      "Server Components (Default)",
      "Client Components ('use client')",
      "When to Use Each",
      "Mixing Server and Client Components"
    ],

    "decision_guidelines": [
      "CSR for Interactive UI",
      "SSR for Auth & Personalization",
      "SSG for Content",
      "ISR for Hybrid Use Cases"
    ]
  },

  "04_data_fetching_and_mutation": {
    "server_data_fetching": [
      "fetch() in Server Components",
      "Request Caching and Revalidation",
      "Dynamic vs Static Fetching",
      "Authentication in Server Fetching"
    ],

    "pages_router_data_fetching": [
      "getServerSideProps",
      "getStaticProps",
      "getStaticPaths",
      "fallback Modes"
    ],

    "incremental_regeneration": [
      "revalidate Property",
      "On-Demand Revalidation",
      "Stale-While-Revalidate"
    ],

    "client_side_data": [
      "useEffect Data Fetching",
      "SWR",
      "React Query (TanStack Query)",
      "Loading & Error States"
    ],

    "server_actions": [
      "What are Server Actions",
      "Form Actions",
      "Mutations Without API Routes",
      "Security Boundaries"
    ]
  },

  "05_api_and_backend_capabilities": {
    "api_routes": [
      "Route Handlers (app/api)",
      "Request & Response Objects",
      "Dynamic API Routes",
      "Middleware Usage"
    ],

    "backend_patterns": [
      "Controller-like Handlers",
      "Service Layer Separation",
      "Validation and Error Handling"
    ]
  },

  "06_styling_and_ui_architecture": {
    "styling_options": [
      "CSS Modules",
      "Global CSS",
      "Sass / SCSS",
      "Styled JSX"
    ],

    "css_in_js": [
      "Styled Components",
      "Emotion",
      "SSR Considerations"
    ],

    "utility_css": [
      "Tailwind CSS Setup",
      "Configuration",
      "Purge & Optimization"
    ],

    "layout_patterns": [
      "Global Layouts",
      "Nested Layouts",
      "Responsive Design Strategies"
    ]
  },

  "07_assets_and_frontend_optimization": {
    "image_optimization": [
      "next/image",
      "Responsive Images",
      "Priority Loading",
      "Lazy Loading"
    ],

    "font_optimization": [
      "next/font",
      "Google Fonts",
      "Font Display Strategies"
    ],

    "script_optimization": [
      "next/script",
      "Loading Strategies",
      "Third-Party Scripts"
    ],

    "code_splitting": [
      "Automatic Code Splitting",
      "Dynamic Imports",
      "Route-Based Splitting"
    ]
  },

  "08_configuration_and_runtime": {
    "configuration_files": [
      "next.config.js",
      "Redirects & Rewrites",
      "Headers Configuration"
    ],

    "custom_app_and_document": [
      "_app.js Responsibilities",
      "_document.js Responsibilities",
      "HTML Structure Control"
    ],

    "environment_variables": [
      ".env.local",
      "NEXT_PUBLIC_ Variables",
      "Build-time vs Runtime"
    ],

    "middleware": [
      "Middleware Matching",
      "Auth Middleware",
      "Request Rewrites"
    ]
  },

  "09_state_management": {
    "local_state": [
      "useState",
      "useReducer",
      "Custom Hooks"
    ],

    "server_state": [
      "SWR",
      "React Query",
      "Cache Invalidation",
      "Mutations"
    ],

    "global_state": [
      "Redux Toolkit",
      "Zustand",
      "Jotai",
      "State Persistence"
    ]
  },

  "10_authentication_and_authorization": {
    "auth_methods": [
      "NextAuth.js",
      "JWT Authentication",
      "OAuth Providers",
      "Session Strategies"
    ],

    "protected_routes": [
      "Middleware Protection",
      "Server-Side Auth Checks",
      "Client Guards",
      "RBAC"
    ],

    "user_management": [
      "Registration",
      "Login / Logout",
      "Profile Management",
      "Password Reset"
    ]
  },

  "11_seo_and_metadata": {
    "seo_basics": [
      "Metadata API",
      "Dynamic Meta Tags",
      "Open Graph",
      "JSON-LD Structured Data"
    ],

    "advanced_seo": [
      "Server-Side SEO",
      "Sitemap Generation",
      "robots.txt"
    ]
  },

  "12_error_handling_and_observability": {
    "error_handling": [
      "error.js",
      "not-found.js",
      "Error Boundaries",
      "Graceful Degradation"
    ],

    "monitoring": [
      "Logging Strategies",
      "Error Tracking",
      "User Feedback"
    ]
  },

  "13_performance_and_scaling": {
    "core_web_vitals": [
      "LCP",
      "FID",
      "CLS"
    ],

    "caching_strategies": [
      "CDN Caching",
      "Browser Caching",
      "API Caching",
      "ISR"
    ],

    "bundle_optimization": [
      "Dependency Analysis",
      "Tree Shaking",
      "Bundle Analyzer"
    ]
  },

  "14_testing_and_quality": {
    "testing_types": [
      "Unit Testing (Jest)",
      "Component Testing (RTL)",
      "E2E Testing (Playwright / Cypress)",
      "API Route Testing"
    ],

    "testing_setup": [
      "Jest Config",
      "Mocking",
      "Snapshots"
    ]
  },

  "15_deployment_and_devops": {
    "build_process": [
      "next build",
      "Production Output Analysis"
    ],

    "deployment_targets": {
      "vercel": [
        "Automatic Deployments",
        "Preview Deployments",
        "Domains"
      ],
      "self_hosted": [
        "Node.js Deployment",
        "Docker",
        "CI/CD Pipelines"
      ]
    }
  },

  "16_architecture_and_best_practices": {
    "project_structure": [
      "Feature-Based Organization",
      "Shared Component Libraries",
      "API Abstraction Layer"
    ],

    "code_quality": [
      "Custom Hooks",
      "Type Safety",
      "Linting & Formatting"
    ],

    "performance_principles": [
      "Avoid Over-Fetching",
      "Minimize Client JS",
      "Cache Aggressively"
    ]
  },

  "17_practical_projects": {
    "project_types": [
      "SEO-Optimized Blog",
      "Authenticated Dashboard",
      "E-commerce Platform",
      "Real-time Application"
    ],
    "required_features": [
      "Auth",
      "CRUD",
      "File Uploads",
      "Search",
      "Pagination"
    ]
  },

  "18_interview_and_real_world_mastery": {
    "theory": [
      "Rendering Strategy Trade-offs",
      "Server vs Client Components",
      "Caching Models",
      "Deployment Decisions"
    ],
    "hands_on": [
      "Build Full-Stack App",
      "Optimize Performance",
      "Secure APIs",
      "Deploy to Production"
    ]
  }

};



export { nextjsCurriculum };
