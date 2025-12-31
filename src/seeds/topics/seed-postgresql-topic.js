import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const postgresqlData = {
  "PostgreSQL": {
    "01_foundations": {
      "database_concepts": [
        "What is a Database",
        "Database vs Table",
        "DBMS vs RDBMS",
        "SQL vs NoSQL",
        "SQL vs PostgreSQL",
        "MySQL vs PostgreSQL",
        "PostgreSQL vs other SQL databases",
        "pgAdmin",
        "PostgreSQL features"
      ],
      "architecture": [
        "3-Schema architecture (Internal, Conceptual, External)",
        "Internal Level",
        "Conceptual Level",
        "External Level",
        "Pros and cons of SQL",
        "Use cases of SQL vs NoSQL",
        "Types of applications where SQL is used",
        "Advantages of SQL over MongoDB",
        "Cons of RDBMS"
      ]
    },

    "02_sql_language_types": {
      "command_categories": [
        "Types of SQL commands",
        "DDL (Data Definition Language)",
        "DML (Data Manipulation Language)",
        "DCL (Data Control Language)",
        "TCL (Transaction Control Language)",
        "DQL (Data Query Language)"
      ],
      "ddl_commands": [
        "CREATE",
        "ALTER",
        "DROP",
        "TRUNCATE",
        "RENAME",
        "COMMENT"
      ],
      "dml_commands": [
        "INSERT",
        "UPDATE",
        "DELETE",
        "SELECT",
        "MERGE"
      ],
      "dcl_commands": [
        "GRANT",
        "REVOKE"
      ],
      "tcl_commands": [
        "COMMIT",
        "ROLLBACK",
        "SAVEPOINT",
        "SET TRANSACTION"
      ]
    },

    "03_data_types_constraints": {
      "data_types": [
        "Character types (CHAR, VARCHAR, TEXT)",
        "Numeric types (INT, SERIAL, BIGSERIAL, DECIMAL)",
        "Date/Time types",
        "Boolean type",
        "UUID type",
        "JSON fields",
        "BLOB type",
        "Array datatype",
        "CHAR vs VARCHAR",
        "VARCHAR vs TEXT",
        "SERIAL vs BIGSERIAL",
        "When UUID PK should be used"
      ],
      "constraints": [
        "PRIMARY KEY",
        "FOREIGN KEY",
        "UNIQUE",
        "NOT NULL",
        "CHECK constraint",
        "DEFAULT constraint",
        "EXCLUSION constraint",
        "Adding a foreign key to existing table",
        "Primary Key vs Unique Key",
        "Composite Key",
        "Natural Key",
        "Candidate Key vs Alternate Key",
        "Super Key",
        "Closure",
        "Can Unique Key contain null value?",
        "NULL value in Primary Key"
      ]
    },

    "04_table_operations": {
      "table_creation": [
        "CREATE TABLE syntax",
        "Create table with foreign key relationship",
        "Auto increment ID (SERIAL)",
        "Table inheritance vs FK",
        "Jagged arrays"
      ],
      "table_modification": [
        "ALTER TABLE",
        "Add new column",
        "Rename column",
        "Rename table",
        "Modify column name",
        "Change data type",
        "Remove column",
        "Add column with AFTER",
        "Delete vs TRUNCATE vs DROP",
        "Copy table"
      ]
    },

    "05_data_integrity_normalization": {
      "data_integrity": [
        "What is Data Integrity",
        "How to improve data integrity",
        "Data redundancy",
        "Redundancy",
        "Functional dependency",
        "Partial dependency",
        "Transitive dependency",
        "Non-key attribute"
      ],
      "normalization": [
        "Normalization concept",
        "Denormalization",
        "1NF (First Normal Form)",
        "2NF (Second Normal Form)",
        "3NF (Third Normal Form)",
        "BCNF (Boyce-Codd Normal Form)",
        "Advantages/disadvantages of normalization",
        "Over-normalization issues"
      ]
    },

    "06_basic_queries": {
      "select_queries": [
        "SELECT statement",
        "FROM clause",
        "WHERE clause",
        "ORDER BY with ASC/DESC",
        "LIMIT vs OFFSET",
        "DISTINCT keyword",
        "Alias usage",
        "Arithmetic operations"
      ],
      "filtering": [
        "Comparison operators (=, !=, <, >, <=, >=)",
        "IN operator",
        "BETWEEN operator",
        "LIKE and ILIKE",
        "Wildcards (% and _)",
        "IS NULL / IS NOT NULL",
        "NOT IN clause",
        "EXISTS operator",
        "ANY vs ALL"
      ]
    },

    "07_aggregation_grouping": {
      "aggregate_functions": [
        "COUNT",
        "SUM",
        "AVG",
        "MIN",
        "MAX",
        "GROUP_CONCAT",
        "Scalar vs Aggregate Functions"
      ],
      "grouping": [
        "GROUP BY clause",
        "HAVING clause",
        "WHERE vs HAVING",
        "Order of execution",
        "GROUP BY with aggregation"
      ]
    },

    "08_joins": {
      "join_types": [
        "INNER JOIN",
        "LEFT JOIN (LEFT OUTER JOIN)",
        "RIGHT JOIN (RIGHT OUTER JOIN)",
        "FULL JOIN (FULL OUTER JOIN)",
        "CROSS JOIN",
        "SELF JOIN",
        "NATURAL JOIN"
      ],
      "concepts": [
        "Join doesn't require foreign key",
        "Join vs UNION",
        "Combining multiple joins",
        "Update with join",
        "Inner join vs Left join vs Right join vs Full join"
      ]
    },

    "09_advanced_queries": {
      "subqueries": [
        "What are Subqueries",
        "Single-row subquery",
        "Multiple-row subquery",
        "Nested subquery",
        "Correlated vs Non-correlated subquery",
        "Subquery inside JOIN"
      ],
      "common_expressions": [
        "CTE (Common Table Expressions)",
        "WITH clause",
        "Types of CTE",
        "When to use CTE",
        "Materialized view"
      ],
      "case_statements": [
        "CASE statement",
        "CASE WHEN syntax",
        "IF condition inside SELECT"
      ]
    },

    "10_functions": {
      "scalar_functions": [
        "Scalar functions",
        "COALESCE",
        "NULLIF",
        "AGE function",
        "CONCAT function",
        "String operations",
        "EXTRACT function",
        "Date functions"
      ],
      "window_functions": [
        "Window functions",
        "RANK",
        "DENSE_RANK",
        "ROW_NUMBER",
        "DENSE_RANK vs RANK"
      ]
    },

    "11_set_operations": [
      "UNION",
      "UNION ALL",
      "INTERSECT",
      "MINUS/EXCEPT",
      "UNION vs UNION ALL",
      "Conditions for using UNION",
      "UNION vs INTERSECT"
    ],

    "12_views": {
      "concepts": [
        "What is a View",
        "View vs Table",
        "Advantages of Views",
        "Can update operations be done on view",
        "View from multiple tables",
        "Materialized view"
      ]
    },

    "13_stored_procedures_functions": {
      "procedures": [
        "Stored Procedures",
        "Stored procedure vs Function",
        "Create stored procedure for insertion",
        "Stored procedure practical"
      ],
      "functions": [
        "Write a function in PostgreSQL",
        "Scalar functions examples"
      ]
    },

    "14_triggers": {
      "concepts": [
        "What is a Trigger",
        "Types of triggers",
        "Trigger syntax",
        "Create trigger practical",
        "Cons of DB trigger",
        "Trigger example"
      ]
    },

    "15_transactions_concurrency": {
      "acid_properties": [
        "ACID properties",
        "Atomicity",
        "Consistency",
        "Isolation",
        "Durability",
        "ACID applicability",
        "Sample scenario for ACID"
      ],
      "transactions": [
        "What are Transactions",
        "Transaction usage",
        "Properties of transactions",
        "Postgres concurrent transactions",
        "Multi-Version Concurrency Control (MVCC)",
        "Deadlock",
        "Locks"
      ],
      "implementation": [
        "BEGIN transaction",
        "COMMIT",
        "ROLLBACK",
        "SAVEPOINT",
        "Implement transaction practical"
      ]
    },

    "16_security": {
      "sql_injection": [
        "SQL injection",
        "Common types of SQL injection",
        "How to prevent SQL injection",
        "Ways to prevent SQL injection"
      ],
      "access_control": [
        "Create user and grant read permission",
        "GRANT privileges",
        "REVOKE privileges",
        "Roles and access control"
      ]
    },

    "17_performance_optimization": {
      "indexing": [
        "What is an Index",
        "How indexing works",
        "Types of indexes",
        "Clustered vs Non-clustered index",
        "Composite index",
        "Hash index",
        "Create index syntax",
        "Drawbacks of indexing",
        "Disadvantages of index",
        "How to decide which field needs indexing",
        "Listing indexes"
      ],
      "query_optimization": [
        "Query performance",
        "Query optimization",
        "EXPLAIN statement",
        "EXPLAIN ANALYZE command",
        "Performance improvement",
        "How large scale DB can be optimized"
      ],
      "scaling": [
        "Scalability",
        "Horizontal scalability",
        "Vertical scalability",
        "Horizontal scaling on SQL",
        "Why prefer vertical scaling in SQL",
        "Partitioning and types of partitioning",
        "Sharding",
        "Types of shard key",
        "Problems in scalability - how companies solve"
      ]
    },

    "18_advanced_features": {
      "postgres_specific": [
        "Storing JSON in PostgreSQL",
        "Table inheritance",
        "DOMAIN creation",
        "ENUM type",
        "Upsert (ON CONFLICT DO NOTHING)"
      ],
      "cursor": [
        "Cursor concept",
        "Cursor usage"
      ],
      "backup_recovery": [
        "Backup in PostgreSQL",
        "pg_dump",
        "Restore database",
        "Database migration"
      ]
    },

    "19_relationships_er_diagram": {
      "relationships": [
        "Entities",
        "Relationships",
        "Types of relationships",
        "M:M Relationship example",
        "How to represent many-to-many in ER diagram",
        "ER Diagram (Entity-Relationship Diagram)",
        "Update the ER diagram"
      ]
    },

    "20_practical_workouts": {
      "common_queries": [
        "Second highest salary",
        "Third largest number",
        "Find duplicates in table",
        "Remove duplicate records",
        "Find maximum by grouping",
        "Count of students in each department",
        "Department with no employees",
        "Employee with highest salary",
        "Customer who haven't placed any orders",
        "Cars whose price higher than average price",
        "Cars with second highest price",
        "Employees with more than 6 months experience",
        "Employee earning less than department average",
        "Department with highest average salary",
        "Department with lowest average salary",
        "Longest full name",
        "Remove employees with less than average salary",
        "Count employees in specific department",
        "Employees with same salary count",
        "Manager with highest employees",
        "Model of car most available in count",
        "Products not purchased by any customer",
        "Number of products purchased by each customer",
        "Customer who spent maximum total amount",
        "Customers who spent more than average",
        "Group products based on price",
        "Update score of all rows",
        "Increase salary by 1000 if less than average",
        "Delete employees with salary > 80,000",
        "Remove employees whose names end with specific letter",
        "Name ends with specific letter",
        "First name and department name of all employees"
      ],
      "complex_scenarios": [
        "Create question yourself for better understanding",
        "Join queries with subqueries",
        "Self references in queries",
        "Date operations",
        "Window functions practical",
        "Rank functions",
        "Multiple table joins",
        "Aggregate functions with joins",
        "String functions in queries"
      ]
    }
  }
}

