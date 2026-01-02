
const systemDesignCurriculum = {

  "00_system_design_mindset": {
    "design_thinking": [
      "What system design really evaluates",
      "Design vs implementation mindset",
      "Trade-offs over correctness",
      "Constraints define architecture",
      "Evolutionary vs big-bang design"
    ],
    "engineering_judgement": [
      "Cost vs performance vs reliability",
      "When NOT to scale",
      "Build vs buy decisions",
      "Overengineering failure modes",
      "Second-order effects"
    ]
  },

  "01_foundations_and_requirements": {
    "design_principles": [
      "KISS (Keep It Simple, Stupid)",
      "DRY (Don't Repeat Yourself)",
      "Separation of Concerns",
      "Single Responsibility Principle",
      "YAGNI (You Ain't Gonna Need It)"
    ],
    "system_properties": [
      "Reliability",
      "Scalability",
      "Availability",
      "Maintainability",
      "Security"
    ],
    "requirements_analysis": [
      "Functional requirements gathering",
      "Non-functional requirements identification",
      "Scope definition and prioritization",
      "Constraint analysis",
      "Stakeholder communication"
    ]
  },

  "02_design_process_and_estimation": {
    "design_process": [
      "Requirements clarification",
      "Back-of-the-envelope calculations",
      "High-level design (HLD)",
      "Detailed design (DD)",
      "Design review and iteration",
      "Documentation and communication"
    ],
    "capacity_estimation": [
      "QPS estimation",
      "Storage estimation",
      "Bandwidth estimation",
      "Latency budgeting",
      "Peak vs average traffic modeling"
    ]
  },

  "03_core_system_components": {
    "client_server_architecture": [
      "Client types: Web, Mobile, Desktop",
      "Server responsibilities",
      "Stateless vs Stateful servers",
      "Request-response lifecycle",
      "API protocols: REST, GraphQL, gRPC"
    ],
    "data_layer_fundamentals": [
      "SQL vs NoSQL selection",
      "Schema design",
      "Indexing strategies",
      "Connection pooling",
      "Schema migration strategies"
    ]
  },

  "04_scalability_basics": {
    "scaling_models": [
      "Vertical scaling limits",
      "Horizontal scaling principles",
      "Stateless service design",
      "Read-write separation",
      "CDN usage for static content"
    ],
    "load_balancing": [
      "DNS-based load balancing",
      "Hardware load balancers",
      "Software load balancers",
      "Round-robin",
      "Least connections",
      "Sticky sessions (IP hash)"
    ]
  },

  "05_caching_and_data_acceleration": {
    "caching_layers": [
      "Client-side caching",
      "CDN caching",
      "Application-level caching",
      "Database caching"
    ],
    "caching_strategies": [
      "Cache-aside",
      "Write-through",
      "Write-behind",
      "TTL strategies",
      "Cache invalidation patterns"
    ]
  },

  "06_database_scaling_and_storage": {
    "database_scaling": [
      "Replication (master-slave)",
      "Read replicas",
      "Sharding strategies",
      "Consistent hashing",
      "Federation",
      "Denormalization trade-offs"
    ],
    "storage_models": [
      "Relational databases",
      "Document databases",
      "Key-value stores",
      "Column-family databases",
      "Graph databases"
    ]
  },

  "07_high_availability_and_resilience": {
    "redundancy_patterns": [
      "Active-active",
      "Active-passive",
      "Geographic redundancy",
      "Component redundancy",
      "Data redundancy"
    ],
    "failure_handling": [
      "Automatic failover",
      "Manual failover",
      "Graceful degradation",
      "Circuit breaker pattern",
      "Bulkhead pattern"
    ],
    "disaster_recovery": [
      "Backup strategies",
      "RPO design",
      "RTO design",
      "Failover playbooks",
      "Consistency during recovery"
    ]
  },

  "08_async_and_event_driven_systems": {
    "message_queue_concepts": [
      "Producer-consumer model",
      "Message durability",
      "Ordering guarantees",
      "Delivery semantics",
      "Dead letter queues"
    ],
    "messaging_technologies": [
      "RabbitMQ",
      "Kafka",
      "AWS SQS/SNS",
      "Redis queues",
      "ZeroMQ"
    ],
    "event_driven_patterns": [
      "Event sourcing",
      "CQRS",
      "Saga pattern",
      "Event-driven microservices",
      "Eventual consistency"
    ]
  },

  "09_microservices_architecture": {
    "service_decomposition": [
      "Domain-driven design",
      "Bounded contexts",
      "API-first design",
      "Independent deployability",
      "Loose coupling"
    ],
    "service_communication": [
      "Synchronous REST",
      "Async messaging",
      "gRPC",
      "Service discovery",
      "API Gateway pattern"
    ],
    "microservices_challenges": [
      "Distributed transactions",
      "Distributed logging and tracing",
      "Configuration management",
      "Versioning",
      "Cross-service consistency"
    ]
  },

  "10_distributed_systems_deep_dive": {
    "core_concepts": [
      "CAP theorem",
      "Consistency models",
      "Leader election",
      "Quorum systems",
      "Distributed consensus (Paxos/Raft)"
    ],
    "coordination_patterns": [
      "Distributed locks",
      "CRDTs",
      "Vector clocks",
      "Conflict resolution",
      "Cache coherence"
    ],
    "coordination_tools": [
      "ZooKeeper",
      "etcd",
      "Consul",
      "Service mesh concepts"
    ]
  },

  "11_api_design_and_security": {
    "restful_design": [
      "Resource-oriented design",
      "HTTP method semantics",
      "Status codes",
      "HATEOAS",
      "API versioning"
    ],
    "api_optimization": [
      "Pagination",
      "Filtering",
      "Batching",
      "Compression",
      "Conditional requests"
    ],
    "api_security": [
      "Authentication",
      "Authorization",
      "Rate limiting",
      "Input validation",
      "Monitoring and analytics"
    ]
  },

  "12_cloud_native_architecture": {
    "cloud_concepts": [
      "IaaS vs PaaS vs SaaS",
      "Hybrid cloud",
      "Multi-cloud",
      "Cost optimization",
      "Cloud security basics"
    ],
    "cloud_services": [
      "Compute (VMs, containers, serverless)",
      "Storage",
      "Databases",
      "Networking",
      "Messaging"
    ],
    "cloud_patterns": [
      "Serverless systems",
      "Kubernetes orchestration",
      "Infrastructure as Code",
      "Cloud-native design",
      "Multi-region DR"
    ]
  },

  "13_observability_and_operations": {
    "monitoring": [
      "Business metrics",
      "Infrastructure metrics",
      "Application metrics",
      "User experience monitoring",
      "Cost monitoring"
    ],
    "observability": [
      "Metrics",
      "Tracing",
      "Logging",
      "Alerting",
      "Dashboards"
    ],
    "incident_management": [
      "Incident detection",
      "Response playbooks",
      "Post-mortems",
      "Chaos engineering",
      "SLOs"
    ]
  },

  "14_security_and_compliance": {
    "security_layers": [
      "Network security",
      "Application security",
      "Data security",
      "IAM",
      "Compliance"
    ],
    "threat_modeling": [
      "STRIDE",
      "Attack surface analysis",
      "Data flow diagrams",
      "Security testing strategies"
    ]
  },

  "15_performance_and_capacity": {
    "performance_metrics": [
      "Latency",
      "Throughput",
      "Concurrency",
      "Resource utilization",
      "Scalability testing"
    ],
    "optimization": [
      "Caching",
      "Query optimization",
      "Connection pooling",
      "Content delivery",
      "Code-level optimizations"
    ],
    "capacity_planning": [
      "Load forecasting",
      "Auto-scaling",
      "Performance budgets",
      "Cost-performance trade-offs"
    ]
  },

  "16_real_world_systems": {
    "case_studies": [
      "Twitter timeline",
      "Netflix streaming",
      "Uber ride matching",
      "WhatsApp messaging",
      "YouTube video delivery"
    ],
    "data_intensive_systems": [
      "Search engines",
      "News feeds",
      "E-commerce platforms",
      "Music streaming",
      "Analytics platforms"
    ]
  },

  "17_interview_mastery": {
    "design_questions": [
      "URL shortener",
      "Social network",
      "Ride sharing",
      "Video streaming",
      "Distributed cache"
    ],
    "interview_strategy": [
      "Clarifying questions",
      "Structured thinking",
      "Time management",
      "Handling ambiguity",
      "Adapting to changes"
    ],
    "mock_interview_flow": [
      "Requirements",
      "HLD",
      "Deep dive",
      "Scaling",
      "Trade-offs"
    ]
  },

  "18_career_growth": {
    "roles": [
      "Software Engineer",
      "Senior Engineer",
      "Staff / Principal Engineer",
      "Solutions Architect",
      "Engineering Leadership"
    ],
    "skill_progression": [
      "Component ownership",
      "System ownership",
      "Cross-system architecture",
      "Technical strategy",
      "Org-wide influence"
    ]
  }

};


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import slugify from 'slugify';

