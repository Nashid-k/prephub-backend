import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { geminiModel } from './config/ai-clients.js';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';

dotenv.config();

/**
 * Difficulty categorization for Node.js topics
 */
const categorizeDifficulty = (categoryName, sectionTitle) => {
  const advancedKeywords = ['event loop', 'worker', 'cluster', 'security', 'thread', 'performance', 'jwt', 'authentication'];
  const beginnerKeywords = ['what is', 'basic', 'intro', 'repl', 'npm', 'getting started'];
  
  const combined = `${categoryName} ${sectionTitle}`.toLowerCase();
  
  if (advancedKeywords.some(kw => combined.includes(kw))) return 'advanced';
  if (beginnerKeywords.some(kw => combined.includes(kw))) return 'beginner';
  return 'intermediate';
};

/**
 * Node.js Complete Curriculum - 12 Phases
 */
const nodejsCurriculum = {
  "runtime_environment": {
    name: "JavaScript Runtime & Environment",
    subcategories: {
      "nodejs_basics": ["What is Node.js", "Node.js as a Runtime Environment", "Single-threaded nature of Node.js", "Framework vs Library"],
      "event_driven": ["Event-driven programming", "Event-driven architecture"],
      "repl_cli": ["REPL & CLI", "REPL (Read-Eval-Print Loop)", "Command-line arguments", "User Agent"]
    }
  },
  "package_management": {
    name: "Package Management & Configuration",
    subcategories: {
      "npm_ecosystem": ["NPM Ecosystem", "npm (Node Package Manager)", "npx (Node Package Execute)", "NPM vs NPX", "npm scripts", "Global install (-g)", "Installing packages", "Removing packages"],
      "version_env": ["Version & Environment Management", "NVM (Node Version Manager)", "Environment variables", ".env files", "How environment variables are stored", "Accessing environment variables"],
      "project_files": ["Project Files", "package.json", "package-lock.json", ".npmrc", ".gitignore", "Dependencies vs Dev Dependencies"]
    }
  },
  "core_concepts": {
    name: "Node.js Core Concepts",
    subcategories: {
      "global_process": ["Global Object", "Node.js global properties", "process object", "process.nextTick"],
      "sync_async": ["Synchronous vs Asynchronous", "Blocking vs Non-blocking I/O", "I/O operations in Node.js"]
    }
  },
  "core_modules": {
    name: "Core Modules",
    subcategories: {
      "file_system": ["fs module", "fs operations", "fs.stat", "fs.open", "writeFile vs writeFileSync", "writeFile vs appendFile", "fs.rename", "fs.unlink", "fs.link", "Write current date to a file", "Rename a file", "Delete a file"],
      "path_module": ["path module", "path.join", "path.resolve", "path.basename"],
      "os_module": ["os.platform", "os.cpus", "os.freemem"],
      "url_module": ["URL & Components", "url.parse", "url.format", "url.resolve"],
      "utility_compression": ["util module", "zlib module"]
    }
  },
  "networking_http": {
    name: "Networking & HTTP Basics",
    subcategories: {
      "networking_fundamentals": ["TCP/IP", "DNS (Domain Name System)", "Host and Port"],
      "http_basics": ["What is HTTP", "HTTP vs HTTPS", "SSL Certificate", "Statelessness of HTTP"],
      "status_codes": ["200 OK", "201 Created", "204 No Content", "400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found", "Status code comparisons"],
      "request_response": ["HTTP request structure", "Parts of HTTP request", "Identifying request method", "HTTP headers", "req.url"]
    }
  },
  "http_server": {
    name: "HTTP Server in Node.js",
    subcategories: {
      "http_module": ["http module", "http.createServer", "Creating a server using http"],
      "request_response": ["Request and response components", "setHeader", "writeHead"],
      "routing": ["Basic routing", "HTTP methods", "GET method", "POST method", "PUT method", "PATCH method", "PUT vs PATCH", "PUT vs POST", "OPTIONS method"]
    }
  },
  "async_programming": {
    name: "Asynchronous Programming",
    subcategories: {
      "callbacks_promises": ["Callback", "Error-first callback", "Promise", "Types of promises", "Promise.all", "Promise.race", "Promisify"],
      "async_patterns": ["Promise vs async/await"]
    }
  },
  "event_loop": {
    name: "Event Loop & Concurrency",
    subcategories: {
      "event_loop_internals": ["Event loop", "Microtask queue", "Macrotask queue", "process.nextTick queue", "Check queue", "Close queue", "I/O polling"],
      "concurrency": ["Concurrency", "Parallelism", "Concurrency vs parallelism", "How Node.js handles concurrency", "Why concurrency doesn't need multiple workers", "Starvation"],
      "threads_processes": ["Process vs thread", "Thread pool", "Worker threads", "Cluster module", "Multithreading in Node.js", "CPU-bound operations in Node.js"]
    }
  },
  "streams_buffers": {
    name: "Streams & Buffers",
    subcategories: {
      "buffers": ["Buffer", "Buffer class", "Buffer in context of streams"],
      "streams": ["Streams", "Types of streams", "Duplex streams", "Transform streams", "Duplex vs transform", "Piping"]
    }
  },
  "child_processes": {
    name: "Child Processes",
    subcategories: {
      "process_management": ["Child process", "fork", "spawn", "fork vs spawn", "exec", "execFile", "Exit codes in Node.js"]
    }
  },
  "security": {
    name: "Security",
    subcategories: {
      "auth_cors": ["Authentication vs authorization", "CORS (Cross-Origin Resource Sharing)", "Same origin policy", "Preflight request", "CSRF (Cross-Site Request Forgery)"],
      "encryption_jwt": ["Hashing vs encryption", "JWT (JSON Web Token)", "Passport authentication"],
      "rate_limiting": ["Rate limiting", "API rate limiting"]
    }
  }
};

