import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { assignGroup } from '../utils/categoryGrouping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const mongodbData = {
  "MongoDB_Fundamentals": {
    "01_introduction": {
      "core_concepts": [
        "What is MongoDB - NoSQL Document Database",
        "SQL vs NoSQL Comparison",
        "MongoDB Advantages and Use Cases",
        "BSON Format (Binary JSON)"
      ],
      "mongodb_architecture": [
        "Document Structure",
        "Collections and Databases",
        "Schema-less Nature",
        "Default Port (27017)"
      ]
    },

    "02_basic_operations": {
      "crud_operations": [
        "Create (insertOne, insertMany)",
        "Read (find, findOne)",
        "Update (updateOne, updateMany)",
        "Delete (deleteOne, deleteMany)"
      ],
      "query_operators": {
        "comparison": ["$eq", "$ne", "$gt", "$gte", "$lt", "$lte"],
        "logical": ["$and", "$or", "$nor", "$not"],
        "element": ["$exists", "$type"]
      }
    }
  },

  "Data_Modeling": {
    "data_structures": [
      "Document Structure Design",
      "Embedded Documents (Denormalization)",
      "Referenced Documents (Normalization)",
      "When to Embed vs Reference"
    ],

    "data_types": [
      "ObjectId (_id field)",
      "String, Number, Boolean",
      "Array and Object Types",
      "Date and Timestamp",
      "Special BSON Types"
    ],

    "schema_design": [
      "Schema Validation",
      "Data Modeling Best Practices",
      "Anti-patterns to Avoid",
      "Real-world Modeling Patterns"
    ]
  },

  "Querying_Data": {
    "01_basic_queries": [
      "find() Method with Projection",
      "Querying Nested Documents",
      "Array Query Operators ($in, $all)",
      "Regular Expressions ($regex)"
    ],

    "02_array_operations": [
      "$elemMatch for Array Queries",
      "$size for Array Length",
      "Querying Array Elements",
      "Updating Arrays ($push, $pull)"
    ],

    "03_advanced_queries": [
      "Text Search",
      "Geospatial Queries",
      "Aggregation Framework Basics",
      "Cursor Operations"
    ]
  },

  "Update_Operations": {
    "update_operators": [
      "$set and $unset",
      "$inc (Increment/Decrement)",
      "$rename Fields",
      "$addToSet vs $push",
      "$pop and $pull"
    ],

    "update_patterns": [
      "Upsert Operations (upsert: true)",
      "Update vs Replace",
      "Bulk Write Operations",
      "Update Performance Considerations"
    ]
  },

  "Aggregation_Framework": {
    "01_aggregation_basics": [
      "Aggregation Pipeline Concept",
      "$match Stage (Filtering)",
      "$project Stage (Reshaping)",
      "$group Stage (Grouping)"
    ],

    "02_common_stages": [
      "$sort for Ordering",
      "$limit and $skip",
      "$unwind for Arrays",
      "$lookup for Joins"
    ],

    "03_advanced_stages": [
      "$facet for Multiple Aggregations",
      "$out for Output Collection",
      "$merge for Merging Results",
      "$expr for Expression Queries"
    ],

    "04_accumulators": [
      "$sum for Totals",
      "$avg for Averages",
      "$min and $max",
      "$first and $last"
    ]
  },

  "Indexing": {
    "01_index_basics": [
      "Why Indexing is Important",
      "Default _id Index",
      "Single Field Indexes",
      "Compound Indexes"
    ],

    "02_special_indexes": [
      "TTL Indexes (Time-to-Live)",
      "Text Indexes for Search",
      "Geospatial Indexes",
      "Hashed Indexes"
    ],

    "03_index_management": [
      "createIndex() Method",
      "getIndexes() for Listing",
      "dropIndex() for Removal",
      "Index Performance Analysis"
    ],

    "04_index_strategies": [
      "Covered Queries",
      "Index Selectivity",
      "Index Drawbacks (Storage, Write Overhead)",
      "Query Optimization with explain()"
    ]
  },

  "Transactions": {
    "acid_properties": [
      "Atomicity",
      "Consistency",
      "Isolation",
      "Durability"
    ],

    "transaction_operations": [
      "Starting a Session",
      "Transaction Commands",
      "Error Handling in Transactions",
      "When to Use Transactions"
    ]
  },

  "Replication": {
    "replica_set_basics": [
      "What is a Replica Set",
      "Primary and Secondary Nodes",
      "Automatic Failover",
      "Data Redundancy"
    ],

    "replication_operations": [
      "Read Preferences",
      "Write Concerns",
      "Journaling for Durability",
      "Oplog (Operations Log)"
    ]
  },

  "Sharding": {
    "sharding_concepts": [
      "Horizontal Scaling with Sharding",
      "Shard Key Selection",
      "Chunks and Balancing",
      "Config Servers and Mongos"
    ],

    "sharding_operations": [
      "Enabling Sharding",
      "Adding and Removing Shards",
      "Shard Key Strategies",
      "Monitoring Sharded Clusters"
    ]
  },

  "CAP_Theorem": {
    "concepts": [
      "Consistency in Distributed Systems",
      "Availability Requirements",
      "Partition Tolerance",
      "MongoDB's CAP Approach"
    ]
  },

  "Special_Collections": {
    "capped_collections": [
      "What are Capped Collections",
      "Creating Capped Collections",
      "Use Cases (Logs, Cache)",
      "Limitations and Considerations"
    ],

    "clustered_collections": [
      "Clustered Collections vs Regular Collections",
      "Performance Benefits",
      "Storage Optimization"
    ],

    "views": [
      "Creating Views",
      "Materialized Views",
      "View Limitations",
      "Use Cases for Views"
    ]
  },

  "Performance_Optimization": {
    "01_query_optimization": [
      "Using explain() for Analysis",
      "Query Profiler",
      "Covered Query Optimization",
      "Index Hinting"
    ],

    "02_memory_management": [
      "Working Set Size",
      "Memory Usage Optimization",
      "Storage Engine Considerations (WiredTiger)"
    ]
  },

  "Backup_Recovery": {
    "backup_methods": [
      "mongodump and mongorestore",
      "File System Snapshots",
      "Cloud Backup Strategies",
      "Backup Scheduling"
    ],

    "recovery_operations": [
      "Point-in-Time Recovery",
      "Disaster Recovery Planning",
      "Testing Backup Restoration"
    ]
  },

  "Monitoring_Maintenance": {
    "monitoring_tools": [
      "MongoDB Compass",
      "mongostat and mongotop",
      "Database Profiler",
      "Performance Metrics"
    ],

    "maintenance_tasks": [
      "Database Compaction",
      "Index Rebuilding",
      "Data Archiving",
      "Regular Health Checks"
    ]
  },

  "GridFS": {
    "basics": [
      "What is GridFS",
      "Storing Large Files",
      "GridFS Collections (chunks and files)",
      "Use Cases for GridFS"
    ]
  },

  "MongoDB_Atlas_Cloud": {
    "atlas_basics": [
      "Atlas Cluster Deployment",
      "Auto-scaling Configuration",
      "Global Clusters (Geo-sharding)",
      "Serverless Instances"
    ],
    "atlas_services": [
      "Atlas Search (Lucene)",
      "Atlas Triggers & Functions",
      "Data Lake",
      "Charts & Visualization"
    ]
  },

  "Advanced_Aggregation_DeepDive": {
    "graph_lookup": [
      "$graphLookup (Recursive Search)",
      "Hierarchy Modeling",
      "Social Network Graphs",
      "Recursive Queries"
    ],
    "window_functions": [
      "$setWindowFields",
      "Moving Averages",
      "Cumulative Sums",
      "Ranking Data"
    ]
  },

  "Transactions_And_ACID": {
    "multi_document_transactions": [
      "ACID Compliance in MongoDB",
      "Transaction API (startTransaction)",
      "Commit and Abort Logic",
      "Transient Transaction Errors"
    ],
    "consistency_patterns": [
      "Causal Consistency",
      "Linearizable Reads",
      "Write Concerns in Transactions",
      "Isolation Levels"
    ]
  },

  "Security_And_Encryption": {
    "encryption_at_rest": [
      "Client-Side Field Level Encryption (CSFLE)",
      "Key Management (KMIP)",
      "Encrypted Query Support",
      "Audit Logging"
    ],
    "network_security": [
      "TLS/SSL Configuration",
      "IP Whitelisting (Peering)",
      "Private Endpoints",
      "X.509 Authentication"
    ]
  },

  "Mobile_Development_Realm": {
    "realm_basics": [
      "Realm Database Introduction",
      "Object-Oriented Data Model",
      "Reactive Architecture",
      "Realm vs SQLite"
    ],
    "device_sync": [
      "Atlas Device Sync",
      "Flexible Sync Permissions",
      "Conflict Resolution",
      "Offline-First Apps"
    ]
  },

  "Time_Series_Collections": {
    "time_series_basics": [
      "Time Series Collection Creation",
      "Granularity (Seconds, Minutes)",
      "Automatic Expiration (TTL)",
      "Querying Time Series Data"
    ],
    "sensor_patterns": [
      "IoT Data Modeling",
      "Bucket Pattern",
      "Downsampling with $merge",
      "Window Functions for IoT"
    ]
  },

  "Practical_Queries": {
    "01_basic_queries": [
      "Find documents with specific field values",
      "Query with multiple conditions ($and, $or)",
      "Project specific fields only",
      "Sort and limit results"
    ],

    "02_update_queries": [
      "Update single document field",
      "Increment/decrement numeric values",
      "Add/remove from arrays",
      "Update multiple documents"
    ],

    "03_aggregation_queries": [
      "Group and count documents",
      "Calculate averages and sums",
      "Join collections with $lookup",
      "Unwind and process arrays"
    ],

    "04_real_world_scenarios": [
      "User management queries",
      "E-commerce product queries",
      "Analytics and reporting",
      "Log analysis queries"
    ]
  },

  "Essential_Projects": {
    "learning_projects": [
      "Blog Application with Comments",
      "E-commerce Product Catalog",
      "User Analytics Dashboard",
      "Real-time Chat Application"
    ],

    "must_implement_features": [
      "CRUD operations with validation",
      "Aggregation for reports",
      "Index optimization",
      "Data modeling patterns"
    ]
  },

  "Interview_Preparation": {
    "core_concepts": [
      "SQL vs NoSQL Differences",
      "MongoDB Architecture",
      "Data Modeling Decisions",
      "Indexing Strategies",
      "Aggregation Framework",
      "Replication and Sharding"
    ],

    "common_questions": [
      "When to use MongoDB vs SQL",
      "Embedded vs Referenced Documents",
      "Index Selection Criteria",
      "Transaction Implementation",
      "Performance Optimization"
    ],

    "practical_skills": [
      "Write complex aggregation pipelines",
      "Design efficient data models",
      "Optimize slow queries",
      "Implement backup strategies",
      "Set up replication"
    ]
  },

  "Development_Tools": {
    "mongodb_tools": [
      "MongoDB Compass (GUI)",
      "MongoDB Shell (mongosh)",
      "mongodump/mongorestore",
      "mongoimport/mongoexport"
    ],

    "monitoring": [
      "MongoDB Atlas (Cloud)",
      "Performance Advisor",
      "Query Profiler",
      "Log Analysis Tools"
    ]
  }
};

