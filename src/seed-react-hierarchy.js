
const reactCurriculum = {
  "01_react_foundations": {
    "overview_introduction": [
      "What is React",
      "React Library vs Framework",
      "Benefits and Advantages of React",
      "Challenges and Limitations of React",
      "React Ecosystem Overview",
      "When to Use React vs Other Frameworks"
    ],
    "core_principles": [
      "Component-Based Architecture",
      "Concept of Reusability in React",
      "Declarative Programming Paradigm",
      "Unidirectional Data Flow",
      "Virtual DOM Concept",
      "Built-in React Components"
    ],
    "rendering_models": [
      "Single Page Application (SPA)",
      "Multi Page Application (MPA)",
      "Client-Side Rendering (CSR)",
      "Server-Side Rendering (SSR)",
      "Static Site Generation (SSG)",
      "Incremental Static Regeneration (ISR)",
      "Disadvantages of Client-Side Rendering",
      "Dynamic Rendering Strategies"
    ]
  },
  "02_setup_environment": {
    "installation": [
      "Node.js and npm Setup",
      "Create React App (CRA)",
      "Vite React Setup",
      "Manual Webpack Setup",
      "Development Server Configuration"
    ],
    "project_structure": [
      "Standard React Project Structure",
      "Component Organization Patterns",
      "File Naming Conventions",
      "Import/Export Patterns"
    ],
    "development_tools": [
      "React Developer Tools Extension",
      "Browser Developer Tools for React",
      "IDE/Editor Setup for React"
    ]
  },
  "03_jsx_fundamentals": {
    "jsx_concepts": [
      "What is JSX (JavaScript XML)",
      "JSX vs HTML Differences",
      "JSX Syntax and Rules",
      "JSX Expressions and Interpolation",
      "JSX Attribute Naming (className vs class)",
      "JSX Fragments and Empty Tags"
    ],
    "jsx_rendering": [
      "How JSX is Transpiled by Babel",
      "JSX to JavaScript Transformation",
      "Browser Rendering of JSX",
      "JSX Performance Considerations"
    ]
  },
  "04_components": {
    "component_types": [
      "What is a React Component",
      "Functional Components",
      "Class Components",
      "Stateless vs Stateful Components",
      "Presentational vs Container Components",
      "Smart vs Dumb Components"
    ],
    "component_creation": [
      "Functional Component Syntax",
      "Class Component Syntax",
      "Component Naming Conventions",
      "Component File Structure"
    ],
    "component_composition": [
      "Component Composition Patterns",
      "Component Reusability",
      "Children Prop Usage",
      "Slot Patterns in React"
    ]
  },
  "05_props": {
    "props_fundamentals": [
      "What are Props in React",
      "Passing Props to Components",
      "Props as Read-Only",
      "Default Props",
      "Prop Types and Validation",
      "Required Props"
    ],
    "props_patterns": [
      "Props Destructuring",
      "Spread Operator with Props",
      "Passing Functions as Props",
      "Props Drilling Problem",
      "Prop Callbacks"
    ]
  },
  "06_state_management": {
    "state_fundamentals": [
      "What is State in React",
      "State vs Props Differences",
      "State vs Normal Variables",
      "State Immutability Principle"
    ],
    "useState_hook": [
      "useState Hook Syntax",
      "Initial State Values",
      "State Update Functions",
      "Functional Updates with Previous State",
      "Batch State Updates",
      "Multiple useState Calls"
    ],
    "state_patterns": [
      "Lifting State Up",
      "State Management Strategies",
      "Local Component State",
      "Global Application State"
    ]
  },
  "07_event_handling": {
    "event_fundamentals": [
      "Event Handling in React",
      "Synthetic Events System",
      "Common Event Handlers (onClick, onChange, onSubmit)",
      "Event Object in React"
    ],
    "event_patterns": [
      "Inline Event Handlers",
      "Named Event Handler Functions",
      "Event Parameter Passing",
      "Event Pooling Concept",
      "preventDefault() Usage",
      "stopPropagation() Usage"
    ]
  },
  "08_forms": {
    "form_handling": [
      "Form Elements in React",
      "Controlled Components",
      "Uncontrolled Components",
      "Form Submission Handling"
    ],
    "input_handling": [
      "Text Inputs",
      "Checkboxes and Radio Buttons",
      "Select Dropdowns",
      "Textareas",
      "File Inputs"
    ],
    "form_validation": [
      "Basic Form Validation",
      "Real-time Validation",
      "Form Submission Validation",
      "Error Message Display"
    ]
  },
  "09_conditional_rendering": {
    "rendering_patterns": [
      "Conditional Rendering with if/else",
      "Conditional Rendering with Ternary Operator",
      "Conditional Rendering with Logical && Operator",
      "Conditional Rendering with Switch Statements"
    ],
    "rendering_techniques": [
      "Element Variables",
      "Inline Conditional Rendering",
      "Preventing Component Rendering",
      "Loading States and Skeletons"
    ]
  },
  "10_lists_keys": {
    "list_rendering": [
      "Rendering Lists with map()",
      "List Item Keys Importance",
      "Key Prop Rules and Best Practices",
      "Index as Key (When to Use/Not Use)"
      ],
    "list_operations": [
      "Adding Items to Lists",
      "Removing Items from Lists",
      "Updating Items in Lists",
      "Filtering Lists",
      "Sorting Lists"
    ]
  },
  "11_useEffect_hook": {
    "useEffect_concepts": [
      "What are Side Effects",
      "useEffect Hook Syntax",
      "Dependency Array Patterns",
      "Cleanup Functions"
    ],
    "useEffect_patterns": [
      "Component Mount Effect",
      "Component Update Effect",
      "Component Unmount Effect",
      "Conditional Effects",
      "Multiple Effects"
    ],
    "lifecycle_comparison": [
      "Class Component Lifecycle Methods",
      "Functional Component Lifecycle with useEffect",
      "Lifecycle Method Mapping"
    ]
  },
  "12_hooks_fundamentals": {
    "hooks_overview": [
      "What are React Hooks",
      "Rules of Hooks",
      "Custom Hooks Creation",
      "Hooks Naming Convention"
    ],
    "core_hooks": [
      "useState Hook",
      "useEffect Hook",
      "useContext Hook",
      "useReducer Hook",
      "useRef Hook",
      "useMemo Hook",
      "useCallback Hook"
    ]
  },
  "13_context_api": {
    "context_fundamentals": [
      "What is Context API",
      "Creating React Context",
      "Context Provider Component",
      "Context Consumer Patterns"
    ],
    "context_usage": [
      "useContext Hook",
      "Theme Switching with Context",
      "Authentication with Context",
      "Global State with Context"
    ],
    "context_patterns": [
      "Multiple Contexts",
      "Nested Contexts",
      "Context Performance Considerations"
    ]
  },
  "14_useRef_forwardref": {
    "refs_fundamentals": [
      "What are Refs in React",
      "useRef Hook Usage",
      "Refs vs State Differences",
      "Refs Use Cases"
      ],
    "refs_advanced": [
      "Forwarding Refs with forwardRef",
      "useImperativeHandle Hook",
      "Ref Callback Pattern",
      "DOM Element Refs"
    ]
  },
  "15_performance_optimization": {
    "memoization": [
      "React.memo Higher Order Component",
      "useMemo Hook for Expensive Calculations",
      "useCallback Hook for Function Memoization",
      "Memoization Trade-offs and Considerations"
    ],
    "rendering_optimization": [
      "Preventing Unnecessary Re-renders",
      "Component Splitting Strategy",
      "Virtualization for Large Lists",
      "Code Splitting and Lazy Loading"
    ],
    "react_features": [
      "React Strict Mode",
      "Profiler Component",
      "React DevTools Profiler"
    ]
  },
  "16_routing": {
    "react_router": [
      "React Router Installation",
      "BrowserRouter Setup",
      "Routes and Route Components",
      "Route Configuration"
    ],
    "navigation": [
      "Link Component",
      "NavLink Component",
      "useNavigate Hook",
      "useParams Hook",
      "useLocation Hook",
      "useSearchParams Hook"
    ],
    "advanced_routing": [
      "Nested Routes",
      "Dynamic Routing",
      "Route Guards (Protected Routes)",
      "404 Page Handling",
      "Programmatic Navigation"
    ]
  },
  "17_networking": {
    "http_clients": [
      "Fetch API Usage",
      "Axios Library Integration",
      "Axios vs Fetch Comparison",
      "HTTP Request Patterns"
      ],
    "api_integration": [
      "GET Requests",
      "POST/PUT/DELETE Requests",
      "Request Headers Configuration",
      "Response Handling"
    ],
    "async_patterns": [
      "Loading States",
      "Error Handling",
      "Data Caching Strategies",
      "Polling and Real-time Updates"
    ]
  },
  "18_authentication": {
    "auth_concepts": [
      "JWT (JSON Web Tokens)",
      "Token-based Authentication",
      "Session-based Authentication",
      "OAuth Integration"
    ],
    "auth_implementation": [
      "Login Flow Implementation",
      "Token Storage Strategies (localStorage vs Cookies)",
      "Protected Route Implementation",
      "Token Refresh Mechanism"
    ]
  },
  "19_state_management_advanced": {
    "redux": [
      "Redux Core Concepts",
      "Redux Store Setup",
      "Actions and Action Creators",
      "Reducers Implementation",
      "React-Redux Integration"
    ],
    "redux_toolkit": [
      "Redux Toolkit Overview",
      "createSlice Function",
      "configureStore Setup",
      "RTK Query for API Integration"
    ],
    "alternative_state": [
      "Zustand State Management",
      "Recoil State Management",
      "MobX State Management",
      "Context API vs Redux Comparison"
    ]
  },
  "20_advanced_patterns": {
    "composition_patterns": [
      "Higher Order Components (HOC)",
      "Render Props Pattern",
      "Compound Components",
      "Custom Hooks Patterns"
    ],
    "error_handling": [
      "Error Boundaries Implementation",
      "Global Error Handling",
      "Fallback UI Components"
    ],
    "advanced_features": [
      "Portals for Modal Dialogs",
      "React.lazy for Code Splitting",
      "Suspense for Data Fetching",
      "Concurrent Features"
    ]
  },
  "21_forms_advanced": {
    "form_libraries": [
      "React Hook Form",
      "Formik Library",
      "Yup Validation Schema"
    ],
    "advanced_validation": [
      "Async Form Validation",
      "Cross-field Validation",
      "Dynamic Form Fields",
      "Form State Management"
    ]
  },
  "22_styling": {
    "styling_approaches": [
      "Inline Styles",
      "CSS Modules",
      "Styled Components",
      "CSS-in-JS Libraries",
      "Utility-First CSS (Tailwind)"
    ],
    "responsive_design": [
      "Media Queries in React",
      "Responsive Components",
      "Mobile-First Design"
    ]
  },
  "23_testing": {
    "testing_tools": [
      "Jest Testing Framework",
      "React Testing Library",
      "Enzyme (Legacy)",
      "Test Runners"
    ],
    "test_types": [
      "Unit Testing Components",
      "Integration Testing",
      "Snapshot Testing",
      "End-to-End Testing"
    ]
  },
  "24_build_deployment": {
    "build_process": [
      "Build Configuration",
      "Environment Variables",
      "Performance Optimization Builds",
      "Bundle Analysis"
    ],
    "deployment": [
      "Static Site Deployment",
      "Server-Side Rendering Deployment",
      "Docker Containerization",
      "CI/CD Pipeline Setup"
    ]
  },
  "25_tooling_ecosystem": {
    "development_tools": [
      "ESLint Configuration",
      "Prettier Code Formatting",
      "TypeScript Integration",
      "Storybook for Component Development"
      ],
    "build_tools": [
      "Webpack Configuration",
      "Babel Transpilation",
      "Module Bundling Concepts"
    ]
  },
  "26_practical_projects": {
    "beginner_projects": [
      "Todo List Application",
      "Weather App",
      "Recipe Finder",
      "Expense Tracker"
    ],
    "intermediate_projects": [
      "E-commerce Product Catalog",
      "Social Media Dashboard",
      "Real-time Chat Application",
      "Project Management Tool"
    ],
    "advanced_projects": [
      "Full-stack Application with Backend",
      "Micro-frontend Architecture",
      "Real-time Collaboration Tool",
      "Progressive Web App (PWA)"
    ]
  },
  "27_best_practices": {
    "code_organization": [
      "Component Structure Patterns",
      "File Organization Strategies",
      "Import/Export Best Practices",
      "Code Splitting Strategy"
    ],
    "performance_practices": [
      "Memoization Strategy",
      "Bundle Size Optimization",
      "Image Optimization",
      "Network Request Optimization"
    ],
    "maintenance": [
      "Component Documentation",
      "TypeScript Integration",
      "Testing Strategy",
      "Code Review Practices"
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
      lowerName.includes('optimization') || 
      lowerName.includes('performance') || 
      lowerName.includes('redux') ||
      lowerName.includes('testing') ||
      lowerName.includes('deployment') ||
      lowerName.includes('next.js') ||
      lowerName.includes('ssr')) {
    return 'advanced';
  }
  
  if (lowerName.includes('hook') || 
      lowerName.includes('context') || 
      lowerName.includes('routing') || 
      lowerName.includes('form') ||
      lowerName.includes('ref')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (React)
    let topic = await Topic.findOne({ slug: 'react' });
    if (!topic) {
        // Fallback or create
        topic = await Topic.findOne({ slug: 'reactjs' });
    }
    
    if (!topic) {
      console.log('ℹ️ React topic not found, creating...');
      topic = await Topic.create({
        name: 'React',
        slug: 'react',
        description: 'A JavaScript library for building user interfaces',
        icon: '⚛️',
        order: 5,
        isNew: false
      });
    }
    console.log(`📌 Using Topic: ${topic.name}`);

    // 2. Clear existing structure for this topic only
    console.log('🧹 Clearing existing categories and sections...');
    const categories = await Category.find({ topicId: topic._id });
    const categoryIds = categories.map(c => c._id);
    await Section.deleteMany({ categoryId: { $in: categoryIds } });
    await Category.deleteMany({ topicId: topic._id });

    // 3. Process new structure
    console.log('🏗️ Building new hierarchy...');
    
    let categoryOrder = 1;
    let totalSections = 0;

    for (const [catKey, sectionsObj] of Object.entries(reactCurriculum)) {
      // Format Category Name: "01_react_foundations" -> "React Foundations"
      let catName = catKey.replace(/^\d+_/, '').split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Fix specific casing
      catName = catName
        .replace('Reactjs', 'React')
        .replace('Ui', 'UI')
        .replace('Ux', 'UX')
        .replace('Jsx', 'JSX')
        .replace('Api', 'API')
        .replace('Dom', 'DOM')
        .replace('Css', 'CSS')
        .replace('Ssr', 'SSR')
        .replace('Spa', 'SPA')
        .replace('Npm', 'NPM')
        .replace('Cli', 'CLI');

      const category = await Category.create({
        name: catName,
        slug: slugify(catName, { lower: true, strict: true }),
        topicId: topic._id,
        order: categoryOrder++,
        description: `Master ${catName}`
      });

      console.log(`  📂 Created Category: ${category.name}`);

      let sectionOrder = 1;
      
      const sectionsToProcess = Array.isArray(sectionsObj) 
        ? { "Core Concepts": sectionsObj } 
        : sectionsObj;

      for (const [secKey, keyPoints] of Object.entries(sectionsToProcess)) {
        // Format Section Title
        let secTitle = secKey.split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Fix abbreviation casing
        secTitle = secTitle
          .replace('Jsx', 'JSX')
          .replace('Dom', 'DOM')
          .replace('Ui', 'UI')
          .replace('Css', 'CSS')
          .replace('Api', 'API')
          .replace('Spa', 'SPA')
          .replace('Url', 'URL')
          .replace('Json', 'JSON')
          .replace('Jwt', 'JWT')
          .replace('Http', 'HTTP')
          .replace('Crud', 'CRUD')
          .replace('Npm', 'NPM')
          .replace('Cli', 'CLI');

        // Determine difficulty
        const difficulty = categorizeDifficulty(secTitle, catName);

        // Generate a description from key points
        const description = `Learn about ${keyPoints.slice(0, 3).join(', ')}...`;

        await Section.create({
          title: secTitle,
          slug: slugify(`${catName}-${secTitle}`, { lower: true, strict: true }),
          categoryId: category._id,
          topicId: topic._id,
          order: sectionOrder++,
          description: description,
          content: `## ${secTitle}\n\n${description}\n\n### Key Concepts:\n${keyPoints.map(kp => `- ${kp}`).join('\n')}`,
          difficulty: difficulty,
          estimatedTime: 15 + (keyPoints.length * 2), // Rough estimate
          isNew: false,
          isPro: false
        });
        
        totalSections++;
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
