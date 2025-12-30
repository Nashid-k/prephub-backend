import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';

dotenv.config();

/**
 * Difficulty categorization for React topics
 */
const categorizeDifficulty = (categoryName, sectionTitle) => {
  const advancedKeywords = [
    'fiber', 'concurrent', 'reconciliation', 'diffing', 'shadow dom', 
    'higher order components', 'render props', 'performance', 'memoization', 
    'redux', 'thunk', 'saga', 'jwt', 'security', 'error boundaries', 
    'suspense', 'lazy', 'portals', 'webpack', 'babel', 'internals'
  ];
  const beginnerKeywords = [
    'what is', 'basics', 'intro', 'jsx', 'features', 'benefits', 
    'components', 'props', 'state', 'events', 'conditional rendering'
  ];
  
  const combined = `${categoryName} ${sectionTitle}`.toLowerCase();
  
  if (advancedKeywords.some(kw => combined.includes(kw))) return 'advanced';
  if (beginnerKeywords.some(kw => combined.includes(kw))) return 'beginner';
  return 'intermediate';
};

/**
 * React.js Complete Curriculum - 16 Phases
 */
const reactCurriculum = {
  "01_foundations": {
    name: "01 Foundations",
    subcategories: {
      "React_Basics": [
        "What is React",
        "Features of React",
        "React: Library vs Framework",
        "Library vs Framework (general concept)",
        "Benefits of React",
        "Challenges and Limitations of React",
        "Concept of Reusability",
        "Unidirectional Data Flow",
        "Built-in Components in React"
      ],
      "Rendering_Models": [
        "Single Page Application (SPA)",
        "Multi Page Application (MPA)",
        "CSR vs SSR",
        "Disadvantages of CSR",
        "Dynamic Rendering"
      ]
    }
  },
  "02_jsx_and_rendering": {
    name: "02 JSX and Rendering",
    subcategories: {
      "JSX": [
        "What is JSX",
        "JSX vs HTML",
        "How JSX is Rendered by the Browser"
      ],
      "Rendering_Process": [
        "How React Renders a Component",
        "What is a React Element",
        "React Element vs React Component",
        "What Happens to Normal Variables on Re-render",
        "Named Export vs Default Export (Why {} in imports)"
      ]
    }
  },
  "03_virtual_dom_and_internals": {
    name: "03 Virtual DOM and Internals",
    subcategories: {
      "Core_Concepts": [
        "DOM vs Virtual DOM",
        "Benefits of Virtual DOM",
        "Reconciliation",
        "Diffing Algorithm",
        "Shadow DOM"
      ],
      "React_Internals": [
        "React Fiber",
        "How React Fiber Works",
        "React Concurrent Mode"
      ]
    }
  },
  "04_components_and_composition": {
    name: "04 Components and Composition",
    subcategories: {
      "Component_Types": [
        "What is a Component",
        "Stateless vs Stateful Components",
        "Class Components vs Functional Components",
        "Limitations of Functional Components"
      ],
      "Composition_Patterns": [
        "Component Composition",
        "Higher Order Components (HOC)",
        "Custom HOCs",
        "Render Props Pattern"
      ],
      "Optimization_and_Structure": [
        "Pure Components",
        "React Fragment",
        "Fragment vs Container Div"
      ]
    }
  },
  "05_props_and_state": {
    name: "05 Props and State",
    subcategories: {
      "Core_Concepts": [
        "What is Props",
        "What is State",
        "Props vs State",
        "State vs Normal Variables",
        "Immutability of State"
      ],
      "State_Management_Patterns": [
        "Props Drilling",
        "Lifting State Up",
        "How to Change Props",
        "Using Spread Operator for State Updates",
        "Mutating vs Copying State",
        "Previous State in useState",
        "Batch Updates in React"
      ]
    }
  },
  "06_events_forms_and_rendering": {
    name: "06 Events Forms and Rendering",
    subcategories: {
      "Events": [
        "Event Handling in React",
        "Synthetic Events",
        "Event Handlers (onClick, onChange)",
        "preventDefault Purpose",
        "Event Pooling"
      ],
      "Forms": [
        "Getting Value from Input",
        "Controlled Components",
        "Uncontrolled Components",
        "Benefits of Controlled Components"
      ],
      "Rendering": [
        "Conditional Rendering",
        "Key Prop in React"
      ]
    }
  },
  "07_hooks_core_concepts": {
    name: "07 Hooks Core Concepts",
    subcategories: {
      "Hooks_Basics": [
        "What are Hooks",
        "Rules of Hooks",
        "Why Hooks Cannot Be Used in Conditionals",
        "Types of Hooks"
      ],
      "Lifecycle": [
        "Lifecycle Methods in Class Components",
        "Lifecycle in Functional Components",
        "Class Lifecycle vs useEffect Mapping"
      ]
    }
  },
  "08_core_hooks": {
    name: "08 Core Hooks",
    subcategories: {
      "useState": [
        "useState Hook",
        "Previous State Concept"
      ],
      "useEffect": [
        "What is useEffect",
        "What is a Side Effect",
        "Dependency Array",
        "useEffect on First Render",
        "useEffect on State Change",
        "useEffect on Every Render",
        "Cleanup Function",
        "Multiple useEffect Hooks"
      ],
      "useRef_and_Refs": [
        "useRef Hook",
        "useRef Use Cases",
        "forwardRef",
        "useImperativeHandle"
      ]
    }
  },
  "09_performance_optimization": {
    name: "09 Performance Optimization",
    subcategories: {
      "Memoization": [
        "React.memo",
        "Disadvantages of React.memo",
        "useCallback",
        "useMemo",
        "useCallback vs useMemo",
        "React.memo vs useMemo",
        "Cache vs useMemo"
      ],
      "Rendering_Behavior": [
        "Batch Update Behavior",
        "Why Console Logs Appear Twice",
        "Strict Mode"
      ]
    }
  },
  "10_routing": {
    name: "10 Routing",
    subcategories: {
      "React_Router": [
        "Concept of React Router",
        "Why React Router DOM",
        "BrowserRouter",
        "Routes and Route",
        "path Prop",
        "element Prop"
      ],
      "Navigation": [
        "Link",
        "useNavigate",
        "useParams",
        "Dynamic Routing",
        "Wildcard Route (Fallback)"
      ],
      "Advanced_Routing": [
        "Protected Routes",
        "Outlet",
        "Routing Flow"
      ]
    }
  },
  "11_context_and_state_sharing": {
    name: "11 Context and State Sharing",
    subcategories: {
      "Context_API": [
        "Context API",
        "Props Drilling Problem",
        "Creating Context",
        "Context Provider",
        "value Prop in Context",
        "Consuming Context",
        "useContext Hook"
      ],
      "useReducer": [
        "What is useReducer",
        "useReducer Working",
        "Reducer Function",
        "Dispatch Function",
        "Initial State",
        "useState vs useReducer",
        "When to Prefer useReducer"
      ],
      "Comparison": [
        "Context API vs Redux"
      ]
    }
  },
  "12_redux_and_async_state": {
    name: "12 Redux and Async State",
    subcategories: {
      "Redux_Core": [
        "What is Redux",
        "Core Principles of Redux",
        "Redux Working Flow",
        "Redux Components",
        "React-Redux"
      ],
      "Async_Redux": [
        "Redux Thunk",
        "Redux Saga",
        "Async Operations in Redux"
      ],
      "Tools_and_Middleware": [
        "Logger Middleware",
        "Redux DevTools"
      ],
      "Comparisons": [
        "Redux vs Context API",
        "mapStateToProps vs mapDispatchToProps",
        "Disadvantages of Redux"
      ]
    }
  },
  "13_networking_and_authentication": {
    name: "13 Networking and Authentication",
    subcategories: {
      "Networking": [
        "Fetch API",
        "Axios",
        "Axios vs Fetch",
        "Axios Interceptors",
        "Axios Cancel Token"
      ],
      "Authentication": [
        "JWT Working",
        "Components of JWT",
        "Access Token vs Refresh Token",
        "Token Refresh Strategy",
        "localStorage vs Cookies"
      ]
    }
  },
  "14_error_handling_and_edge_cases": {
    name: "14 Error Handling and Edge Cases",
    subcategories: {
      "Error_Handling": [
        "Error Boundaries",
        "Try-Catch vs Error Boundaries"
      ],
      "Advanced_UI": [
        "Portals",
        "Suspense",
        "React.lazy",
        "Lazy Loading vs Code Splitting"
      ]
    }
  },
  "15_tooling_and_build_system": {
    name: "15 Tooling and Build System",
    subcategories: {
      "Build_Tools": [
        "Babel",
        "Webpack",
        "Compiler vs Transpiler"
      ],
      "Standards_and_Tools": [
        "ES Modules",
        "ESLint",
        "BOM",
        "Polyfills"
      ]
    },
  },
  "16_advanced_concepts_and_best_practices": {
    name: "16 Advanced Concepts and Best Practices",
    subcategories: {
      "Hooks_and_Architecture": [
        "Custom Hooks",
        "Custom Hooks vs Normal Functions"
      ],
      "Data_and_Validation": [
        "Data Binding in React",
        "Props Validation",
        "PropTypes"
      ],
      "JavaScript_Internals": [
        "Instance Variables vs Instance Functions",
        "Prototypes"
      ],
      "Performance_Patterns": [
        "Debouncing",
        "Throttling"
      ],
      "Production": [
        "Localization",
        "Publish NPM Package",
        "Ways to Improve React Application Performance"
      ]
    }
  }
};

