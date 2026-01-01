
const awsCurriculum = {
  "Cloud_Foundations": {
    "core_concepts": [
      "Regions & Availability Zones",
      "IAM (Identity & Access Management)",
      "Billing & Cost Management",
      "AWS CLI Configuration",
      "Global Infrastructure"
    ],
    "security_identity": [
      "Shared Responsibility Model",
      "Root User vs IAM Users",
      "MFA & Access Keys",
      "Least Privilege Principle",
      "AWS Organizations"
    ]
  },
  "Compute_Services": {
    "ec2_instances": [
      "EC2 Instance Types & Families",
      "EBS Volumes & Snapshots",
      "Security Groups & NACLs",
      "User Data & Bootstrapping",
      "Placement Groups"
    ],
    "serverless_compute": [
      "Lambda Function Anatomy",
      "Triggers & Event Sources",
      "Lambda Layers",
      "Cold Starts & Optimization",
      "Step Functions Orchestration"
    ],
    "container_services": [
      "ECS vs EKS Overview",
      "Fargate (Serverless Containers)",
      "ECR (Container Registry)",
      "App Runner",
      "Lightsail Containers"
    ]
  },
  "Storage_Databases": {
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
      "Data Migration Service (DMS)",
      "Proxy & Connection Pools"
    ],
    "nosql_databases": [
      "DynamoDB Tables & Items",
      "Partition Keys & Sort Keys",
      "GSI vs LSI Indexes",
      "DAX (DynamoDB Accelerator)",
      "Streams & Triggers"
    ],
    "caching_storage": [
      "ElastiCache (Redis/Memcached)",
      "EFS (Elastic File System)",
      "Storage Gateway",
      "Snow Family"
    ]
  },
  "Networking_Content_Delivery": {
    "vpc_fundamentals": [
      "VPC, Subnets, CIDR",
      "Internet & NAT Gateways",
      "Route Tables",
      "VPC Peering",
      "Transit Gateway"
    ],
    "edge_services": [
      "CloudFront (CDN) Distribution",
      "Route 53 (DNS Management)",
      "API Gateway (REST/HTTP/WebSocket)",
      "Global Accelerator",
      "WAF & Shield"
    ],
    "load_balancing": [
      "Application Load Balancer (ALB)",
      "Network Load Balancer (NLB)",
      "Target Groups",
      "Sticky Sessions"
    ]
  },
  "Advanced_Architecture": {
    "monitoring_observability": [
      "CloudWatch Metrics & Alarms",
      "CloudWatch Logs & Insights",
      "CloudTrail Auditing",
      "X-Ray Tracing",
      "Config Rules"
    ],
    "messaging_integration": [
      "SQS (Simple Queue Service)",
      "SNS (Simple Notification Service)",
      "EventBridge (Event Bus)",
      "Kinesis Data Streams",
      "MQ (Message Broker)"
    ],
    "infrastructure_as_code": [
      "CloudFormation Templates",
      "AWS CDK (Cloud Development Kit)",
      "Terraform on AWS",
      "Drift Detection",
      "StackSets"
    ],
    "devops_cicd": [
      "CodeCommit (Git)",
      "CodeBuild (CI)",
      "CodeDeploy (CD)",
      "CodePipeline (Orchestration)",
      "Elastic Beanstalk"
    ],
    "security_compliance": [
      "Cognito (User Pools)",
      "KMS (Key Management Service)",
      "Secrets Manager",
      "GuardDuty",
      "Inspector"
    ]
  }
};

export { awsCurriculum };
