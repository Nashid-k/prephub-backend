
const postgresqlCurriculum = {
  "01_foundations_and_setup": {
    "database_concepts": [
      { "topic": "What is PostgreSQL and its history", "practice": "Install PostgreSQL and verify installation" },
      { "topic": "PostgreSQL vs MySQL vs other RDBMS", "practice": "Compare features for different use cases" },
      { "topic": "When to choose PostgreSQL over NoSQL", "practice": "Analyze project requirements" },
      { "topic": "PostgreSQL architecture overview", "practice": "Explore PostgreSQL directory structure" }
    ],
    "installation_configuration": [
      { "topic": "PostgreSQL installation on different OS", "practice": "Install PostgreSQL on your system" },
      { "topic": "PostgreSQL configuration files", "practice": "Modify postgresql.conf for optimization" },
      { "topic": "pgAdmin installation and setup", "practice": "Connect to database using pgAdmin" },
      { "topic": "Command-line tools (psql)", "practice": "Connect and run queries using psql" },
      { "topic": "Database cluster initialization", "practice": "Initialize and start PostgreSQL cluster" }
    ]
  },
  "02_sql_fundamentals": {
    "data_definition": [
      { "topic": "CREATE DATABASE and DROP DATABASE", "practice": "Create and manage multiple databases" },
      { "topic": "CREATE TABLE with different constraints", "practice": "Design tables with proper constraints" },
      { "topic": "PostgreSQL data types overview", "practice": "Choose appropriate data types for columns" },
      { "topic": "ALTER TABLE operations", "practice": "Modify existing table structure" },
      { "topic": "DROP, TRUNCATE, and DELETE differences", "practice": "Practice each operation on test data" }
    ],
    "basic_operations": [
      { "topic": "INSERT with different syntax options", "practice": "Insert single and multiple rows" },
      { "topic": "SELECT with WHERE clause filtering", "practice": "Write queries with various conditions" },
      { "topic": "UPDATE with conditional logic", "practice": "Update specific rows based on conditions" },
      { "topic": "DELETE with JOIN operations", "practice": "Delete data from related tables" },
      { "topic": "Basic SELECT clause variations", "practice": "Use DISTINCT, LIMIT, OFFSET" }
    ]
  },
  "03_data_modeling_and_design": {
    "normalization": [
      { "topic": "First Normal Form (1NF) implementation", "practice": "Design tables to satisfy 1NF" },
      { "topic": "Second Normal Form (2NF) rules", "practice": "Identify and eliminate partial dependencies" },
      { "topic": "Third Normal Form (3NF) application", "practice": "Remove transitive dependencies" },
      { "topic": "Boyce-Codd Normal Form (BCNF)", "practice": "Handle complex dependency scenarios" },
      { "topic": "When to denormalize for performance", "practice": "Analyze trade-offs of denormalization" }
    ],
    "relationship_design": [
      { "topic": "One-to-one relationship design", "practice": "Create tables with 1:1 relationships" },
      { "topic": "One-to-many relationship implementation", "practice": "Design parent-child table relationships" },
      { "topic": "Many-to-many relationship with junction tables", "practice": "Create and use junction tables" },
      { "topic": "Foreign key constraints and referential integrity", "practice": "Implement and test foreign keys" },
      { "topic": "ER diagram creation and interpretation", "practice": "Design database schema visually" }
    ],
    "constraint_management": [
      { "topic": "PRIMARY KEY constraints and strategies", "practice": "Choose between natural and surrogate keys" },
      { "topic": "UNIQUE constraints and NULL handling", "practice": "Implement unique constraints with nulls" },
      { "topic": "CHECK constraints for data validation", "practice": "Add business rules as check constraints" },
      { "topic": "DEFAULT values and expressions", "practice": "Set intelligent default values" },
      { "topic": "EXCLUSION constraints for advanced scenarios", "practice": "Prevent overlapping ranges" }
    ]
  },
  "04_query_development": {
    "joins_and_relationships": [
      { "topic": "INNER JOIN with multiple conditions", "practice": "Join 3+ tables with complex conditions" },
      { "topic": "LEFT/RIGHT OUTER JOIN scenarios", "practice": "Handle missing data with outer joins" },
      { "topic": "FULL OUTER JOIN use cases", "practice": "Combine data from both tables completely" },
      { "topic": "SELF JOIN for hierarchical data", "practice": "Query employee-manager relationships" },
      { "topic": "CROSS JOIN and Cartesian products", "practice": "Generate test data combinations" }
    ],
    "aggregation_and_grouping": [
      { "topic": "GROUP BY with multiple columns", "practice": "Create multi-level aggregations" },
      { "topic": "HAVING clause for filtered aggregations", "practice": "Filter groups based on aggregate values" },
      { "topic": "Aggregate functions with DISTINCT", "practice": "Count distinct values in groups" },
      { "topic": "GROUPING SETS for multiple groupings", "practice": "Create reports with subtotals" },
      { "topic": "ROLLUP and CUBE for hierarchical data", "practice": "Generate summary reports" }
    ],
    "subqueries_and_ctes": [
      { "topic": "Correlated subqueries execution", "practice": "Write queries that reference outer query" },
      { "topic": "Non-correlated subquery patterns", "practice": "Use subqueries in WHERE and SELECT" },
      { "topic": "Common Table Expressions (CTE) syntax", "practice": "Break complex queries into CTEs" },
      { "topic": "Recursive CTEs for hierarchical data", "practice": "Query organizational hierarchies" },
      { "topic": "CTE performance considerations", "practice": "Compare CTE vs subquery performance" }
    ]
  },
  "05_advanced_sql_features": {
    "window_functions": [
      { "topic": "ROW_NUMBER for ranking without gaps", "practice": "Assign sequential numbers to rows" },
      { "topic": "RANK and DENSE_RANK for tied rankings", "practice": "Handle ties in ranking queries" },
      { "topic": "LAG and LEAD for accessing adjacent rows", "practice": "Calculate differences between rows" },
      { "topic": "FIRST_VALUE and LAST_VALUE in partitions", "practice": "Access boundary values in windows" },
      { "topic": "NTILE for percentile calculations", "practice": "Divide result sets into buckets" }
    ],
    "advanced_data_types": [
      { "topic": "JSON and JSONB data type usage", "practice": "Store and query semi-structured data" },
      { "topic": "Array data types and operations", "practice": "Use arrays for list-like data" },
      { "topic": "UUID for distributed systems", "practice": "Implement UUID primary keys" },
      { "topic": "Geometric and network address types", "practice": "Store spatial and network data" },
      { "topic": "Range types for interval data", "practice": "Work with date and number ranges" }
    ],
    "transaction_management": [
      { "topic": "BEGIN, COMMIT, ROLLBACK transactions", "practice": "Implement atomic operations" },
      { "topic": "SAVEPOINT for nested transactions", "practice": "Create partial rollback points" },
      { "topic": "Transaction isolation levels", "practice": "Test different isolation behaviors" },
      { "topic": "Deadlock prevention and resolution", "practice": "Identify and fix deadlocks" },
      { "topic": "MVCC (Multi-Version Concurrency Control)", "practice": "Understand how PostgreSQL handles concurrency" }
    ]
  },
  "06_performance_optimization": {
    "indexing_strategies": [
      { "topic": "B-tree indexes for general purpose", "practice": "Create and test B-tree indexes" },
      { "topic": "BRIN indexes for large ordered tables", "practice": "Index large timestamp-based tables" },
      { "topic": "GIN and GiST indexes for complex data", "practice": "Index JSON and full-text data" },
      { "topic": "Partial indexes for filtered queries", "practice": "Create indexes on subset of data" },
      { "topic": "Composite indexes column order", "practice": "Design multi-column indexes effectively" }
    ],
    "query_optimization": [
      { "topic": "EXPLAIN and EXPLAIN ANALYZE usage", "practice": "Analyze query execution plans" },
      { "topic": "Identifying and fixing sequential scans", "practice": "Convert seq scans to index scans" },
      { "topic": "Query planner statistics importance", "practice": "Update statistics and compare plans" },
      { "topic": "Common query performance pitfalls", "practice": "Fix N+1 query problems" },
      { "topic": "Materialized views for expensive queries", "practice": "Create and refresh materialized views" }
    ],
    "database_tuning": [
      { "topic": "shared_buffers configuration", "practice": "Tune memory settings for workload" },
      { "topic": "work_mem for sort operations", "practice": "Optimize memory for sorting and hashing" },
      { "topic": "maintenance_work_mem for VACUUM", "practice": "Configure maintenance operations" },
      { "topic": "checkpoint configuration", "practice": "Balance between performance and recovery" },
      { "topic": "autovacuum tuning", "practice": "Configure vacuum for your workload" }
    ]
  },
  "07_security_and_administration": {
    "access_control": [
      { "topic": "Role-based access control (RBAC)", "practice": "Create roles with specific privileges" },
      { "topic": "GRANT and REVOKE permissions", "practice": "Implement least privilege principle" },
      { "topic": "Schema-level security", "practice": "Control access at schema level" },
      { "topic": "Row-level security (RLS)", "practice": "Implement data partitioning by user" },
      { "topic": "Column-level privileges", "practice": "Restrict access to sensitive columns" }
    ],
    "security_best_practices": [
      { "topic": "SQL injection prevention techniques", "practice": "Write parameterized queries" },
      { "topic": "SSL/TLS for network encryption", "practice": "Configure encrypted connections" },
      { "topic": "Password policies and encryption", "practice": "Implement strong password policies" },
      { "topic": "Audit logging configuration", "practice": "Track database access and changes" },
      { "topic": "Connection pooling and limits", "practice": "Prevent connection exhaustion" }
    ],
    "monitoring_and_maintenance": [
      { "topic": "PostgreSQL system catalogs", "practice": "Query system tables for monitoring" },
      { "topic": "Log analysis and interpretation", "practice": "Configure and analyze PostgreSQL logs" },
      { "topic": "Table and index maintenance", "practice": "Schedule regular VACUUM and ANALYZE" },
      { "topic": "Database growth monitoring", "practice": "Track database size and growth" },
      { "topic": "Connection and lock monitoring", "practice": "Identify blocking queries" }
    ]
  },
  "08_backup_recovery_disaster": {
    "backup_strategies": [
      { "topic": "pg_dump for logical backups", "practice": "Create and restore logical backups" },
      { "topic": "pg_dumpall for entire cluster", "practice": "Backup all databases and roles" },
      { "topic": "Continuous Archiving and Point-in-Time Recovery", "practice": "Setup WAL archiving" },
      { "topic": "Base backups with pg_basebackup", "practice": "Create physical backups" },
      { "topic": "Backup scheduling and automation", "practice": "Automate backup processes" }
    ],
    "recovery_procedures": [
      { "topic": "Restoring from logical backups", "practice": "Recover databases from pg_dump" },
      { "topic": "Point-in-Time Recovery (PITR)", "practice": "Recover to specific timestamp" },
      { "topic": "Standby servers and replication", "practice": "Setup streaming replication" },
      { "topic": "Failover procedures", "practice": "Test and execute failover" },
      { "topic": "Disaster recovery planning", "practice": "Create and test DR plan" }
    ],
    "replication_and_ha": [
      { "topic": "Streaming replication setup", "practice": "Configure primary-standby replication" },
      { "topic": "Logical replication use cases", "practice": "Replicate specific tables or data" },
      { "topic": "Replication slots management", "practice": "Manage WAL retention" },
      { "topic": "Cascading replication", "practice": "Setup multi-level replication" },
      { "topic": "High availability with Patroni", "practice": "Implement automated failover" }
    ]
  },
  "09_advanced_features_and_extensions": {
    "postgresql_extensions": [
      { "topic": "PostGIS for geospatial data", "practice": "Install and use PostGIS" },
      { "topic": "pg_stat_statements for query analysis", "practice": "Identify slow queries" },
      { "topic": "pg_trgm for fuzzy text search", "practice": "Implement similarity search" },
      { "topic": "tablefunc for crosstab queries", "practice": "Create pivot tables" },
      { "topic": "UUID generation functions", "practice": "Generate UUIDs in applications" }
    ],
    "programmability": [
      { "topic": "PL/pgSQL function writing", "practice": "Create stored procedures" },
      { "topic": "Triggers for data validation", "practice": "Implement business logic in triggers" },
      { "topic": "Event triggers for DDL monitoring", "practice": "Track schema changes" },
      { "topic": "Custom aggregate functions", "practice": "Create specialized aggregates" },
      { "topic": "Foreign data wrappers (FDW)", "practice": "Query external data sources" }
    ],
    "partitioning": [
      { "topic": "Range partitioning for time-series data", "practice": "Partition tables by date ranges" },
      { "topic": "List partitioning for categorical data", "practice": "Partition by specific values" },
      { "topic": "Hash partitioning for distribution", "practice": "Distribute data evenly across partitions" },
      { "topic": "Partition pruning optimization", "practice": "Ensure queries only access needed partitions" },
      { "topic": "Partition maintenance operations", "practice": "Add and drop partitions dynamically" }
    ]
  },
  "10_practical_projects": {
    "beginner_projects": [
      { "project": "Library Management System", "skills": "Basic CRUD, simple joins, constraints" },
      { "project": "Employee Database", "skills": "Relationships, aggregation, basic queries" },
      { "project": "E-commerce Product Catalog", "skills": "Multiple tables, foreign keys, basic reporting" },
      { "project": "Student Grade Management", "skills": "Calculations, grouping, views" }
    ],
    "intermediate_projects": [
      { "project": "Banking Transaction System", "skills": "Transactions, complex joins, security" },
      { "project": "Hospital Management System", "skills": "Advanced queries, procedures, optimization" },
      { "project": "Inventory Management with Reporting", "skills": "Window functions, materialized views, CTEs" },
      { "project": "Social Media Analytics", "skills": "JSON data, full-text search, performance tuning" }
    ],
    "advanced_projects": [
      { "project": "Real-time Analytics Platform", "skills": "Partitioning, replication, query optimization" },
      { "project": "Multi-tenant SaaS Application", "skills": "RLS, schema design, performance at scale" },
      { "project": "Geospatial Application with PostGIS", "skills": "Spatial queries, extensions, complex data" },
      { "project": "Data Warehouse Implementation", "skills": "ETL processes, star schema, advanced indexing" }
    ]
  },
  "11_troubleshooting_and_debugging": {
    "common_issues": [
      { "issue": "Slow query performance", "diagnosis": "Use EXPLAIN ANALYZE, check indexes" },
      { "issue": "Connection pool exhaustion", "diagnosis": "Monitor connections, tune pool settings" },
      { "issue": "Deadlock situations", "diagnosis": "Check lock monitoring, transaction isolation" },
      { "issue": "WAL growth and disk space", "diagnosis": "Monitor replication slots, archiving" },
      { "issue": "Memory and cache problems", "diagnosis": "Analyze shared_buffers, work_mem usage" }
    ],
    "performance_tuning": [
      { "technique": "Query rewriting for optimization", "practice": "Rewrite queries for better plans" },
      { "technique": "Index creation and maintenance", "practice": "Create and monitor index usage" },
      { "technique": "Statistics collection and analysis", "practice": "Update statistics and analyze impact" },
      { "technique": "Configuration parameter tuning", "practice": "Tune PostgreSQL.conf for workload" },
      { "technique": "Connection and session management", "practice": "Optimize connection pooling" }
    ],
    "monitoring_tools": [
      { "tool": "pg_stat_activity for current activity", "usage": "Monitor running queries and locks" },
      { "tool": "pg_stat_statements for query analysis", "usage": "Identify slow and frequent queries" },
      { "tool": "pg_stat_user_tables for table stats", "usage": "Monitor table access patterns" },
      { "tool": "pg_stat_bgwriter for I/O patterns", "usage": "Analyze write patterns and checkpoints" },
      { "tool": "pg_locks for lock monitoring", "usage": "Identify blocking locks and deadlocks" }
    ]
  },
  "12_career_development": {
    "certification_paths": [
      { "certification": "PostgreSQL Associate", "topics": "Basic SQL, administration fundamentals" },
      { "certification": "PostgreSQL Professional", "topics": "Advanced queries, performance tuning" },
      { "certification": "PostgreSQL Expert", "topics": "High availability, replication, scaling" }
    ],
    "job_roles": [
      { "role": "Database Developer", "skills": "SQL proficiency, query optimization, stored procedures" },
      { "role": "Database Administrator", "skills": "Installation, backup/recovery, performance tuning" },
      { "role": "Data Architect", "skills": "Database design, modeling, scalability planning" },
      { "role": "DevOps Database Engineer", "skills": "Automation, replication, cloud deployment" }
    ],
    "interview_preparation": [
      { "area": "SQL query writing", "preparation": "Practice common interview queries" },
      { "area": "Database design questions", "preparation": "Design schemas for given scenarios" },
      { "area": "Performance troubleshooting", "preparation": "Solve performance case studies" },
      { "area": "Administration scenarios", "preparation": "Handle backup, recovery, security scenarios" }
    ]
  },
  "learning_path": {
      "skill_progression": [
        "Beginner: Basic SQL queries and database concepts",
        "Intermediate: Advanced queries, joins, and optimization",
        "Advanced: Performance tuning, administration, and advanced features",
        "Expert: Database design, architecture, and scaling solutions"
      ],
      "recommended_sequence": [
        "Start with database fundamentals and basic SQL",
        "Learn data modeling and normalization",
        "Master query optimization and performance",
        "Study administration and advanced features",
        "Practice with real-world scenarios and projects"
      ],
      "practice_methodology": [
        "Build databases from scratch for different use cases",
        "Optimize existing queries for better performance",
        "Implement security and access control measures",
        "Design and implement backup/recovery strategies",
        "Monitor and troubleshoot production databases"
      ]
  },
  "assessment_checkpoints": {
      "beginner_level": [
        "Can create and modify database tables",
        "Understands basic SQL queries and joins",
        "Able to implement primary and foreign keys",
        "Can perform basic data manipulation"
      ],
      "intermediate_level": [
        "Proficient with complex joins and subqueries",
        "Understands indexing and basic optimization",
        "Can implement transactions and constraints",
        "Able to design normalized database schemas"
      ],
      "advanced_level": [
        "Expert in query optimization and tuning",
        "Can implement replication and high availability",
        "Understands PostgreSQL internals and MVCC",
        "Able to design and implement backup strategies"
      ],
      "expert_level": [
        "Can architect scalable database solutions",
        "Expert in performance troubleshooting",
        "Able to mentor other database professionals",
        "Can design and implement disaster recovery plans"
      ]
  }
};

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';
import slugify from 'slugify';

