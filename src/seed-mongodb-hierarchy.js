import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { geminiModel } from './config/ai-clients.js';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';

dotenv.config();

/**
 * Difficulty categorization with heuristics
 */
const categorizeDifficulty = (topicName, sectionTitle, subtopics) => {
  const advancedKeywords = ['shard', 'replica', 'cluster', 'architect', 'distributed', 'scale', 'performance'];
  const beginnerKeywords = ['what is', 'basic', 'intro', 'overview', 'simple'];
  
  const combined = `${sectionTitle} ${subtopics.join(' ')}`.toLowerCase();
  
  if (advancedKeywords.some(kw => combined.includes(kw))) return 'advanced';
  if (beginnerKeywords.some(kw => combined.includes(kw))) return 'beginner';
  return 'intermediate';
};

/**
 * MongoDB curriculum - 19 main categories
 */
const mongodbCurriculum = {
  "database_fundamentals": {
    name: "Database Fundamentals",
    subcategories: {
      "overview": ["What is a Database", "Features of a Database"],
      "database_types": ["SQL vs NoSQL", "Relational vs Non-Relational Databases", "Types of NoSQL Databases"],
      "keys_and_constraints": ["Primary Key vs Unique Key", "Foreign Key (conceptual, not enforced)"],
      "consistency_models": ["ACID Properties", "BASE Properties", "CAP Theorem", "Partition Tolerance"],
      "scaling": ["Vertical Scaling", "Horizontal Scaling"]
    }
  },
  "mongodb_basics": {
    name: "MongoDB Basics",
    subcategories: {
      "introduction": ["What is MongoDB", "Why MongoDB is Schema-less"],
      "architecture": ["MongoDB Architecture (High Level)", "MongoDB Default Port Number", "MongoDB Atlas",
        "WiredTiger Storage Engine", "Namespace in MongoDB"],
      "data_representation": ["Data Types in MongoDB", "Components of _id", "BSON vs JSON", "Why BSON is Used",
        "Benefits of BSON", "BSON Types"]
    }
  },
  "mongodb_setup_and_server": {
    name: "MongoDB Setup And Server",
    subcategories: {
      "practical": ["Check MongoDB Server Status", "Start MongoDB Server", "Connect MongoDB Shell",
        "MongoDB Compass Overview"]
    }
  },
  "databases_and_collections": {
    name: "Databases And Collections",
    subcategories: {
      "practical": ["Create a Database", "Show Databases", "Drop a Database", "Create a Collection",
        "Show Collections", "Drop a Collection", "Rename a Collection", "Clustered Collection",
        "Clustered Index"]
    }
  },
  "crud_operations": {
    name: "CRUD Operations",
    subcategories: {
      "insert": ["Insert One Document", "Insert Many Documents", "Save vs Insert"],
      "read": ["Find One Document", "Find Multiple Documents", "Projection (Include / Exclude)",
        "Sorting", "Limiting", "Skipping", "Cursor"],
      "update": ["Update One Document", "Update Many Documents", "Replace One", "Upsert",
        "Update Multiple Documents in a Single Query"],
      "delete": ["Delete One Document", "Delete Many Documents", "Delete by ObjectId"]
    }
  },
  "query_operators": {
    name: "Query Operators",
    subcategories: {
      "comparison": ["$eq", "$ne", "$gt", "$gte", "$lt", "$lte", "$in", "$nin"],
      "logical": ["$and", "$or", "$not", "$nor"],
      "element": ["$exists", "$type"],
      "evaluation": ["$expr"],
      "regex_queries": ["Names Starting With a Letter", "Names Ending With a Letter",
        "Case-Insensitive Pattern Matching"]
    }
  },
  "update_operators": {
    name: "Update Operators",
    subcategories: {
      "operators": ["$set", "$unset", "$inc", "$rename", "$push", "$addToSet", "$pop", "$pull", "$pullAll"],
      "practical": ["Increment Salary by Percentage", "Reduce Marks Globally", "Add Field If Not Present",
        "Rename a Field"]
    }
  },
  "array_queries_and_operators": {
    name: "Array Queries And Operators",
    subcategories: {
      "operators": ["$elemMatch", "$size", "$all", "$slice"],
      "practical": ["Orders With Exact Number of Items", "Documents With Array Values in a Range"]
    }
  },
  "aggregation_framework": {
    name: "Aggregation Framework",
    subcategories: {
      "concepts": ["What is Aggregation", "Aggregation Pipeline", "Find vs Aggregate"],
      "pipeline_stages": ["$match", "$group", "$project", "$sort", "$limit", "$skip", "$unwind", "$lookup",
        "$facet", "$out", "$merge", "$fill", "$setUnion"],
      "accumulators": ["$sum", "$avg", "$min", "$max"],
      "practical": ["Average Salary per Department", "Highest and Lowest Salary", "Second Highest Value",
        "Department-wise Employee Count", "Join Collections Using $lookup", "Pipeline Inside $lookup"]
    }
  },
  "indexing": {
    name: "Indexing",
    subcategories: {
      "concepts": ["What is Indexing", "Why Indexing is Needed", "Drawbacks of Indexing"],
      "index_types": ["Single Field Index", "Compound Index", "TTL Index", "Hashed Index", "Geospatial Index",
        "Clustered Index", "Covered Query", "Partial Index"],
      "practical": ["Create Index", "List Indexes", "Drop Index", "Create TTL Index", "Covered Query Example"]
    }
  },
  "capped_collections": {
    name: "Capped Collections",
    subcategories: {
      "concepts": ["What is a Capped Collection", "Applications of Capped Collections",
        "Normal vs Capped Collection"],
      "practical": ["Create Capped Collection", "Check if Collection is Capped"]
    }
  },
  "data_modeling": {
    name: "Data Modeling",
    subcategories: {
      "concepts": ["Data Modeling Concepts", "Embedded Documents", "Referenced Documents",
        "Embedded vs Referenced", "Normalization vs Denormalization", "Data Modeling Anti-Patterns",
        "Dynamic Schema", "JSON Schema Validation"]
    }
  },
  "transactions_and_concurrency": {
    name: "Transactions And Concurrency",
    subcategories: {
      "concepts": ["What is a Transaction", "Transactions in MongoDB", "Read Concern", "Write Concern",
        "Isolation", "Journaling", "How MongoDB Handles Concurrency", "Change Streams"]
    }
  },
  "replication_and_sharding": {
    name: "Replication And Sharding",
    subcategories: {
      "replication": ["Replication", "Replica Set", "Primary", "Secondary", "Arbiter", "Election Process",
        "Oplog", "Minimum Nodes for Replication", "Pros and Cons of Replication"],
      "sharding": ["What is Sharding", "Why Sharding is Used", "Shard Key", "Hashed Shard Key", "Mongos",
        "What Happens if a Shard Goes Down", "Sharding vs Replication", "Sharding vs GridFS"]
    }
  },
  "performance_and_monitoring": {
    name: "Performance And Monitoring",
    subcategories: {
      "concepts": ["Explain Plan", "Query Performance Analysis", "Database Profiler", "Connection Pooling",
        "Locks and Concurrency Control", "Improving Query Performance"]
    }
  },
  "backup_restore_and_utilities": {
    name: "Backup Restore And Utilities",
    subcategories: {
      "tools": ["Mongodump", "Mongorestore", "Mongoimport", "Mongoexport", "Mongotop",
        "MongoDB Backup Utilities", "LVM Snapshot (Concept)"]
    }
  },
  "special_features": {
    name: "Special Features",
    subcategories: {
      "features": ["Views", "Materialized Views", "GridFS", "Full-Text Search", "Geospatial Queries",
        "Bitwise Query Operators", "AllowDiskUse", "Triggers", "MongoDB Utilities Overview"]
    }
  },
  "mongoose_and_odm": {
    name: "Mongoose And ODM",
    subcategories: {
      "concepts": ["ODM vs ORM", "What is Mongoose", "Schema vs Model", "Validation", "Population",
        "Middleware (Hooks)"]
    }
  },
  "common_practical_workouts": {
    name: "Common Practical Workouts",
    subcategories: {
      "workouts": ["Increase Salary by Percentage", "Deduct Marks Globally", "Find Department-wise Stats",
        "Pattern Matching Queries", "Pagination", "Aggregation With Multiple Stages", "Join Collections",
        "Update Fields Conditionally"]
    }
  }
};

