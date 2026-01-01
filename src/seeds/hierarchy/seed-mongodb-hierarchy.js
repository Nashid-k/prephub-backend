import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import slugify from 'slugify';

dotenv.config();

const mongodbCurriculum = {
  "01_database_fundamentals": {
    "database_concepts": [
      "What is a Database",
      "Features of a Database",
      "Database Management System (DBMS)"
    ],
    "database_types": [
      "SQL vs NoSQL Databases",
      "Relational vs Non-Relational Databases",
      "Types of NoSQL Databases (Document, Key-Value, Column-family, Graph)"
    ],
    "consistency_models": [
      "ACID Properties (Atomicity, Consistency, Isolation, Durability)",
      "BASE Properties (Basically Available, Soft state, Eventual consistency)",
      "CAP Theorem (Consistency, Availability, Partition Tolerance)",
      "Partition Tolerance",
      "Consistency Levels (Strong, Eventual, Causal)"
    ],
    "scaling_strategies": [
      "Vertical Scaling (Scale-up)",
      "Horizontal Scaling (Scale-out)",
      "Sharding Concepts",
      "Replication Concepts"
    ],
    "keys_constraints": [
      "Primary Key Concept",
      "Unique Key Concept",
      "Foreign Key Concept (Not enforced in MongoDB)",
      "Composite Key"
    ]
  },
  "02_mongodb_introduction": {
    "overview": [
      "What is MongoDB",
      "MongoDB as a Document Database",
      "Why MongoDB is Schema-less/Flexible Schema",
      "MongoDB Features and Advantages",
      "MongoDB Use Cases"
    ],
    "architecture": [
      "MongoDB Architecture Overview",
      "WiredTiger Storage Engine",
      "Default Port Number (27017)",
      "Namespace in MongoDB (database.collection)",
      "MongoDB Atlas (Cloud Service)",
      "MongoDB Community vs Enterprise"
    ],
    "data_representation": [
      "BSON vs JSON",
      "Why BSON is Used in MongoDB",
      "Benefits of BSON",
      "BSON Data Types",
      "Components of _id Field (ObjectId)",
      "ObjectId Structure (Timestamp, Machine ID, Process ID, Counter)"
    ]
  },
  "03_installation_setup": {
    "installation": [
      "MongoDB Installation",
      "MongoDB Server Setup",
      "Environment Configuration"
    ],
    "connection_tools": [
      "MongoDB Shell (mongosh)",
      "MongoDB Compass (GUI Tool)",
      "Check MongoDB Server Status",
      "Start/Stop MongoDB Server",
      "Connect to MongoDB Instance"
    ],
    "cloud_options": [
      "MongoDB Atlas Setup",
      "Cluster Configuration",
      "Connection Strings"
    ]
  },
  "04_databases_collections": {
    "database_operations": [
      "Create a Database (use db_name)",
      "Show Databases (show dbs)",
      "Drop a Database (db.dropDatabase())",
      "Switch Between Databases"
    ],
    "collection_operations": [
      "Create a Collection (db.createCollection())",
      "Show Collections (show collections)",
      "Drop a Collection (db.collection.drop())",
      "Rename a Collection (db.collection.renameCollection())",
      "Collection Statistics (db.collection.stats())"
    ],
    "special_collections": [
      "Capped Collections",
      "Clustered Collections",
      "Time Series Collections",
      "Normal vs Capped Collection Differences"
    ]
  },
  "05_crud_operations": {
    "create_operations": [
      "Insert One Document (insertOne())",
      "Insert Many Documents (insertMany())",
      "Save Operation (save())",
      "Save vs Insert Differences"
    ],
    "read_operations": [
      "Find One Document (findOne())",
      "Find Multiple Documents (find())",
      "Projection (Include/Exclude Fields)",
      "Sorting Results (sort())",
      "Limiting Results (limit())",
      "Skipping Documents (skip())",
      "Cursor Concept",
      "Iterating Through Cursors"
    ],
    "update_operations": [
      "Update One Document (updateOne())",
      "Update Many Documents (updateMany())",
      "Replace One Document (replaceOne())",
      "Upsert Operation (Create if not exists)",
      "Update Multiple Documents in Single Query"
    ],
    "delete_operations": [
      "Delete One Document (deleteOne())",
      "Delete Many Documents (deleteMany())",
      "Delete by ObjectId",
      "Remove All Documents"
    ]
  },
  "06_query_operators": {
    "comparison_operators": [
      "$eq (Equals)",
      "$ne (Not Equals)",
      "$gt (Greater Than)",
      "$gte (Greater Than or Equal)",
      "$lt (Less Than)",
      "$lte (Less Than or Equal)",
      "$in (Matches any value in array)",
      "$nin (Matches none of values in array)"
    ],
    "logical_operators": [
      "$and (Logical AND)",
      "$or (Logical OR)",
      "$not (Logical NOT)",
      "$nor (Logical NOR)"
    ],
    "element_operators": [
      "$exists (Field existence check)",
      "$type (Field type check)"
    ],
    "evaluation_operators": [
      "$expr (Aggregation expression)",
      "$regex (Regular expression)",
      "$text (Text search)",
      "$where (JavaScript expression)"
    ],
    "practical_queries": [
      "Case-Insensitive Pattern Matching",
      "Names Starting With Specific Letter",
      "Names Ending With Specific Letter",
      "Range Queries",
      "Combining Multiple Conditions"
    ]
  },
  "07_update_operators": {
    "field_update_operators": [
      "$set (Set field value)",
      "$unset (Remove field)",
      "$inc (Increment value)",
      "$mul (Multiply value)",
      "$rename (Rename field)",
      "$min (Set if smaller)",
      "$max (Set if larger)",
      "$currentDate (Set to current date)"
    ],
    "array_update_operators": [
      "$push (Add to array)",
      "$addToSet (Add to array if not exists)",
      "$pop (Remove from array ends)",
      "$pull (Remove by condition)",
      "$pullAll (Remove multiple values)",
      "$push with $each"
    ],
    "bitwise_update_operators": [
      "$bit (Bitwise operations)"
    ],
    "practical_updates": [
      "Increment Salary by Percentage",
      "Reduce Marks Globally",
      "Add Field If Not Present",
      "Rename Existing Field",
      "Update Array Elements",
      "Conditional Updates"
    ]
  },
  "08_array_operations": {
    "array_query_operators": [
      "$elemMatch (Match array elements)",
      "$size (Array size)",
      "$all (Match all elements)",
      "$slice (Array projection)"
    ],
    "practical_array_queries": [
      "Find Documents With Array of Exact Size",
      "Find Documents With Array Values in Range",
      "Query Nested Array Elements",
      "Match Multiple Array Conditions"
    ]
  },
  "09_aggregation_framework": {
    "concepts": [
      "What is Aggregation",
      "Aggregation Pipeline Concept",
      "Pipeline Stages",
      "Find vs Aggregate Differences",
      "Aggregation Performance"
    ],
    "pipeline_stages": [
      "$match (Filter documents)",
      "$group (Group documents)",
      "$project (Reshape documents)",
      "$sort (Sort documents)",
      "$limit (Limit documents)",
      "$skip (Skip documents)",
      "$unwind (Deconstruct array)",
      "$lookup (Join collections)",
      "$facet (Multiple pipelines)",
      "$out (Write to collection)",
      "$merge (Merge results)",
      "$set (Add fields)",
      "$unset (Remove fields)",
      "$replaceRoot (Replace document)",
      "$addFields (Add new fields)"
    ],
    "accumulator_operators": [
      "$sum (Calculate sum)",
      "$avg (Calculate average)",
      "$min (Find minimum)",
      "$max (Find maximum)",
      "$first (First value in group)",
      "$last (Last value in group)",
      "$push (Create array)",
      "$addToSet (Create unique array)"
    ],
    "practical_aggregations": [
      "Average Salary per Department",
      "Highest and Lowest Salary",
      "Second Highest Value",
      "Department-wise Employee Count",
      "Join Collections Using $lookup",
      "Pipeline Inside $lookup",
      "Group by Multiple Fields",
      "Calculate Percentages",
      "Pagination with Aggregation"
    ]
  },
  "10_indexing": {
    "concepts": [
      "What is Indexing",
      "Why Indexing is Needed",
      "Index Data Structure (B-tree)",
      "Drawbacks of Indexing",
      "Covered Queries"
    ],
    "index_types": [
      "Single Field Index",
      "Compound Index",
      "Multikey Index (Array fields)",
      "TTL Index (Time-to-Live)",
      "Hashed Index",
      "Geospatial Index (2dsphere)",
      "Text Index (Full-text search)",
      "Clustered Index",
      "Partial Index",
      "Sparse Index",
      "Unique Index"
    ],
    "index_operations": [
      "Create Index",
      "List Indexes",
      "Drop Index",
      "Index Properties (Unique, Sparse)",
      "Index Rebuilding"
    ],
    "performance": [
      "Explain Plan (explain())",
      "Query Execution Statistics",
      "Index Selection",
      "Index Intersection",
      "Index Limitations"
    ]
  },
  "11_data_modeling": {
    "concepts": [
      "Data Modeling Concepts",
      "Embedded Documents Pattern",
      "Referenced Documents Pattern",
      "Embedded vs Referenced Trade-offs",
      "Normalization vs Denormalization",
      "Dynamic Schema Advantages"
    ],
    "patterns": [
      "One-to-One Relationships",
      "One-to-Many Relationships",
      "Many-to-Many Relationships",
      "Tree Patterns",
      "Bucketing Pattern",
      "Attribute Pattern",
      "Extended Reference Pattern"
    ],
    "validation": [
      "JSON Schema Validation",
      "Schema Validation Rules",
      "Validation Levels",
      "Validation Actions"
    ],
    "anti_patterns": [
      "Massive Arrays",
      "Massive Documents",
      "Unnecessary Indexes",
      "Poor Shard Key Selection"
    ]
  },
  "12_transactions_concurrency": {
    "transactions": [
      "What is a Transaction",
      "ACID Transactions in MongoDB",
      "Multi-document Transactions",
      "Transaction Syntax",
      "Transaction Limitations"
    ],
    "concurrency_control": [
      "Read Concern Levels",
      "Write Concern Levels",
      "Journaling",
      "Isolation Levels",
      "Concurrency Control Mechanisms",
      "Locks in MongoDB"
    ],
    "change_streams": [
      "What are Change Streams",
      "Change Streams Use Cases",
      "Change Streams Syntax",
      "Real-time Data Processing"
    ]
  },
  "13_replication": {
    "concepts": [
      "What is Replication",
      "Replica Set Architecture",
      "High Availability",
      "Data Redundancy"
    ],
    "replica_set_components": [
      "Primary Node",
      "Secondary Node",
      "Arbiter Node",
      "Voting Nodes"
    ],
    "operations": [
      "Replica Set Setup",
      "Election Process",
      "Failover Mechanism",
      "Oplog (Operations Log)",
      "Minimum Nodes for Replication",
      "Read Preferences",
      "Write Concerns in Replication"
    ],
    "maintenance": [
      "Adding/Removing Nodes",
      "Replica Set Reconfiguration",
      "Data Sync Process",
      "Rollback Prevention"
    ]
  },
  "14_sharding": {
    "concepts": [
      "What is Sharding",
      "Why Sharding is Used",
      "Horizontal Scalability",
      "Sharding Architecture"
    ],
    "components": [
      "Shard (Data node)",
      "Config Server",
      "Mongos (Query Router)",
      "Shard Key"
    ],
    "shard_key_strategies": [
      "Hashed Shard Key",
      "Ranged Shard Key",
      "Compound Shard Key",
      "Shard Key Selection Criteria"
    ],
    "operations": [
      "Sharded Cluster Setup",
      "Adding/Removing Shards",
      "Chunk Management",
      "Balancing Process",
      "What Happens if Shard Goes Down"
    ],
    "comparisons": [
      "Sharding vs Replication",
      "Sharding vs GridFS"
    ]
  },
  "15_backup_recovery": {
    "backup_tools": [
      "Mongodump (Logical backup)",
      "Mongorestore (Restore backup)",
      "Mongoimport (Import data)",
      "Mongoexport (Export data)",
      "File System Snapshots"
    ],
    "strategies": [
      "Backup Strategies",
      "Point-in-Time Recovery",
      "Disaster Recovery",
      "Backup Scheduling"
    ],
    "monitoring_tools": [
      "Mongotop (Database activity)",
      "Mongostat (Database statistics)",
      "Database Profiler",
      "Performance Monitoring"
    ]
  },
  "16_special_features": {
    "storage": [
      "GridFS (Large file storage)",
      "GridFS Architecture",
      "GridFS Use Cases"
    ],
    "search_capabilities": [
      "Full-Text Search",
      "Geospatial Queries",
      "Geospatial Index Types",
      "Location-based Queries"
    ],
    "advanced_features": [
      "Views (Read-only collections)",
      "Materialized Views",
      "AllowDiskUse Option",
      "Triggers (Atlas Triggers)",
      "MongoDB Utilities Overview"
    ]
  },
  "17_mongoose_odm": {
    "concepts": [
      "ODM vs ORM",
      "What is Mongoose",
      "Mongoose Features"
    ],
    "schema_model": [
      "Schema Definition",
      "Schema Types",
      "Model Creation",
      "Schema Validation",
      "Schema Middleware"
    ],
    "operations": [
      "CRUD with Mongoose",
      "Population (Joins)",
      "Virtual Properties",
      "Query Building",
      "Middleware (Hooks)",
      "Instance Methods",
      "Static Methods"
    ],
    "advanced": [
      "Discriminators",
      "Plugins",
      "Connection Pooling",
      "Error Handling"
    ]
  },
  "18_performance_optimization": {
    "query_optimization": [
      "Query Performance Analysis",
      "Explain Plan Interpretation",
      "Index Optimization",
      "Query Pattern Optimization"
    ],
    "connection_management": [
      "Connection Pooling",
      "Connection String Options",
      "Timeout Settings",
      "Retry Logic"
    ],
    "monitoring": [
      "Database Profiler",
      "Slow Query Logging",
      "Performance Monitoring",
      "Health Checks"
    ]
  },
  "19_practical_workouts": {
    "basic_operations": [
      "Create Database and Collections",
      "Insert Sample Data",
      "Basic CRUD Operations",
      "Query with Conditions"
    ],
    "intermediate_queries": [
      "Aggregation Pipeline Examples",
      "Join Operations",
      "Array Operations",
      "Update Operations with Conditions"
    ],
    "advanced_scenarios": [
      "Pagination Implementation",
      "Data Migration Scripts",
      "Bulk Operations",
      "Transaction Implementation"
    ],
    "real_world_problems": [
      "E-commerce Product Catalog",
      "User Management System",
      "Logging and Analytics",
      "Social Media Features"
    ]
  },
  "20_best_practices": {
    "development": [
      "Naming Conventions",
      "Schema Design Best Practices",
      "Indexing Strategy",
      "Connection Management"
    ],
    "deployment": [
      "Security Configuration",
      "Backup Strategy",
      "Monitoring Setup",
      "Performance Tuning"
    ],
    "security": [
      "Authentication Setup",
      "Authorization (RBAC)",
      "Network Security",
      "Data Encryption"
    ]
  }
};