dotenv.config();

const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('advanced') || 
      lowerName.includes('large-scale') || 
      lowerName.includes('distributed') || 
      lowerName.includes('microservices') ||
      lowerName.includes('architecture patterns') ||
      lowerName.includes('expert') ||
      lowerName.includes('trade-off')) {
    return 'advanced';
  }
  
  if (lowerName.includes('scaling') || 
      lowerName.includes('caching') || 
      lowerName.includes('database design') || 
      lowerName.includes('api design') ||
      lowerName.includes('load balancing') ||
      lowerName.includes('security') ||
      lowerName.includes('intermediate')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


// Mapping Formatters specifically for creating titles/descriptions from object items
const getTitle = (item) => {
    if (typeof item === 'string') return item;
    if (item.topic) return item.topic;
    if (item.principle) return item.principle;
    if (item.property) return item.property;
    if (item.skill) return item.skill;
    if (item.component) return item.component;
    if (item.decision) return item.decision;
    if (item.pattern) return item.pattern;
    if (item.type) return item.type;
    if (item.algorithm) return item.algorithm;
    if (item.layer) return item.layer;
    if (item.strategy) return item.strategy;
    if (item.technique) return item.technique;
    if (item.plan) return item.plan;
    if (item.concept) return item.concept;
    if (item.technology) return item.technology;
    if (item.method) return item.method;
    if (item.challenge) return item.challenge;
    if (item.service) return item.service;
    if (item.pipeline) return item.pipeline;
    if (item.security) return item.security;
    if (item.metric) return item.metric;
    if (item.pillar) return item.pillar;
    if (item.process) return item.process;
    if (item.system) return item.system;
    if (item.step) return item.step;
    if (item.tool) return item.tool;
    if (item.question) return item.question;
    if (item.phase) return item.phase;
    if (item.project) return item.project;
    if (item.role) return item.role;
    if (item.level) return item.level;
    
    // Fallback
    if (typeof item === 'object') return Object.values(item)[0];
    return String(item);
};

const getContent = (item, secTitle) => {
    if (typeof item === 'string') return `## ${secTitle}\n\n${item}`;
    
    let content = `## ${secTitle}\n\n`;
    
    // Map various keys to content
    const contentKeys = [
        ['practice', 'Practice'],
        ['responsibilities', 'Key Responsibilities'],
        ['skills', 'Required Skills'],
        ['implementation', 'Implementation Details'],
        ['focus', 'Focus Areas'],
        ['usage', 'Usage'],
        ['diagnosis', 'Diagnosis Strategy'],
        ['topics', 'Topics Covered'],
        ['preparation', 'Preparation Strategy'],
        ['description', 'Description']
    ];

    contentKeys.forEach(([key, label]) => {
        if (item[key]) {
            content += `**${label}**: ${item[key]}\n\n`;
        }
    });
    
    content += `In this section, we explore ${secTitle} in the context of System Design. Use the AI Chat to simulate interview scenarios or request architecture diagrams.`;
    
    return content;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic (System Design)
    let topic = await Topic.findOne({ slug: 'system-design' });
    if (!topic) {
      console.log('ℹ️ System Design topic not found, creating...');
      topic = await Topic.create({
        name: 'System Design',
        slug: 'system-design',
        description: 'Master large-scale system architecture and design interviews',
        icon: '🏗️',
        order: 9, // Order after PostgreSQL
        isNew: true
      });
    } else {
        // Update metadata if exists to ensure it looks good
        topic.icon = '🏗️';
        topic.description = 'Master large-scale system architecture and design interviews';
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
    const usedSlugs = new Set(); // Track used slugs to prevent duplicates

    for (const [groupKey, groupParams] of Object.entries(systemDesignCurriculum)) {
       // LEVEL 1: GROUP (Module)
       // e.g. "01_foundations_principles" -> "Foundations Principles"
       let groupName = groupKey.replace(/^\d+_/, '').split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       console.log(`  📦 Processing Group: ${groupName}`);

       let categoriesToProcess = groupParams;
       
       // Handle simplified structure (just in case)
       if (typeof groupParams !== 'object') continue;
       
       for (const [catKey, items] of Object.entries(groupParams)) {
           // LEVEL 2: CATEGORY (Chapter)
           // e.g. "design_principles" -> "Design Principles"
           let catName = catKey.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

           const category = await Category.create({
            name: catName,
            slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }), // Unique slug
            topicId: topic._id,
            order: categoryOrder++,
            description: `Chapter on ${catName}`,
            group: groupName // THIS IS KEY for the tabs!
           });
           
           console.log(`    📂 Created Category: ${catName} (Group: ${groupName})`);

           // LEVEL 3: SECTIONS (Lessons)
           let sectionItems = [];
           if (Array.isArray(items)) {
               sectionItems = items;
           } else if (typeof items === 'object') {
               sectionItems = Object.entries(items).map(([k, v]) => ({ topic: k, practice: v }));
           } else {
               sectionItems = [items];
           }

           let sectionOrder = 1;

           for (const item of sectionItems) {
               const secTitle = getTitle(item);
               const secContent = getContent(item, secTitle);
               
               // Deduplicate Slugs
               let baseSlug = slugify(secTitle, { lower: true, strict: true });
               if (!baseSlug) baseSlug = `section-${sectionOrder}`; // Fallback for empty/invalid titles
               
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
                  isPro: categorizeDifficulty(secTitle, groupName) === 'expert', // Mark expert as pro
                  keyPoints: [secTitle, groupName]
               });
               
               totalSections++;
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
