
const apiDesignCurriculum = {
  "API_Design_Contracts": {
    "fundamentals": {
      "api_principles": [
        "RESTful API design principles (Richardson Maturity Model)",
        "RPC vs REST vs GraphQL architectural styles",
        "API-first development methodology",
        "API versioning strategies (URL, header, media type)",
        "Backward/forward compatibility principles",
        "API evolution and deprecation strategies"
      ],
      "http_fundamentals": [
        "HTTP/1.1, HTTP/2, HTTP/3 differences",
        "Idempotent vs non-idempotent operations",
        "Safe HTTP methods and their guarantees",
        "HTTP status code semantics (2xx, 3xx, 4xx, 5xx)",
        "Header optimization and standards",
        "Content negotiation and media types"
      ]
    },
    "design_patterns": {
      "rest_patterns": [
        "Resource modeling and URI design",
        "CRUD operations mapping to HTTP methods",
        "HATEOAS (Hypermedia as the Engine of Application State)",
        "Pagination strategies (cursor-based, offset-based)",
        "Filtering, sorting, and field selection",
        "Bulk operations and batch processing"
      ],
      "advanced_patterns": [
        "API composition and aggregation patterns",
        "Circuit breaker pattern for dependent services",
        "Retry patterns with exponential backoff",
        "Rate limiting and throttling patterns",
        "Compensating transactions for distributed systems",
        "Saga pattern for long-running transactions"
      ]
    },
    "contracts_specifications": {
      "specification_languages": [
        "OpenAPI/Swagger 3.0 specification",
        "AsyncAPI for event-driven APIs",
        "gRPC Protocol Buffers (protobuf)",
        "GraphQL Schema Definition Language",
        "JSON Schema for validation",
        "RAML (RESTful API Modeling Language)"
      ],
      "contract_testing": [
        "Consumer-driven contract testing",
        "Provider contract verification",
        "Pact framework implementation",
        "Contract testing in CI/CD pipelines",
        "Breaking change detection",
        "Version compatibility testing"
      ]
    },
    "documentation_tooling": {
      "documentation_strategies": [
        "API reference documentation best practices",
        "Interactive documentation (Swagger UI, Redoc)",
        "Tutorial and getting started guides",
        "SDK and client library generation",
        "Postman collections and examples",
        "API playground and sandbox environments"
      ],
      "developer_experience": [
        "API key and authentication flows",
        "Error handling and troubleshooting guides",
        "Performance expectations and SLAs",
        "Monitoring and debugging endpoints",
        "Client library ergonomics",
        "Onboarding and adoption metrics"
      ]
    },
    "performance_optimization": {
      "optimization_techniques": [
        "Response compression (gzip, brotli)",
        "HTTP caching headers (ETag, Last-Modified, Cache-Control)",
        "Conditional requests (If-Modified-Since, If-None-Match)",
        "Partial responses and range requests",
        "Connection keep-alive and pooling",
        "Response streaming and chunked encoding"
      ],
      "monitoring_observability": [
        "API metrics collection (latency, throughput, error rates)",
        "Distributed tracing integration",
        "Request/response logging strategies",
        "Performance anomaly detection",
        "Capacity planning and autoscaling",
        "A/B testing and feature flagging"
      ]
    },
    "security_best_practices": [
      "Authentication mechanisms (OAuth 2.0, JWT, API keys)",
      "Authorization models (RBAC, ABAC, ReBAC)",
      "Input validation and sanitization",
      "Output encoding and injection prevention",
      "TLS/SSL configuration and certificate management",
      "DDoS protection and rate limiting",
      "Security headers (CSP, HSTS, X-Frame-Options)"
    ],
    "faang_interview_focus": [
      "Design RESTful APIs for specific domains (e-commerce, social media)",
      "Handle API versioning and backward compatibility",
      "Implement rate limiting and quota management",
      "Design for high availability and fault tolerance",
      "Optimize for mobile and web clients",
      "Monitor and debug production API issues"
    ]
  }
}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';
import slugify from 'slugify';

dotenv.config();

