
const concurrencyCurriculum = {
  "Concurrency_Async_Processing": {

    "concurrency_fundamentals": {
      "basic_concepts": [
        "Process vs thread vs coroutine differences",
        "Parallelism vs concurrency distinctions",
        "CPU-bound vs I/O-bound operations",
        "Synchronous vs asynchronous execution",
        "Blocking vs non-blocking operations",
        "Preemptive vs cooperative multitasking"
      ],
      "concurrency_primitives": [
        "Mutexes, semaphores, and locks",
        "Condition variables and barriers",
        "Read-write locks and their optimizations",
        "Atomic operations and memory ordering",
        "Memory barriers and fence operations",
        "Spin locks vs blocking locks"
      ]
    },

    "async_processing": {
      "async_patterns": [
        "Callback-based asynchronous programming",
        "Promise/future patterns and implementations",
        "Async/await syntactic sugar",
        "Event-driven architectures",
        "Reactive programming with Rx patterns",
        "Message-driven processing"
      ],
      "async_io": [
        "Non-blocking I/O operations",
        "Event loops and their implementations",
        "I/O multiplexing (select, poll, epoll, kqueue)",
        "Asynchronous file operations",
        "Network I/O optimization",
        "Database connection pooling"
      ]
    },

    "parallel_programming": {
      "parallel_patterns": [
        "Task parallelism vs data parallelism",
        "Fork-join parallelism",
        "Pipeline parallelism patterns",
        "Divide and conquer parallel algorithms",
        "MapReduce and its variations",
        "Parallel sorting and searching algorithms"
      ],
      "parallel_models": [
        "Shared memory vs distributed memory models",
        "SIMD (Single Instruction Multiple Data)",
        "MIMD (Multiple Instruction Multiple Data)",
        "Vector processing optimizations",
        "NUMA-aware parallel programming",
        "GPU computing and CUDA/OpenCL"
      ]
    },

    "concurrent_data_structures": {
      "thread_safe_structures": [
        "Concurrent queues (bounded and unbounded)",
        "Concurrent hash maps and sets",
        "Concurrent linked lists",
        "Copy-on-write data structures",
        "Lock-free and wait-free data structures",
        "Transactional memory concepts"
      ],
      "performance_considerations": [
        "False sharing and cache line optimization",
        "Lock contention measurement and reduction",
        "Scalability of concurrent algorithms",
        "Memory reclamation in lock-free structures",
        "ABA problem and solutions",
        "Priority inversion and solutions"
      ]
    },

    "message_queuing": {
      "message_patterns": [
        "Publish-subscribe patterns",
        "Point-to-point messaging",
        "Request-reply patterns",
        "Message ordering and delivery guarantees",
        "Dead letter queues and poison pill handling",
        "Message deduplication and idempotency"
      ],
      "queue_implementations": [
        "Kafka for event streaming",
        "RabbitMQ for traditional messaging",
        "Redis as message broker",
        "Amazon SQS for cloud queuing",
        "Apache Pulsar for streaming",
        "ZeroMQ for lightweight messaging"
      ]
    },

    "distributed_concurrency": {
      "distributed_locks": [
        "Distributed lock implementations",
        "Leader election algorithms",
        "Consensus algorithms (Paxos, Raft)",
        "Distributed transactions and 2PC",
        "Quorum-based consistency",
        "Clock synchronization (Lamport clocks, vector clocks)"
      ],
      "coordination_services": [
        "ZooKeeper for distributed coordination",
        "etcd for service discovery and configuration",
        "Consul for service mesh and discovery",
        "Distributed queue implementations",
        "Workflow orchestration engines",
        "State machine replication"
      ]
    },

    "faang_interview_focus": [
      "Design concurrent data structures",
      "Handle race conditions and deadlocks",
      "Optimize for multi-core processors",
      "Design async processing pipelines",
      "Implement distributed locking mechanisms",
      "Scale message queuing systems"
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
  
  if (lowerName.includes('faang') || 
      lowerName.includes('distributed') || 
      lowerName.includes('consensus') || 
      lowerName.includes('atomic') ||
      lowerName.includes('lock-free') ||
      lowerName.includes('memory ordering') ||
      lowerName.includes('coroutine')) {
    return 'advanced';
  }
  
  if (lowerName.includes('patterns') || 
      lowerName.includes('synchronization') || 
      lowerName.includes('performance') || 
      lowerName.includes('optimization') ||
      lowerName.includes('queuing') ||
      lowerName.includes('handling')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of Concurrency & Asynchronous Processing.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Concurrency constraints and challenges\n- Real-world implementation patterns\n\n### Practical Application\nUse the AI Chat to ask for specific code examples (e.g., implementing a thread-safe singleton, using async/await in a loop), debugging race conditions, or designing concurrent systems.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic
    let topic = await Topic.findOne({ slug: 'concurrency-async' });
    if (!topic) {
      console.log('ℹ️ Concurrency topic not found, creating...');
      topic = await Topic.create({
        name: 'Concurrency & Async',
        slug: 'concurrency-async',
        description: 'Master multi-threading, asynchronous patterns, and distributed concurrency',
        icon: '⚡', // Lightning bolt for speed/power
        order: 16, // Check correct order relative to others
        isNew: true
      });
    } else {
        topic.icon = '⚡';
        topic.description = 'Master multi-threading, asynchronous patterns, and distributed concurrency';
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

    const rootContent = concurrencyCurriculum.Concurrency_Async_Processing;

    for (const [groupKey, groupParams] of Object.entries(rootContent)) {
       // LEVEL 1: GROUP (Module)
       let groupName = groupKey.replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       if (Array.isArray(groupParams)) {
           // Case: The group IS the category (e.g. FAANG Interview Focus)
           let catName = groupName; 
           
           const category = await Category.create({
                name: catName,
                slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }),
                topicId: topic._id,
                order: categoryOrder++,
                description: `Chapter on ${catName}`,
                group: 'Interview Prep' // Group interview stuff
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
                  keyPoints: [secTitle, 'Concurrency', 'Interview']
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
