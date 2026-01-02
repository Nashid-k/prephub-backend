
const postgresqlCurriculum = {

  "00_relational_thinking_and_database_primitives": {
    "why_databases_exist": [
      "What Problems Databases Solve",
      "File Systems vs Databases",
      "Why Consistency and Concurrency Matter"
    ],
    "database_models": [
      "Relational Model vs NoSQL",
      "DBMS vs RDBMS",
      "SQL as a Declarative Language",
      "PostgreSQL vs MySQL vs Commercial Databases"
    ]
  },

  "01_postgresql_system_architecture": {
    "architecture_overview": [
      "PostgreSQL Architecture (Processes, Memory)",
      "Client–Server Model",
      "Backend Processes vs Background Workers",
      "Shared Buffers and Work Memory"
    ],
    "logical_architecture": [
      "3-Schema Architecture (Internal, Conceptual, External)",
      "Schemas and Namespaces",
      "Databases vs Clusters"
    ],
    "installation_and_tools": [
      "PostgreSQL Installation",
      "postgresql.conf",
      "pg_hba.conf",
      "psql CLI",
      "pgAdmin"
    ]
  },

  "02_sql_language_and_data_definition": {
    "sql_categories": [
      "DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "DML (INSERT, UPDATE, DELETE, MERGE)",
      "DQL (SELECT, WHERE, LIMIT)",
      "DCL (GRANT, REVOKE)",
      "TCL (COMMIT, ROLLBACK, SAVEPOINT)"
    ],
    "data_types": [
      "Character Types (CHAR, VARCHAR, TEXT)",
      "Numeric Types (INT, BIGINT, DECIMAL, SERIAL, BIGSERIAL)",
      "Boolean and Date/Time Types",
      "UUID and Arrays",
      "JSON vs JSONB (Storage & Performance)"
    ],
    "constraints_and_keys": [
      "Primary Keys",
      "Foreign Keys",
      "Unique Constraints",
      "CHECK Constraints",
      "NOT NULL",
      "Surrogate vs Natural Keys"
    ]
  },

  "03_basic_querying_and_data_retrieval": {
    "row_selection": [
      "SELECT Basics",
      "DISTINCT",
      "LIMIT and OFFSET",
      "Filtering with WHERE",
      "BETWEEN, IN, LIKE, ILIKE"
    ],
    "null_and_sorting": [
      "NULL Semantics",
      "IS NULL / IS NOT NULL",
      "COALESCE",
      "ORDER BY ASC/DESC",
      "NULLS FIRST / NULLS LAST"
    ],
    "string_operations": [
      "CONCAT",
      "SUBSTRING",
      "POSITION",
      "String Formatting"
    ]
  },

  "04_relational_joins_and_set_logic": {
    "joins": [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN",
      "CROSS JOIN",
      "SELF JOIN"
    ],
    "set_operations": [
      "UNION",
      "UNION ALL",
      "INTERSECT",
      "EXCEPT"
    ],
    "performance_considerations": [
      "Joins vs Subqueries",
      "Join Cardinality Effects"
    ]
  },

  "05_aggregation_and_analytical_queries": {
    "grouping": [
      "COUNT, SUM, AVG, MIN, MAX",
      "GROUP BY",
      "HAVING",
      "STRING_AGG"
    ],
    "window_functions": [
      "ROW_NUMBER",
      "RANK",
      "DENSE_RANK",
      "LEAD / LAG",
      "Group Aggregates vs Window Functions"
    ]
  },

  "06_advanced_sql_constructs": {
    "subqueries_and_ctes": [
      "Nested Subqueries",
      "Correlated Subqueries",
      "Common Table Expressions (CTEs)",
      "Recursive CTEs (Hierarchies)"
    ],
    "conditional_logic": [
      "CASE WHEN Expressions"
    ],
    "views": [
      "Views",
      "Materialized Views",
      "Refresh Strategies"
    ]
  },

  "07_data_modeling_and_integrity": {
    "schema_design": [
      "Entity–Relationship Modeling",
      "Normalization (1NF, 2NF, 3NF, BCNF)",
      "Denormalization Trade-offs"
    ],
    "consistency": [
      "ACID Properties Deep Dive",
      "Referential Integrity",
      "Cascading Actions"
    ]
  },

  "08_query_planning_and_performance_engine": {
    "query_execution": [
      "Query Parsing",
      "Planner vs Executor",
      "Cost-Based Optimization"
    ],
    "explain_tools": [
      "EXPLAIN",
      "EXPLAIN ANALYZE",
      "Interpreting Execution Plans"
    ],
    "indexes": [
      "B-Tree Index",
      "Hash Index",
      "GIN Index",
      "GiST Index",
      "BRIN Index",
      "Partial Indexes",
      "Expression Indexes"
    ]
  },

  "09_storage_engine_and_concurrency": {
    "mvcc_and_transactions": [
      "MVCC (Multi-Version Concurrency Control)",
      "Transaction Isolation Levels",
      "Snapshot Visibility"
    ],
    "locking": [
      "Row-Level Locks",
      "Table-Level Locks",
      "Deadlocks",
      "Optimistic vs Pessimistic Locking"
    ],
    "write_path": [
      "Write-Ahead Logging (WAL)",
      "Checkpoints",
      "Crash Recovery"
    ],
    "maintenance": [
      "VACUUM",
      "AutoVacuum",
      "Table Bloat"
    ]
  },

  "10_server_side_programming": {
    "procedural_language": [
      "PL/pgSQL Functions",
      "Stored Procedures",
      "Transaction Control in Procedures",
      "Cursors"
    ],
    "triggers_and_hooks": [
      "BEFORE Triggers",
      "AFTER Triggers",
      "INSTEAD OF Triggers"
    ]
  },

  "11_security_and_administration": {
    "access_control": [
      "Roles and Privileges",
      "Role-Based Access Control (RBAC)",
      "Row-Level Security (RLS)"
    ],
    "security_practices": [
      "SQL Injection Prevention",
      "Least Privilege Principle"
    ],
    "backup_and_recovery": [
      "pg_dump",
      "pg_restore",
      "Point-in-Time Recovery (PITR)"
    ]
  },

  "12_scaling_high_availability_and_distribution": {
    "connection_management": [
      "Connection Pooling",
      "PgBouncer"
    ],
    "partitioning": [
      "Range Partitioning",
      "List Partitioning",
      "Hash Partitioning"
    ],
    "replication": [
      "Streaming Replication",
      "Logical Replication"
    ],
    "horizontal_scaling": [
      "Sharding Concepts",
      "Citus"
    ],
    "availability": [
      "Failover",
      "Patroni"
    ]
  },

  "13_practical_query_mastery": {
    "salary_analytics": [
      "Nth Highest Salary",
      "Department with Highest Average Salary",
      "Employees Earning More Than Manager",
      "Departments With No Employees",
      "Cumulative Salary by Department"
    ],
    "data_cleaning": [
      "Finding Duplicate Records",
      "Removing Duplicates Safely",
      "Finding Missing Sequence Numbers",
      "Date Parsing and Formatting",
      "Pivot Tables (crosstab)"
    ],
    "business_scenarios": [
      "Customers Who Never Ordered",
      "Most Purchased Product",
      "Monthly Revenue Reports",
      "Abandoned Cart Analysis",
      "Recursive Category Trees"
    ]
  }

};


export { postgresqlCurriculum };
