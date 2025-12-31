
const reliabilityCurriculum = {
  "Reliability_Observability": {
    "reliability_principles": {
      "fundamental_concepts": [
        "SLIs, SLOs, and SLAs definition and implementation",
        "Error budgets and their management",
        "Mean Time Between Failures (MTBF)",
        "Mean Time To Recovery (MTTR)",
        "Mean Time To Detection (MTTD)",
        "Failure modes and effects analysis (FMEA)"
      ],
      "availability_patterns": [
        "Redundancy patterns (active-active, active-passive)",
        "Graceful degradation and fallback strategies",
        "Circuit breaker pattern implementation",
        "Bulkhead pattern for fault isolation",
        "Retry patterns with exponential backoff",
        "Deadline propagation in distributed systems"
      ]
    },
    "observability_stack": {
      "three_pillars": [
        "Metrics collection and aggregation (Prometheus, StatsD)",
        "Distributed tracing (OpenTelemetry, Jaeger, Zipkin)",
        "Structured logging and log aggregation (ELK stack)",
        "Event streaming and correlation",
        "Continuous profiling (Pyroscope, continuous profiling)",
        "Synthetic monitoring and checks"
      ],
      "telemetry_instrumentation": [
        "Automatic vs manual instrumentation",
        "Context propagation across services",
        "Sampling strategies (head-based, tail-based)",
        "Cardinality management in metrics",
        "Log aggregation best practices",
        "Trace visualization and analysis"
      ]
    },
    "incident_management": {
      "incident_response": [
        "Incident classification and severity levels",
        "On-call rotations and escalation policies",
        "Incident commander role and responsibilities",
        "Communication protocols during incidents",
        "Post-mortem culture and blameless retrospectives",
        "Incident timeline reconstruction"
      ],
      "alerting_strategies": [
        "Alert fatigue prevention and management",
        "Multi-level alerting (warning, critical, page)",
        "Alert routing and notification channels",
        "Alert suppression and deduplication",
        "Runbook automation and playbooks",
        "Alert correlation and root cause analysis"
      ]
    },
    "chaos_engineering": {
      "principles_practices": [
        "Chaos engineering principles (steady state, hypothesis)",
        "Game days and chaos experiments",
        "Failure injection testing",
        "Network latency and packet loss simulation",
        "Dependency failure testing",
        "Resource exhaustion experiments"
      ],
      "tools_frameworks": [
        "Chaos Mesh and Litmus for Kubernetes",
        "Gremlin for cloud-native chaos",
        "Custom failure injection frameworks",
        "Canary testing and progressive delivery",
        "Feature flagging for controlled rollouts",
        "Dark launches and shadow testing"
      ]
    },
    "disaster_recovery": {
      "backup_strategies": [
        "Backup types (full, incremental, differential)",
        "Backup retention policies and lifecycle",
        "Geographic redundancy and replication",
        "Point-in-time recovery capabilities",
        "Backup verification and testing",
        "Immutable backups and WORM storage"
      ],
      "recovery_planning": [
        "Recovery Time Objective (RTO) and Recovery Point Objective (RPO)",
        "Disaster recovery runbooks and procedures",
        "Failover and failback automation",
        "Data consistency across regions",
        "DR drill execution and validation",
        "Business continuity planning"
      ]
    },
    "capacity_planning": {
      "capacity_management": [
        "Resource utilization forecasting",
        "Auto-scaling strategies and policies",
        "Load testing and performance modeling",
        "Bottleneck identification and resolution",
        "Resource optimization and right-sizing",
        "Cost-performance tradeoff analysis"
      ],
      "performance_modeling": [
        "Little's Law application",
        "Queueing theory for system modeling",
        "Load distribution and sharding strategies",
        "Database scaling patterns (read replicas, sharding)",
        "Caching impact on capacity planning",
        "Network capacity planning"
      ]
    },
    "faang_interview_focus": [
      "Design highly available distributed systems",
      "Implement effective monitoring and alerting",
      "Handle incident response and post-mortems",
      "Design disaster recovery strategies",
      "Implement chaos engineering practices",
      "Capacity planning for growing systems"
    ]
  }
}

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
      lowerName.includes('chaos') || 
      lowerName.includes('disaster') || 
      lowerName.includes('capacity') ||
      lowerName.includes('advanced') ||
      lowerName.includes('forecasting') ||
      lowerName.includes('distributed')) {
    return 'advanced';
  }
  
  if (lowerName.includes('observability') || 
      lowerName.includes('monitoring') || 
      lowerName.includes('incident') || 
      lowerName.includes('alerting') ||
      lowerName.includes('tracing') ||
      lowerName.includes('metrics')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of Reliability & Observability.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Industry standards and best practices\n- Implementation strategies\n\n### Practical Application\nUse the AI Chat to ask for specific incident response scenarios, Prometheus query examples, or chaos engineering experiment designs.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic
    let topic = await Topic.findOne({ slug: 'reliability-observability' });
    if (!topic) {
      console.log('ℹ️ Reliability topic not found, creating...');
      topic = await Topic.create({
        name: 'Reliability & Observability',
        slug: 'reliability-observability',
        description: 'Master Site Reliability Engineering (SRE) principles, monitoring, and incident response',
        icon: '🔭', // Telescope for observability
        order: 14, // Order after Caching
        isNew: true
      });
    } else {
        topic.icon = '🔭';
        topic.description = 'Master Site Reliability Engineering (SRE) principles, monitoring, and incident response';
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

    const rootContent = reliabilityCurriculum.Reliability_Observability;

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
                  keyPoints: [secTitle, 'SRE', 'Interview']
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