const formatName = (str) => {
    return str
        .replace(/^\\d+_/, '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'mongodb' });
        if (!topic) {
            console.log('Creating MongoDB topic...');
            topic = await Topic.create({
                name: 'MongoDB',
                slug: 'mongodb',
                description: 'Master NoSQL database design with MongoDB',
                icon: '🍃',
                order: 4,
                color: '#47A248'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing MongoDB data');
        }

        const seenSlugs = new Set();
        const generateUniqueSlug = (title) => {
            let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            let slug = baseSlug;
            let counter = 1;
            while (seenSlugs.has(slug)) {
                counter++;
                slug = `${baseSlug}-${counter}`;
            }
            seenSlugs.add(slug);
            return slug;
        };

        let order = 1;
        for (const [mainKey, mainValue] of Object.entries(mongodbData)) {
            const groupName = formatName(mainKey); // Use mainKey as group - maintains study order!
            
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: groupName,
                    order: order++
                });

                let sections = [];
                if (Array.isArray(value)) {
                    sections = value;
                } else {
                    for (const [subKey, subItems] of Object.entries(value)) {
                        if (Array.isArray(subItems)) {
                            sections = [...sections, ...subItems];
                        } else if (typeof subItems === 'object' && subItems !== null) {
                            for (const nestedItems of Object.values(subItems)) {
                                if (Array.isArray(nestedItems)) {
                                    sections = [...sections, ...nestedItems];
                                }
                            }
                        }
                    }
                }

                const sectionDocs = sections.map((sectionTitle, index) => ({
                    title: sectionTitle,
                    slug: generateUniqueSlug(sectionTitle),
                    description: `Detailed explanation of ${sectionTitle}`,
                    content: 'Coming soon...',
                    categoryId: category._id,
                    topicId: topic._id,
                    order: index + 1,
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Performance') || categoryName.includes('Sharding') ? 'advanced' : 
                               categoryName.includes('Introduction') || categoryName.includes('Fundamentals') || categoryName.includes('Basics') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ MongoDB seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedMongoDB();
