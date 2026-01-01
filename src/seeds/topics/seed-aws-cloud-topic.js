import mongoose from 'mongoose';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import { assignGroup } from '../utils/categoryGrouping.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const awsData = {
  "01_Cloud_Fundamentals": {
    "core_concepts": [
      "Regions & Availability Zones",
      "IAM (Identity & Access Management)",
      "Billing & Cost Management",
      "AWS CLI Configuration"
    ],
    "security_basics": [
      "Shared Responsibility Model",
      "Root User vs IAM Users",
      "MFA & Access Keys",
      "Least Privilege Principle"
    ]
  },
  "02_Compute_Services": {
    "ec2_basics": [
      "EC2 Instance Types",
      "EBS Volumes & Snapshots",
      "Security Groups & Key Pairs",
      "User Data & Bootstrapping"
    ],
    "serverless_lambda": [
      "Lambda Functions Basics",
      "Triggers & Event Sources",
      "Layers & Versions",
      "Cold Starts & Optimization"
    ],
    "containers": [
      "ECS vs EKS Overview",
      "Fargate (Serverless Containers)",
      "ECR (Container Registry)",
      "App Runner"
    ]
  },
  "03_Storage_Databases": {
    "object_storage": [
      "S3 Buckets & Objects",
      "Storage Classes (Standard/Glacier)",
      "Versioning & Lifecycle Policies",
      "Presigned URLs"
    ],
    "relational_db": [
      "RDS (Relational Database Service)",
      "Aurora (Serverless DB)",
      "Read Replicas & Multi-AZ",
      "Data Migration Service (DMS)"
    ],
    "nosql_db": [
      "DynamoDB Tables & Items",
      "Partition Keys & Sort Keys",
      "GSI vs LSI Indexes",
      "DAX (DynamoDB Accelerator)"
    ]
  },
  "04_Networking_Content_Delivery": {
    "vpc_fundamentals": [
      "VPC, Subnets, CIDR",
      "Internet Gateways & NAT Gateways",
      "Route Tables & NACLs",
      "VPC Peering"
    ],
    "delivery": [
      "CloudFront (CDN) Basics",
      "Route 53 (DNS)",
      "API Gateway (REST/HTTP)",
      "Load Balancers (ALB/NLB)"
    ]
  },
  "05_Advanced_Architecture": {
    "monitoring_iac": [
      "CloudWatch Metrics & Logs",
      "CloudTrail Auditing",
      "CloudFormation (IaC)",
      "AWS CDK Basics"
    ],
    "messaging": [
      "SQS (Simple Queue Service)",
      "SNS (Simple Notification Service)",
      "EventBridge (Event Bus)",
      "Kinesis Data Streams"
    ],
    "well_architected": [
      "Operational Excellence",
      "Security Pillar",
      "Reliability & Performance",
      "Cost Optimization"
    ]
  }
};

const formatName = (key) => {
  return key.replace(/^[0-9]+_/, '').split('_')
    .map(word => {
        if (word === 'AWS' || word === 'IAM' || word === 'VPC' || word === 'EC2') return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const generateUniqueSlug = async (model, baseSlug, field = 'slug') => {
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (await model.findOne({ [field]: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  return uniqueSlug;
};

const seedTopic = async () => {
  try {
    const topicSlug = 'aws-cloud'; 
    const topicName = 'AWS Cloud';
    
    // 1. Find or Create Topic
    let topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      topic = await Topic.create({
        name: topicName,
        slug: topicSlug,
        description: 'Comprehensive guide to Amazon Web Services (AWS) from basics to architecture.',
        icon: 'cloud', // Assuming icon
        order: 23
      });
      console.log(`Created Topic: ${topicName}`);
    } else {
      console.log(`Topic exists: ${topicName}`);
    }

    // 2. Refresh Categories
    console.log('Clearing existing categories...');
    await Category.deleteMany({ topicId: topic._id });
    
    // 3. Seed Categories & Sections
    let order = 1;
    for (const [categoryKey, categoryContent] of Object.entries(awsData)) {
      const categoryName = formatName(categoryKey);
      const categorySlug = await generateUniqueSlug(Category, categoryKey.toLowerCase().replace(/_/g, '-'));
      
      const group = await assignGroup(categoryName, topicSlug);
      
      const category = await Category.create({
        name: categoryName,
        slug: categorySlug,
        description: `Learn about ${categoryName}`,
        topicId: topic._id,
        group: group, 
        order: order++
      });
      
      console.log(`Created Category: ${categoryName} (Group: ${group})`);

      // Sections
      let sectionOrder = 1;
      for (const [subKey, sections] of Object.entries(categoryContent)) {
          if (Array.isArray(sections)) {
              for (const sectionTitle of sections) {
                const sectionSlug = await generateUniqueSlug(Section, sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                
                await Section.create({
                    topicId: topic._id,
                    categoryId: category._id,
                    title: sectionTitle,
                    slug: sectionSlug,
                    description: `Master ${sectionTitle} in AWS.`,
                    content: `Content for ${sectionTitle}`,
                    order: sectionOrder++,
                    isCompleted: false
                });
              }
          }
      }
      console.log(`  - Added sections from sub-groups`);
    }

    console.log('✅ AWS Cloud seeding complete!');
    
  } catch (error) {
    console.error('Error seeding AWS Cloud:', error);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prephub')
    .then(() => seedTopic())
    .then(() => mongoose.disconnect())
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

export default seedTopic;
