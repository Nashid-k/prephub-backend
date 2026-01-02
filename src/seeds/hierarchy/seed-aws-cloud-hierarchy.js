
const awsCurriculum = {

  "01_cloud_foundations": {
    "core_concepts": [
      "Global Infrastructure",
      "Regions & Availability Zones",
      "IAM (Identity & Access Management)",
      "Shared Responsibility Model",
      "Billing & Cost Management",
      "AWS CLI Configuration"
    ],
    "security_identity": [
      "Root User vs IAM Users",
      "MFA & Access Keys",
      "Least Privilege Principle",
      "AWS Organizations"
    ]
  },

  "02_networking_fundamentals": {
    "vpc_fundamentals": [
      "VPC, Subnets, CIDR",
      "Route Tables",
      "Internet & NAT Gateways",
      "VPC Peering",
      "Transit Gateway"
    ],
    "load_balancing": [
      "Application Load Balancer (ALB)",
      "Network Load Balancer (NLB)",
      "Target Groups",
      "Sticky Sessions"
    ]
  },

  "03_storage_and_databases": {
    "object_storage": [
      "S3 Buckets & Objects",
      "Storage Classes (Standard/Glacier)",
      "Versioning & Lifecycle Policies",
      "Presigned URLs",
      "S3 Security & Encryption"
    ],
    "relational_databases": [
      "RDS (Relational Database Service)",
      "Aurora (Serverless DB)",
      "Read Replicas & Multi-AZ",
      "Proxy & Connection Pools",
      "Data Migration Service (DMS)"
    ],
    "nosql_databases": [
      "DynamoDB Tables & Items",
      "Partition Keys & Sort Keys",
      "GSI vs LSI Indexes",
      "Streams & Triggers",
      "DAX (DynamoDB Accelerator)"
    ],
    "caching_storage": [
      "ElastiCache (Redis/Memcached)",
      "EFS (Elastic File System)",
      "Storage Gateway",
      "Snow Family"
    ]
  },

  "04_compute_services": {
    "ec2_instances": [
      "EC2 Instance Types & Families",
      "EBS Volumes & Snapshots",
      "Security Groups & NACLs",
      "User Data & Bootstrapping",
      "Placement Groups"
    ],
    "container_services": [
      "ECS vs EKS Overview",
      "ECR (Container Registry)",
      "Fargate (Serverless Containers)",
      "App Runner",
      "Lightsail Containers"
    ],
    "serverless_compute": [
      "Lambda Function Anatomy",
      "Triggers & Event Sources",
      "Lambda Layers",
      "Cold Starts & Optimization",
      "Step Functions Orchestration"
    ]
  },

  "05_edge_and_content_delivery": {
    "edge_services": [
      "Route 53 (DNS Management)",
      "CloudFront (CDN) Distribution",
      "API Gateway (REST/HTTP/WebSocket)",
      "Global Accelerator",
      "WAF & Shield"
    ]
  },

  "06_messaging_and_integration": {
    "messaging_integration": [
      "SQS (Simple Queue Service)",
      "SNS (Simple Notification Service)",
      "EventBridge (Event Bus)",
      "Kinesis Data Streams",
      "MQ (Message Broker)"
    ]
  },

  "07_monitoring_and_observability": {
    "monitoring_observability": [
      "CloudWatch Metrics & Alarms",
      "CloudWatch Logs & Insights",
      "CloudTrail Auditing",
      "X-Ray Tracing",
      "Config Rules"
    ]
  },

  "08_security_and_identity_services": {
    "security_compliance": [
      "Cognito (User Pools)",
      "KMS (Key Management Service)",
      "Secrets Manager",
      "GuardDuty",
      "Inspector"
    ]
  },

  "09_infrastructure_as_code": {
    "infrastructure_as_code": [
      "CloudFormation Templates",
      "AWS CDK (Cloud Development Kit)",
      "Terraform on AWS",
      "Drift Detection",
      "StackSets"
    ]
  },

  "10_devops_and_cicd": {
    "devops_cicd": [
      "CodeCommit (Git)",
      "CodeBuild (CI)",
      "CodeDeploy (CD)",
      "CodePipeline (Orchestration)",
      "Elastic Beanstalk"
    ]
  }

};


export { awsCurriculum };
