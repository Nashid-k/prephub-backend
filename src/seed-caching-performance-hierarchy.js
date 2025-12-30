
const cachingCurriculum = {
  "Caching_Performance": {
    "caching_fundamentals": {
      "cache_concepts": [
        "Cache hit vs miss ratios and their impact",
        "Cache invalidation strategies (write-through, write-around, write-back)",
        "Cache coherence and consistency models",
        "Time-to-live (TTL) and expiration policies",
        "Cache warming and pre-fetching techniques",
        "Cache stampede and thundering herd problems"
      ],
      "cache_types": [
        "CPU caches (L1, L2, L3) and their impact on algorithms",
        "Application-level caching (in-memory caches)",
        "Distributed caching systems",
        "CDN and edge caching",
        "Database query result caching",
        "Browser and HTTP caching"
      ]
    },
    "distributed_caching": {
      "cache_architectures": [
        "Cache-aside (lazy loading) pattern",
        "Read-through and write-through patterns",
        "Cache-as-SOR (System of Record)",
        "Cache replication and sharding strategies",
        "Consistent hashing for cache distribution",
        "Hot key detection and mitigation"
      ],
      "cache_eviction": [
        "LRU (Least Recently Used) algorithm",
        "LFU (Least Frequently Used) algorithm",
        "ARC (Adaptive Replacement Cache)",
        "TTL-based eviction strategies",
        "Memory-aware eviction policies",
        "Cost-aware caching"
      ]
    },
    "performance_optimization": {
      "latency_optimization": [
        "Critical rendering path optimization",
        "DNS pre-fetching and pre-connecting",
        "Resource hint headers (preload, prefetch, preconnect)",
        "Lazy loading and code splitting",
        "Image and media optimization techniques",
        "Minification and compression strategies"
      ],
      "throughput_optimization": [
        "Connection pooling and reuse",
        "Batch processing and bulk operations",
        "Pipelining and parallelization",
        "Load balancing strategies",
        "Database connection management",
        "Queue-based processing systems"
      ]
    },
    "memory_management": {
      "memory_optimization": [
        "Garbage collection tuning and algorithms",
        "Memory pooling and object reuse",
        "Memory fragmentation prevention",
        "Off-heap memory management",
        "Memory-mapped files",
        "Memory profiling and leak detection"
      ],
      "cpu_optimization": [
        "CPU cache-aware programming",
        "Branch prediction optimization",
        "Vectorization and SIMD instructions",
        "Lock-free and wait-free algorithms",
        "Thread pooling and scheduling",
        "NUMA-aware programming"
      ]
    },
    "database_performance": {
      "query_optimization": [
        "Query execution plan analysis",
        "Index selection and optimization",
        "Query rewriting for performance",
        "Materialized views and denormalization",
        "Database partitioning strategies",
        "Connection and session pooling"
      ],
      "storage_optimization": [
        "Data compression techniques",
        "Storage engine selection and tuning",
        "Buffer pool optimization",
        "Write-ahead logging optimization",
        "Vacuum and maintenance operations",
        "Storage tiering strategies"
      ]
    },
    "monitoring_profiling": {
      "performance_metrics": [
        "Application Performance Monitoring (APM) tools",
        "Real User Monitoring (RUM)",
        "Synthetic monitoring and canary testing",
        "Distributed tracing and span analysis",
        "CPU, memory, I/O profiling",
        "Network latency and throughput monitoring"
      ],
      "benchmarking": [
        "Load testing and stress testing",
        "Capacity planning and forecasting",
        "Performance regression testing",
        "A/B testing for performance optimizations",
        "Production performance analysis",
        "Performance budget management"
      ]
    },
    "faang_interview_focus": [
      "Design caching strategies for large-scale systems",
      "Optimize database queries and indexing",
      "Handle cache invalidation in distributed systems",
      "Implement CDN and edge caching",
      "Monitor and troubleshoot performance bottlenecks",
      "Design for predictable latency and throughput"
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
  
  if (lowerName.includes('distributed') || 
      lowerName.includes('faang') || 
      lowerName.includes('tuning') || 
      lowerName.includes('advanced') ||
      lowerName.includes('lock-free') ||
      lowerName.includes('numa') ||
      lowerName.includes('vectorization')) {
    return 'advanced';
  }
  
  if (lowerName.includes('optimization') || 
      lowerName.includes('architecture') || 
      lowerName.includes('management') || 
      lowerName.includes('profiling') ||
      lowerName.includes('benchmarking') ||
      lowerName.includes('strategy')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of Caching & Performance Optimization.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Performance implications and trade-offs\n- Optimization strategies and best practices\n\n### Practical Application\nUse the AI Chat to ask for specific code examples (e.g., Redis configuration, JVM tuning flags), architecture diagrams, or performance analysis scenarios related to this topic.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic
    let topic = await Topic.findOne({ slug: 'caching-performance' });
    if (!topic) {
      console.log('ℹ️ Caching topic not found, creating...');
      topic = await Topic.create({
        name: 'Caching & Performance',
        slug: 'caching-performance',
        description: 'Master system performance, from low-level CPU caching to distributed system optimization',
        icon: '⚡', // Lightning bolt for performance
        order: 13, // Order after API Design
        isNew: true
      });
    } else {
        topic.icon = '⚡';
        topic.description = 'Master system performance, from low-level CPU caching to distributed system optimization';
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

    const rootContent = cachingCurriculum.Caching_Performance;

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
                  keyPoints: [secTitle, 'Performance', 'Interview']
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
