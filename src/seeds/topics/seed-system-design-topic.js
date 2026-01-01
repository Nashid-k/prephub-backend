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

const systemDesignData = {
  "Fundamentals_Scaling": {
    "01_scalability_types": [
      "Vertical vs Horizontal Scaling",
      "Throughput vs Latency",
      "Availability vs Consistency (CAP)",
      "Reliability & Redundancy"
    ],
    "02_load_balancing": [
      "Layer 4 vs Layer 7 Balancing",
      "Round Robin vs Least Connections",
      "Consistent Hashing",
      "Sticky Sessions"
    ]
  },
  "Data_Management": {
    "01_database_scaling": [
      "Replication (Master-Slave)",
      "Sharding Strategies",
      "Federation",
      "Denormalization Patterns"
    ],
    "02_caching_strategies": [
      "Cache-Aside Pattern",
      "Write-Through vs Write-Back",
      "Eviction Policies (LRU, LFU)",
      "CDN Implementation"
    ],
    "03_data_consistency": [
      "Strong vs Eventual Consistency",
      "ACID Transactions",
      "Quorum Reads/Writes",
      "Siegemund Consistency"
    ]
  },
  "Communication_Patterns": {
    "01_sync_vs_async": [
      "REST vs RPC",
      "Message Queues (Kafka/RabbitMQ)",
      "Publish-Subscribe Pattern",
      "Long Polling vs WebSockets"
    ],
    "02_api_design": [
      "Rate Limiting Strategies",
      "Idempotency",
      "Pagination & Filtering",
      "API Versioning"
    ]
  },
  "Advanced_Components": {
    "01_search_systems": [
      "Inverted Index",
      "Elasticsearch Architecture",
      "Fuzzy Search",
      "Autocomplete Design"
    ],
    "02_monitoring_alerting": [
      "Logging Pipelines (ELK)",
      "Distributed Tracing",
      "Metrics (Prometheus/Grafana)",
      "Health Checks"
    ]
  },
  "Design_Interviews": {
    "01_classic_problems": [
      "Design URL Shortener (TinyURL)",
      "Design Instagram/Twitter Feed",
      "Design WhatsApp/Messenger",
      "Design Rate Limiter"
    ],
    "02_interview_framework": [
      "Requirements Clarification",
      "Back-of-envelope Calculations",
      "High-Level Design",
      "Bottleneck Analysis"
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
    const topicSlug = 'system-design'; 
    const topicName = 'System Design';
    
    // 1. Find or Create Topic
    let topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      topic = await Topic.create({
        name: topicName,
        slug: topicSlug,
        description: 'Learn how to design scalable, high-performance distributed systems for large-scale applications.',
        icon: 'system-design', 
        order: 14 // Advanced topic
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
    for (const [categoryKey, categoryContent] of Object.entries(systemDesignData)) {
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
                description: `Deep dive into ${sectionTitle} for System Design.`,
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

    console.log('✅ System Design seeding complete!');
    
  } catch (error) {
    console.error('Error seeding System Design:', error);
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
