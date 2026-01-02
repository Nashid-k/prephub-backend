import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import slugify from 'slugify';

dotenv.config();

const nodejsCurriculum = {

  "00_programming_and_runtime_prerequisites": {
    "javascript_runtime_basics": [
      "JavaScript Execution Model",
      "Call Stack and Heap",
      "Synchronous vs Asynchronous Code",
      "Why JavaScript Needs a Runtime"
    ],
    "backend_mental_models": [
      "What Happens When a Request Hits a Server",
      "Blocking vs Non-blocking Systems",
      "CPU-bound vs I/O-bound Workloads"
    ]
  },

  "01_nodejs_runtime_foundations": {
    "nodejs_overview": [
      "What is Node.js",
      "Node.js as a Runtime Environment",
      "Node.js vs Browser JavaScript",
      "Why Node.js Was Created",
      "Use Cases of Node.js"
    ],
    "architecture_core": [
      "JavaScript Runtime Architecture",
      "V8 JavaScript Engine",
      "Libuv Overview",
      "Single-threaded Nature of Node.js",
      "Event-driven Programming Model",
      "Non-blocking I/O Operations"
    ],
    "installation_and_environment": [
      "Node.js Installation",
      "Node.js Version Management",
      "NVM (Node Version Manager)",
      "Checking Node.js Version",
      "Environment Setup"
    ],
    "cli_and_repl": [
      "REPL (Read-Eval-Print Loop)",
      "Command-line Interface (CLI)",
      "Command-line Arguments",
      "User Agent Information"
    ]
  },

  "02_package_and_environment_management": {
    "npm_ecosystem": [
      "NPM (Node Package Manager)",
      "NPX (Node Package Execute)",
      "NPM vs NPX Differences",
      "Package.json File Structure",
      "Package-lock.json Purpose",
      ".npmrc Configuration File"
    ],
    "dependency_management": [
      "Installing Packages",
      "Global vs Local Packages",
      "Removing and Updating Packages",
      "Dependencies vs Dev Dependencies",
      "Peer and Optional Dependencies",
      "Semantic Versioning (SemVer)",
      "Version Ranges (^, ~, *)"
    ],
    "scripts_and_config": [
      "Package.json Scripts",
      "Environment Variables",
      ".env Files and dotenv",
      "Environment-specific Configuration",
      "Configuration Management Strategies"
    ]
  },

  "03_nodejs_core_modules": {
    "global_objects": [
      "Global Object",
      "process Object",
      "console Object",
      "Buffer Global",
      "__dirname and __filename"
    ],
    "process_and_system": [
      "process.argv",
      "process.env",
      "process.cwd()",
      "process.exit()",
      "process.nextTick()",
      "process.memoryUsage()"
    ],
    "filesystem": [
      "fs Module Overview",
      "Sync vs Async File Operations",
      "File Read/Write",
      "Append, Rename, Delete, Copy",
      "Directory Operations",
      "File Descriptors",
      "File Statistics",
      "Stream-based File Operations"
    ],
    "path_os_url": [
      "path Module (join, resolve, parse, normalize)",
      "os Module (cpu, memory, network)",
      "url Module",
      "WHATWG URL API",
      "Query String Parsing"
    ],
    "utility_and_crypto": [
      "util Module",
      "util.promisify()",
      "util.inherits()",
      "util.types",
      "zlib Compression",
      "crypto Module"
    ]
  },

  "04_networking_and_http_fundamentals": {
    "network_basics": [
      "TCP/IP Protocol",
      "DNS Resolution",
      "Hosts and Ports",
      "Sockets",
      "Network Layers Overview"
    ],
    "http_protocol": [
      "HTTP Protocol Basics",
      "HTTP vs HTTPS",
      "SSL/TLS Certificates",
      "Stateless Nature of HTTP",
      "HTTP/1.1 vs HTTP/2"
    ],
    "http_anatomy": [
      "HTTP Request Structure",
      "HTTP Response Structure",
      "HTTP Methods",
      "HTTP Headers",
      "Status Code Categories"
    ]
  },

  "05_building_http_servers_from_scratch": {
    "http_module": [
      "http Module Overview",
      "Creating HTTP Server",
      "Server Lifecycle",
      "Server Configuration"
    ],
    "request_response_cycle": [
      "Request Object (req)",
      "Response Object (res)",
      "Headers and Status Codes",
      "Chunked Responses"
    ],
    "routing_logic": [
      "Manual Routing",
      "Method-based Routing",
      "Query Parameters",
      "Route Parameters",
      "Wildcard Routes"
    ],
    "server_tuning": [
      "Port Binding",
      "Timeouts",
      "Keep-alive Connections"
    ]
  },

  "06_asynchronous_programming_models": {
    "callback_model": [
      "Callbacks",
      "Error-first Callbacks",
      "Callback Hell"
    ],
    "promise_model": [
      "Promise Creation",
      "Promise Chaining",
      "Promise.all",
      "Promise.race",
      "Promise.allSettled",
      "Promise.any"
    ],
    "async_await": [
      "async Functions",
      "await Keyword",
      "Error Handling with try-catch"
    ],
    "conversion_utilities": [
      "Promisify",
      "Callback to Promise Conversion",
      "Async Wrappers"
    ]
  },

  "07_event_loop_and_execution_model": {
    "event_loop_core": [
      "Event Loop Concept",
      "Libuv Role",
      "Event Loop Phases"
    ],
    "queues_and_phases": [
      "Timer Queue",
      "I/O Callbacks",
      "Poll Phase",
      "Check Phase",
      "Close Callbacks"
    ],
    "microtasks": [
      "Microtask Queue",
      "process.nextTick",
      "Promise Queue",
      "Execution Priority"
    ],
    "performance_impact": [
      "Blocking the Event Loop",
      "CPU-bound Tasks",
      "I/O-bound Tasks",
      "Starvation Scenarios"
    ]
  },

  "08_concurrency_parallelism_and_threads": {
    "concurrency_concepts": [
      "Concurrency vs Parallelism",
      "Single-threaded Model",
      "Non-blocking Architecture"
    ],
    "worker_threads": [
      "Worker Threads",
      "Message Passing",
      "SharedArrayBuffer",
      "Thread Pool Patterns"
    ],
    "cluster_and_scaling": [
      "Cluster Module",
      "Master-Worker Architecture",
      "Process Forking",
      "Load Balancing",
      "Zero-downtime Restarts"
    ],
    "libuv_thread_pool": [
      "Thread Pool Usage",
      "Pool Size Configuration",
      "Thread Pool Exhaustion"
    ]
  },

  "09_streams_and_buffers": {
    "streams": [
      "Readable Streams",
      "Writable Streams",
      "Duplex Streams",
      "Transform Streams",
      "Backpressure Handling",
      "Piping"
    ],
    "buffers": [
      "Binary Data",
      "Buffer Allocation",
      "Encodings",
      "Buffer Operations"
    ],
    "stream_buffer_relationship": [
      "Chunk Processing",
      "Memory Management"
    ]
  },

  "10_process_management": {
    "child_processes": [
      "spawn",
      "exec",
      "execFile",
      "fork"
    ],
    "comparisons": [
      "spawn vs exec",
      "fork vs spawn",
      "Use-case Selection"
    ],
    "ipc": [
      "stdin/stdout/stderr",
      "Message Passing",
      "Signals",
      "Exit Codes"
    ]
  },

  "11_error_handling_and_resilience": {
    "error_types": [
      "Synchronous Errors",
      "Asynchronous Errors"
    ],
    "error_strategies": [
      "try-catch",
      "Promise Error Handling",
      "Global Error Handlers"
    ],
    "custom_errors": [
      "Custom Error Classes",
      "Error Propagation",
      "Logging Strategies"
    ]
  },

  "12_security_fundamentals": {
    "auth_concepts": [
      "Authentication",
      "Authorization",
      "Auth vs AuthZ"
    ],
    "web_security": [
      "CORS",
      "CSRF",
      "XSS",
      "Same Origin Policy"
    ],
    "cryptography": [
      "Hashing vs Encryption",
      "Password Hashing",
      "JWT",
      "API Keys"
    ],
    "api_protection": [
      "Rate Limiting",
      "Throttling",
      "Input Validation",
      "Output Encoding"
    ]
  },

  "13_database_and_external_services": {
    "drivers": [
      "MongoDB Driver",
      "PostgreSQL/MySQL Drivers",
      "Redis Client"
    ],
    "orm_odm": [
      "Mongoose",
      "Sequelize",
      "Prisma",
      "Migrations"
    ],
    "connection_management": [
      "Pooling",
      "Timeouts",
      "Retries"
    ]
  },

  "14_network_clients_and_realtime": {
    "http_clients": [
      "Fetch (Node 18+)",
      "Axios",
      "Request Libraries"
    ],
    "realtime": [
      "WebSockets",
      "Socket.io",
      "TCP Servers",
      "Custom Protocols"
    ]
  },

  "15_testing_debugging_and_observability": {
    "testing": [
      "Unit Tests",
      "Integration Tests",
      "API Tests",
      "Mocks and Stubs"
    ],
    "debugging": [
      "Node Debugger",
      "Chrome DevTools",
      "Breakpoints"
    ],
    "logging_monitoring": [
      "Structured Logging",
      "Log Levels",
      "Health Checks",
      "Metrics",
      "Alerting"
    ]
  },

  "16_performance_and_scaling": {
    "profiling": [
      "CPU Profiling",
      "Memory Profiling",
      "Event Loop Monitoring"
    ],
    "optimization": [
      "Caching",
      "Compression",
      "Connection Pooling",
      "Database Optimization"
    ],
    "scaling": [
      "Vertical Scaling",
      "Horizontal Scaling",
      "Microservices"
    ]
  },

  "17_deployment_and_production": {
    "deployment_models": [
      "PM2",
      "Docker",
      "Kubernetes",
      "Serverless"
    ],
    "production_hardening": [
      "Environment Configuration",
      "Security Hardening",
      "Monitoring",
      "Logging"
    ]
  },

  "18_practical_projects_and_mastery": {
    "projects": [
      "REST API Server",
      "Authentication Service",
      "File Server",
      "Chat System",
      "Job Processor",
      "Microservices System"
    ]
  },

  "19_engineering_best_practices": {
    "architecture": [
      "Project Structure",
      "Module Boundaries",
      "Error Strategy",
      "Configuration Strategy"
    ],
    "performance": [
      "Avoid Blocking",
      "Stream Everything",
      "Memory Discipline"
    ],
    "security": [
      "Dependency Auditing",
      "Secrets Management",
      "Secure Defaults"
    ],
    "maintenance": [
      "Documentation",
      "CI/CD",
      "Version Control"
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

export { nodejsCurriculum };
