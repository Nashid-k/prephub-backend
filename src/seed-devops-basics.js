
const devopsCurriculum = {
  "DevOps_Basics": {
    "devops_culture": {
      "principles_practices": [
        "DevOps culture and mindset transformation",
        "CALMS framework (Culture, Automation, Lean, Measurement, Sharing)",
        "Site Reliability Engineering (SRE) principles",
        "Shift-left testing and quality",
        "Continuous improvement and blameless culture",
        "DevSecOps integration"
      ],
      "collaboration_tools": [
        "Version control workflows (GitFlow, GitHub Flow)",
        "Code review best practices",
        "Documentation as code",
        "Knowledge sharing platforms",
        "Incident communication tools",
        "Team metrics and visibility"
      ]
    },
    "infrastructure_as_code": {
      "iac_concepts": [
        "Declarative vs imperative infrastructure",
        "Idempotent infrastructure operations",
        "Immutable infrastructure patterns",
        "Configuration drift detection and prevention",
        "State management in IaC",
        "Infrastructure testing strategies"
      ],
      "iac_tools": [
        "Terraform for cloud provisioning",
        "Ansible for configuration management",
        "Pulumi for programming language IaC",
        "CloudFormation for AWS infrastructure",
        "Chef and Puppet alternatives",
        "Crossplane for Kubernetes-native infrastructure"
      ]
    },
    "ci_cd_pipelines": {
      "continuous_integration": [
        "Build automation and artifact management",
        "Automated testing strategies",
        "Code quality gates and static analysis",
        "Dependency management and security scanning",
        "Build optimization and caching",
        "Monorepo vs polyrepo strategies"
      ],
      "continuous_delivery": [
        "Deployment strategies (blue-green, canary, rolling)",
        "Feature flag management",
        "Environment management and promotion",
        "Release orchestration",
        "Rollback strategies and automation",
        "Progressive delivery techniques"
      ]
    },
    "containerization": {
      "container_basics": [
        "Container architecture and isolation",
        "Dockerfile best practices",
        "Image optimization and security scanning",
        "Container registry management",
        "Multi-stage builds",
        "Rootless containers"
      ],
      "orchestration": [
        "Kubernetes architecture and components",
        "Pod design and scheduling",
        "Service discovery and load balancing",
        "ConfigMaps and Secrets management",
        "Auto-scaling strategies (HPA, VPA)",
        "Service mesh implementation (Istio, Linkerd)"
      ]
    },
    "monitoring_logging": {
      "observability_stack": [
        "Metrics collection and alerting",
        "Centralized logging (ELK, Loki)",
        "Distributed tracing implementation",
        "Dashboard creation and management",
        "Log aggregation and analysis",
        "Performance monitoring"
      ],
      "incident_management": [
        "On-call rotations and escalation",
        "Incident response automation",
        "Post-mortem culture and processes",
        "Alert fatigue prevention",
        "Runbook creation and maintenance",
        "Service Level Objectives (SLO) management"
      ]
    },
    "cloud_infrastructure": {
      "cloud_concepts": [
        "Cloud service models (IaaS, PaaS, SaaS, FaaS)",
        "Multi-cloud and hybrid cloud strategies",
        "Cloud cost optimization and FinOps",
        "Cloud security best practices",
        "Disaster recovery in cloud",
        "Cloud migration strategies"
      ],
      "cloud_services": [
        "Compute services (VMs, containers, serverless)",
        "Storage services (object, block, file)",
        "Database services (managed RDBMS, NoSQL)",
        "Networking services (VPC, load balancers, CDN)",
        "Identity and access management",
        "Monitoring and logging services"
      ]
    },
    "faang_interview_focus": [
      "Design CI/CD pipelines for complex applications",
      "Implement infrastructure as code at scale",
      "Containerize and orchestrate microservices",
      "Design monitoring and alerting systems",
      "Implement cloud infrastructure best practices",
      "Handle incident response and post-mortems"
    ]
  }
}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';
import slugify from 'slugify';