/**
 * Smart seed with 3-level hierarchy: Topic → Category → Section
 */
const seedMongoDBHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find MongoDB topic
    let mongoTopic = await Topic.findOne({ slug: 'mongodb' });
    if (!mongoTopic) {
      console.log('❌ MongoDB topic not found. Run basic seed first.');
      process.exit(1);
    }

    // Clear existing data
    await Category.deleteMany({ topicId: mongoTopic._id });
    await Section.deleteMany({ topicId: mongoTopic._id });
    console.log('🗑️  Cleared existing MongoDB categories and sections\n');

    let categoryOrder = 1;
    let sectionOrder = 1;

    console.log('🤖 Creating 3-level hierarchy: Topic → Category → Section\n');

    for (const [categoryKey, categoryInfo] of Object.entries(mongodbCurriculum)) {
      // Create CATEGORY (19 total)
      const category = await Category.create({
        topicId: mongoTopic._id,
        name: categoryInfo.name,
        slug: categoryKey,
        order: categoryOrder++,
        description: `Learn ${categoryInfo.name}`
      });

      console.log(`📚 Category ${categoryOrder - 1}: ${categoryInfo.name}`);

      // Create SECTIONS (subcategories) for this category
      for (const [subKey, subtopics] of Object.entries(categoryInfo.subcategories)) {
        const sectionTitle = subKey
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const difficulty = categorizeDifficulty('MongoDB', sectionTitle, subtopics);
        
        await Section.create({
          topicId: mongoTopic._id,
          categoryId: category._id,
          title: sectionTitle,
          slug: `${categoryKey}-${subKey}`,
          order: sectionOrder++,
          description: `Learn about ${subtopics.slice(0, 3).join(', ')}${subtopics.length > 3 ? ' and more' : ''}`,
          difficulty,
          keyPoints: subtopics
        });

        console.log(`      ✓ ${sectionTitle} (${difficulty})`);
      }
      console.log('');
    }

    const totalCategories = await Category.countDocuments({ topicId: mongoTopic._id });
    const totalSections = await Section.countDocuments({ topicId: mongoTopic._id });

    console.log('\n🎉 MongoDB 3-level hierarchy created successfully!');
    console.log(`📊 Summary:`);
    console.log(`   Categories: ${totalCategories}`);
    console.log(`   Sections (Subcategories): ${totalSections}`);
    console.log(`\n✨ Flow: MongoDB → 19 Categories → 41 Sections\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedMongoDBHierarchy();
