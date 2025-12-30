
const testingCurriculum = {
  "Testing_Strategy": {
    "testing_fundamentals": {
      "testing_principles": [
        "Testing pyramid and testing trophy concepts",
        "Test-driven development (TDD) methodology",
        "Behavior-driven development (BDD) practices",
        "Shift-left testing approach",
        "Testing as documentation",
        "Risk-based testing strategies"
      ],
      "testing_types": [
        "Unit testing principles and best practices",
        "Integration testing strategies",
        "System/end-to-end testing approaches",
        "Performance and load testing",
        "Security testing methodologies",
        "Usability and accessibility testing"
      ]
    },
    "test_automation": {
      "automation_frameworks": [
        "Test framework selection criteria",
        "Test data management strategies",
        "Test environment management",
        "Parallel test execution",
        "Test reporting and dashboards",
        "Flaky test detection and management"
      ],
      "test_design": [
        "Test case design techniques",
        "Boundary value analysis",
        "Equivalence partitioning",
        "State transition testing",
        "Combinatorial testing",
        "Model-based testing"
      ]
    },
    "test_infrastructure": {
      "ci_cd_integration": [
        "Test execution in CI/CD pipelines",
        "Test parallelization strategies",
        "Test result analysis and reporting",
        "Quality gates and thresholds",
        "Performance test automation",
        "Security test automation"
      ],
      "test_environment": [
        "Test environment provisioning",
        "Test data generation and management",
        "Mocking and stubbing strategies",
        "Service virtualization",
        "Database testing strategies",
        "Network testing considerations"
      ]
    },
    "advanced_testing": {
      "property_based_testing": [
        "Property-based testing concepts",
        "QuickCheck and Hypothesis frameworks",
        "Generative testing approaches",
        "Model checking and verification",
        "Fuzz testing strategies",
        "Mutation testing"
      ],
      "chaos_testing": [
        "Chaos engineering principles",
        "Failure injection testing",
        "Resilience testing strategies",
        "Disaster recovery testing",
        "Game day exercises",
        "A/B testing and canary analysis"
      ]
    },
    "testing_microservices": {
      "distributed_testing": [
        "Contract testing for microservices",
        "Consumer-driven contract testing",
        "Service virtualization for testing",
        "End-to-end testing strategies",
        "Performance testing in distributed systems",
        "Resilience testing patterns"
      ],
      "api_testing": [
        "API contract testing",
        "API performance testing",
        "API security testing",
        "API documentation testing",
        "API version compatibility testing",
        "API load and stress testing"
      ]
    },
    "testing_metrics": {
      "quality_metrics": [
        "Test coverage metrics and interpretation",
        "Defect density and escape rate",
        "Mean time to detection (MTTD)",
        "Test effectiveness measurement",
        "Test maintenance costs",
        "Return on testing investment"
      ],
      "continuous_improvement": [
        "Test strategy optimization",
        "Test automation ROI analysis",
        "Testing process improvement",
        "Test tool evaluation and selection",
        "Testing skills development",
        "Testing community building"
      ]
    },
    "faang_interview_focus": [
      "Design testing strategies for complex systems",
      "Implement effective test automation",
      "Handle testing for distributed systems",
      "Measure and improve test effectiveness",
      "Integrate testing into CI/CD pipelines",
      "Test for security and performance"
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
  
  if (lowerName.includes('chaos') || 
      lowerName.includes('property-based') || 
      lowerName.includes('fuzz') || 
      lowerName.includes('mutation') ||
      lowerName.includes('distributed') ||
      lowerName.includes('microservice') ||
      lowerName.includes('performance') ||
      lowerName.includes('security')) {
    return 'advanced';
  }
  
  if (lowerName.includes('automation') || 
      lowerName.includes('integration') || 
      lowerName.includes('environment') || 
      lowerName.includes('design') ||
      lowerName.includes('metrics')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of Testing Strategy.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Effective testing methodologies\n- Ensuring software quality and reliability\n\n### Practical Application\nUse the AI Chat to ask for specific test cases (e.g., unit tests for a specific function, integration tests for an API endpoint), configuring test runners, or implementing chaos engineering experiments.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic
    let topic = await Topic.findOne({ slug: 'testing-strategy' });
    if (!topic) {
      console.log('ℹ️ Testing Strategy topic not found, creating...');
      topic = await Topic.create({
        name: 'Testing Strategy',
        slug: 'testing-strategy',
        description: 'Master TDD, BDD, test automation, and advanced testing methodologies',
        icon: '✅', // Check mark for passing tests
        order: 19, 
        isNew: true
      });
    } else {
        topic.icon = '✅';
        topic.description = 'Master TDD, BDD, test automation, and advanced testing methodologies';
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

    const rootContent = testingCurriculum.Testing_Strategy;

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
                  keyPoints: [secTitle, 'Testing', 'Interview']
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