dotenv.config();

const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('kubernetes') || 
      lowerName.includes('orchestration') || 
      lowerName.includes('infrastructure as code') || 
      lowerName.includes('terraform') ||
      lowerName.includes('pipeline') ||
      lowerName.includes('monitoring') ||
      lowerName.includes('sre') ||
      lowerName.includes('microservices')) {
    return 'advanced';
  }
  
  if (lowerName.includes('automation') || 
      lowerName.includes('testing') || 
      lowerName.includes('docker') || 
      lowerName.includes('cloud') ||
      lowerName.includes('deployment') ||
      lowerName.includes('integration')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of DevOps.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Best practices and industry standards\n- Tools and technologies involved\n\n### Practical Application\nUse the AI Chat to ask for specific configurations (e.g., Kubernetes manifests, GitHub Actions workflows, Terraform HCL), debugging deployment issues, or optimizing CI/CD pipelines.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic
    let topic = await Topic.findOne({ slug: 'devops-basics' });
    if (!topic) {
      console.log('ℹ️ DevOps topic not found, creating...');
      topic = await Topic.create({
        name: 'DevOps Basics',
        slug: 'devops-basics',
        description: 'Master CI/CD, Containerization, Infrastructure as Code, and Cloud',
        icon: '🚀', // Rocket for deployment/speed
        order: 17, 
        isNew: true
      });
    } else {
        topic.icon = '🚀';
        topic.description = 'Master CI/CD, Containerization, Infrastructure as Code, and Cloud';
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
    const usedSlugs = new Set(); 

    const rootContent = devopsCurriculum.DevOps_Basics;

    for (const [groupKey, groupParams] of Object.entries(rootContent)) {
       // LEVEL 1: GROUP (Module)
       let groupName = groupKey.replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       if (Array.isArray(groupParams)) {
           // Case: The group IS the category (e.g. FAANG Interview Focus)
           let catName = groupName; 
           
           const category = await Category.create({
                name: catName,
                slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }),
                topicId: topic._id,
                order: categoryOrder++,
                description: `Chapter on ${catName}`,
                group: 'Interview Prep' 
           });
           
           console.log(`    📂 Created Direct Category: ${catName}`);
           
           let sectionOrder = 1;

           for (const item of groupParams) {
               const secTitle = getTitle(item);
               const secContent = getContent(item, secTitle);
               
               let baseSlug = slugify(secTitle, { lower: true, strict: true });
               if (!baseSlug) baseSlug = `section-${sectionOrder}`;
               
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
                  difficulty: 'advanced',
                  estimatedTime: 20,
                  isNew: false,
                  isPro: true,
                  keyPoints: [secTitle, 'DevOps', 'Interview']
               });
               totalSections++;
           }

       } else {
           // Standard Case: Group -> Object of Categories
           console.log(`  📦 Processing Group: ${groupName}`);

           for (const [catKey, items] of Object.entries(groupParams)) {
               // LEVEL 2: CATEGORY
               let catName = catKey.replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

               const category = await Category.create({
                name: catName,
                slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }), 
                topicId: topic._id,
                order: categoryOrder++,
                description: `Chapter on ${catName}`,
                group: groupName 
               });
               
               console.log(`    📂 Created Category: ${catName} (Group: ${groupName})`);

               // LEVEL 3: SECTIONS
               let sectionItems = items; 
               
               let sectionOrder = 1;

               for (const item of sectionItems) {
                   const secTitle = getTitle(item);
                   const secContent = getContent(item, secTitle);
                   
                   let baseSlug = slugify(secTitle, { lower: true, strict: true });
                   if (!baseSlug) baseSlug = `section-${sectionOrder}`;
                   
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
                      isPro: categorizeDifficulty(secTitle, groupName) === 'advanced',
                      keyPoints: [secTitle, groupName]
                   });
                   
                   totalSections++;
               }
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
