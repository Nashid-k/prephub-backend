import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { assignGroup } from '../utils/categoryGrouping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const nextjsData = {
  "Next.js_Fundamentals": {
    "01_introduction": {
      "core_concepts": [
        "What is Next.js - React Framework",
        "Key Features and Advantages",
        "Next.js vs Create React App",
        "When to Use Next.js"
      ],
      "project_setup": [
        "create-next-app CLI Tool",
        "Project Structure Overview",
        "TypeScript Setup",
        "Development Server"
      ]
    },

    "02_routing_system": {
      "file_based_routing": [
        "Pages Directory Structure",
        "Basic Route Creation",
        "Nested Routes and Folders",
        "Index Routes (index.js)"
      ],
      "dynamic_routing": [
        "Dynamic Routes [slug]",
        "Catch-all Routes [...slug]",
        "Optional Catch-all Routes [[...slug]]",
        "Route Parameters Access"
      ],
      "navigation": [
        "Link Component for Client Navigation",
        "Programmatic Navigation (useRouter)",
        "Prefetching Behavior",
        "Active Link Styling"
      ]
    },

    "03_rendering_strategies": {
      "rendering_options": [
        "Client-Side Rendering (CSR)",
        "Server-Side Rendering (SSR)",
        "Static Site Generation (SSG)",
        "Incremental Static Regeneration (ISR)"
      ],
      "when_to_use": [
        "CSR for Dynamic User Interfaces",
        "SSR for SEO-Critical Pages",
        "SSG for Blog/Content Sites",
        "ISR for Frequently Updated Content"
      ]
    }
  },

  "Data_Fetching": {
    "01_server_side": {
      "getserversideprops": [
        "Function Signature and Usage",
        "Context Parameter Access",
        "Fetching at Request Time",
        "Authentication in SSR"
      ],
      "use_cases": [
        "User-Specific Data",
        "Real-time Data",
        "Protected Routes",
        "Dynamic Content"
      ]
    },

    "02_static_generation": {
      "getstaticprops": [
        "Function Signature and Usage",
        "Pre-rendering at Build Time",
        "Data Fetching for Static Pages",
        "Environment Variables"
      ],
      "getstaticpaths": [
        "Dynamic Static Pages",
        "fallback Options (false, true, blocking)",
        "Predefined Paths",
        "Incremental Builds"
      ],
      "incremental_regeneration": [
        "revalidate Property",
        "On-demand Revalidation",
        "Stale-While-Revalidate",
        "Content Updates"
      ]
    },

    "03_client_side": [
      "useEffect for Data Fetching",
      "SWR Library for Caching",
      "React Query (TanStack Query)",
      "Loading and Error States"
    ],

    "04_api_routes": [
      "Creating API Endpoints",
      "Request/Response Handling",
      "Dynamic API Routes",
      "Middleware in API Routes"
    ]
  },

  "Core_Features": {
    "01_image_optimization": [
      "next/image Component",
      "Automatic Image Optimization",
      "Layout Options (responsive, fill, intrinsic)",
      "Priority Loading and Lazy Loading"
    ],

    "02_font_optimization": [
      "next/font Component",
      "Google Fonts Integration",
      "Font Display Strategies",
      "Performance Benefits"
    ],

    "03_script_optimization": [
      "next/script Component",
      "Loading Strategies",
      "Third-Party Scripts",
      "Performance Impact"
    ],

    "04_code_splitting": [
      "Automatic Code Splitting",
      "Dynamic Imports",
      "Route-Based Splitting",
      "Bundle Size Optimization"
    ]
  },

  "Styling": {
    "01_styling_options": {
      "built_in": [
        "CSS Modules (Component.module.css)",
        "Global CSS (globals.css)",
        "Styled JSX",
        "Sass/SCSS Support"
      ],
      "css_in_js": [
        "Styled Components",
        "Emotion",
        "Performance Considerations",
        "Server-Side Rendering"
      ],
      "utility_frameworks": [
        "Tailwind CSS Integration",
        "Setup and Configuration",
        "PurgeCSS Optimization"
      ]
    }
  },

  "Configuration": {
    "01_configuration_files": {
      "next_config": [
        "next.config.js Basics",
        "Environment Variables",
        "Redirects and Rewrites",
        "Headers Configuration"
      ],
      "custom_app": [
        "_app.js Component",
        "Global Layout Pattern",
        "Persistent Layouts",
        "Global State Providers"
      ],
      "custom_document": [
        "_document.js Component",
        "HTML Structure Customization",
        "Server-Side Styles",
        "Meta Tags Management"
      ]
    },

    "02_environment": [
      "Environment Variables (.env.local)",
      "NEXT_PUBLIC_ Prefix",
      "Build-time vs Runtime Variables",
      "Multi-environment Setup"
    ],

    "03_middleware": [
      "Middleware Configuration",
      "Request/Response Modification",
      "Authentication Middleware",
      "Path Matching"
    ]
  },

  "State_Management": {
    "01_client_state": [
      "React Context API",
      "useState and useReducer",
      "Custom Hooks",
      "Local Storage Integration"
    ],

    "02_server_state": [
      "SWR for Data Fetching",
      "React Query (TanStack Query)",
      "Cache Management",
      "Mutation Handling"
    ],

    "03_global_state": [
      "Redux Toolkit",
      "Zustand (Lightweight)",
      "Jotai (Atomic State)",
      "State Persistence"
    ]
  },

  "Authentication": {
    "01_auth_methods": [
      "NextAuth.js Setup",
      "JWT Authentication",
      "OAuth Providers (Google, GitHub)",
      "Session Management"
    ],

    "02_protected_routes": [
      "Middleware Protection",
      "getServerSideProps Auth Check",
      "Client-Side Route Guards",
      "Role-Based Access"
    ],

    "03_user_management": [
      "User Registration",
      "Login/Logout Flows",
      "Profile Management",
      "Password Reset"
    ]
  },

  "Performance_Optimization": {
    "01_core_web_vitals": [
      "LCP (Largest Contentful Paint)",
      "FID (First Input Delay)",
      "CLS (Cumulative Layout Shift)",
      "Performance Monitoring"
    ],

    "02_optimization_techniques": [
      "Image Optimization",
      "Font Optimization",
      "Code Splitting",
      "Bundle Size Reduction"
    ],

    "03_caching": [
      "CDN Caching",
      "Browser Caching",
      "API Response Caching",
      "ISR for Dynamic Content"
    ]
  },

  "Deployment": {
    "01_build_process": [
      "next build Command",
      "Production Optimization",
      "Bundle Analyzer",
      "Build Output Analysis"
    ],

    "02_deployment_platforms": {
      "vercel": [
        "Automatic Deployments",
        "Preview Deployments",
        "Environment Variables",
        "Custom Domains"
      ],
      "other_platforms": [
        "Static Export (next export)",
        "Node.js Server Deployment",
        "Docker Containerization",
        "CI/CD Pipeline Setup"
      ]
    }
  },

  "Testing": {
    "01_testing_types": [
      "Unit Testing with Jest",
      "Component Testing (React Testing Library)",
      "E2E Testing (Cypress/Playwright)",
      "API Route Testing"
    ],

    "02_testing_setup": [
      "Jest Configuration",
      "Testing Utilities",
      "Mocking API Calls",
      "Snapshot Testing"
    ]
  },

  "SEO_Metadata": {
    "seo_basics": [
      "next/head Component",
      "Meta Tags Management",
      "Open Graph Tags",
      "Structured Data (JSON-LD)"
    ],

    "dynamic_seo": [
      "Dynamic Meta Tags",
      "Server-Side SEO",
      "Sitemap Generation",
      "robots.txt Configuration"
    ]
  },

  "Error_Handling": {
    "error_pages": [
      "Custom 404 Page",
      "Custom 500 Page",
      "Error Boundary Implementation",
      "Graceful Error Handling"
    ],

    "error_monitoring": [
      "Error Tracking Setup",
      "Logging Strategies",
      "Production Error Handling",
      "User Feedback"
    ]
  },



  "App_Router_Architecture": {
    "app_router_basics": [
      "app/ Directory Structure",
      "Pages vs Layouts",
      "Templates vs Layouts",
      "Groups and Private Folders"
    ],
    "nested_layouts": [
      "Root Layout (layout.js)",
      "Nested Layouts",
      "Multiple Root Layouts",
      "UI Colocation"
    ]
  },

  "Server_Components_And_Actions": {
    "rsc_in_nextjs": [
      "Server vs Client Components",
      "Fetching Data on Server",
      "Streaming and Suspense",
      "Static vs Dynamic Rendering"
    ],
    "server_actions": [
      "Form Actions (action prop)",
      "Server Mutations (useFormState)",
      "Revalidating Data (revalidatePath)",
      "Redirecting (redirect)"
    ]
  },

  "NextAuth_v5": {
    "auth_setup": [
      "Auth.js Installation",
      "Route Handlers (GET/POST)",
      "Middleware Protection",
      "Session Management"
    ],
    "providers": [
      "OAuth Providers (Google/GitHub)",
      "Credentials Provider",
      "Email Magic Links",
      "Database Adapters (Prisma/Drizzle)"
    ]
  },

  "Advanced_Routing_Patterns": {
    "route_handlers": [
      "GET/POST/PUT/DELETE Handlers",
      "Dynamic Route Segments",
      "URL Query Parameters",
      "Cookie and Header Manipulation"
    ],
    "parallel_intercepting_routes": [
      "Parallel Routes (@slot)",
      "Intercepting Routes (.)",
      "Modal Patterns",
      "Conditional Routes"
    ]
  },

  "Edge_Functions_And_Middleware": {
    "middleware_deep_dive": [
      "Matching Paths",
      "Modifying Request/Response",
      "Geo-blocking/localization",
      "A/B Testing with Middleware"
    ],
    "edge_runtime": [
      "Edge vs Node Runtime",
      "Supported APIs on Edge",
      "Vercel Edge Functions",
      "OpenNext Adapter"
    ]
  },

  "Database_Integration": {
    "prisma_orm": [
      "Prisma Schema Setup",
      "Prisma Client in Next.js",
      "Database Migrations",
      "Seeding Data"
    ],
    "drizzle_orm": [
      "Drizzle Config",
      "Type-safe SQL Queries",
      "Serverless Database Connections",
      "Drizzle Kit"
    ]
  },

  "Internationalization_i18n": {
    "app_router_i18n": [
      "Routing with Locales",
      "Middleware for Locale Detection",
      "Dictionaries Pattern",
      "Static Generation with Locales"
    ]
  },

  "Advanced_Deployment": {
    "vercel_features": [
      "Feature Flags (Edge Config)",
      "Vercel Blob Storage",
      "Vercel KV (Redis)",
      "Vercel Postgres"
    ],
    "docker_self_hosting": [
      "Multi-stage Dockerfile",
      "Standalone Output Mode",
      "Environment Management",
      "PM2 Process Management"
    ]
  },

  "Best_Practices": {
    "01_project_structure": [
      "Feature-Based Organization",
      "Component Library Setup",
      "Utility Functions Organization",
      "TypeScript Best Practices"
    ],

    "02_code_organization": [
      "Custom Hooks Creation",
      "API Layer Abstraction",
      "Middleware Organization",
      "Environment Configuration"
    ],

    "03_performance": [
      "Avoid Large Dependencies",
      "Optimize Images",
      "Implement Caching",
      "Monitor Bundle Size"
    ]
  },

  "Practical_Projects": {
    "01_project_types": {
      "content_sites": [
        "Blog with Markdown/Contentful",
        "Documentation Site",
        "Portfolio Website",
        "E-commerce Product Pages"
      ],
      "web_applications": [
        "Dashboard with Authentication",
        "Real-time Chat Application",
        "Social Media Platform",
        "Task Management App"
      ]
    },

    "02_essential_features": [
      "Authentication System",
      "CRUD Operations",
      "File Uploads",
      "Real-time Updates",
      "Search Functionality",
      "Pagination"
    ]
  },

  "Interview_Preparation": {
    "common_topics": [
      "Rendering Strategies Comparison",
      "Data Fetching Methods",
      "Performance Optimization",
      "Authentication Implementation",
      "Deployment Process"
    ],

    "practical_skills": [
      "Build a Full-stack Application",
      "Implement Authentication",
      "Optimize for Performance",
      "Handle SEO Requirements",
      "Deploy to Production"
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

const seedNextjs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'nextjs' });
        if (!topic) {
            console.log('Creating Next.js topic...');
            topic = await Topic.create({
                name: 'Next.js',
                slug: 'nextjs',
                description: 'Build production-ready React applications with Next.js',
                icon: '▲',
                order: 8,
                color: '#000000'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing Next.js data');
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
        for (const [mainKey, mainValue] of Object.entries(nextjsData)) {
            const groupName = formatName(mainKey); // Use mainKey as group - maintains study order!
            
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: groupName,
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
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Performance') ? 'advanced' : 
                               categoryName.includes('Introduction') || categoryName.includes('Fundamentals') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ Next.js seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedNextjs();
