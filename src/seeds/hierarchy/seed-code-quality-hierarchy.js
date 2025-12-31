
const codeQualityCurriculum = {
  "Code_Quality_Engineering_Practices": {
    "code_quality_fundamentals": {
      "quality_attributes": [
        "Readability vs writability trade-offs",
        "Maintainability and technical debt management",
        "Testability and observability",
        "Performance and efficiency considerations",
        "Security and robustness",
        "Usability and developer experience"
      ],
      "code_metrics": [
        "Cyclomatic complexity analysis",
        "Cognitive complexity measurement",
        "Code churn and hotspot identification",
        "Technical debt quantification",
        "Code coverage metrics",
        "Static analysis metrics"
      ]
    },
    "design_principles": {
      "solid_principles": [
        "Single Responsibility Principle (SRP)",
        "Open/Closed Principle (OCP)",
        "Liskov Substitution Principle (LSP)",
        "Interface Segregation Principle (ISP)",
        "Dependency Inversion Principle (DIP)",
        "Practical application of SOLID"
      ],
      "design_patterns": [
        "Creational patterns (Factory, Builder, Singleton)",
        "Structural patterns (Adapter, Decorator, Facade)",
        "Behavioral patterns (Strategy, Observer, Command)",
        "Architectural patterns (MVC, MVP, MVVM)",
        "Anti-patterns and their avoidance",
        "Pattern selection criteria"
      ]
    },
    "refactoring_techniques": {
      "refactoring_catalog": [
        "Extract method and inline method",
        "Move method and move field",
        "Replace conditional with polymorphism",
        "Introduce parameter object",
        "Compose method and extract class",
        "Remove dead code and duplication"
      ],
      "refactoring_strategies": [
        "Boy Scout Rule implementation",
        "Test-driven refactoring",
        "Large-scale refactoring approaches",
        "Database schema refactoring",
        "API evolution and refactoring",
        "Refactoring legacy systems"
      ]
    },
    "code_review_practices": {
      "review_process": [
        "Effective code review workflows",
        "Review comment best practices",
        "Automated review tools integration",
        "Pull request size and scope management",
        "Review velocity and throughput optimization",
        "Remote code review techniques"
      ],
      "review_content": [
        "Architecture and design reviews",
        "Security vulnerability identification",
        "Performance implications analysis",
        "Testing strategy validation",
        "Documentation completeness",
        "Operational considerations"
      ]
    },
    "documentation_practices": {
      "documentation_types": [
        "API documentation (OpenAPI, JSDoc)",
        "Architecture decision records (ADRs)",
        "Runbooks and operational procedures",
        "Onboarding and contributor guides",
        "Design documents and RFCs",
        "Code comments and inline documentation"
      ],
      "documentation_tooling": [
        "Documentation as code workflows",
        "Static site generators (Docusaurus, MkDocs)",
        "Diagram as code (PlantUML, Mermaid)",
        "Interactive documentation",
        "Documentation testing and validation",
        "Documentation localization"
      ]
    },
    "engineering_excellence": {
      "best_practices": [
        "Code style guides and consistency",
        "Error handling strategies",
        "Logging and monitoring instrumentation",
        "Configuration management",
        "Feature flag implementation",
        "Experimentation frameworks"
      ],
      "tools_frameworks": [
        "Static analysis tools (SonarQube, ESLint)",
        "Code formatters (Prettier, Black)",
        "Dependency management tools",
        "Build optimization tools",
        "Performance profiling tools",
        "Security scanning tools"
      ]
    },
    "faang_interview_focus": [
      "Design scalable and maintainable systems",
      "Write clean, efficient, and secure code",
      "Conduct effective code reviews",
      "Refactor complex legacy systems",
      "Document architectural decisions",
      "Implement engineering best practices"
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
  
  if (lowerName.includes('architectural patterns') || 
      lowerName.includes('large-scale') || 
      lowerName.includes('legacy systems') || 
      lowerName.includes('anti-patterns') ||
      lowerName.includes('complexity') ||
      lowerName.includes('security') ||
      lowerName.includes('metric')) {
    return 'advanced';
  }
  
  if (lowerName.includes('solid') || 
      lowerName.includes('refactoring') || 
      lowerName.includes('testing') || 
      lowerName.includes('monitoring') ||
      lowerName.includes('documentation') ||
      lowerName.includes('review')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of Code Quality.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Improving code maintainability and readability\n- Industry best practices and tools\n\n### Practical Application\nUse the AI Chat to ask for specific refactoring examples (e.g., extracting a method, implementing the Factory pattern), code review checklists, or configuring static analysis tools.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic
    let topic = await Topic.findOne({ slug: 'code-quality' });
    if (!topic) {
      console.log('ℹ️ Code Quality topic not found, creating...');
      topic = await Topic.create({
        name: 'Code Quality',
        slug: 'code-quality',
        description: 'Master clean code, design patterns, refactoring, and engineering best practices',
        icon: '💎', // Diamond for quality/value
        order: 18, 
        isNew: true
      });
    } else {
        topic.icon = '💎';
        topic.description = 'Master clean code, design patterns, refactoring, and engineering best practices';
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

    const rootContent = codeQualityCurriculum.Code_Quality_Engineering_Practices;

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
                  keyPoints: [secTitle, 'Code Quality', 'Interview']
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
