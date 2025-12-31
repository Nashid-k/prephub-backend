import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { geminiModel, groqClient } from './config/ai-clients.js';
import Topic from '../../models/Topic.js';
import Section from '../../models/Section.js';

dotenv.config();

/**
 * AI-powered difficulty categorization
 */
const categorizeDifficulty = async (topicName, sectionTitle, subtopics) => {
  const prompt = `
You are an expert MongoDB instructor. Categorize the difficulty level of this topic.

Topic: ${topicName}
Section: ${sectionTitle}
Subtopics: ${subtopics.join(', ')}

Rules:
- "beginner": Basic concepts, simple queries, foundational knowledge
- "intermediate": Complex queries, aggregations, performance tuning
- "advanced": Sharding, replication, distributed systems, architecture

Return ONLY ONE WORD: beginner, intermediate, or advanced
`;

  try {
    const result = await geminiModel.generateContent(prompt);
    const difficulty = result.response.text().trim().toLowerCase();
    
    if (['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
      return difficulty;
    }
    return 'intermediate'; // default
  } catch (error) {
    console.log('⚠️  AI categorization failed, using heuristics');
    
    // Fallback heuristics
    const advancedKeywords = ['shard', 'replica', 'cluster', 'architect', 'distributed', 'scale', 'performance'];
    const beginnerKeywords = ['what is', 'basic', 'intro', 'overview', 'simple'];
    
    const combined = `${sectionTitle} ${subtopics.join(' ')}`.toLowerCase();
    
    if (advancedKeywords.some(kw => combined.includes(kw))) return 'advanced';
    if (beginnerKeywords.some(kw => combined.includes(kw))) return 'beginner';
    return 'intermediate';
  }
};

/**
 * COMPLETE MongoDB curriculum data
 */
const mongodbCurriculum = {
  "database_fundamentals": {
    "overview": [
      "What is a Database",
      "Features of a Database"
    ],
    "database_types": [
      "SQL vs NoSQL",
      "Relational vs Non-Relational Databases",
      "Types of NoSQL Databases"
    ],
    "keys_and_constraints": [
      "Primary Key vs Unique Key",
      "Foreign Key (conceptual, not enforced)"
    ],
    "consistency_models": [
      "ACID Properties",
      "BASE Properties",
      "CAP Theorem",
      "Partition Tolerance"
    ],
    "scaling": [
      "Vertical Scaling",
      "Horizontal Scaling"
    ]
  },
  "mongodb_basics": {
    "introduction": [
      "What is MongoDB",
      "Why MongoDB is Schema-less"
    ],
    "architecture": [
      "MongoDB Architecture (High Level)",
      "MongoDB Default Port Number",
      "MongoDB Atlas",
      "WiredTiger Storage Engine",
      "Namespace in MongoDB"
    ],
    "data_representation": [
      "Data Types in MongoDB",
      "Components of _id",
      "BSON vs JSON",
      "Why BSON is Used",
      "Benefits of BSON",
      "BSON Types"
    ]
  },
  "mongodb_setup_and_server": {
    "practical": [
      "Check MongoDB Server Status",
      "Start MongoDB Server",
      "Connect MongoDB Shell",
      "MongoDB Compass Overview"
    ]
  },
  "databases_and_collections": {
    "practical": [
      "Create a Database",
      "Show Databases",
      "Drop a Database",
      "Create a Collection",
      "Show Collections",
      "Drop a Collection",
      "Rename a Collection",
      "Clustered Collection",
      "Clustered Index"
    ]
  },
  "crud_operations": {
    "insert": [
      "Insert One Document",
      "Insert Many Documents",
      "Save vs Insert"
    ],
    "read": [
      "Find One Document",
      "Find Multiple Documents",
      "Projection (Include / Exclude)",
      "Sorting",
      "Limiting",
      "Skipping",
      "Cursor"
    ],
    "update": [
      "Update One Document",
      "Update Many Documents",
      "Replace One",
      "Upsert",
      "Update Multiple Documents in a Single Query"
    ],
    "delete": [
      "Delete One Document",
      "Delete Many Documents",
      "Delete by ObjectId"
    ]
  },
  "query_operators": {
    "comparison": [
      "$eq",
      "$ne",
      "$gt",
      "$gte",
      "$lt",
      "$lte",
      "$in",
      "$nin"
    ],
    "logical": [
      "$and",
      "$or",
      "$not",
      "$nor"
    ],
    "element": [
      "$exists",
      "$type"
    ],
    "evaluation": [
      "$expr"
    ],
    "regex_queries": [
      "Names Starting With a Letter",
      "Names Ending With a Letter",
      "Case-Insensitive Pattern Matching"
    ]
  },
  "update_operators": {
    "operators": [
      "$set",
      "$unset",
      "$inc",
      "$rename",
      "$push",
      "$addToSet",
      "$pop",
      "$pull",
      "$pullAll"
    ],
    "practical": [
      "Increment Salary by Percentage",
      "Reduce Marks Globally",
      "Add Field If Not Present",
      "Rename a Field"
    ]
  },
  "array_queries_and_operators": {
    "operators": [
      "$elemMatch",
      "$size",
      "$all",
      "$slice"
    ],
    "practical": [
      "Orders With Exact Number of Items",
      "Documents With Array Values in a Range"
    ]
  },
  "aggregation_framework": {
    "concepts": [
      "What is Aggregation",
      "Aggregation Pipeline",
      "Find vs Aggregate"
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
      "$fill",
      "$setUnion"
    ],
    "accumulators": [
      "$sum",
      "$avg",
      "$min",
      "$max"
    ],
    "practical": [
      "Average Salary per Department",
      "Highest and Lowest Salary",
      "Second Highest Value",
      "Department-wise Employee Count",
      "Join Collections Using $lookup",
      "Pipeline Inside $lookup"
    ]
  },
  "indexing": {
    "concepts": [
      "What is Indexing",
      "Why Indexing is Needed",
      "Drawbacks of Indexing"
    ],
    "index_types": [
      "Single Field Index",
      "Compound Index",
      "TTL Index",
      "Hashed Index",
      "Geospatial Index",
      "Clustered Index",
      "Covered Query",
      "Partial Index"
    ],
    "practical": [
      "Create Index",
      "List Indexes",
      "Drop Index",
      "Create TTL Index",
      "Covered Query Example"
    ]
  },
  "capped_collections": {
    "concepts": [
      "What is a Capped Collection",
      "Applications of Capped Collections",
      "Normal vs Capped Collection"
    ],
    "practical": [
      "Create Capped Collection",
      "Check if Collection is Capped"
    ]
  },
  "data_modeling": {
    "concepts": [
      "Data Modeling Concepts",
      "Embedded Documents",
      "Referenced Documents",
      "Embedded vs Referenced",
      "Normalization vs Denormalization",
      "Data Modeling Anti-Patterns",
      "Dynamic Schema",
      "JSON Schema Validation"
    ]
  },
  "transactions_and_concurrency": {
    "concepts": [
      "What is a Transaction",
      "Transactions in MongoDB",
      "Read Concern",
      "Write Concern",
      "Isolation",
      "Journaling",
      "How MongoDB Handles Concurrency",
      "Change Streams"
    ]
  },
  "replication_and_sharding": {
    "replication": [
      "Replication",
      "Replica Set",
      "Primary",
      "Secondary",
      "Arbiter",
      "Election Process",
      "Oplog",
      "Minimum Nodes for Replication",
      "Pros and Cons of Replication"
    ],
    "sharding": [
      "What is Sharding",
      "Why Sharding is Used",
      "Shard Key",
      "Hashed Shard Key",
      "Mongos",
      "What Happens if a Shard Goes Down",
      "Sharding vs Replication",
      "Sharding vs GridFS"
    ]
  },
  "performance_and_monitoring": {
    "concepts": [
      "Explain Plan",
      "Query Performance Analysis",
      "Database Profiler",
      "Connection Pooling",
      "Locks and Concurrency Control",
      "Improving Query Performance"
    ]
  },
  "backup_restore_and_utilities": {
    "tools": [
      "Mongodump",
      "Mongorestore",
      "Mongoimport",
      "Mongoexport",
      "Mongotop",
      "MongoDB Backup Utilities",
      "LVM Snapshot (Concept)"
    ]
  },
  "special_features": {
    "features": [
      "Views",
      "Materialized Views",
      "GridFS",
      "Full-Text Search",
      "Geospatial Queries",
      "Bitwise Query Operators",
      "AllowDiskUse",
      "Triggers",
      "MongoDB Utilities Overview"
    ]
  },
  "mongoose_and_odm": {
    "concepts": [
      "ODM vs ORM",
      "What is Mongoose",
      "Schema vs Model",
      "Validation",
      "Population",
      "Middleware (Hooks)"
    ]
  },
  "common_practical_workouts": {
    "workouts": [
      "Increase Salary by Percentage",
      "Deduct Marks Globally",
      "Find Department-wise Stats",
      "Pattern Matching Queries",
      "Pagination",
      "Aggregation With Multiple Stages",
      "Join Collections",
      "Update Fields Conditionally"
    ]
  }
};

/**
 * Smart section creator - One section per SUBCATEGORY
 */
const seedMongoDBWithAI = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find MongoDB topic
    let mongoTopic = await Topic.findOne({ slug: 'mongodb' });
    
    if (!mongoTopic) {
      console.log('❌ MongoDB topic not found. Run basic seed first.');
      process.exit(1);
    }

    // Clear existing MongoDB sections
    await Section.deleteMany({ topicId: mongoTopic._id });
    console.log('🗑️  Cleared existing MongoDB sections\n');

    let sectionOrder = 1;
    const sectionsToInsert = [];

    console.log('🤖 Creating individual sections for each subcategory...\n');

    // Process each MAIN category
    for (const [categoryKey, categoryData] of Object.entries(mongodbCurriculum)) {
      
      const categoryName = categoryKey
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      console.log(`📚 Category: ${categoryName}`);

      // Create a section for EACH subcategory
      for (const [subCategoryKey, subtopics] of Object.entries(categoryData)) {
        
        // Create human-readable title
        const title = `${categoryName} - ${subCategoryKey
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}`;
        
        const shortTitle = subCategoryKey
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Get AI-powered difficulty categorization
        console.log(`  📊 Analyzing: "${shortTitle}"`);
        const difficulty = await categorizeDifficulty(
          'MongoDB',
          shortTitle,
          subtopics
        );
        
        console.log(`     ✓ Difficulty: ${difficulty}`);

        // Create description from first few topics
        const description = `Learn about ${subtopics.slice(0, 3).join(', ')}${subtopics.length > 3 ? ' and more' : ''}`;

        // Create ONE section per SUBCATEGORY
        sectionsToInsert.push({
          topicId: mongoTopic._id,
          title: shortTitle, // Just the subcategory name
          slug: `${categoryKey}-${subCategoryKey}`,
          order: sectionOrder++,
          description: description,
          difficulty: difficulty,
          keyPoints: subtopics, // Only THIS subcategory's topics
          // Store parent category for grouping
          content: `Category: ${categoryName}` // We'll use this to group sections
        });
      }
      console.log('');
    }

    // Insert all sections
    await Section.insertMany(sectionsToInsert);
    
    console.log('\n🎉 MongoDB curriculum seeded with individual subcategory sections!');
    console.log(`📊 Summary:`);
    console.log(`   Total Sections (Subcategories): ${sectionsToInsert.length}`);
    console.log(`   Beginner: ${sectionsToInsert.filter(s => s.difficulty === 'beginner').length}`);
    console.log(`   Intermediate: ${sectionsToInsert.filter(s => s.difficulty === 'intermediate').length}`);
    console.log(`   Advanced: ${sectionsToInsert.filter(s => s.difficulty === 'advanced').length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedMongoDBWithAI();