// Helper to format strings: "01_foundations" -> "Foundations"
const formatName = (str) => {
    return str
        .replace(/^\d+_/, '') // Remove leading numbers
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedPostgreSQL = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Create Topic
        let topic = await Topic.findOne({ slug: 'postgresql' });
        if (!topic) {
            console.log('Creating PostgreSQL topic...');
            topic = await Topic.create({
                name: 'PostgreSQL',
                slug: 'postgresql',
                description: 'Advanced open source relational database',
                icon: '/images/topics/postgresql.svg',
                order: 3,
                color: '#336791'
            });
        } else {
             // If topic exists, update the icon
             topic.icon = '/images/topics/postgresql.svg';
             await topic.save();
        }

        // 2. Clear existing data
        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ _id: { $in: categoryIds } });
            console.log('Cleared existing PostgreSQL data');
        }

        const data = postgresqlData["PostgreSQL"];
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

        // 3. Process Data
        let order = 1;
        for (const [key, value] of Object.entries(data)) {
            const categoryName = formatName(key);
            const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');

            const category = await Category.create({
                name: categoryName,
                slug: categorySlug,
                description: `Learn about ${categoryName}`,
                topicId: topic._id,
                group: 'general', // Standard group
                order: order++
            });

            // Handle value being Array (direct sections) or Object (subgroups which we flatten)
            let sections = [];
            if (Array.isArray(value)) {
                sections = value; // Direct list of strings
            } else {
                 // Flatten values of object into a single list
                 // e.g. { concepts: [...], implementation: [...] } -> [...concepts, ...implementation]
                 for (const [subKey, subItems] of Object.entries(value)) {
                     sections = [...sections, ...subItems];
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
                isCompleted: false
            }));

            await Section.insertMany(sectionDocs);
            console.log(`Created Category: ${categoryName} with ${sectionDocs.length} sections`);
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedPostgreSQL();
