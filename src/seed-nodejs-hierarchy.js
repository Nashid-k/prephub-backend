import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';
import slugify from 'slugify';

dotenv.config();

const nodejsCurriculum = {
  "01_nodejs_foundations": {
    "runtime_overview": [
      "What is Node.js",
      "Node.js as a Runtime Environment",
      "JavaScript Runtime Architecture",
      "V8 JavaScript Engine",
      "Node.js vs Browser JavaScript",
      "Single-threaded Nature of Node.js",
      "Event-driven Programming Model",
      "Non-blocking I/O Operations"
    ],
    "installation_setup": [
      "Node.js Installation",
      "Node.js Version Management",
      "NVM (Node Version Manager)",
      "Checking Node.js Version",
      "Environment Setup"
    ],
    "repl_cli": [
      "REPL (Read-Eval-Print Loop)",
      "Command-line Interface (CLI)",
      "Command-line Arguments",
      "User Agent Information"
    ]
  },
  "02_package_management": {
    "npm_ecosystem": [
      "NPM (Node Package Manager)",
      "NPX (Node Package Execute)",
      "NPM vs NPX Differences",
      "Package.json File Structure",
      "Package-lock.json Purpose",
      ".npmrc Configuration File"
    ],
    "package_operations": [
      "Installing Packages (npm install)",
      "Global Installation (-g flag)",
      "Local Installation",
      "Removing Packages (npm uninstall)",
      "Updating Packages (npm update)",
      "Listing Installed Packages"
    ],
    "dependency_management": [
      "Dependencies vs Dev Dependencies",
      "Peer Dependencies",
      "Optional Dependencies",
      "Semantic Versioning (SemVer)",
      "Version Ranges (^, ~, *)",
      "Package.json Scripts"
    ],
    "environment_configuration": [
      "Environment Variables",
      ".env Files and dotenv Package",
      "Accessing Environment Variables",
      "Environment-specific Configuration",
      "Configuration Management"
    ]
  },
  "03_core_modules": {
    "global_objects": [
      "Global Object in Node.js",
      "process Object",
      "console Object",
      "Buffer Global",
      "__dirname and __filename"
    ],
    "process_module": [
      "process.argv (Command-line Arguments)",
      "process.env (Environment Variables)",
      "process.cwd() (Current Working Directory)",
      "process.exit()",
      "process.nextTick()",
      "process.memoryUsage()"
    ],
    "file_system_module": [
      "fs Module Overview",
      "Synchronous vs Asynchronous Operations",
      "File Reading (readFile, readFileSync)",
      "File Writing (writeFile, writeFileSync)",
      "File Appending (appendFile)",
      "File Operations: rename, unlink, copy",
      "Directory Operations: mkdir, readdir, rmdir",
      "File Statistics (fs.stat)",
      "File Descriptors (fs.open)",
      "Stream-based File Operations"
    ],
    "path_module": [
      "path Module Overview",
      "path.join()",
      "path.resolve()",
      "path.basename()",
      "path.dirname()",
      "path.extname()",
      "path.parse()",
      "path.normalize()"
    ],
    "os_module": [
      "os Module Overview",
      "os.platform()",
      "os.arch()",
      "os.cpus()",
      "os.freemem()",
      "os.totalmem()",
      "os.hostname()",
      "os.networkInterfaces()"
    ],
    "url_module": [
      "url Module Overview",
      "URL Parsing (url.parse)",
      "URL Formatting (url.format)",
      "URL Resolution (url.resolve)",
      "WHATWG URL API",
      "Query String Parsing"
    ],
    "utility_modules": [
      "util Module",
      "util.promisify()",
      "util.inherits()",
      "util.types",
      "zlib Module (Compression)",
      "crypto Module"
    ]
  },
  "04_networking_fundamentals": {
    "network_concepts": [
      "TCP/IP Protocol",
      "DNS (Domain Name System)",
      "Host and Port Concepts",
      "Sockets and Ports",
      "Network Layers Overview"
    ],
    "http_protocol": [
      "HTTP Protocol Basics",
      "HTTP vs HTTPS",
      "SSL/TLS Certificates",
      "Stateless Nature of HTTP",
      "HTTP/1.1 vs HTTP/2"
    ],
    "http_components": [
      "HTTP Request Structure",
      "HTTP Response Structure",
      "HTTP Methods (GET, POST, PUT, DELETE, PATCH)",
      "HTTP Headers",
      "Status Codes Categories"
    ],
    "status_codes": [
      "1xx Informational (100 Continue)",
      "2xx Success (200 OK, 201 Created, 204 No Content)",
      "3xx Redirection (301 Moved Permanently, 304 Not Modified)",
      "4xx Client Errors (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)",
      "5xx Server Errors (500 Internal Server Error, 502 Bad Gateway)"
    ]
  },
  "05_http_server": {
    "http_module": [
      "http Module Overview",
      "Creating HTTP Server",
      "Server Configuration",
      "Server Lifecycle"
    ],
    "request_handling": [
      "Request Object (req)",
      "Request Properties: method, url, headers",
      "Request Body Parsing",
      "Query Parameters",
      "Route Parameters"
    ],
    "response_handling": [
      "Response Object (res)",
      "Setting Headers (setHeader)",
      "Setting Status Code (writeHead)",
      "Sending Response (write, end)",
      "Response Chunking"
    ],
    "routing": [
      "Basic Routing Implementation",
      "Route Matching",
      "HTTP Method-based Routing",
      "Route Parameters Handling",
      "Wildcard Routes"
    ],
    "server_configuration": [
      "Server Listening Configuration",
      "Port Binding",
      "Host Configuration",
      "Server Timeouts",
      "Keep-alive Connections"
    ]
  },
  "06_asynchronous_programming": {
    "async_patterns": [
      "Callback Pattern",
      "Error-first Callbacks",
      "Callback Hell (Pyramid of Doom)",
      "Promises",
      "async/await Syntax"
    ],
    "promise_operations": [
      "Promise Creation",
      "Promise Chaining",
      "Promise.all()",
      "Promise.race()",
      "Promise.allSettled()",
      "Promise.any()",
      "Error Handling in Promises"
    ],
    "conversion_utilities": [
      "Promisify Utility",
      "Callback to Promise Conversion",
      "Async Function Wrappers"
    ]
  },
  "07_event_loop": {
    "event_loop_architecture": [
      "Event Loop Concept",
      "Event Loop Phases",
      "Libuv Library",
      "Event Loop Visualization"
    ],
    "queues_phases": [
      "Timer Queue (setTimeout, setInterval)",
      "I/O Callback Queue",
      "Idle/Prepare Queue",
      "Poll Queue",
      "Check Queue (setImmediate)",
      "Close Callback Queue"
    ],
    "priority_queues": [
      "Microtask Queue (Promises)",
      "process.nextTick Queue",
      "Queue Priority Order",
      "Event Loop Starvation"
    ],
    "performance_considerations": [
      "Blocking the Event Loop",
      "CPU-bound Operations Impact",
      "I/O-bound Operations",
      "Event Loop Monitoring"
    ]
  },
  "08_concurrency_threading": {
    "concurrency_concepts": [
      "Concurrency vs Parallelism",
      "Single-threaded Event Loop",
      "Non-blocking I/O Model",
      "How Node.js Handles Concurrency"
    ],
    "worker_threads": [
      "Worker Threads Module",
      "Creating Worker Threads",
      "Message Passing",
      "Shared Memory (SharedArrayBuffer)",
      "Worker Thread Pool Pattern"
    ],
    "cluster_module": [
      "Cluster Module",
      "Master-Worker Architecture",
      "Process Forking",
      "Load Balancing",
      "Zero-downtime Restarts"
    ],
    "thread_pool": [
      "Libuv Thread Pool",
      "Thread Pool Size Configuration",
      "Operations Using Thread Pool",
      "Thread Pool Exhaustion"
    ]
  },
  "09_streams": {
    "stream_concepts": [
      "What are Streams",
      "Stream Benefits",
      "Streaming vs Buffering",
      "Backpressure Handling"
    ],
    "stream_types": [
      "Readable Streams",
      "Writable Streams",
      "Duplex Streams",
      "Transform Streams",
      "Duplex vs Transform Differences"
    ],
    "stream_operations": [
      "Piping Streams",
      "Chunk Processing",
      "Stream Events (data, end, error)",
      "Stream Methods (pipe, write, read)",
      "Stream Destruction"
    ],
    "practical_streaming": [
      "File Streaming",
      "HTTP Request/Response Streaming",
      "Data Transformation Piping",
      "Stream Error Handling"
    ]
  },
  "10_buffers": {
    "buffer_concepts": [
      "What are Buffers",
      "Binary Data Handling",
      "Buffer Allocation",
      "Buffer Encoding (utf8, base64, hex)"
    ],
    "buffer_operations": [
      "Buffer Creation",
      "Buffer Reading",
      "Buffer Writing",
      "Buffer Concatenation",
      "Buffer Comparison",
      "Buffer Slicing"
    ],
    "buffer_stream_relationship": [
      "Buffers in Streams",
      "Chunk Buffering",
      "Memory Management with Buffers"
    ]
  },
  "11_child_processes": {
    "process_management": [
      "Child Process Module",
      "Process Creation Methods",
      "Inter-process Communication"
    ],
    "execution_methods": [
      "spawn() Method",
      "exec() Method",
      "execFile() Method",
      "fork() Method"
    ],
    "comparisons": [
      "spawn vs exec Differences",
      "fork vs spawn Differences",
      "When to Use Each Method"
    ],
    "process_communication": [
      "Standard I/O Streams (stdin, stdout, stderr)",
      "Message Passing",
      "Process Signaling",
      "Exit Codes and Status"
    ]
  },
  "12_error_handling": {
    "error_patterns": [
      "Error Types in Node.js",
      "Synchronous Error Handling",
      "Asynchronous Error Handling"
    ],
    "error_handling_strategies": [
      "try-catch Blocks",
      "Error-first Callbacks",
      "Promise Error Handling",
      "async/await Error Handling",
      "Global Error Handlers"
    ],
    "custom_errors": [
      "Custom Error Classes",
      "Error Propagation",
      "Error Logging Strategies"
    ]
  },
  "13_security": {
    "authentication_authorization": [
      "Authentication Concepts",
      "Authorization Concepts",
      "Authentication vs Authorization Differences"
    ],
    "web_security": [
      "CORS (Cross-Origin Resource Sharing)",
      "Same Origin Policy",
      "Preflight Requests",
      "CSRF (Cross-Site Request Forgery) Protection",
      "XSS (Cross-Site Scripting) Prevention"
    ],
    "cryptography": [
      "Hashing vs Encryption",
      "Password Hashing",
      "JSON Web Tokens (JWT)",
      "Token-based Authentication",
      "API Key Authentication"
    ],
    "api_security": [
      "Rate Limiting",
      "Request Throttling",
      "Input Validation",
      "Output Encoding"
    ]
  },
  "14_performance_optimization": {
    "monitoring": [
      "Performance Monitoring Tools",
      "Memory Usage Monitoring",
      "CPU Profiling",
      "Event Loop Monitoring"
    ],
    "optimization_techniques": [
      "Connection Pooling",
      "Caching Strategies",
      "Compression",
      "Database Query Optimization"
    ],
    "scaling_strategies": [
      "Vertical Scaling",
      "Horizontal Scaling",
      "Load Balancing",
      "Microservices Architecture"
    ]
  },
  "15_debugging_logging": {
    "debugging_tools": [
      "Node.js Debugger",
      "Chrome DevTools Integration",
      "Breakpoints and Stepping",
      "Inspect Variables"
    ],
    "logging": [
      "Console Logging",
      "Structured Logging",
      "Log Levels",
      "Log Rotation",
      "Winston/Bunyan Libraries"
    ],
    "system_monitoring": [
      "Health Checks",
      "Metrics Collection",
      "Alerting Configuration"
    ]
  },
  "16_testing": {
    "testing_frameworks": [
      "Jest Testing Framework",
      "Mocha with Chai",
      "Test Structure"
    ],
    "test_types": [
      "Unit Testing",
      "Integration Testing",
      "API Testing",
      "Mocking and Stubbing"
    ],
    "testing_tools": [
      "Test Runners",
      "Assertion Libraries",
      "Coverage Reports",
      "Continuous Integration"
    ]
  },
  "17_file_handling_practical": {
    "file_operations": [
      "Reading Configuration Files",
      "Writing Log Files",
      "File Upload Handling",
      "File Download Serving"
    ],
    "data_processing": [
      "CSV File Processing",
      "JSON File Operations",
      "XML Parsing",
      "Data Transformation Pipelines"
    ]
  },
  "18_network_operations": {
    "http_clients": [
      "Making HTTP Requests",
      "Axios Library",
      "Request Library",
      "Fetch API (Node.js 18+)"
    ],
    "web_sockets": [
      "WebSocket Protocol",
      "Socket.io Library",
      "Real-time Communication"
    ],
    "tcp_servers": [
      "TCP Server Creation",
      "net Module",
      "Custom Protocol Implementation"
    ]
  },
  "19_database_integration": {
    "database_drivers": [
      "MongoDB Driver",
      "MySQL/PostgreSQL Drivers",
      "Redis Client",
      "Connection Pooling"
    ],
    "orm_odm": [
      "Mongoose ODM",
      "Sequelize ORM",
      "Prisma ORM",
      "Database Migrations"
    ]
  },
  "20_practical_projects": {
    "basic_projects": [
      "REST API Server",
      "File Server",
      "Chat Application",
      "Real-time Dashboard"
    ],
    "intermediate_projects": [
      "Authentication Service",
      "API Gateway",
      "Background Job Processor",
      "Web Scraper"
    ],
    "advanced_projects": [
      "Microservices Architecture",
      "Real-time Collaboration Tool",
      "Stream Processing Pipeline",
      "Load Balancer Implementation"
    ]
  },
  "21_deployment_production": {
    "deployment_strategies": [
      "Process Managers (PM2)",
      "Docker Containerization",
      "Kubernetes Deployment",
      "Serverless Deployment"
    ],
    "production_configuration": [
      "Environment Configuration",
      "Logging Setup",
      "Monitoring Setup",
      "Security Hardening"
    ],
    "performance_tuning": [
      "Memory Optimization",
      "CPU Optimization",
      "Network Optimization",
      "Database Optimization"
    ]
  },
  "22_best_practices": {
    "code_organization": [
      "Project Structure",
      "Module Organization",
      "Configuration Management",
      "Error Handling Strategy"
    ],
    "performance_best_practices": [
      "Avoiding Blocking Operations",
      "Proper Stream Usage",
      "Memory Management",
      "Connection Management"
    ],
    "security_best_practices": [
      "Input Validation",
      "Output Encoding",
      "Authentication Implementation",
      "Dependency Security"
    ],
    "maintenance": [
      "Code Documentation",
      "API Documentation",
      "Version Control Practices",
      "Continuous Integration"
    ]
  }
};


