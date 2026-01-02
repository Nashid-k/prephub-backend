import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import slugify from 'slugify';

dotenv.config();

const mongodbCurriculum = {

  "01_database_and_distributed_systems_foundations": {
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

  "02_mongodb_core_concepts_and_architecture": {
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

  "03_installation_and_environment_setup": {
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

  "04_database_and_collection_management": {
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

  "05_crud_and_querying_fundamentals": {
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

  "06_query_and_update_operators": {
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
    ]
  },

  "07_arrays_and_aggregation_pipeline": {
    "array_query_operators": [
      "$elemMatch (Match array elements)",
      "$size (Array size)",
      "$all (Match all elements)",
      "$slice (Array projection)"
    ],
    "aggregation_concepts": [
      "What is Aggregation",
      "Aggregation Pipeline Concept",
      "Pipeline Stages",
      "Find vs Aggregate Differences",
      "Aggregation Performance"
    ],
    "pipeline_stages": [
      "$match",
      "$group",
      "$project",
      "$sort",
      "$limit",
      "$skip",
      "$unwind",
      "$lookup",
      "$facet",
      "$out",
      "$merge",
      "$set",
      "$unset",
      "$replaceRoot",
      "$addFields"
    ],
    "accumulator_operators": [
      "$sum",
      "$avg",
      "$min",
      "$max",
      "$first",
      "$last",
      "$push",
      "$addToSet"
    ]
  },

  "08_indexing_and_query_performance": {
    "indexing_concepts": [
      "What is Indexing",
      "Why Indexing is Needed",
      "Index Data Structure (B-tree)",
      "Drawbacks of Indexing",
      "Covered Queries"
    ],
    "index_types": [
      "Single Field Index",
      "Compound Index",
      "Multikey Index",
      "TTL Index",
      "Hashed Index",
      "Geospatial Index",
      "Text Index",
      "Clustered Index",
      "Partial Index",
      "Sparse Index",
      "Unique Index"
    ],
    "performance_analysis": [
      "Explain Plan (explain())",
      "Query Execution Statistics",
      "Index Selection",
      "Index Intersection",
      "Index Limitations"
    ]
  },

  "09_data_modeling_and_schema_design": {
    "modeling_concepts": [
      "Data Modeling Concepts",
      "Embedded Documents Pattern",
      "Referenced Documents Pattern",
      "Embedded vs Referenced Trade-offs",
      "Normalization vs Denormalization",
      "Dynamic Schema Advantages"
    ],
    "relationship_patterns": [
      "One-to-One Relationships",
      "One-to-Many Relationships",
      "Many-to-Many Relationships",
      "Tree Patterns",
      "Bucketing Pattern",
      "Attribute Pattern",
      "Extended Reference Pattern"
    ],
    "schema_validation": [
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

  "10_transactions_replication_and_sharding": {
    "transactions": [
      "What is a Transaction",
      "ACID Transactions in MongoDB",
      "Multi-document Transactions",
      "Transaction Syntax",
      "Transaction Limitations"
    ],
    "replication": [
      "Replica Set Architecture",
      "Primary, Secondary, Arbiter Nodes",
      "Election Process",
      "Failover Mechanism",
      "Oplog (Operations Log)",
      "Read Preferences",
      "Write Concerns"
    ],
    "sharding": [
      "Sharded Cluster Architecture",
      "Shard Key Selection",
      "Chunk Management",
      "Balancing Process",
      "Sharding vs Replication"
    ]
  },

  "11_backup_monitoring_and_special_features": {
    "backup_recovery": [
      "Mongodump",
      "Mongorestore",
      "Mongoimport",
      "Mongoexport",
      "Point-in-Time Recovery"
    ],
    "monitoring": [
      "Mongotop",
      "Mongostat",
      "Database Profiler",
      "Slow Query Logging"
    ],
    "special_features": [
      "GridFS",
      "Views",
      "Materialized Views",
      "Full-Text Search",
      "Geospatial Queries",
      "Change Streams",
      "Atlas Triggers"
    ]
  },

  "12_application_integration_and_production_practices": {
    "mongoose_odm": [
      "Schema Definition",
      "Model Creation",
      "CRUD with Mongoose",
      "Population",
      "Middleware (Hooks)",
      "Discriminators",
      "Plugins",
      "Connection Pooling"
    ],
    "performance_optimization": [
      "Query Pattern Optimization",
      "Index Optimization",
      "Connection Management",
      "Retry Logic"
    ],
    "security_and_best_practices": [
      "Authentication Setup",
      "Authorization (RBAC)",
      "Data Encryption",
      "Backup Strategy",
      "Monitoring Setup"
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
