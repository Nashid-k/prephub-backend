import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const nextjsHierarchy = {
  "Foundations & Core Concepts": {
    "What is Next.js": [
      "What is Next.js?",
      "Advantages over Create React App",
      "Features and Benefits",
      "Built-in Optimization Features"
    ],
    "Setup & Installation": [
      "Project Creation (create-next-app)",
      "Folder Structure",
      "package.json Dependencies",
      "Development vs Production Builds"
    ],
    "Rendering Strategies": [
      "Client-Side Rendering (CSR)",
      "Server-Side Rendering (SSR)",
      "Static Site Generation (SSG)",
      "Incremental Static Regeneration (ISR)",
      "When to Use Each Strategy",
      "SSR vs SSG Use Cases"
    ],
    "File-Based Routing": [
      "Pages Directory Structure",
      "Dynamic Routes ([param])",
      "Nested Routes",
      "Catch-all Routes ([...slug])",
      "Optional Catch-all Routes ([[...slug]])",
      "API Routes Structure"
    ]
  },
  "Data Fetching Methods": {
    "Server-Side Props": [
      "getServerSideProps Function",
      "Context Parameter",
      "Fetching Data at Request Time",
      "Use Cases for SSR"
    ],
    "Static Generation": [
      "getStaticProps Function",
      "Pre-rendering at Build Time",
      "getStaticPaths",
      "fallback Property (false, true, 'blocking')"
    ],
    "Incremental Static": [
      "Incremental Static Regeneration (ISR)",
      "revalidate Property",
      "On-demand Revalidation",
      "Stale-While-Revalidate Pattern"
    ],
    "Client-Side Fetching": [
      "useEffect Hook for Data Fetching",
      "SWR Library",
      "React Query",
      "When to Use Client-Side Fetching"
    ],
    "Data Fetching Rules": [
      "getStaticProps and getServerSideProps Restrictions",
      "Page-Only Data Fetching Functions"
    ]
  },
  "API Routes & Backend": {
    "API Basics": [
      "API Routes Structure",
      "Creating API Endpoints",
      "Request/Response Handlers",
      "HTTP Methods Support"
    ],
    "Middleware": [
      "Custom Middleware Creation",
      "Middleware Configuration",
      "Request/Response Modification",
      "Authentication Middleware"
    ],
    "Advanced API Features": [
      "API Route Caching",
      "Dynamic API Routes",
      "Preview Mode",
      "API Response Helpers"
    ]
  },
  "Routing & Navigation": {
    "Next Router": [
      "useRouter Hook",
      "Router Methods (push, replace, back)",
      "push vs replace Difference",
      "Singleton Router"
    ],
    "Link Component": [
      "Link Component Basics",
      "Prefetching Behavior",
      "Shallow Routing",
      "Scroll Restoration"
    ],
    "Programmatic Navigation": [
      "Router.push()",
      "Router.replace()",
      "Router.back()",
      "Router Events"
    ],
    "Redirects & Rewrites": [
      "Redirect Configuration",
      "Rewrites Configuration",
      "Middleware Redirects",
      "Permanent vs Temporary Redirects"
    ]
  },
  "Optimization Features": {
    "Image Optimization": [
      "next/image Component",
      "Image Optimization",
      "Layout Options",
      "Priority Loading",
      "Placeholder Images"
    ],
    "Script Optimization": [
      "next/script Component",
      "Script Loading Strategies",
      "Third-Party Scripts"
    ],
    "Font Optimization": [
      "next/font Component",
      "Google Fonts Optimization",
      "Custom Fonts",
      "Font Display Strategies"
    ],
    "Code Splitting": [
      "Automatic Code Splitting",
      "Dynamic Imports",
      "Static vs Dynamic Imports",
      "Route-Based Splitting"
    ]
  },
  "Styling Methods": {
    "CSS Modules": [
      "CSS Modules Support",
      "Local Scoping",
      "Module Import Syntax"
    ],
    "Global Styles": [
      "Global CSS Files",
      "styles/globals.css",
      "CSS Reset/Normalize"
    ],
    "CSS-in-JS": [
      "Styled Components",
      "Emotion",
      "Styled JSX"
    ],
    "Utility Frameworks": [
      "Tailwind CSS Integration",
      "Bootstrap with Next.js"
    ],
    "Sass Support": [
      "Sass/SCSS Support",
      "Sass Module Import"
    ]
  },
  "Core Files & Config": {
    "App Component": [
      "_app.js/_app.tsx",
      "Custom App Component",
      "Global Layout Pattern",
      "Persistent Layout"
    ],
    "Document File": [
      "_document.js/_document.tsx",
      "Custom Document",
      "HTML Structure Modification",
      "Server-Side Rendering of Styles"
    ],
    "Configuration": [
      "next.config.js",
      "Environment Variables (NEXT_PUBLIC_)",
      "Build-Time Environment Variables",
      "Runtime Configuration"
    ],
    "Custom Server": [
      "Custom Server Setup",
      "Express.js Integration",
      "Custom Server Use Cases",
      "server.js Configuration"
    ]
  },
  "State Management": {
    "Client State": [
      "React Context API",
      "useState Hook",
      "useReducer Hook",
      "Custom Hooks"
    ],
    "Server State": [
      "React Query (TanStack Query)",
      "SWR Library",
      "Data Synchronization"
    ],
    "Global State": [
      "Redux Toolkit",
      "Zustand",
      "Jotai",
      "Recoil"
    ]
  },
  "Authentication & Authorization": {
    "Authentication Methods": [
      "NextAuth.js",
      "JWT Authentication",
      "OAuth Providers",
      "Cookie-Based Auth"
    ],
    "Protected Routes": [
      "Middleware Protection",
      "Higher-Order Components",
      "Route Guards"
    ],
    "Authorization": [
      "Role-Based Access Control",
      "Permission Checks",
      "Server-Side Authorization"
    ]
  },
  "Deployment & Build": {
    "Build Process": [
      "next build Command",
      "Production Optimization",
      "Bundle Analyzer"
    ],
    "Deployment Options": [
      "Vercel Deployment",
      "Static Export (next export)",
      "Docker Deployment",
      "Node.js Server Deployment"
    ],
    "Environment Config": [
      "Environment Variables",
      "Multi-environment Setup",
      "Secret Management"
    ]
  },
  "Performance Optimization": {
    "Caching Strategies": [
      "Cache-Control Headers",
      "CDN Caching",
      "Browser Caching",
      "API Caching"
    ],
    "Performance Metrics": [
      "Core Web Vitals",
      "Lighthouse Audits",
      "Bundle Size Analysis"
    ],
    "Optimization Tools": [
      "Webpack Configuration",
      "Babel Configuration",
      "Compression"
    ]
  },
  "Advanced Features": {
    "AMP Support": [
      "AMP in Next.js",
      "AMP Components",
      "AMP Validation"
    ],
    "Internationalization": [
      "Next.js i18n Routing",
      "Locale Detection",
      "Language Switching"
    ],
    "Type Safety": [
      "TypeScript Support",
      "Type Definitions",
      "Type Checking Configuration"
    ],
    "Analytics": [
      "Next.js Analytics",
      "Custom Analytics",
      "Performance Monitoring"
    ]
  },
  "Developer Experience": {
    "Development Features": [
      "Fast Refresh (Hot Reload)",
      "Error Overlay",
      "Development Server"
    ],
    "Testing": [
      "Jest Configuration",
      "React Testing Library",
      "Cypress E2E Testing"
    ],
    "Debugging": [
      "Source Maps",
      "Error Tracking",
      "Logging"
    ]
  },
  "Practical Patterns": {
    "Project Structure": [
      "Feature-Based Organization",
      "Component Organization",
      "Utility Functions"
    ],
    "Error Handling": [
      "Error Boundaries",
      "404 Pages",
      "500 Error Pages"
    ],
    "SEO Optimization": [
      "Metadata Management",
      "next/head Component",
      "Structured Data"
    ],
    "API Integration": [
      "REST API Integration",
      "GraphQL with Next.js",
      "WebSocket Support"
    ]
  }
};

const seedNextjsHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create Next.js topic
    let nextjsTopic = await Topic.findOne({ slug: 'nextjs' });
    if (!nextjsTopic) {
      const topicCount = await Topic.countDocuments();
      nextjsTopic = await Topic.create({
        name: 'Next.js',
        slug: 'nextjs',
        description: 'Master Next.js - the React framework for production. From SSR/SSG to API routes, optimization, and deployment.',
        icon: '⚡',
        order: topicCount + 1,
        estimatedHours: 45
      });
      console.log('✅ Created Next.js topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(nextjsHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '');
        
        let category = await Category.findOne({
          topicId: nextjsTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: nextjsTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName} in Next.js`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = `${categorySlug}-${sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,&/]/g, '')
            .replace(/:/g, '')
            .replace(/'/g, '')}`;

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: nextjsTopic._id,
              title: sectionTitle,
              slug: sectionSlug,
              order: sectionOrder++,
              description: `Learn about ${sectionTitle}`,
              difficulty: 'intermediate',
              estimatedTime: 30
            });
          }
        }
      }
    }

    console.log('🎉 Next.js hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Next.js:', error);
    process.exit(1);
  }
};

seedNextjsHierarchy();