const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('stream') || 
      lowerName.includes('buffer') || 
      lowerName.includes('cluster') || 
      lowerName.includes('child process') ||
      lowerName.includes('performance') ||
      lowerName.includes('security') ||
      lowerName.includes('deployment') ||
      lowerName.includes('worker')) {
    return 'advanced';
  }
  
  if (lowerName.includes('module') || 
      lowerName.includes('npm') || 
      lowerName.includes('http') || 
      lowerName.includes('event') ||
      lowerName.includes('async')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (Node.js)
    let topic = await Topic.findOne({ slug: 'nodejs' });
    if (!topic) {
      console.log('ℹ️ Node.js topic not found, creating...');
      topic = await Topic.create({
        name: 'Node.js',
        slug: 'nodejs',
        description: 'Server-side JavaScript runtime',
        icon: '💚',
        order: 3,
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

    for (const [catKey, sectionsObj] of Object.entries(nodejsCurriculum)) {
      // Format Category Name: "01_nodejs_foundations" -> "Nodejs Foundations"
      let catName = catKey.replace(/^\d+_/, '').split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Manual fixes for casing
      catName = catName.replace('Nodejs', 'Node.js');
      
      const category = await Category.create({
        name: catName,
        slug: slugify(catName, { lower: true, strict: true }),
        topicId: topic._id,
        order: categoryOrder++,
        description: `Deep dive into ${catName}`
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
          .replace('Tcp', 'TCP')
          .replace('Dns', 'DNS')
          .replace('Ssl', 'SSL')
          .replace('Tls', 'TLS')
          .replace('Url', 'URL')
          .replace('Api', 'API')
          .replace('Json', 'JSON')
          .replace('Xml', 'XML')
          .replace('Csv', 'CSV')
          .replace('Cpu', 'CPU')
          .replace('Npm', 'NPM')
          .replace('Npx', 'NPX')
          .replace('Jwt', 'JWT')
          .replace('Repl', 'REPL')
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