/**
 * Seed React.js Hierarchy
 */
const seedReactHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find React topic
    const reactTopic = await Topic.findOne({ slug: 'react' });
    
    if (!reactTopic) {
      console.error('❌ React topic not found! Please ensure Topic exists or run npm run seed first.');
      process.exit(1);
    }

    // Clear existing React categories and sections
    await Category.deleteMany({ topicId: reactTopic._id });
    await Section.deleteMany({ topicId: reactTopic._id });
    console.log('\n🗑️  Cleared existing React categories and sections');

    console.log('\n⚛️  Creating 3-level hierarchy: Topic → Category → Section\n');

    let categoryOrder = 1;
    let totalSections = 0;

    for (const [categorySlug, categoryData] of Object.entries(reactCurriculum)) {
      // Create Category
      const category = await Category.create({
        topicId: reactTopic._id,
        name: categoryData.name,
        slug: categorySlug,
        order: categoryOrder++,
        description: `Master ${categoryData.name} in React.js`
      });

      console.log(`📚 Category ${categoryOrder - 1}: ${categoryData.name}`);

      let sectionOrder = 1;

      // Create Sections for each subcategory
      for (const [subcategorySlug, topics] of Object.entries(categoryData.subcategories)) {
        const subcategoryName = subcategorySlug
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const difficulty = categorizeDifficulty(categoryData.name, subcategoryName);

        await Section.create({
          topicId: reactTopic._id,
          categoryId: category._id,
          title: subcategoryName,
          slug: `${categorySlug}-${subcategorySlug.toLowerCase()}`,
          order: sectionOrder++,
          description: `Learn ${subcategoryName} concepts in React`,
          difficulty: difficulty,
          keyPoints: topics
        });

        totalSections++;
        console.log(`      ✓ ${subcategoryName} (${difficulty})`);
      }

      console.log('');
    }

    const totalCategories = await Category.countDocuments({ topicId: reactTopic._id });

    console.log('🎉 React.js 3-level hierarchy created successfully!');
    console.log('📊 Summary:');
    console.log(`   Categories: ${totalCategories}`);
    console.log(`   Sections (Subcategories): ${totalSections}`);
    console.log(`\n✨ Flow: React → ${totalCategories} Categories → ${totalSections} Sections\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedReactHierarchy();
