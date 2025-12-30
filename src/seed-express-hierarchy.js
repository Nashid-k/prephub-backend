import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { geminiModel } from './config/ai-clients.js';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';

dotenv.config();

/**
 * Difficulty categorization for Express.js topics
 */
const categorizeDifficulty = (categoryName, sectionTitle) => {
  const advancedKeywords = ['session', 'authentication', 'security', 'scaling', 'performance', 'template'];
  const beginnerKeywords = ['why', 'basic', 'intro', 'starting', 'simple', 'getting started'];
  
  const combined = `${categoryName} ${sectionTitle}`.toLowerCase();
  
  if (advancedKeywords.some(kw => combined.includes(kw))) return 'advanced';
  if (beginnerKeywords.some(kw => combined.includes(kw))) return 'beginner';
  return 'intermediate';
};

/**
 * Express.js Complete Curriculum - 5 Phases
 */
const expressCurriculum = {
  "express_fundamentals": {
    name: "Express.js Fundamentals",
    subcategories: {
      "why_express": ["Why Express is needed", "Express vs http server"],
      "getting_started": ["Starting an Express app", "Listening on host and port"],
      "core_apis": ["Core Express APIs", "app.get", "app.post", "app.all"],
      "request_response": ["req object", "res.send", "res.json", "Difference between res.send vs res.json"],
      "body_parsing": ["Body Parsing", "body-parser", "express.json", "express.urlencoded"],
      "static_files": ["Static Files", "express.static"]
    }
  },
  "routing_and_parameters": {
    name: "Routing & Parameters",
    subcategories: {
      "routing_basics": ["Route", "Express.Router", "Router chaining"],
      "dynamic_routing": ["Dynamic routing", "Path params", "Query params"],
      "parameter_extraction": ["req.params", "req.query", "Params vs Query", "Body vs Params vs Query"]
    }
  },
  "express_middleware": {
    name: "Express Middleware",
    subcategories: {
      "middleware_basics": ["Middleware", "Types of middleware", "Middleware creation", "Parameters in middleware", "next() function"],
      "configuration": ["app.use", "app.set", "app.locals"],
      "middleware_practicals": [
        "Restrict middleware to a route",
        "Middleware to block POST requests",
        "Middleware to block requests",
        "Middleware to log incoming parameters"
      ]
    }
  },
  "template_engines": {
    name: "Template Engines (Optional/Legacy)",
    subcategories: {
      "view_engines": ["View engine", "res.render"],
      "partials": ["Partials", "Template partials", "Template inheritance"]
    }
  },
  "sessions_cookies_storage": {
    name: "Sessions, Cookies & Storage",
    subcategories: {
      "cookies_sessions": ["HTTP cookies", "Sessions", "Cookies vs sessions", "express-session"],
      "cookie_details": ["maxAge vs expires", "Cookie flags", "How to set cookie expiry", "Disadvantages of cookies"],
      "browser_storage": [
        "localStorage",
        "sessionStorage",
        "Cookie vs localStorage vs sessionStorage",
        "sessionStorage vs express-session",
        "Browser cache",
        "Types of browser storage"
      ]
    }
  }
};

/**
 * Seed Express.js Hierarchy
 */
const seedExpressHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find Express topic
    const expressTopic = await Topic.findOne({ slug: 'express' });
    
    if (!expressTopic) {
      console.error('❌ Express topic not found! Please run npm run seed first.');
      process.exit(1);
    }

    // Clear existing Express categories and sections
    await Category.deleteMany({ topicId: expressTopic._id });
    await Section.deleteMany({ topicId: expressTopic._id });
    console.log('\n🗑️  Cleared existing Express categories and sections');

    console.log('\n🤖 Creating 3-level hierarchy: Topic → Category → Section\n');

    let categoryOrder = 1;

    for (const [categorySlug, categoryData] of Object.entries(expressCurriculum)) {
      // Create Category
      const category = await Category.create({
        topicId: expressTopic._id,
        name: categoryData.name,
        slug: categorySlug,
        order: categoryOrder++,
        description: `Learn ${categoryData.name} in Express.js`
      });

      console.log(`📚 Category ${categoryOrder - 1}: ${categoryData.name}`);

      let sectionOrder = 1;

      // Create Sections for each subcategory
      for (const [subcategorySlug, topics] of Object.entries(categoryData.subcategories)) {
        const subcategoryName = subcategorySlug
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const difficulty = categorizeDifficulty(categoryData.name, subcategoryName);

        const section = await Section.create({
          topicId: expressTopic._id,
          categoryId: category._id,
          title: subcategoryName,
          slug: `${categorySlug}-${subcategorySlug}`,
          order: sectionOrder++,
          description: `Study ${subcategoryName} concepts`,
          difficulty: difficulty,
          keyPoints: topics
        });

        console.log(`      ✓ ${subcategoryName} (${difficulty})`);
      }

      console.log('');
    }

    const totalCategories = await Category.countDocuments({ topicId: expressTopic._id });
    const totalSections = await Section.countDocuments({ topicId: expressTopic._id });

    console.log('🎉 Express.js 3-level hierarchy created successfully!');
    console.log('📊 Summary:');
    console.log(`   Categories: ${totalCategories}`);
    console.log(`   Sections (Subcategories): ${totalSections}`);
    console.log('\n✨ Flow: Express.js → 5 Categories → 17 Sections\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedExpressHierarchy();
