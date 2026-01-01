
const postgresqlCurriculum = {
  "Database_Foundations": {
    "intro_setup": [
      "Relational Model vs NoSQL",
      "DBMS vs RDBMS",
      "SQL vs PostgreSQL vs MySQL",
      "PostgreSQL Architecture (Process, Memory)",
      "3-Schema Architecture (Internal, Conceptual, External)",
      "Installation (postgresql.conf, pg_hba.conf)",
      "pgAdmin and psql CLI"
    ],
    "sql_language_types": [
      "DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "DML (INSERT, UPDATE, DELETE, MERGE)",
      "DQL (SELECT, WHERE, LIMIT)",
      "DCL (GRANT, REVOKE)",
      "TCL (COMMIT, ROLLBACK, SAVEPOINT)"
    ],
    "data_types_constraints": [
      "Character types (CHAR, VARCHAR, TEXT)",
      "Numeric (INT, SERIAL, BIGSERIAL, DECIMAL)",
      "JSON vs JSONB",
      "UUID and Arrays",
      "Constraints (PK, FK, UNIQUE, CHECK, NOT NULL)",
      "Surrogate vs Natural Keys"
    ]
  },
  "Query_Mastery": {
    "basic_queries": [
      "SELECT with DISTINCT, LIMIT, OFFSET",
      "Filtering (WHERE, BETWEEN, IN, LIKE, ILIKE)",
      "NULL Handling (IS NULL, COALESCE)",
      "Sorting (ORDER BY ASC/DESC NULLS FIRST/LAST)",
      "String Functions (CONCAT, SUBSTRING, POSITION)"
    ],
    "joins_and_unions": [
      "INNER JOIN vs OUTER JOINS (LEFT, RIGHT, FULL)",
      "CROSS JOIN and SELF JOIN",
      "Set Operations (UNION, UNION ALL, INTERSECT, EXCEPT)",
      "Joins vs Subqueries Performance"
    ],
    "aggregation_grouping": [
      "Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)",
      "GROUP BY and HAVING Clause",
      "Group vs Window Functions",
      "GROUP_CONCAT equivalent (STRING_AGG)"
    ]
  },
  "Advanced_SQL": {
    "advanced_features": [
      "Subqueries (Correlated vs Nested)",
      "CTEs (Common Table Expressions)",
      "Recursive CTEs (Hierarchical Data)",
      "Window Functions (RANK, DENSE_RANK, ROW_NUMBER, LEAD/LAG)",
      "CASE WHEN Statements",
      "Views vs Materialized Views"
    ],
    "advanced_types": [
      "Hstore (Key-Value)",
      "Geometric Types (PostGIS Intro)",
      "Range Types (TSTZRANGE, DATERANGE)",
      "Enumerated Types (ENUM)",
      "Network Address Types (CIDR, INET)"
    ]
  },
  "Data_Design_Performance": {
    "normalization_modeling": [
      "ER Diagrams (Entities, Relationships)",
      "Normalization (1NF, 2NF, 3NF, BCNF)",
      "Denormalization Strategies",
      "ACID Properties Deep Dive",
      "Data Integrity & Foreign Keys"
    ],
    "performance_tuning": [
      "Explain and Explain Analyze",
      "Index Types (B-Tree, Hash, GIN, GiST, BRIN)",
      "Partial and Expression Indexes",
      "Query Planner Statistics",
      "Vacuuming (AutoVacuum) & WAL"
    ],
    "concurrency_locking": [
      "Transaction Isolation Levels",
      "MVCC (Multi-Version Concurrency Control)",
      "Locks (Row vs Table, Deadlocks)",
      "Pessimistic vs Optimistic Locking"
    ]
  },
  "Server_Side_Logic": {
    "procedural_sql": [
      "PL/pgSQL Functions",
      "Stored Procedures (Transaction Control)",
      "Triggers (BEFORE, AFTER, INSTEAD OF)",
      "Cursor Management",
      "User-Defined Functions (UDFs)"
    ],
    "security_admin": [
      "Roles and Privileges (RBAC)",
      "Row-Level Security (RLS)",
      "SQL Injection Prevention",
      "Backup & Restore (pg_dump, pg_restore)",
      "Point-in-Time Recovery (PITR)"
    ]
  },
  "Scaling_Architecture": {
    "scaling_strategies": [
      "Connection Pooling (PgBouncer)",
      "Table Partitioning (Range, List, Hash)",
      "Replication (Streaming vs Logical)",
      "Sharding Concepts (Citus)",
      "High Availability (Patroni)"
    ]
  },
  "Practical_Workout_Queries": {
    "salary_analytics": [
      "Find Nth highest salary",
      "Department with highest average salary",
      "Employees earning > manager",
      "Department with no employees",
      "Cumulative salary sum by department"
    ],
    "data_cleaning": [
      "Find duplicate records",
      "Remove duplicates keeping one",
      "Find missing sequence numbers",
      "Parse and format dates",
      "Pivot table operations (crosstab)"
    ],
    "shopping_cart_scenarios": [
      "Customers who never ordered",
      "Product bought by most users",
      "Monthly revenue report",
      "Abandoned carts analysis",
      "Recursive category tree"
    ]
  }
};

export { postgresqlCurriculum };
