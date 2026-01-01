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

const expressData = {
  "Express.js_Fundamentals": {
    "01_introduction": {
      "core_concepts": [
        "What is Express.js - Web Framework for Node.js",
        "Express vs Vanilla Node.js HTTP",
        "Middleware-based Architecture",
        "Key Features and Advantages"
      ],
      "project_setup": [
        "Express Project Initialization",
        "Package.json Dependencies",
        "Basic Server Setup",
        "Nodemon for Development"
      ]
    },

    "02_basic_server": {
      "server_creation": [
        "Creating Express Application",
        "Server Listening on Port",
        "Basic Route Handling",
        "Startup and Shutdown"
      ],
      "route_handling": [
        "HTTP Methods (GET, POST, PUT, DELETE)",
        "Route Parameters (:id)",
        "Request and Response Objects",
        "Route Chaining"
      ]
    }
  },

  "Middleware": {
    "01_middleware_basics": [
      "What is Middleware",
      "Request-Response Cycle",
      "Middleware Function Signature",
      "app.use() Method"
    ],

    "02_built_in_middleware": [
      "express.json() for JSON Parsing",
      "express.urlencoded() for Form Data",
      "express.static() for Static Files",
      "express.Router() for Modular Routes"
    ],

    "03_custom_middleware": [
      "Creating Custom Middleware",
      "Middleware Execution Order",
      "Error Handling Middleware",
      "Next() Function Usage"
    ],

    "04_third_party_middleware": [
      "CORS Middleware",
      "Helmet for Security",
      "Morgan for Logging",
      "Compression for Gzip"
    ]
  },

  "Routing": {
    "01_basic_routing": [
      "Route Definition Methods",
      "Route Paths and Patterns",
      "Multiple Route Handlers",
      "Route Matching Order"
    ],

    "02_route_parameters": [
      "Path Parameters (:id, :name)",
      "Accessing Parameters (req.params)",
      "Optional Parameters",
      "Regular Expressions in Routes"
    ],

    "03_query_parameters": [
      "Query String Parsing",
      "Accessing Queries (req.query)",
      "Query Parameter Validation",
      "URL Building with Queries"
    ],

    "04_router_module": [
      "Creating Router Modules",
      "Router-level Middleware",
      "Route Prefixing",
      "Modular Application Structure"
    ]
  },

  "Request_Handling": {
    "01_request_object": [
      "req.params for Route Parameters",
      "req.query for Query Strings",
      "req.body for Request Body",
      "req.headers for HTTP Headers"
    ],

    "02_response_methods": [
      "res.send() for General Responses",
      "res.json() for JSON Responses",
      "res.render() for Template Rendering",
      "res.redirect() for Redirections"
    ],

    "03_response_status": [
      "res.status() for Status Codes",
      "Common HTTP Status Codes",
      "Error Status Codes (4xx, 5xx)",
      "Status Code Best Practices"
    ],

    "04_request_validation": [
      "Input Validation",
      "Data Sanitization",
      "Request Body Validation",
      "Custom Validation Middleware"
    ]
  },

  "Error_Handling": {
    "01_basic_error_handling": [
      "Try-Catch in Async Routes",
      "Error Handling Middleware",
      "Error Response Format",
      "Global Error Handler"
    ],

    "02_http_errors": [
      "Creating HTTP Errors",
      "Error Status Codes",
      "Error Message Formatting",
      "Error Logging"
    ],

    "03_async_error_handling": [
      "Async Middleware Pattern",
      "Error Propagation",
      "Promise Rejection Handling",
      "Async Error Wrappers"
    ]
  },

  "Static_Files_Templates": {
    "01_static_files": [
      "Serving Static Files",
      "Public Directory Setup",
      "File Path Resolution",
      "Caching Static Content"
    ],

    "02_template_engines": [
      "Setting View Engine",
      "EJS Template Basics",
      "Pug/Jade Templates",
      "Template Rendering with Data"
    ],

    "03_file_uploads": [
      "multer Middleware Setup",
      "Single and Multiple Uploads",
      "File Validation",
      "Upload Directory Management"
    ]
  },

  "API_Development": {
    "01_restful_apis": [
      "REST Principles",
      "Resource Naming Conventions",
      "HTTP Methods Usage",
      "API Versioning Strategies"
    ],

    "02_api_structure": [
      "Controller-Service Pattern",
      "Route-Controller Separation",
      "API Response Standardization",
      "Error Response Format"
    ],

    "03_api_documentation": [
      "API Documentation Basics",
      "Swagger/OpenAPI Setup",
      "Endpoint Documentation",
      "API Testing with Postman"
    ],

    "04_api_security": [
      "Input Validation",
      "Rate Limiting",
      "CORS Configuration",
      "Security Headers"
    ]
  },

  "Authentication_Authorization": {
    "01_authentication": [
      "JWT Token Implementation",
      "Session-based Authentication",
      "Password Hashing (bcrypt)",
      "Login/Logout Endpoints"
    ],

    "02_authorization": [
      "Role-based Access Control",
      "Middleware for Protection",
      "Route Guards",
      "Permission Checking"
    ],

    "03_security_middleware": [
      "Helmet.js for Security Headers",
      "Rate Limiting Middleware",
      "Input Sanitization",
      "CSRF Protection"
    ]
  },

  "Database_Integration": {
    "01_database_connection": [
      "Connection Pooling",
      "Database Configuration",
      "Connection Management",
      "Error Handling for DB"
    ],

    "02_crud_operations": [
      "Create Operations (POST)",
      "Read Operations (GET)",
      "Update Operations (PUT/PATCH)",
      "Delete Operations (DELETE)"
    ],

    "03_data_validation": [
      "Request Data Validation",
      "Database Schema Validation",
      "Input Sanitization",
      "Business Logic Validation"
    ]
  },

  "Testing": {
    "01_testing_setup": [
      "Jest Testing Framework",
      "Supertest for HTTP Testing",
      "Test Environment Setup",
      "Mocking Dependencies"
    ],

    "02_test_types": [
      "Unit Testing Controllers",
      "Integration Testing Routes",
      "Middleware Testing",
      "Error Handling Tests"
    ],

    "03_test_best_practices": [
      "Test Organization",
      "Mocking Database Calls",
      "Test Coverage",
      "Continuous Integration"
    ]
  },

  "Production_Ready": {
    "01_configuration": [
      "Environment Variables",
      "Configuration Management",
      "Different Environments (dev, prod)",
      "Secret Management"
    ],

    "02_performance": [
      "Compression Middleware",
      "Response Caching",
      "Connection Pooling",
      "Request Limiting"
    ],

    "03_monitoring": [
      "Logging Strategies",
      "Error Tracking",
      "Performance Monitoring",
      "Health Check Endpoints"
    ],

    "04_security": [
      "HTTPS Enforcement",
      "Security Headers",
      "Input Validation",
      "Dependency Updates"
    ]
  },

  "Microservices_Architecture": {
    "gateway_patterns": [
      "API Gateway Concepts",
      "Express Gateway Setup",
      "Request Forwarding (http-proxy)",
      "Service Registry"
    ],
    "inter_service_comm": [
      "HTTP/REST Communication",
      "Message Queues (RabbitMQ/Kafka)",
      "Circuit Breaker Pattern",
      "Distributed Tracing"
    ]
  },

  "RealTime_Communication": {
    "socket_io_integration": [
      "Socket.io Server Setup",
      "Events and Broadcasting",
      "Namespaces and Rooms",
      "Authentication in WebSockets"
    ],
    "sse_implementation": [
      "Server-Sent Events (SSE) Basics",
      "Streaming Data to Client",
      "Connection Management",
      "Reconnection Strategies"
    ]
  },

  "GraphQL_Integration": {
    "express_graphql": [
      "Apollo Server Express",
      "Schema and Resolvers",
      "Query Execution",
      "GraphiQL Interface"
    ],
    "performance": [
      "DataLoader for N+1 Problem",
      "Query Complexity Analysis",
      "Caching GraphQL Responses",
      "Subscriptions"
    ]
  },

  "TypeScript_Integration": {
    "ts_setup": [
      "TypeScript Configuration (tsconfig.json)",
      "Type Definitions (@types/express)",
      "Request/Response Interfaces",
      "Custom Type Declarations"
    ],
    "patterns": [
      "Data Transfer Objects (DTOs)",
      "Type-safe Middleware",
      "Dependency Injection",
      "Decorators Usage"
    ]
  },

  "Advanced_Security": {
    "attack_prevention": [
      "Rate Limiting (express-rate-limit)",
      "Dos Prevention",
      "Parameter Pollution (hpp)",
      "NoSQL Injection Prevention"
    ],
    "data_protection": [
      "Data Encryption at Rest",
      "Secure Cookie Strategies",
      "Content Security Policy (CSP)",
      "Helmet Configuration Deep Dive"
    ]
  },

  "Task_Scheduling_Queues": {
    "job_queues": [
      "BullMQ / Bull Setup",
      "Redis Connection",
      "Job Processing",
      "Delayed Jobs"
    ],
    "scheduling": [
      "Cron Jobs (node-cron)",
      "Agenda.js Usage",
      "Distributed Scheduling",
      "Task Monitoring"
    ]
  },

  "Best_Practices": {
    "01_code_organization": [
      "Project Structure",
      "Modular Architecture",
      "Separation of Concerns",
      "Code Reusability"
    ],

    "02_error_handling": [
      "Centralized Error Handling",
      "Error Response Format",
      "Logging Strategy",
      "Graceful Shutdown"
    ],

    "03_performance": [
      "Middleware Optimization",
      "Database Query Optimization",
      "Response Compression",
      "Caching Strategies"
    ],

    "04_security": [
      "Input Validation",
      "Authentication Security",
      "Dependency Security",
      "Regular Security Audits"
    ]
  },

  "Common_Patterns": {
    "01_application_patterns": [
      "MVC Pattern in Express",
      "Repository Pattern",
      "Service Layer Pattern",
      "Factory Pattern"
    ],

    "02_routing_patterns": [
      "Nested Routing",
      "Route Versioning",
      "Parameter Validation",
      "Route Grouping"
    ],

    "03_middleware_patterns": [
      "Conditional Middleware",
      "Error Handling Chains",
      "Authentication Flow",
      "Request Processing Pipeline"
    ]
  },

  "Essential_Projects": {
    "learning_projects": [
      "Todo List API (CRUD Operations)",
      "User Authentication System",
      "Blog API with Comments",
      "File Upload Service"
    ],

    "must_implement_features": [
      "User Registration and Login",
      "CRUD Operations with Database",
      "File Upload and Download",
      "API Documentation",
      "Error Handling System",
      "Input Validation"
    ]
  },

  "Development_Tools": {
    "development_workflow": [
      "Nodemon for Auto-restart",
      "Postman/Insomnia for API Testing",
      "Debugging Tools",
      "Logging Libraries"
    ],

    "code_quality": [
      "ESLint Configuration",
      "Prettier for Formatting",
      "Code Linting",
      "Commit Hooks"
    ]
  },

  "Interview_Preparation": {
    "core_concepts": [
      "Middleware Execution Flow",
      "Request-Response Cycle",
      "Routing Patterns",
      "Error Handling Strategies",
      "Authentication Implementation",
      "Database Integration"
    ],

    "common_questions": [
      "Difference between app.use() and app.get()",
      "Middleware vs Route Handlers",
      "Error Handling Patterns",
      "Security Best Practices",
      "Performance Optimization"
    ],

    "practical_skills": [
      "Build REST API from Scratch",
      "Implement Authentication System",
      "Create Custom Middleware",
      "Handle File Uploads",
      "Set Up Error Handling"
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

const seedExpress = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'express' });
        if (!topic) {
            console.log('Creating Express topic...');
            topic = await Topic.create({
                name: 'Express',
                slug: 'express',
                description: 'Build fast web applications with Express.js',
                icon: '🚂',
                order: 5,
                color: '#000000'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing Express data');
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
        for (const [mainKey, mainValue] of Object.entries(expressData)) {
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
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Production') || categoryName.includes('Security') ? 'advanced' : 
                               categoryName.includes('Introduction') || categoryName.includes('Fundamentals') || categoryName.includes('Basic') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ Express seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedExpress();
