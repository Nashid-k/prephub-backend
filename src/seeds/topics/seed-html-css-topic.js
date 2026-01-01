import mongoose from 'mongoose';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import PathMap from '../../models/PathMap.js';
import { assignGroup } from '../utils/categoryGrouping.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const htmlCssData = {
  "HTML_Fundamentals": {
    "01_introduction": [
      "History of Web",
      "Document Structure (DOM)",
      "HTML5 Semantics",
      "Meta Tags & SEO"
    ],
    "02_text_formatting": [
      "Headings & Paragraphs",
      "Lists (Ordered/Unordered)",
      "Inline Text Semantics",
      "Special Characters"
    ],
    "03_forms_input": [
      "Input Types & Attributes",
      "Form Validation",
      "Labels & Accessibility",
      "Modern HTML5 Inputs"
    ]
  },
  "CSS_Core_Concepts": {
    "01_selectors_specificity": [
      "Classes & IDs",
      "Combinators",
      "Specificity Calculation",
      "Pseudo-classes & Elements"
    ],
    "02_box_model": [
      "Margins, Borders, Padding",
      "Box Sizing (border-box)",
      "Display Properties",
      "Collapsing Margins"
    ],
    "03_typography": [
      "Web Fonts (Google Fonts)",
      "Text Styling & Decoration",
      "Units (rem, em, px, vh)",
      "Line Height & Spacing"
    ]
  },
  "Modern_Layouts": {
    "01_flexbox": [
      "Flex Containers & Items",
      "Justify & Align",
      "Flex Direction & Wrap",
      "Building Navbars"
    ],
    "02_css_grid": [
      "Grid Template Columns/Rows",
      "Grid Gap & Areas",
      "Auto-fit vs Auto-fill",
      "Complex Layouts"
    ],
    "03_responsive_design": [
      "Media Queries",
      "Mobile-First Approach",
      "Responsive Images",
      "Viewport Units"
    ]
  },
  "Advanced_CSS": {
    "01_animations": [
      "Transitions & Transforms",
      "Keyframe Animations",
      "Motion Design Principles",
      "Performance Optimization"
    ],
    "02_variables_theming": [
      "CSS Custom Properties",
      "Dark Mode Implementation",
      "Calculated Values (calc)",
      "Fluid Typography"
    ],
    "03_preprocessors": [
      "Sass/SCSS Basics",
      "Nesting & Mixins",
      "PostCSS Features",
      "CSS Modules"
    ]
  },
  "Accessibility_A11y": {
    "01_aria_basics": [
      "Role & Aria-Label",
      "Keyboard Navigation",
      "Screen Reader Support",
      "Focus Management"
    ],
    "02_semantic_structure": [
      "Landmark Regions",
      "Heading Hierarchy",
      "Alt Text Strategies",
      "Color Contrast"
    ]
  },
  "Essential_Projects": {
    "01_portfolio_site": [
      "Semantic HTML Structure",
      "Grid Layout Implementation",
      "Responsive Media Queries",
      "Deployment (Netlify/Vercel)"
    ],
    "02_dashboard_ui": [
      "Sidebar Navigation (Flexbox)",
      "Data Tables",
      "Card Components",
      "Dark Light Toggle"
    ]
  },
  "Interview_Preparation": {
    "01_common_questions": [
      "Display: none vs Visibility: hidden",
      "Centering a Div",
      "CSS Specificity Wars",
      "Critical Rendering Path"
    ],
    "02_practical_challenges": [
      "Building a Modal",
      "Responsive Navbar",
      "Three Column Layout",
      "Accessible Form"
    ]
  }
};

const formatName = (key) => {
  return key.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
    const topicSlug = 'html-css-combined'; 
    const topicName = 'HTML & CSS Combined';
    
    // 1. Find or Create Topic
    let topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      topic = await Topic.create({
        name: topicName,
        slug: topicSlug,
        description: 'Master the building blocks of the web: HTML5 structure and Modern CSS3 layouts.',
        icon: 'html-css', // Ensure you have this icon handled in frontend or use generic
        order: 1 // Foundational, so high priority
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
    for (const [categoryKey, categoryContent] of Object.entries(htmlCssData)) {
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
      if (Array.isArray(categoryContent)) {
        // Simple list
        let sectionOrder = 1;
        for (const sectionTitle of categoryContent) {
            const sectionSlug = await generateUniqueSlug(Section, sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            
            await Section.create({
                topicId: topic._id, // Required
                categoryId: category._id,
                title: sectionTitle,
                slug: sectionSlug, // Required
                description: `Complete guide to ${sectionTitle} in HTML & CSS.`, // Required
                content: `Content for ${sectionTitle}`,
                order: sectionOrder++,
                isCompleted: false
            });
        }
        console.log(`  - Added ${categoryContent.length} sections`);
      } else {
         // Sub-categories logic
         let sectionOrder = 1;
         for (const [subKey, sections] of Object.entries(categoryContent)) {
             if (Array.isArray(sections)) {
                 for (const sectionTitle of sections) {
                    const sectionSlug = await generateUniqueSlug(Section, sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    
                    await Section.create({
                        topicId: topic._id, // Required
                        categoryId: category._id,
                        title: sectionTitle,
                        slug: sectionSlug, // Required
                        description: `Learn about ${sectionTitle} within ${formatName(subKey)}.`, // Required
                        content: `Content for ${sectionTitle} (${formatName(subKey)})`,
                        order: sectionOrder++,
                        isCompleted: false
                    });
                 }
             }
         }
         console.log(`  - Added sections from sub-groups`);
      }
    }

    // --- PathMap Generation ---
    console.log('Generating PathMaps for Experience Levels...');

    const allCategories = await Category.find({ topicId: topic._id });
    const categoriesByGroup = {};
    allCategories.forEach(c => {
        if (!categoriesByGroup[c.group]) categoriesByGroup[c.group] = [];
        categoriesByGroup[c.group].push(c.slug);
    });

    const levels = {
        '0-1_year': [
            'HTML Fundamentals', 'CSS Core Concepts'
        ],
        '1-3_years': [
            'HTML Fundamentals', 'CSS Core Concepts', 'Modern Layouts', 'Accessibility A11y'
        ],
        '3-5_years': [
            'HTML Fundamentals', 'CSS Core Concepts', 'Modern Layouts', 'Accessibility A11y',
            'Advanced CSS', 'Essential Projects', 'Interview Preparation'
        ]
    };

    for (const [level, groups] of Object.entries(levels)) {
        let visibleSlugs = [];
        groups.forEach(g => {
            const matchGroup = Object.keys(categoriesByGroup).find(k => k.toLowerCase().includes(g.toLowerCase()));
            if (matchGroup && categoriesByGroup[matchGroup]) {
                visibleSlugs = [...visibleSlugs, ...categoriesByGroup[matchGroup]];
            }
        });

        await PathMap.findOneAndUpdate(
            { topicId: topic._id, experienceLevel: level },
            { 
                topicId: topic._id,
                experienceLevel: level,
                visibleCategorySlugs: visibleSlugs 
            },
            { upsert: true, new: true }
        );
        console.log(`Created PathMap for ${level}: ${visibleSlugs.length} categories`);
    }

    console.log('✅ HTML & CSS seeding complete!');
    
  } catch (error) {
    console.error('Error seeding HTML & CSS:', error);
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
