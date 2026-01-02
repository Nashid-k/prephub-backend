
const reliabilityCurriculum = {

  "00_reliability_engineering_mindset": {
    "foundational_ideas": [
      "Why systems fail in production",
      "Reliability vs availability vs durability",
      "Reactive vs proactive reliability engineering",
      "Trade-offs between velocity and stability",
      "Human factors in system failures"
    ],
    "core_metrics_overview": [
      "Why reliability must be measurable",
      "User-centric vs system-centric metrics",
      "Symptoms vs causes in failures"
    ]
  },

  "01_service_reliability_fundamentals": {
    "sli_slo_sla": [
      "Service Level Indicators (SLIs)",
      "Service Level Objectives (SLOs)",
      "Service Level Agreements (SLAs)",
      "Choosing correct SLIs (latency, availability, errors)",
      "Common SLI mistakes"
    ],
    "error_budgets": [
      "What error budgets represent",
      "Error budget calculation",
      "Using error budgets for release decisions",
      "Burn rate and fast vs slow burn",
      "Error budgets as organizational alignment tool"
    ],
    "reliability_metrics": [
      "Mean Time Between Failures (MTBF)",
      "Mean Time To Detection (MTTD)",
      "Mean Time To Recovery (MTTR)",
      "Interpreting reliability metrics correctly"
    ]
  },

  "02_failure_analysis_and_resilience_thinking": {
    "failure_models": [
      "Types of failures (hardware, software, human, network)",
      "Cascading failures",
      "Partial failures in distributed systems",
      "Gray failures and silent degradation"
    ],
    "failure_analysis": [
      "Failure Modes and Effects Analysis (FMEA)",
      "Blast radius identification",
      "Single points of failure (SPOF)",
      "Dependency mapping and risk analysis"
    ]
  },

  "03_availability_and_resilience_patterns": {
    "redundancy_and_failover": [
      "Redundancy fundamentals",
      "Active-active vs active-passive architectures",
      "Stateless vs stateful service design",
      "Leader election considerations"
    ],
    "graceful_degradation": [
      "Graceful degradation strategies",
      "Feature degradation vs system shutdown",
      "Fallback responses and defaults",
      "Load shedding techniques"
    ],
    "fault_isolation_patterns": [
      "Bulkhead pattern",
      "Cell-based architecture",
      "Failure domain isolation",
      "Resource isolation (CPU, memory, threads)"
    ],
    "request_resilience": [
      "Retry strategies",
      "Exponential backoff",
      "Jitter to prevent thundering herd",
      "Timeouts and deadline propagation",
      "Circuit breaker pattern implementation"
    ]
  },

  "04_observability_foundations": {
    "three_pillars_of_observability": [
      "Metrics fundamentals",
      "Logs fundamentals",
      "Distributed traces fundamentals",
      "Events and system signals",
      "When to use which pillar"
    ],
    "observability_goals": [
      "Detecting failures early",
      "Understanding system behavior",
      "Debugging unknown unknowns",
      "Supporting incident response"
    ]
  },

  "05_metrics_and_monitoring": {
    "metrics_design": [
      "Golden signals (latency, traffic, errors, saturation)",
      "RED vs USE methodologies",
      "Choosing high-signal metrics",
      "Cardinality management"
    ],
    "metrics_tooling": [
      "Prometheus architecture",
      "StatsD concepts",
      "Metric aggregation strategies",
      "Recording rules and alert rules"
    ]
  },

  "06_logging_and_log_management": {
    "logging_principles": [
      "Structured logging vs unstructured logs",
      "Log levels and semantics",
      "Correlation IDs",
      "Avoiding log noise"
    ],
    "log_aggregation": [
      "Centralized logging concepts",
      "ELK stack fundamentals",
      "Log retention and cost control",
      "Security and PII considerations"
    ]
  },

  "07_distributed_tracing": {
    "tracing_concepts": [
      "Why tracing is needed",
      "Spans, traces, and contexts",
      "Trace propagation across services",
      "Sampling challenges"
    ],
    "tracing_tooling": [
      "OpenTelemetry concepts",
      "Jaeger and Zipkin comparison",
      "Head-based vs tail-based sampling",
      "Trace visualization and analysis"
    ]
  },

  "08_telemetry_instrumentation": {
    "instrumentation_strategies": [
      "Automatic vs manual instrumentation",
      "Instrumentation boundaries",
      "Context propagation",
      "Telemetry performance overhead"
    ],
    "advanced_telemetry": [
      "High-cardinality pitfalls",
      "Metric explosion prevention",
      "Correlation across metrics, logs, and traces"
    ]
  },

  "09_alerting_and_detection": {
    "alerting_philosophy": [
      "What alerts should and should not do",
      "Symptoms-based alerting",
      "Avoiding alert fatigue",
      "Alert ownership"
    ],
    "alert_design": [
      "Multi-level alerts (warning, critical, page)",
      "Alert routing strategies",
      "Alert deduplication and suppression",
      "Alert correlation"
    ],
    "runbooks": [
      "Runbook creation",
      "Automation in runbooks",
      "Playbooks vs runbooks",
      "Operational readiness reviews"
    ]
  },

  "10_incident_response_and_management": {
    "incident_lifecycle": [
      "Incident classification and severity levels",
      "Detection and declaration",
      "Mitigation vs resolution",
      "Incident closure"
    ],
    "incident_roles": [
      "Incident commander responsibilities",
      "Communication lead role",
      "On-call rotations and escalation policies"
    ],
    "incident_communication": [
      "Internal communication protocols",
      "Stakeholder updates",
      "Customer communication during incidents"
    ]
  },

  "11_post_incident_learning": {
    "postmortems": [
      "Blameless post-mortem culture",
      "Timeline reconstruction",
      "Root cause vs contributing factors",
      "Action items and ownership"
    ],
    "organizational_learning": [
      "Preventing recurrence",
      "Tracking reliability improvements",
      "Sharing learnings across teams"
    ]
  },

  "12_capacity_planning_and_scalability": {
    "capacity_management": [
      "Capacity planning fundamentals",
      "Resource utilization forecasting",
      "Auto-scaling strategies",
      "Right-sizing resources",
      "Cost vs performance trade-offs"
    ],
    "load_and_stress_testing": [
      "Load testing principles",
      "Stress vs soak vs spike testing",
      "Bottleneck identification",
      "Performance modeling"
    ]
  },

  "13_performance_and_queueing_models": {
    "performance_modeling": [
      "Little’s Law",
      "Queueing theory fundamentals",
      "Backpressure handling",
      "Throughput vs latency trade-offs"
    ],
    "scaling_patterns": [
      "Horizontal vs vertical scaling",
      "Sharding strategies",
      "Caching impact on performance",
      "Database scaling patterns"
    ]
  },

  "14_disaster_recovery_and_business_continuity": {
    "backup_strategies": [
      "Full, incremental, and differential backups",
      "Backup retention policies",
      "Immutable backups and WORM storage",
      "Backup verification and restore testing"
    ],
    "recovery_planning": [
      "Recovery Time Objective (RTO)",
      "Recovery Point Objective (RPO)",
      "Failover and failback automation",
      "Geographic redundancy"
    ],
    "dr_practices": [
      "Disaster recovery drills",
      "Data consistency across regions",
      "Business continuity planning"
    ]
  },

  "15_chaos_engineering_and_proactive_resilience": {
    "chaos_principles": [
      "Steady state definition",
      "Hypothesis-driven experiments",
      "Game days"
    ],
    "failure_injection": [
      "Network latency injection",
      "Packet loss simulation",
      "Dependency failure testing",
      "Resource exhaustion experiments"
    ],
    "chaos_tooling": [
      "Chaos Mesh",
      "Litmus",
      "Gremlin",
      "Custom failure injection frameworks"
    ],
    "progressive_delivery": [
      "Canary releases",
      "Feature flags",
      "Dark launches",
      "Shadow testing"
    ]
  },

  "16_continuous_profiling_and_optimization": {
    "profiling_concepts": [
      "Why profiling matters",
      "CPU vs memory profiling",
      "Always-on profiling trade-offs"
    ],
    "profiling_tools": [
      "Continuous profiling (Pyroscope)",
      "Production-safe profiling techniques"
    ]
  },

  "17_system_design_and_faang_interview_focus": {
    "design_scenarios": [
      "Design highly available distributed systems",
      "Design for graceful degradation",
      "Design effective monitoring and alerting"
    ],
    "operational_excellence": [
      "Handling large-scale incidents",
      "Designing disaster recovery strategies",
      "Capacity planning for rapid growth"
    ],
    "interview_expectations": [
      "Thinking in failure modes",
      "Trade-off driven decision making",
      "Operational readiness mindset"
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
