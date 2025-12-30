
const expressjsCurriculum = {
  "01_express_foundations": {
    "overview_introduction": [
      "What is Express.js",
      "Why Express.js is Needed",
      "Express.js vs Native HTTP Server",
      "Express.js as a Web Framework",
      "Express.js Architecture",
      "Express.js Features and Benefits"
    ],
    "installation_setup": [
      "Express.js Installation (npm install express)",
      "Creating First Express Application",
      "Project Structure Setup",
      "Basic Server Configuration"
    ],
    "application_creation": [
      "Importing Express Module",
      "Creating Express Application Instance",
      "Server Listening Configuration",
      "Port and Host Configuration",
      "Environment-based Configuration"
    ]
  },
  "02_basic_routing": {
    "http_methods": [
      "HTTP Methods in Express",
      "GET Method Handling (app.get)",
      "POST Method Handling (app.post)",
      "PUT Method Handling (app.put)",
      "DELETE Method Handling (app.delete)",
      "PATCH Method Handling (app.patch)",
      "OPTIONS Method Handling",
      "app.all() Method (All HTTP Methods)"
    ],
    "route_handlers": [
      "Route Handler Functions",
      "Request-Response Pattern",
      "Route Callback Parameters",
      "Multiple Route Handlers",
      "Route Handler Chaining"
    ],
    "response_methods": [
      "res.send() Method",
      "res.json() Method",
      "Difference Between res.send() and res.json()",
      "res.sendFile() Method",
      "res.download() Method",
      "res.redirect() Method",
      "res.status() Method",
      "res.set() Method for Headers"
    ]
  },
  "03_request_handling": {
    "request_object": [
      "Request Object (req) Properties",
      "req.params (Route Parameters)",
      "req.query (Query Parameters)",
      "req.body (Request Body)",
      "req.headers (HTTP Headers)",
      "req.cookies (Cookie Data)",
      "req.ip (Client IP Address)",
      "req.method (HTTP Method)",
      "req.url and req.originalUrl",
      "req.protocol (HTTP/HTTPS)",
      "req.hostname (Host Name)"
    ],
    "parameter_handling": [
      "Route Parameters vs Query Parameters vs Request Body",
      "Parameter Validation",
      "Parameter Sanitization",
      "Default Parameter Values"
    ],
    "request_body": [
      "Body Parsing Middleware",
      "express.json() Middleware",
      "express.urlencoded() Middleware",
      "body-parser Package (Legacy)",
      "Multipart Form Data (Formidable/Multer)",
      "File Upload Handling",
      "Request Size Limits"
    ]
  },
  "04_advanced_routing": {
    "router_module": [
      "Express.Router Class",
      "Modular Route Organization",
      "Route Prefixing",
      "Router Middleware",
      "Nested Routers"
    ],
    "route_patterns": [
      "Static Routes",
      "Dynamic Routes with Parameters",
      "Optional Parameters",
      "Wildcard Routes (*)",
      "Regular Expression Routes",
      "Route Chaining"
    ],
    "route_organization": [
      "Route Separation by Feature",
      "Route Separation by Resource",
      "API Versioning in Routes",
      "Route Documentation"
    ]
  },
  "05_middleware": {
    "middleware_concepts": [
      "What is Middleware in Express",
      "Middleware Execution Flow",
      "Middleware Stack",
      "next() Function",
      "Middleware Error Handling"
    ],
    "middleware_types": [
      "Application-level Middleware",
      "Router-level Middleware",
      "Built-in Middleware",
      "Third-party Middleware",
      "Error-handling Middleware"
    ],
    "custom_middleware": [
      "Creating Custom Middleware",
      "Middleware Parameters",
      "Middleware Configuration",
      "Conditional Middleware",
      "Middleware Chaining"
    ],
    "middleware_registration": [
      "app.use() Method",
      "Route-specific Middleware",
      "Multiple Middleware Functions",
      "Middleware Order Importance"
    ],
    "practical_middleware_examples": [
      "Logging Middleware",
      "Authentication Middleware",
      "Authorization Middleware",
      "Request Validation Middleware",
      "Rate Limiting Middleware",
      "CORS Middleware",
      "Compression Middleware",
      "Security Headers Middleware"
    ]
  },
  "06_static_files_views": {
    "static_files": [
      "Serving Static Files",
      "express.static() Middleware",
      "Multiple Static Directories",
      "Virtual Path Prefixes",
      "File Caching Strategies"
    ],
    "template_engines": [
      "Template Engine Setup",
      "View Engine Configuration (app.set)",
      "Popular Template Engines (EJS, Pug, Handlebars)",
      "Template Rendering (res.render)",
      "Template Data Passing"
    ],
    "template_features": [
      "Template Partials/Components",
      "Template Layouts/Inheritance",
      "Template Helpers",
      "Template Conditional Rendering",
      "Template Loops and Iteration"
    ]
  },
  "07_session_management": {
    "cookies": [
      "HTTP Cookies Concept",
      "Setting Cookies (res.cookie)",
      "Reading Cookies (req.cookies)",
      "Cookie Options (maxAge, expires, secure, httpOnly, sameSite)",
      "Cookie Signing",
      "Cookie Security Best Practices"
    ],
    "express_sessions": [
      "Session Management",
      "express-session Middleware",
      "Session Configuration",
      "Session Stores (Memory, Redis, Database)",
      "Session Data Access (req.session)"
    ],
    "session_cookie_comparison": [
      "Cookies vs Sessions",
      "Session Storage Options",
      "Session Security Considerations",
      "Session Expiry Management"
    ]
  },
  "08_browser_storage": {
    "client_side_storage": [
      "localStorage API",
      "sessionStorage API",
      "IndexedDB Overview",
      "Client-side Storage vs Server-side Storage"
    ],
    "storage_comparisons": [
      "Cookies vs localStorage vs sessionStorage",
      "sessionStorage vs Express Sessions",
      "Storage Size Limitations",
      "Security Considerations"
    ],
    "browser_caching": [
      "Browser Cache Mechanism",
      "Cache-Control Headers",
      "ETag Headers",
      "Cache Busting Techniques"
    ]
  },
  "09_error_handling": {
    "error_middleware": [
      "Error-handling Middleware",
      "Error Middleware Signature",
      "Error Propagation",
      "Global Error Handler"
    ],
    "error_types": [
      "Synchronous Errors",
      "Asynchronous Errors",
      "404 Not Found Handling",
      "500 Internal Server Errors"
    ],
    "error_responses": [
      "Standard Error Response Format",
      "HTTP Status Codes for Errors",
      "Error Logging",
      "User-friendly Error Messages"
    ],
    "validation_errors": [
      "Request Validation",
      "Validation Libraries (Joi, express-validator)",
      "Validation Error Responses",
      "Input Sanitization"
    ]
  },
  "10_security": {
    "authentication": [
      "Authentication Strategies",
      "Passport.js Integration",
      "JWT Authentication",
      "Session-based Authentication",
      "OAuth Integration"
    ],
    "authorization": [
      "Role-based Access Control (RBAC)",
      "Permission-based Authorization",
      "Middleware for Authorization",
      "Protected Routes"
    ],
    "security_headers": [
      "helmet.js Middleware",
      "Content Security Policy (CSP)",
      "Cross-Site Scripting (XSS) Protection",
      "Clickjacking Protection"
    ],
    "api_security": [
      "CORS Configuration",
      "Rate Limiting",
      "API Key Authentication",
      "Request Throttling"
    ]
  },
  "11_api_design": {
    "restful_principles": [
      "RESTful API Design",
      "Resource Naming Conventions",
      "HTTP Methods Semantics",
      "Status Code Usage",
      "HATEOAS Concepts"
    ],
    "api_versioning": [
      "API Versioning Strategies",
      "URL Versioning",
      "Header Versioning",
      "Deprecation Handling"
    ],
    "api_documentation": [
      "API Documentation Tools (Swagger/OpenAPI)",
      "API Testing",
      "API Documentation Best Practices"
    ],
    "api_response_formats": [
      "JSON Response Standardization",
      "Pagination Implementation",
      "Filtering and Sorting",
      "Error Response Format"
    ]
  },
  "12_database_integration": {
    "database_connections": [
      "Database Connection Setup",
      "Connection Pooling",
      "Environment-based Configuration"
    ],
    "orm_odm_integration": [
      "Mongoose with Express",
      "Sequelize with Express",
      "Prisma with Express",
      "Model-View-Controller (MVC) Pattern"
    ],
    "data_validation": [
      "Database Validation",
      "Business Logic Separation",
      "Data Transformation"
    ]
  },
  "13_file_handling": {
    "file_uploads": [
      "Multer Middleware",
      "Single File Upload",
      "Multiple File Upload",
      "File Type Validation",
      "File Size Limits"
    ],
    "file_processing": [
      "File Storage Strategies",
      "Cloud Storage Integration",
      "File Compression",
      "Image Processing"
    ],
    "static_file_serving": [
      "File Download Endpoints",
      "Protected File Access",
      "File Streaming"
    ]
  },
  "14_application_configuration": {
    "configuration_management": [
      "Environment Configuration",
      "Configuration Files",
      "app.set() for Application Settings",
      "app.locals for Local Variables"
    ],
    "application_structure": [
      "Project Organization",
      "Separation of Concerns",
      "Module Organization",
      "Configuration Management"
    ]
  },
  "15_testing": {
    "testing_frameworks": [
      "Jest with Express",
      "Mocha/Chai with Express",
      "Supertest for API Testing"
    ],
    "test_types": [
      "Unit Testing Routes",
      "Integration Testing",
      "Middleware Testing",
      "Mocking Dependencies"
    ],
    "test_organization": [
      "Test File Structure",
      "Test Database Setup",
      "Test Environment Configuration"
    ]
  },
  "16_performance_optimization": {
    "caching": [
      "Response Caching",
      "Redis Caching",
      "Memory Caching",
      "Cache Invalidation"
    ],
    "compression": [
      "Response Compression",
      "compression Middleware",
      "Gzip/Brotli Compression"
    ],
    "optimization_techniques": [
      "Database Query Optimization",
      "Connection Pooling",
      "Request/Response Optimization"
    ]
  },
  "17_deployment_production": {
    "process_management": [
      "PM2 Process Manager",
      "Cluster Mode",
      "Zero-downtime Deployment"
    ],
    "production_configuration": [
      "Environment Variables",
      "Security Hardening",
      "Logging Configuration",
      "Monitoring Setup"
    ],
    "deployment_strategies": [
      "Docker Containerization",
      "Cloud Deployment",
      "Load Balancer Configuration"
    ]
  },
  "18_practical_projects": {
    "beginner_projects": [
      "RESTful CRUD API",
      "User Authentication System",
      "File Upload Service",
      "Todo List API"
    ],
    "intermediate_projects": [
      "E-commerce API",
      "Blogging Platform",
      "Real-time Chat Application",
      "Social Media API"
    ],
    "advanced_projects": [
      "Microservices Gateway",
      "API Gateway with Rate Limiting",
      "Real-time Dashboard",
      "Multi-tenant Application"
    ]
  },
  "19_best_practices": {
    "code_organization": [
      "Controller-Service-Repository Pattern",
      "Middleware Organization",
      "Error Handling Strategy",
      "Configuration Management"
    ],
    "security_practices": [
      "Input Validation",
      "Output Encoding",
      "Authentication Implementation",
      "Dependency Security"
    ],
    "performance_practices": [
      "Middleware Optimization",
      "Database Optimization",
      "Caching Strategy",
      "Connection Management"
    ],
    "maintenance": [
      "Code Documentation",
      "API Documentation",
      "Version Control Practices",
      "Continuous Integration"
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
  
  if (lowerName.includes('security') || 
      lowerName.includes('optimize') || 
      lowerName.includes('deployment') || 
      lowerName.includes('scaling') ||
      lowerName.includes('microservice') ||
      lowerName.includes('gateway') ||
      lowerName.includes('advanced')) {
    return 'advanced';
  }
  
  if (lowerName.includes('middleware') || 
      lowerName.includes('auth') || 
      lowerName.includes('api design') || 
      lowerName.includes('database') ||
      lowerName.includes('file')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (Express.js) - looking for "Express.js" or "Express"
    let topic = await Topic.findOne({ slug: 'express' });
    if (!topic) {
        // Fallback or create
        topic = await Topic.findOne({ slug: 'expressjs' });
    }
    
    if (!topic) {
      console.log('ℹ️ Express.js topic not found, creating...');
      topic = await Topic.create({
        name: 'Express.js',
        slug: 'express',
        description: 'Fast, unopinionated, minimalist web framework for Node.js',
        icon: '🚂',
        order: 4,
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

    for (const [catKey, sectionsObj] of Object.entries(expressjsCurriculum)) {
      // Format Category Name: "01_express_foundations" -> "Express Foundations"
      let catName = catKey.replace(/^\d+_/, '').split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Manual fixes for casing
      catName = catName.replace('Expressjs', 'Express.js');

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
          .replace('Http', 'HTTP')
          .replace('Api', 'API')
          .replace('Json', 'JSON')
          .replace('Jwt', 'JWT')
          .replace('Cors', 'CORS')
          .replace('Csrf', 'CSRF')
          .replace('Xss', 'XSS')
          .replace('Url', 'URL')
          .replace('Mvc', 'MVC')
          .replace('Npm', 'NPM')
          .replace('Crud', 'CRUD');

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