const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('faang') || 
      lowerName.includes('performance') || 
      lowerName.includes('security') || 
      lowerName.includes('advanced') ||
      lowerName.includes('optimization') ||
      lowerName.includes('saga') ||
      lowerName.includes('circuit breaker')) {
    return 'advanced';
  }
  
  if (lowerName.includes('design') || 
      lowerName.includes('documentation') || 
      lowerName.includes('contracts') || 
      lowerName.includes('specification') ||
      lowerName.includes('testing') ||
      lowerName.includes('tooling')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of API Design & Contracts.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Best practices for implementation\n- Common pitfalls and how to avoid them\n\n### Practical Application\nUse the AI Chat to ask for specific examples, code snippets (e.g., OpenAPI specs, gRPC definitions), or design scenarios related to this topic.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic (API Design)
    let topic = await Topic.findOne({ slug: 'api-design' });
    if (!topic) {
      console.log('ℹ️ API Design topic not found, creating...');
      topic = await Topic.create({
        name: 'API Design',
        slug: 'api-design',
        description: 'Master the art of designing scalable, secure, and developer-friendly APIs',
        icon: '🔌', // Plug icon for API
        order: 12, // Order after Networking
        isNew: true
      });
    } else {
        topic.icon = '🔌';
        topic.description = 'Master the art of designing scalable, secure, and developer-friendly APIs';
        topic.isNew = true;
        await topic.save();
    }
    console.log(`📌 Using Topic: ${topic.name}`);

    // 2. Clear existing structure
    console.log('🧹 Clearing existing categories and sections...');
    const categories = await Category.find({ topicId: topic._id });
    const categoryIds = categories.map(c => c._id);
    await Section.deleteMany({ categoryId: { $in: categoryIds } });
    await Category.deleteMany({ topicId: topic._id });

    // 3. Process new structure with DEEP mapping
    console.log('🏗️ Building new DEEP hierarchy...');
    
    let categoryOrder = 1;
    let totalSections = 0;
    const usedSlugs = new Set(); 

    // Access the root object first
    const rootContent = apiDesignCurriculum.API_Design_Contracts;

    for (const [groupKey, groupParams] of Object.entries(rootContent)) {
       // LEVEL 1: GROUP (Module)
       let groupName = groupKey.replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       // Handle array at group level (e.g. FAANG Interview Focus which has no sub-categories in JSON but acts as a category itself? 
       // NOTE: The JSON structure provided shows "faang_interview_focus" as a key alongside "fundamentals" etc. 
       // EXCEPT "faang_interview_focus" value is an ARRAY of strings, whereas "fundamentals" is an OBJECT of arrays.
       // We need to handle this difference.
       
       if (Array.isArray(groupParams)) {
           // Case: The group IS the category (e.g. FAANG Interview Focus)
           // Create a category for this group
           let catName = groupName; // Use group name as category name
           
           const category = await Category.create({
                name: catName,
                slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }),
                topicId: topic._id,
                order: categoryOrder++,
                description: `Chapter on ${catName}`,
                group: 'Interview Prep' // Group it into a special tab or use groupName? Let's use groupName acts as Tab, but here we have mixed types. 
                // Actually, if it's "FAANG Interview Focus", let's make the Group "Interview Prep" and Category "FAANG Focus"
           });
           
           console.log(`    📂 Created Direct Category: ${catName}`);
           
           let sectionOrder = 1;

           for (const item of groupParams) {
               const secTitle = getTitle(item);
               const secContent = getContent(item, secTitle);
               
               let baseSlug = slugify(secTitle, { lower: true, strict: true });
               if (!baseSlug) baseSlug = `section-${sectionOrder}`;
               
               let uniqueSlug = baseSlug;
               let counter = 1;
               while (usedSlugs.has(uniqueSlug)) {
                   uniqueSlug = `${baseSlug}-${counter}`;
                   counter++;
               }
               usedSlugs.add(uniqueSlug);
               
               await Section.create({
                  title: secTitle,
                  slug: uniqueSlug,
                  categoryId: category._id,
                  topicId: topic._id,
                  order: sectionOrder++,
                  description: `Deep dive into ${secTitle}`,
                  content: secContent,
                  difficulty: 'advanced',
                  estimatedTime: 20,
                  isNew: false,
                  isPro: true,
                  keyPoints: [secTitle, 'Interview']
               });
               totalSections++;
           }

       } else {
           // Standard Case: Group -> Object of Categories
           console.log(`  📦 Processing Group: ${groupName}`);

           for (const [catKey, items] of Object.entries(groupParams)) {
               // LEVEL 2: CATEGORY
               let catName = catKey.replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

               const category = await Category.create({
                name: catName,
                slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }), 
                topicId: topic._id,
                order: categoryOrder++,
                description: `Chapter on ${catName}`,
                group: groupName 
               });
               
               console.log(`    📂 Created Category: ${catName} (Group: ${groupName})`);

               // LEVEL 3: SECTIONS
               let sectionItems = items; 
               // Expecting array of strings based on JSON
               
               let sectionOrder = 1;

               for (const item of sectionItems) {
                   const secTitle = getTitle(item);
                   const secContent = getContent(item, secTitle);
                   
                   let baseSlug = slugify(secTitle, { lower: true, strict: true });
                   if (!baseSlug) baseSlug = `section-${sectionOrder}`;
                   
                   let uniqueSlug = baseSlug;
                   let counter = 1;
                   while (usedSlugs.has(uniqueSlug)) {
                       uniqueSlug = `${baseSlug}-${counter}`;
                       counter++;
                   }
                   usedSlugs.add(uniqueSlug);
                   
                   await Section.create({
                      title: secTitle,
                      slug: uniqueSlug,
                      categoryId: category._id,
                      topicId: topic._id,
                      order: sectionOrder++,
                      description: `Deep dive into ${secTitle}`,
                      content: secContent,
                      difficulty: categorizeDifficulty(secTitle, groupName),
                      estimatedTime: 15,
                      isNew: false,
                      isPro: categorizeDifficulty(secTitle, groupName) === 'advanced',
                      keyPoints: [secTitle, groupName]
                   });
                   
                   totalSections++;
               }
           }
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
