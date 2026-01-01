import mongoose from 'mongoose';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import { assignGroup } from '../utils/categoryGrouping.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const distributedSystemsData = {
  "Core_Concepts": {
    "01_introduction": [
      "Characteristics of Distributed Systems",
      "Fallacies of Distributed Computing",
      "Network Partitions",
      "Time & Clocks (Lamport/Vector)"
    ],
    "02_consistency_models": [
      "Eventual Consistency",
      "Causal Consistency",
      "Linearizability vs Serializability",
      "Tunable Consistency (Cassandra/Dynamo)"
    ]
  },
  "Architecture_Patterns": {
    "01_microservices": [
      "Monolith vs Microservices",
      "Service Boundaries (DDD)",
      "API Gateway Pattern",
      "Sidecar Pattern (Service Mesh)"
    ],
    "02_event_driven": [
      "Event Sourcing",
      "CQRS (Command-Query Responsibility Segregation)",
      "Saga Pattern (Orchestration vs Choreography)",
      "Outbox Pattern"
    ]
  },
  "Consensus_Coordination": {
    "01_consensus_algorithms": [
      "Paxos Explained",
      "Raft Protocol",
      "Leader Election",
      "Two-Phase Commit (2PC)"
    ],
    "02_distributed_transactions": [
      "Sagas vs 2PC",
      "Distributed Locks (Redis/ZooKeeper)",
      "Idempotency Keys",
      "Compensation Logic"
    ]
  },
  "System_Reliability": {
    "01_resiliency": [
      "Circuit Breaker Pattern",
      "Bulkhead Pattern",
      "Retry & Exponential Backoff",
      "Chaos Engineering"
    ],
    "02_observability": [
      "Distributed Tracing (OpenTelemetry)",
      "Structured Logging",
      "Service Level Objectives (SLOs)",
      "Error Budgets"
    ]
  },
  "Communication_Protocols": {
    "01_data_exchange": [
      "gRPC vs REST",
      "Protocol Buffers",
      "GraphQL Federation",
      "WebSockets Scalability"
    ],
    "02_message_brokers": [
      "Kafka (Log-based Broking)",
      "RabbitMQ (Exchange-Queue)",
      "Message Ordering Guarantees",
      "Dead Letter Queues"
    ]
  }
};

const formatName = (key) => {
  return key.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const generateUniqueSlug = async (model, baseSlug, field = 'slug') => {
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (await model.findOne({ [field]: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  return uniqueSlug;
};

const seedTopic = async () => {
  try {
    const topicSlug = 'distributed-systems'; 
    const topicName = 'Distributed Systems';
    
    // 1. Find or Create Topic
    let topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      topic = await Topic.create({
        name: topicName,
        slug: topicSlug,
        description: 'Advanced concepts in building reliable, scalable, and fault-tolerant distributed applications.',
        icon: 'server', 
        order: 15 // Advanced topic
      });
      console.log(`Created Topic: ${topicName}`);
    } else {
      console.log(`Topic exists: ${topicName}`);
    }

    // 2. Refresh Categories
    console.log('Clearing existing categories...');
    await Category.deleteMany({ topicId: topic._id });
    
    // 3. Seed Categories & Sections
    let order = 1;
    for (const [categoryKey, categoryContent] of Object.entries(distributedSystemsData)) {
      const categoryName = formatName(categoryKey);
      const categorySlug = await generateUniqueSlug(Category, categoryKey.toLowerCase().replace(/_/g, '-'));
      
      const group = await assignGroup(categoryName, topicSlug);
      
      const category = await Category.create({
        name: categoryName,
        slug: categorySlug,
        description: `Learn about ${categoryName}`,
        topicId: topic._id,
        group: group, 
        order: order++
      });
      
      console.log(`Created Category: ${categoryName} (Group: ${group})`);

      // Sections
      if (Array.isArray(categoryContent)) {
        // Simple list
        let sectionOrder = 1;
        for (const sectionTitle of categoryContent) {
            const sectionSlug = await generateUniqueSlug(Section, sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            
            await Section.create({
                topicId: topic._id,
                categoryId: category._id,
                title: sectionTitle,
                slug: sectionSlug,
                description: `Deep dive into ${sectionTitle} for Distributed Systems.`,
                content: `Content for ${sectionTitle}`,
                order: sectionOrder++,
                isCompleted: false
            });
        }
        console.log(`  - Added ${categoryContent.length} sections`);
      } else {
         // Sub-categories logic
         let sectionOrder = 1;
         for (const [subKey, sections] of Object.entries(categoryContent)) {
             if (Array.isArray(sections)) {
                 for (const sectionTitle of sections) {
                    const sectionSlug = await generateUniqueSlug(Section, sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    
                    await Section.create({
                        topicId: topic._id,
                        categoryId: category._id,
                        title: sectionTitle,
                        slug: sectionSlug,
                        description: `Learn about ${sectionTitle} within ${formatName(subKey)}.`,
                        content: `Content for ${sectionTitle} (${formatName(subKey)})`,
                        order: sectionOrder++,
                        isCompleted: false
                    });
                 }
             }
         }
         console.log(`  - Added sections from sub-groups`);
      }
    }

    console.log('✅ Distributed Systems seeding complete!');
    
  } catch (error) {
    console.error('Error seeding Distributed Systems:', error);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prephub')
    .then(() => seedTopic())
    .then(() => mongoose.disconnect())
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

export default seedTopic;