/**
 * Seed Node.js Hierarchy
 */
const seedNodejsHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find Node.js topic
    const nodejsTopic = await Topic.findOne({ slug: 'nodejs' });
    
    if (!nodejsTopic) {
      console.error('❌ Node.js topic not found! Please run npm run seed first.');
      process.exit(1);
    }

    // Clear existing Node.js categories and sections
    await Category.deleteMany({ topicId: nodejsTopic._id });
    await Section.deleteMany({ topicId: nodejsTopic._id });
    console.log('\n🗑️  Cleared existing Node.js categories and sections');

    console.log('\n🤖 Creating 3-level hierarchy: Topic → Category → Section\n');

    let categoryOrder = 1;
    let totalSections = 0;

    for (const [categorySlug, categoryData] of Object.entries(nodejsCurriculum)) {
      // Create Category
      const category = await Category.create({
        topicId: nodejsTopic._id,
        name: categoryData.name,
        slug: categorySlug,
        order: categoryOrder++,
        description: `Master ${categoryData.name} in Node.js`
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
          topicId: nodejsTopic._id,
          categoryId: category._id,
          title: subcategoryName,
          slug: `${categorySlug}-${subcategorySlug}`,
          order: sectionOrder++,
          description: `Learn ${subcategoryName} concepts in Node.js`,
          difficulty: difficulty,
          keyPoints: topics
        });

        totalSections++;
        console.log(`      ✓ ${subcategoryName} (${difficulty})`);
      }

      console.log('');
    }

    const totalCategories = await Category.countDocuments({ topicId: nodejsTopic._id });

    console.log('🎉 Node.js 3-level hierarchy created successfully!');
    console.log('📊 Summary:');
    console.log(`   Categories: ${totalCategories}`);
    console.log(`   Sections (Subcategories): ${totalSections}`);
    console.log(`\n✨ Flow: Node.js → ${totalCategories} Categories → ${totalSections} Sections\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedNodejsHierarchy();
