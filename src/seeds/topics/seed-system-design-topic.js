
const systemDesignCurriculum = {
  "learning_approach": {
      "progression_path": [
        "Start with design fundamentals and principles",
        "Learn scalability patterns and distributed systems",
        "Study database design and data modeling",
        "Master microservices and cloud architecture",
        "Explore advanced topics and real-world case studies"
      ],
      "practice_methodology": [
        "Design systems for real products from requirements",
        "Analyze and critique existing system architectures",
        "Participate in system design mock interviews",
        "Build and deploy small-scale systems",
        "Use architecture diagram tools to visualize designs"
      ],
      "skill_tiers": {
        "foundation": "Basic principles, simple systems, database design",
        "intermediate": "Scalability, caching, load balancing, API design",
        "advanced": "Microservices, distributed systems, cloud architecture",
        "expert": "Large-scale systems, trade-off analysis, architecture patterns"
      }
    },

    "01_foundations_principles": {
      "design_principles": [
        { "principle": "KISS (Keep It Simple, Stupid)", "practice": "Simplify complex requirement into minimal design" },
        { "principle": "DRY (Don't Repeat Yourself)", "practice": "Identify and eliminate redundancy in design" },
        { "principle": "Separation of Concerns", "practice": "Design modular components with clear responsibilities" },
        { "principle": "Single Responsibility Principle", "practice": "Ensure each component has one reason to change" },
        { "principle": "YAGNI (You Ain't Gonna Need It)", "practice": "Avoid over-engineering for hypothetical future needs" }
      ],
      "system_properties": [
        { "property": "Reliability", "practice": "Design fault-tolerant components" },
        { "property": "Scalability", "practice": "Design systems that can handle growth" },
        { "property": "Availability", "practice": "Design for high uptime and redundancy" },
        { "property": "Maintainability", "practice": "Design for easy updates and debugging" },
        { "property": "Security", "practice": "Incorporate security from the ground up" }
      ],
      "requirements_analysis": [
        { "skill": "Functional requirements gathering", "practice": "Extract requirements from vague descriptions" },
        { "skill": "Non-functional requirements identification", "practice": "Define SLAs, performance targets, constraints" },
        { "skill": "Scope definition and prioritization", "practice": "Create MVP scope vs future features" },
        { "skill": "Constraint analysis", "practice": "Identify technical, business, and time constraints" },
        { "skill": "Stakeholder communication", "practice": "Present design decisions to different audiences" }
      ]
    },

    "02_basic_system_components": {
      "client_server_architecture": [
        { "component": "Client types: Web, Mobile, Desktop", "practice": "Design API for multiple client types" },
        { "component": "Server components and responsibilities", "practice": "Design server architecture for web app" },
        { "component": "Stateless vs Stateful servers", "practice": "Choose appropriate state management" },
        { "component": "API design: REST, GraphQL, gRPC", "practice": "Design APIs using different protocols" },
        { "component": "Request-response cycle", "practice": "Trace complete request flow" }
      ],
      "database_fundamentals": [
        { "decision": "SQL vs NoSQL selection", "practice": "Choose appropriate database for use case" },
        { "decision": "Database schema design", "practice": "Design normalized database schema" },
        { "decision": "Indexing strategies", "practice": "Design indexes for query patterns" },
        { "decision": "Connection pooling", "practice": "Design database connection management" },
        { "decision": "Data migration strategies", "practice": "Plan schema evolution and migrations" }
      ],
      "basic_scalability": [
        { "pattern": "Vertical scaling considerations", "practice": "Design for vertical scaling limitations" },
        { "pattern": "Basic horizontal scaling", "practice": "Design stateless services for scaling" },
        { "pattern": "Read-write separation", "practice": "Separate read and write databases" },
        { "pattern": "Basic caching strategies", "practice": "Implement caching for performance" },
        { "pattern": "CDN for static content", "practice": "Design CDN integration" }
      ]
    },

    "03_scalability_patterns": {
      "load_balancing": [
        { "type": "DNS-based load balancing", "practice": "Design DNS load balancing setup" },
        { "type": "Hardware load balancers", "practice": "Design with dedicated load balancers" },
        { "type": "Software load balancers: Nginx, HAProxy", "practice": "Configure software load balancing" },
        { "algorithm": "Round-robin load balancing", "practice": "Implement simple load balancing" },
        { "algorithm": "Least connections algorithm", "practice": "Design dynamic load distribution" },
        { "algorithm": "IP hash for session persistence", "practice": "Design sticky sessions" }
      ],
      "caching_strategies": [
        { "layer": "Client-side caching", "practice": "Design browser and mobile caching" },
        { "layer": "CDN caching", "practice": "Configure CDN caching rules" },
        { "layer": "Application-level caching", "practice": "Implement in-memory caching" },
        { "layer": "Database caching", "practice": "Design query cache and materialized views" },
        { "strategy": "Cache-aside (Lazy Loading)", "practice": "Implement cache population on demand" },
        { "strategy": "Write-through caching", "practice": "Design synchronous cache updates" },
        { "strategy": "Write-behind caching", "practice": "Design asynchronous cache updates" }
      ],
      "database_scaling": [
        { "technique": "Database replication: Master-slave", "practice": "Design read replicas setup" },
        { "technique": "Database sharding strategies", "practice": "Design horizontal partitioning scheme" },
        { "technique": "Consistent hashing for sharding", "practice": "Implement consistent hashing" },
        { "technique": "Database federation", "practice": "Design functionally partitioned databases" },
        { "technique": "Denormalization for performance", "practice": "Balance normalization vs performance" }
      ]
    },

    "04_high_availability": {
      "redundancy_patterns": [
        { "pattern": "Active-active redundancy", "practice": "Design multi-active system deployment" },
        { "pattern": "Active-passive redundancy", "practice": "Design hot standby systems" },
        { "pattern": "Geographic redundancy", "practice": "Design multi-region deployment" },
        { "pattern": "Component redundancy", "practice": "Design redundant critical components" },
        { "pattern": "Data redundancy", "practice": "Design data replication strategies" }
      ],
      "failover_strategies": [
        { "strategy": "Automatic failover mechanisms", "practice": "Design self-healing systems" },
        { "strategy": "Manual failover procedures", "practice": "Document failover steps" },
        { "strategy": "Graceful degradation", "practice": "Design systems that degrade gracefully" },
        { "strategy": "Circuit breaker pattern", "practice": "Implement failure isolation" },
        { "strategy": "Bulkhead pattern", "practice": "Design failure containment" }
      ],
      "disaster_recovery": [
        { "plan": "Backup strategies", "practice": "Design comprehensive backup system" },
        { "plan": "Recovery Point Objective (RPO)", "practice": "Define and design for RPO targets" },
        { "plan": "Recovery Time Objective (RTO)", "practice": "Define and design for RTO targets" },
        { "plan": "Disaster recovery procedures", "practice": "Create complete DR playbook" },
        { "plan": "Data consistency in DR", "practice": "Design for eventual consistency in failover" }
      ]
    },

    "05_message_queues_event_driven": {
      "message_queue_concepts": [
        { "concept": "Producer-consumer model", "practice": "Design asynchronous processing pipeline" },
        { "concept": "Message durability", "practice": "Design persistent message storage" },
        { "concept": "Message ordering guarantees", "practice": "Design for ordered processing" },
        { "concept": "Exactly-once vs at-least-once delivery", "practice": "Choose appropriate delivery guarantees" },
        { "concept": "Dead letter queues", "practice": "Design for handling failed messages" }
      ],
      "queue_technologies": [
        { "technology": "RabbitMQ features and patterns", "practice": "Design with RabbitMQ exchanges" },
        { "technology": "Apache Kafka architecture", "practice": "Design event streaming systems" },
        { "technology": "AWS SQS/SNS", "practice": "Design cloud-based messaging" },
        { "technology": "Redis as message queue", "practice": "Design lightweight queuing" },
        { "technology": "ZeroMQ for low-latency", "practice": "Design high-performance messaging" }
      ],
      "event_driven_architecture": [
        { "pattern": "Event sourcing", "practice": "Design system with event log" },
        { "pattern": "CQRS (Command Query Responsibility Segregation)", "practice": "Design separate read/write models" },
        { "pattern": "Event-driven microservices", "practice": "Design loosely coupled services" },
        { "pattern": "Saga pattern for distributed transactions", "practice": "Design compensation transactions" },
        { "pattern": "Eventual consistency patterns", "practice": "Design for consistency in distributed systems" }
      ]
    },

    "06_microservices_architecture": {
      "service_decomposition": [
        { "principle": "Domain-driven design", "practice": "Identify bounded contexts" },
        { "principle": "Single responsibility services", "practice": "Define service boundaries" },
        { "principle": "Loosely coupled services", "practice": "Design minimal service dependencies" },
        { "principle": "API-first design", "practice": "Design service contracts first" },
        { "principle": "Independent deployability", "practice": "Design services that can be deployed separately" }
      ],
      "service_communication": [
        { "method": "Synchronous HTTP/REST", "practice": "Design RESTful service APIs" },
        { "method": "Asynchronous messaging", "practice": "Design event-based communication" },
        { "method": "gRPC for high-performance", "practice": "Design with protocol buffers" },
        { "method": "Service discovery", "practice": "Design dynamic service registration" },
        { "method": "API gateway pattern", "practice": "Design unified API entry point" }
      ],
      "microservices_challenges": [
        { "challenge": "Distributed transaction management", "practice": "Design saga or two-phase commit" },
        { "challenge": "Distributed logging and tracing", "practice": "Design centralized observability" },
        { "challenge": "Service configuration management", "practice": "Design external configuration" },
        { "challenge": "Service versioning and compatibility", "practice": "Design backward-compatible APIs" },
        { "challenge": "Data consistency across services", "practice": "Design eventual consistency" }
      ]
    },

    "07_distributed_systems": {
      "distributed_concepts": [
        { "concept": "CAP theorem implications", "practice": "Make CAP trade-off decisions" },
        { "concept": "Consistency models: Strong, Eventual, Causal", "practice": "Choose appropriate consistency model" },
        { "concept": "Distributed consensus algorithms", "practice": "Design with Paxos/Raft" },
        { "concept": "Vector clocks for causality", "practice": "Implement causality tracking" },
        { "concept": "Byzantine fault tolerance", "practice": "Design for malicious failures" }
      ],
      "distributed_data": [
        { "pattern": "Leader election", "practice": "Design leader election mechanism" },
        { "pattern": "Quorum-based systems", "practice": "Design read/write quorums" },
        { "pattern": "Conflict-free replicated data types (CRDTs)", "practice": "Design eventually consistent data structures" },
        { "pattern": "Distributed locking", "practice": "Design distributed lock service" },
        { "pattern": "Distributed caching", "practice": "Design cache invalidation across nodes" }
      ],
      "coordination_services": [
        { "service": "Apache ZooKeeper use cases", "practice": "Design coordination with ZooKeeper" },
        { "service": "etcd for configuration and discovery", "practice": "Design service discovery with etcd" },
        { "service": "Consul for service mesh", "practice": "Design service mesh architecture" },
        { "service": "Distributed configuration management", "practice": "Design dynamic configuration updates" }
      ]
    },

    "08_storage_systems": {
      "database_design": [
        { "type": "Relational database design", "practice": "Design normalized schemas with relationships" },
        { "type": "Document database design", "practice": "Design document schemas and indexing" },
        { "type": "Key-value store design", "practice": "Design efficient key structures" },
        { "type": "Column-family database design", "practice": "Design wide-column schemas" },
        { "type": "Graph database design", "practice": "Design graph schemas and traversals" }
      ],
      "data_modeling": [
        { "technique": "Entity-relationship modeling", "practice": "Create comprehensive ER diagrams" },
        { "technique": "Dimensional modeling for analytics", "practice": "Design star and snowflake schemas" },
        { "technique": "Time-series data modeling", "practice": "Design efficient time-series storage" },
        { "technique": "Geospatial data modeling", "practice": "Design location-based data structures" },
        { "technique": "Full-text search optimization", "practice": "Design search indexes and analyzers" }
      ],
      "data_pipeline": [
        { "pipeline": "ETL (Extract, Transform, Load) design", "practice": "Design batch data processing" },
        { "pipeline": "Real-time streaming pipeline", "practice": "Design streaming data processing" },
        { "pipeline": "Data warehouse architecture", "practice": "Design analytical data storage" },
        { "pipeline": "Data lake design", "practice": "Design raw data storage and processing" },
        { "pipeline": "Change data capture (CDC)", "practice": "Design real-time data replication" }
      ]
    },

    "09_api_design": {
      "restful_apis": [
        { "principle": "Resource-oriented design", "practice": "Design RESTful resources and URLs" },
        { "principle": "HTTP methods semantics", "practice": "Design proper HTTP method usage" },
        { "principle": "Status code selection", "practice": "Design meaningful HTTP responses" },
        { "principle": "HATEOAS (Hypermedia as the Engine of Application State)", "practice": "Design discoverable APIs" },
        { "principle": "API versioning strategies", "practice": "Design backward-compatible versioning" }
      ],
      "api_optimization": [
        { "technique": "Pagination and filtering", "practice": "Design efficient list APIs" },
        { "technique": "Field selection and sparse fieldsets", "practice": "Design partial response APIs" },
        { "technique": "Request batching", "practice": "Design batch operation APIs" },
        { "technique": "Response compression", "practice": "Design efficient data transfer" },
        { "technique": "Conditional requests", "practice": "Design caching with ETags" }
      ],
      "api_security": [
        { "security": "Authentication mechanisms", "practice": "Design API authentication" },
        { "security": "Authorization and permissions", "practice": "Design role-based access control" },
        { "security": "Rate limiting and throttling", "practice": "Design API usage limits" },
        { "security": "Input validation and sanitization", "practice": "Design secure input handling" },
        { "security": "API monitoring and analytics", "practice": "Design API usage tracking" }
      ]
    },

    "10_cloud_architecture": {
      "cloud_concepts": [
        { "concept": "IaaS vs PaaS vs SaaS", "practice": "Choose appropriate cloud service model" },
        { "concept": "Multi-cloud strategy", "practice": "Design for cloud portability" },
        { "concept": "Hybrid cloud architecture", "practice": "Design on-premise and cloud integration" },
        { "concept": "Cloud cost optimization", "practice": "Design cost-effective cloud architecture" },
        { "concept": "Cloud security best practices", "practice": "Design secure cloud deployment" }
      ],
      "aws_services": [
        { "service": "Compute: EC2, Lambda, ECS", "practice": "Design appropriate compute strategy" },
        { "service": "Storage: S3, EBS, EFS", "practice": "Design storage hierarchy" },
        { "service": "Database: RDS, DynamoDB, Aurora", "practice": "Design cloud database solutions" },
        { "service": "Networking: VPC, ALB, Route 53", "practice": "Design cloud network architecture" },
        { "service": "Messaging: SQS, SNS, EventBridge", "practice": "Design cloud messaging" }
      ],
      "cloud_patterns": [
        { "pattern": "Serverless architecture", "practice": "Design event-driven serverless apps" },
        { "pattern": "Container orchestration with Kubernetes", "practice": "Design Kubernetes deployments" },
        { "pattern": "Infrastructure as Code (IaC)", "practice": "Design repeatable infrastructure" },
        { "pattern": "Cloud-native design principles", "practice": "Design for cloud capabilities" },
        { "pattern": "Disaster recovery in cloud", "practice": "Design multi-region cloud DR" }
      ]
    },

    "11_monitoring_observability": {
      "monitoring_strategies": [
        { "metric": "Business metrics monitoring", "practice": "Design key business indicators" },
        { "metric": "Infrastructure monitoring", "practice": "Design system health checks" },
        { "metric": "Application performance monitoring", "practice": "Design application metrics" },
        { "metric": "User experience monitoring", "practice": "Design real user monitoring" },
        { "metric": "Cost monitoring", "practice": "Design cost tracking and alerts" }
      ],
      "observability_pillars": [
        { "pillar": "Metrics collection and aggregation", "practice": "Design metric collection pipeline" },
        { "pillar": "Distributed tracing", "practice": "Design end-to-end request tracing" },
        { "pillar": "Centralized logging", "practice": "Design log aggregation system" },
        { "pillar": "Alerting and notification systems", "practice": "Design alert escalation policies" },
        { "pillar": "Dashboard and visualization", "practice": "Design operational dashboards" }
      ],
      "incident_management": [
        { "process": "Incident detection", "practice": "Design automated anomaly detection" },
        { "process": "Incident response procedures", "practice": "Design incident playbooks" },
        { "process": "Post-mortem analysis", "practice": "Design blameless post-mortem process" },
        { "process": "Chaos engineering", "practice": "Design failure injection tests" },
        { "process": "Service Level Objectives (SLOs)", "practice": "Define and monitor SLOs" }
      ]
    },

    "12_security_architecture": {
      "security_layers": [
        { "layer": "Network security design", "practice": "Design secure network segmentation" },
        { "layer": "Application security", "practice": "Design secure application architecture" },
        { "layer": "Data security and encryption", "practice": "Design data protection strategy" },
        { "layer": "Identity and access management", "practice": "Design comprehensive IAM" },
        { "layer": "Compliance and audit", "practice": "Design for regulatory compliance" }
      ],
      "security_patterns": [
        { "pattern": "Defense in depth", "practice": "Design multiple security layers" },
        { "pattern": "Zero trust architecture", "practice": "Design trust-no-one system" },
        { "pattern": "Secure by design", "practice": "Incorporate security from beginning" },
        { "pattern": "Principle of least privilege", "practice": "Design minimal access permissions" },
        { "pattern": "Security automation", "practice": "Design automated security checks" }
      ],
      "threat_modeling": [
        { "technique": "STRIDE threat modeling", "practice": "Identify system threats systematically" },
        { "technique": "Attack surface analysis", "practice": "Analyze and reduce attack surface" },
        { "technique": "Data flow diagram security analysis", "practice": "Identify data flow vulnerabilities" },
        { "technique": "Security testing strategies", "practice": "Design comprehensive security testing" }
      ]
    },

    "13_performance_optimization": {
      "performance_metrics": [
        { "metric": "Latency measurement and optimization", "practice": "Design low-latency systems" },
        { "metric": "Throughput optimization", "practice": "Design high-throughput systems" },
        { "metric": "Concurrency handling", "practice": "Design for concurrent access" },
        { "metric": "Resource utilization optimization", "practice": "Design efficient resource usage" },
        { "metric": "Scalability testing", "practice": "Design load testing strategies" }
      ],
      "optimization_techniques": [
        { "technique": "Caching optimization", "practice": "Design multi-level caching" },
        { "technique": "Database query optimization", "practice": "Design efficient database access" },
        { "technique": "Connection pooling optimization", "practice": "Design optimal connection management" },
        { "technique": "Content delivery optimization", "practice": "Design efficient content delivery" },
        { "technique": "Code optimization patterns", "practice": "Design performance-conscious code" }
      ],
      "capacity_planning": [
        { "plan": "Load forecasting", "practice": "Design capacity prediction models" },
        { "plan": "Resource provisioning", "practice": "Design auto-scaling strategies" },
        { "plan": "Performance budgeting", "practice": "Design performance constraints" },
        { "plan": "Cost-performance trade-offs", "practice": "Optimize for cost vs performance" }
      ]
    },

    "14_real_world_case_studies": {
      "scalable_systems": [
        { "system": "Twitter architecture evolution", "practice": "Design Twitter-like timeline service" },
        { "system": "Netflix microservices architecture", "practice": "Design video streaming platform" },
        { "system": "Uber real-time ride matching", "practice": "Design real-time location-based service" },
        { "system": "Airbnb search and recommendation", "practice": "Design personalized search system" },
        { "system": "WhatsApp messaging at scale", "practice": "Design real-time messaging system" }
      ],
      "data_intensive": [
        { "system": "Google search architecture", "practice": "Design web-scale search engine" },
        { "system": "Facebook news feed", "practice": "Design personalized content feed" },
        { "system": "Amazon e-commerce platform", "practice": "Design online shopping system" },
        { "system": "YouTube video streaming", "practice": "Design video platform architecture" },
        { "system": "Spotify music streaming", "practice": "Design audio streaming service" }
      ]
    },

    "15_design_process_methodology": {
      "design_process": [
        { "step": "Requirements gathering and analysis", "practice": "Extract design requirements from ambiguous specs" },
        { "step": "Back-of-the-envelope calculations", "practice": "Estimate system capacity requirements" },
        { "step": "High-level design (HLD)", "practice": "Create system architecture diagrams" },
        { "step": "Detailed design (DD)", "practice": "Design component-level details" },
        { "step": "Design review and iteration", "practice": "Conduct and participate in design reviews" },
        { "step": "Documentation and communication", "practice": "Create comprehensive design docs" }
      ],
      "design_tools": [
        { "tool": "Architecture diagram tools", "practice": "Create professional architecture diagrams" },
        { "tool": "Sequence and flow diagrams", "practice": "Document system interactions" },
        { "tool": "Capacity planning calculators", "practice": "Calculate storage, bandwidth, compute needs" },
        { "tool": "API design tools", "practice": "Design and document APIs" },
        { "tool": "Collaboration platforms for design", "practice": "Collaborate on design with teams" }
      ],
      "communication_skills": [
        { "skill": "Stakeholder presentation", "practice": "Present technical designs to non-technical audiences" },
        { "skill": "Design justification and trade-offs", "practice": "Explain design decisions and compromises" },
        { "skill": "Technical documentation writing", "practice": "Write clear, comprehensive design docs" },
        { "skill": "Design review facilitation", "practice": "Lead productive design review sessions" }
      ]
    },

    "16_interview_preparation": {
      "common_design_questions": [
        { "question": "Design URL shortening service", "practice": "Complete end-to-end design" },
        { "question": "Design social media platform", "practice": "Design scalable social network" },
        { "question": "Design ride-sharing service", "practice": "Design real-time matching system" },
        { "question": "Design video streaming service", "practice": "Design video delivery platform" },
        { "question": "Design distributed cache", "practice": "Design scalable caching system" }
      ],
      "interview_strategies": [
        { "strategy": "Clarifying questions technique", "practice": "Ask insightful clarifying questions" },
        { "strategy": "Structured problem-solving approach", "practice": "Follow systematic design process" },
        { "strategy": "Time management during interview", "practice": "Allocate time for different design aspects" },
        { "strategy": "Handling ambiguity", "practice": "Make reasonable assumptions and document them" },
        { "strategy": "Dealing with changing requirements", "practice": "Adapt design to new requirements" }
      ],
      "mock_interview_format": [
        { "phase": "Requirements clarification (5-10 mins)", "practice": "Ask clarifying questions" },
        { "phase": "High-level design (15-20 mins)", "practice": "Create architecture overview" },
        { "phase": "Deep dive on components (15-20 mins)", "practice": "Detail critical components" },
        { "phase": "Scalability discussion (10-15 mins)", "practice": "Discuss scaling strategies" },
        { "phase": "Trade-offs and summary (5 mins)", "practice": "Summarize key decisions" }
      ]
    },

    "17_practice_projects": {
      "beginner_projects": [
        { "project": "Design a note-taking application", "skills": "Basic CRUD, simple data model, API design" },
        { "project": "Design a todo list with sharing", "skills": "User management, sharing permissions, basic sync" },
        { "project": "Design a file storage service", "skills": "File upload/download, storage management, basic scaling" },
        { "project": "Design a weather application backend", "skills": "API integration, caching, rate limiting" }
      ],
      "intermediate_projects": [
        { "project": "Design a food delivery platform", "skills": "Real-time tracking, order management, payment integration" },
        { "project": "Design a hotel booking system", "skills": "Inventory management, search, booking, payments" },
        { "project": "Design a multiplayer game backend", "skills": "Real-time communication, game state sync, matchmaking" },
        { "project": "Design a stock trading platform", "skills": "Real-time data, transactions, compliance, security" }
      ],
      "advanced_projects": [
        { "project": "Design a distributed video processing pipeline", "skills": "Distributed computing, job scheduling, storage optimization" },
        { "project": "Design a global e-commerce platform", "skills": "International scaling, payment systems, inventory sync" },
        { "project": "Design a social media analytics platform", "skills": "Big data processing, real-time analytics, ML integration" },
        { "project": "Design an IoT device management platform", "skills": "Device communication, data ingestion, real-time processing" }
      ]
    },

    "18_career_development": {
      "roles_and_levels": [
        { "role": "Software Engineer (System Design Focus)", "responsibilities": "Component design, API design, scalability" },
        { "role": "Senior Software Engineer", "responsibilities": "System architecture, technical leadership, mentoring" },
        { "role": "Staff/Principal Engineer", "responsibilities": "Cross-system architecture, technical strategy, innovation" },
        { "role": "Solutions Architect", "responsibilities": "End-to-end solution design, technology selection, client consulting" },
        { "role": "Engineering Manager/Director", "responsibilities": "Team technical direction, architecture governance, resource planning" }
      ],
      "skill_progression": [
        { "level": "Junior", "skills": "Basic design patterns, simple systems, following established patterns" },
        { "level": "Mid-level", "skills": "Component design, scalability considerations, trade-off analysis" },
        { "level": "Senior", "skills": "System architecture, cross-team design, mentoring others" },
        { "level": "Staff/Principal", "skills": "Strategic technical direction, innovation, industry influence" }
      ]
    }
}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import slugify from 'slugify';

