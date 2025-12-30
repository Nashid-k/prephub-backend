
const productCurriculum = {
  "Product_Thinking": {
    "product_fundamentals": {
      "product_mindset": [
        "Customer-centric product development",
        "Problem space vs solution space",
        "Jobs-to-be-done framework",
        "Product-market fit concepts",
        "Minimum viable product (MVP) thinking",
        "Product-led growth strategies"
      ],
      "product_strategy": [
        "Vision and mission alignment",
        "Product strategy formulation",
        "Competitive analysis and positioning",
        "Market segmentation and targeting",
        "Product differentiation",
        "Go-to-market strategies"
      ]
    },
    "discovery_research": {
      "user_research": [
        "User interviews and observation",
        "Surveys and questionnaires",
        "Usability testing methods",
        "Analytics and data analysis",
        "Customer feedback collection",
        "A/B testing and experimentation"
      ],
      "problem_analysis": [
        "Problem statement formulation",
        "Root cause analysis techniques",
        "Opportunity sizing and assessment",
        "Stakeholder analysis and mapping",
        "Risk assessment and mitigation",
        "Success metric definition"
      ]
    },
    "product_development": {
      "development_process": [
        "Agile product development methodologies",
        "Lean startup principles",
        "Design thinking process",
        "Dual-track agile (discovery + delivery)",
        "Product backlog management",
        "Release planning and roadmap creation"
      ],
      "feature_development": [
        "Feature prioritization frameworks (RICE, WSJF)",
        "User story mapping and journey mapping",
        "Acceptance criteria definition",
        "Definition of ready and definition of done",
        "Technical debt management",
        "Experiment design and analysis"
      ]
    },
    "metrics_analytics": {
      "success_metrics": [
        "North Star metric identification",
        "Key performance indicators (KPIs)",
        "Product analytics implementation",
        "Cohort analysis and segmentation",
        "Funnel analysis and conversion optimization",
        "Retention and engagement metrics"
      ],
      "data_driven_decisions": [
        "Hypothesis-driven development",
        "Experiment design and analysis",
        "Statistical significance testing",
        "Multi-armed bandit algorithms",
        "Causal inference techniques",
        "Predictive analytics for products"
      ]
    },
    "stakeholder_management": {
      "communication_skills": [
        "Executive communication and presentations",
        "Product requirement documentation",
        "Cross-functional team collaboration",
        "Customer communication and support",
        "Public speaking and demos",
        "Influencing without authority"
      ],
      "leadership_skills": [
        "Product vision articulation",
        "Team motivation and empowerment",
        "Conflict resolution and negotiation",
        "Decision-making frameworks",
        "Mentoring and coaching",
        "Change management"
      ]
    },
    "business_acumen": {
      "business_fundamentals": [
        "Business model canvas",
        "Unit economics and profitability",
        "Pricing strategies and models",
        "Cost-benefit analysis",
        "Return on investment (ROI) calculation",
        "Business case development"
      ],
      "market_dynamics": [
        "Industry analysis and trends",
        "Competitive landscape mapping",
        "Regulatory and compliance considerations",
        "Partnership and ecosystem development",
        "Intellectual property considerations",
        "Global expansion strategies"
      ]
    },
    "faang_interview_focus": [
      "Design products from concept to launch",
      "Prioritize features and manage backlogs",
      "Analyze and interpret product metrics",
      "Conduct user research and testing",
      "Create product roadmaps and strategies",
      "Make data-driven product decisions"
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
  
  if (lowerName.includes('strategy') || 
      lowerName.includes('economics') || 
      lowerName.includes('causal') || 
      lowerName.includes('statistical') ||
      lowerName.includes('leadership') ||
      lowerName.includes('executive') ||
      lowerName.includes('global') ||
      lowerName.includes('negotiation')) {
    return 'advanced';
  }
  
  if (lowerName.includes('metrics') || 
      lowerName.includes('analytics') || 
      lowerName.includes('optimization') || 
      lowerName.includes('management') ||
      lowerName.includes('prioritization')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of Product Thinking.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Building products users love\n- Aligning business goals with user needs\n\n### Practical Application\nUse the AI Chat to ask for help with product case studies (e.g., designing a new feature for Instagram), prioritizing a roadmap using RICE, or analyzing hypothetical A/B test results.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic
    let topic = await Topic.findOne({ slug: 'product-thinking' });
    if (!topic) {
      console.log('ℹ️ Product Thinking topic not found, creating...');
      topic = await Topic.create({
        name: 'Product Thinking',
        slug: 'product-thinking',
        description: 'Master product strategy, discovery, metrics, and stakeholder management',
        icon: '💡', // Lightbulb for ideas/innovation
        order: 20, 
        isNew: true
      });
    } else {
        topic.icon = '💡';
        topic.description = 'Master product strategy, discovery, metrics, and stakeholder management';
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

    const rootContent = productCurriculum.Product_Thinking;

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
                  keyPoints: [secTitle, 'Product', 'Interview']
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