dotenv.config();

const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('advanced') || 
      lowerName.includes('optimization') || 
      lowerName.includes('recovery') || 
      lowerName.includes('replication') ||
      lowerName.includes('troubleshooting') ||
      lowerName.includes('architect') ||
      lowerName.includes('expert')) {
    return 'advanced';
  }
  
  if (lowerName.includes('modeling') || 
      lowerName.includes('design') || 
      lowerName.includes('security') || 
      lowerName.includes('normalization') ||
      lowerName.includes('queries') ||
      lowerName.includes('joins')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


// Mapping Formatters specifically for creating titles/descriptions from object items
const getTitle = (item) => {
    if (typeof item === 'string') return item;
    if (item.topic) return item.topic;
    if (item.project) return item.project;
    if (item.issue) return item.issue;
    if (item.technique) return item.technique;
    if (item.tool) return item.tool;
    if (item.certification) return item.certification;
    if (item.role) return item.role;
    if (item.area) return item.area;
    if (item.principle) return item.principle;
    return "Untitled Section";
};

const getContent = (item, secTitle) => {
    if (typeof item === 'string') return `## ${secTitle}\n\n${item}`;
    
    let content = `## ${secTitle}\n\n`;
    
    if (item.practice) content += `**Practice**: ${item.practice}\n\n`;
    if (item.skills) content += `**Key Skills**: ${item.skills}\n\n`;
    if (item.diagnosis) content += `**Diagnosis Steps**: ${item.diagnosis}\n\n`;
    if (item.usage) content += `**Typical Usage**: ${item.usage}\n\n`;
    if (item.topics) content += `**Covered Topics**: ${item.topics}\n\n`;
    if (item.preparation) content += `**Preparation Strategy**: ${item.preparation}\n\n`;
    
    // Add generic intro text if short
    content += `In this section, we cover ${secTitle} in depth.`;
    
    return content;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (PostgreSQL)
    let topic = await Topic.findOne({ slug: 'postgresql' });
    if (!topic) {
      console.log('ℹ️ PostgreSQL topic not found, creating...');
      topic = await Topic.create({
        name: 'PostgreSQL',
        slug: 'postgresql',
        description: 'Advanced relational database system',
        icon: '🐘',
        order: 6,
        isNew: false
      });
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
    const usedSlugs = new Set(); // Track used slugs to prevent duplicates

    for (const [groupKey, groupParams] of Object.entries(postgresqlCurriculum)) {
       // LEVEL 1: GROUP (Module)
       // e.g. "01_foundations_and_setup"
       let groupName = groupKey.replace(/^\d+_/, '').split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       console.log(`  📦 Processing Group: ${groupName}`);
       
       for (const [catKey, items] of Object.entries(groupParams)) {
           // LEVEL 2: CATEGORY (Chapter)
           // e.g. "database_concepts"
           let catName = catKey.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

           const category = await Category.create({
            name: catName,
            slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }), // Unique slug
            topicId: topic._id,
            order: categoryOrder++,
            description: `Chapter on ${catName}`,
            group: groupName // THIS IS KEY for the tabs!
           });
           
           console.log(`    📂 Created Category: ${catName} (Group: ${groupName})`);

           // LEVEL 3: SECTIONS (Lessons)
           const sectionItems = Array.isArray(items) ? items : [items];
           let sectionOrder = 1;

           for (const item of sectionItems) {
               const secTitle = getTitle(item);
               const secContent = getContent(item, secTitle);
               
               let baseSlug = slugify(secTitle, { lower: true, strict: true });
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
                  description: `Learn about ${secTitle}`,
                  content: secContent,
                  difficulty: categorizeDifficulty(secTitle, groupName),
                  estimatedTime: 10,
                  isNew: false,
                  isPro: false,
                  keyPoints: [secTitle]
               });
               
               totalSections++;
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