dotenv.config();

const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('advanced') || 
      lowerName.includes('large-scale') || 
      lowerName.includes('distributed') || 
      lowerName.includes('microservices') ||
      lowerName.includes('architecture patterns') ||
      lowerName.includes('expert') ||
      lowerName.includes('trade-off')) {
    return 'advanced';
  }
  
  if (lowerName.includes('scaling') || 
      lowerName.includes('caching') || 
      lowerName.includes('database design') || 
      lowerName.includes('api design') ||
      lowerName.includes('load balancing') ||
      lowerName.includes('security') ||
      lowerName.includes('intermediate')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


// Mapping Formatters specifically for creating titles/descriptions from object items
const getTitle = (item) => {
    if (typeof item === 'string') return item;
    if (item.topic) return item.topic;
    if (item.principle) return item.principle;
    if (item.property) return item.property;
    if (item.skill) return item.skill;
    if (item.component) return item.component;
    if (item.decision) return item.decision;
    if (item.pattern) return item.pattern;
    if (item.type) return item.type;
    if (item.algorithm) return item.algorithm;
    if (item.layer) return item.layer;
    if (item.strategy) return item.strategy;
    if (item.technique) return item.technique;
    if (item.plan) return item.plan;
    if (item.concept) return item.concept;
    if (item.technology) return item.technology;
    if (item.method) return item.method;
    if (item.challenge) return item.challenge;
    if (item.service) return item.service;
    if (item.pipeline) return item.pipeline;
    if (item.security) return item.security;
    if (item.metric) return item.metric;
    if (item.pillar) return item.pillar;
    if (item.process) return item.process;
    if (item.system) return item.system;
    if (item.step) return item.step;
    if (item.tool) return item.tool;
    if (item.question) return item.question;
    if (item.phase) return item.phase;
    if (item.project) return item.project;
    if (item.role) return item.role;
    if (item.level) return item.level;
    
    // Fallback
    if (typeof item === 'object') return Object.values(item)[0];
    return String(item);
};

const getContent = (item, secTitle) => {
    if (typeof item === 'string') return `## ${secTitle}\n\n${item}`;
    
    let content = `## ${secTitle}\n\n`;
    
    // Map various keys to content
    const contentKeys = [
        ['practice', 'Practice'],
        ['responsibilities', 'Key Responsibilities'],
        ['skills', 'Required Skills'],
        ['implementation', 'Implementation Details'],
        ['focus', 'Focus Areas'],
        ['usage', 'Usage'],
        ['diagnosis', 'Diagnosis Strategy'],
        ['topics', 'Topics Covered'],
        ['preparation', 'Preparation Strategy'],
        ['description', 'Description']
    ];

    contentKeys.forEach(([key, label]) => {
        if (item[key]) {
            content += `**${label}**: ${item[key]}\n\n`;
        }
    });
    
    content += `In this section, we explore ${secTitle} in the context of System Design. Use the AI Chat to simulate interview scenarios or request architecture diagrams.`;
    
    return content;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic (System Design)
    let topic = await Topic.findOne({ slug: 'system-design' });
    if (!topic) {
      console.log('ℹ️ System Design topic not found, creating...');
      topic = await Topic.create({
        name: 'System Design',
        slug: 'system-design',
        description: 'Master large-scale system architecture and design interviews',
        icon: '🏗️',
        order: 9, // Order after PostgreSQL
        isNew: true
      });
    } else {
        // Update metadata if exists to ensure it looks good
        topic.icon = '🏗️';
        topic.description = 'Master large-scale system architecture and design interviews';
        topic.isNew = true;
        await topic.save();
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

    for (const [groupKey, groupParams] of Object.entries(systemDesignCurriculum)) {
       // LEVEL 1: GROUP (Module)
       // e.g. "01_foundations_principles" -> "Foundations Principles"
       let groupName = groupKey.replace(/^\d+_/, '').split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       console.log(`  📦 Processing Group: ${groupName}`);

       let categoriesToProcess = groupParams;
       
       // Handle simplified structure (just in case)
       if (typeof groupParams !== 'object') continue;
       
       for (const [catKey, items] of Object.entries(groupParams)) {
           // LEVEL 2: CATEGORY (Chapter)
           // e.g. "design_principles" -> "Design Principles"
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
           let sectionItems = [];
           if (Array.isArray(items)) {
               sectionItems = items;
           } else if (typeof items === 'object') {
               sectionItems = Object.entries(items).map(([k, v]) => ({ topic: k, practice: v }));
           } else {
               sectionItems = [items];
           }

           let sectionOrder = 1;

           for (const item of sectionItems) {
               const secTitle = getTitle(item);
               const secContent = getContent(item, secTitle);
               
               // Deduplicate Slugs
               let baseSlug = slugify(secTitle, { lower: true, strict: true });
               if (!baseSlug) baseSlug = `section-${sectionOrder}`; // Fallback for empty/invalid titles
               
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
                  description: `Deep dive into ${secTitle}`,
                  content: secContent,
                  difficulty: categorizeDifficulty(secTitle, groupName),
                  estimatedTime: 15,
                  isNew: false,
                  isPro: categorizeDifficulty(secTitle, groupName) === 'expert', // Mark expert as pro
                  keyPoints: [secTitle, groupName]
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