const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('sharding') || 
      lowerName.includes('replication') || 
      lowerName.includes('aggregat') || 
      lowerName.includes('transaction') ||
      lowerName.includes('performanc') ||
      lowerName.includes('optimiz')) {
    return 'advanced';
  }
  
  if (lowerName.includes('schema') || 
      lowerName.includes('crud') || 
      lowerName.includes('insert') || 
      lowerName.includes('find') ||
      lowerName.includes('index')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (MongoDB)
    let topic = await Topic.findOne({ slug: 'mongodb' });
    if (!topic) {
      console.log('ℹ️ MongoDB topic not found, creating...');
      topic = await Topic.create({
        name: 'MongoDB',
        slug: 'mongodb',
        description: 'Master the world\'s most popular NoSQL database',
        icon: '🍃',
        order: 2,
        isNew: false
      });
    }
    console.log(`📌 Using Topic: ${topic.name}`);

    // 2. Clear existing structure for this topic only
    console.log('🧹 Clearing existing categories and sections...');
    const categories = await Category.find({ topicId: topic._id });
    const categoryIds = categories.map(c => c._id);
    await Section.deleteMany({ categoryId: { $in: categoryIds } });
    await Category.deleteMany({ topicId: topic._id });

    // 3. Process new structure
    console.log('🏗️ Building new hierarchy...');
    
    let categoryOrder = 1;
    let totalSections = 0;

    for (const [catKey, sectionsObj] of Object.entries(mongodbCurriculum)) {
      // Format Category Name: "01_database_fundamentals" -> "Database Fundamentals"
      let catName = catKey.replace(/^\d+_/, '').split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const category = await Category.create({
        name: catName,
        slug: slugify(catName, { lower: true, strict: true }),
        topicId: topic._id,
        order: categoryOrder++,
        description: `Deep dive into ${catName}`
      });

      console.log(`  📂 Created Category: ${category.name}`);

      let sectionOrder = 1;
      for (const [secKey, keyPoints] of Object.entries(sectionsObj)) {
        // Format Section Title
        let secTitle = secKey.split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Determine difficulty
        const difficulty = categorizeDifficulty(secTitle, catName);

        // Generate a description from key points
        const description = `Learn about ${keyPoints.slice(0, 3).join(', ')}...`;

        await Section.create({
          title: secTitle,
          slug: slugify(`${catName}-${secTitle}`, { lower: true, strict: true }),
          categoryId: category._id,
          topicId: topic._id,
          order: sectionOrder++,
          description: description,
          content: `## ${secTitle}\n\n${description}\n\n### Key Concepts:\n${keyPoints.map(kp => `- ${kp}`).join('\n')}`,
          difficulty: difficulty,
          estimatedTime: 15 + (keyPoints.length * 2), // Rough estimate
          isNew: false,
          isPro: false
        });
        
        totalSections++;
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

// seedHierarchy();

export { mongodbCurriculum };
