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

const dotnetData = {
  "01_C_Sharp_Fundamentals": {
    "basics": [
      "Syntax & Data Types",
      "Control Flow & Loops",
      "Methods & Parameters",
      "Classes & Structs"
    ],
    "oop_principles": [
      "Inheritance & Polymorphism",
      "Interfaces & Abstract Classes",
      "Encapsulation",
      "Generics"
    ],
    "advanced_c_sharp": [
      "LINQ (Language Integrated Query)",
      "Async/Await Patterns",
      "Delegates & Events",
      "Memory Management (Garbage Collection)"
    ]
  },
  "02_Dotnet_Core_Platform": {
    "infrastructure": [
      "Dependency Injection (DI)",
      "Configuration (appsettings.json)",
      "Middleware Pipeline",
      "Global Exception Handling"
    ],
    "cli_tools": [
      "dotnet CLI Commands",
      "NuGet Package Management",
      "Project Solution Structure",
      "Publishing & Deployment"
    ]
  },
  "03_ASP_NET_Core_Web": {
    "web_api": [
      "RESTful API Design",
      "Controllers & Actions",
      "Model Binding & Validation",
      "Content Negotiation"
    ],
    "mvc_pattern": [
      "Razor Views & Tag Helpers",
      "View Components",
      "Filters & Attributes",
      "Routing Strategies"
    ]
  },
  "04_Data_Access_EF_Core": {
    "entity_framework": [
      "DbContext & DbSet",
      "Code First Migrations",
      "Relationships (1-1, 1-N, N-N)",
      "Querying with LINQ"
    ],
    "performance": [
      "Lazy vs Eager Loading",
      "Tracking vs NoTracking",
      "Raw SQL Queries",
      "Transactions & Concurrency"
    ]
  },
  "05_Advanced_Architecture": {
    "microservices": [
      "Microservices Patterns",
      "Inter-Service Communication (gRPC)",
      "Event-Driven Architecture (RabbitMQ)",
      "API Gateway (Ocelot/YARP)"
    ],
    "testing": [
      "Unit Testing (xUnit/NUnit)",
      "Mocking (Moq)",
      "Integration Testing",
      "Test Driven Development (TDD)"
    ],
    "security": [
      "Authentication (JWT/OAuth)",
      "Authorization Policies",
      "CORS & CSRF Protection",
      "Secrets Management"
    ]
  }
};

const formatName = (key) => {
  return key.replace(/^[0-9]+_/, '').split('_')
    .map(word => {
        if (word === 'C') return 'C#';
        if (word === 'EF') return 'EF';
        if (word === 'ASP') return 'ASP';
        if (word === 'NET') return 'NET';
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
    const topicSlug = 'dotnet'; // Renamed from C# to allow broader scope
    const topicName = '.NET Development';
    
    // 1. Find or Create Topic
    let topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      topic = await Topic.create({
        name: topicName,
        slug: topicSlug,
        description: 'Comprehensive guide to C#, ASP.NET Core, and Enterprise Architecture.',
        icon: 'dotnet', 
        order: 22
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
    for (const [categoryKey, categoryContent] of Object.entries(dotnetData)) {
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
                    description: `Master ${sectionTitle} in .NET.`,
                    content: `Content for ${sectionTitle}`,
                    order: sectionOrder++,
                    isCompleted: false
                });
              }
          }
      }
      console.log(`  - Added sections from sub-groups`);
    }

    console.log('✅ .NET Development seeding complete!');
    
  } catch (error) {
    console.error('Error seeding .NET:', error);
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
