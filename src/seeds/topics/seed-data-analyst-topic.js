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

const dataAnalystData = {
  "01_Statistics_Foundations": {
    "descriptive_stats": [
      "Mean, Median, Mode",
      "Standard Deviation & Variance",
      "Percentiles & Quartiles",
      "Skewness & Kurtosis"
    ],
    "inferential_stats": [
      "Probability Distributions",
      "Hypothesis Testing (T-test, ANOVA)",
      "Correlation vs Causation",
      "Confidence Intervals"
    ]
  },
  "02_Excel_Advanced": {
    "functions": [
      "VLOOKUP / XLOOKUP",
      "INDEX & MATCH",
      "Conditional Formatting",
      "Data Validation"
    ],
    "analysis_tools": [
      "Pivot Tables & Charts",
      "Power Query Basics",
      "What-If Analysis",
      "Macros & VBA Basics"
    ]
  },
  "03_SQL_For_Analysis": {
    "querying_basics": [
      "SELECT, FROM, WHERE",
      "Filtering & Sorting",
      "Aggregations (COUNT, SUM, AVG)",
      "GROUP BY & HAVING"
    ],
    "advanced_querying": [
      "JOINS (Inner, Left, Right)",
      "Subqueries & CTEs",
      "Window Functions (RANK, LEAD/LAG)",
      "Date & String Analysis"
    ]
  },
  "04_Python_Data_Stack": {
    "pandas_basics": [
      "DataFrames & Series",
      "Reading/Writing Files (CSV, Excel)",
      "Filtering & Selecting Data",
      "Handling Missing Data"
    ],
    "data_manipulation": [
      "Merging & Concatenating",
      "Groupby Operations",
      "Pivot & Melt",
      "Apply & Lambda Functions"
    ],
    "visualization_libs": [
      "Matplotlib Basics",
      "Seaborn for Statistical Plots",
      "Plotly for Interactive Charts",
      "Customizing Visualizations"
    ]
  },
  "05_BI_Visualization": {
    "tableau_powerbi": [
      "Connecting to Data Sources",
      "Creating Measures & Dimensions",
      "Building Dashboards",
      "Storytelling with Data"
    ],
    "bi_concepts": [
      "Key Performance Indicators (KPIs)",
      "Data Modeling (Star/Snowflake Schema)",
      "Dashboard Design Principles",
      "Data Refresh & Automation"
    ]
  }
};

const formatName = (key) => {
  return key.replace(/^[0-9]+_/, '').split('_')
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
    const topicSlug = 'data-analyst'; 
    const topicName = 'Data Analyst';
    
    // 1. Find or Create Topic
    let topic = await Topic.findOne({ slug: topicSlug });
    if (!topic) {
      topic = await Topic.create({
        name: topicName,
        slug: topicSlug,
        description: 'Master data analysis with Statistics, SQL, Python, and Visualization tools.',
        icon: 'analytics', // Assuming an icon exists or default
        order: 21
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
    for (const [categoryKey, categoryContent] of Object.entries(dataAnalystData)) {
      const categoryName = formatName(categoryKey);
      const categorySlug = await generateUniqueSlug(Category, categoryKey.toLowerCase().replace(/_/g, '-'));
      
      const group = categoryName; // Bypass AI grouping for deterministic matching
      
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
                    description: `Master ${sectionTitle} for Data Analysis.`,
                    content: `Content for ${sectionTitle}`,
                    order: sectionOrder++,
                    isCompleted: false
                });
              }
          }
      }
      console.log(`  - Added sections from sub-groups`);
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
            'Statistics Foundations', 'Excel Advanced', 'SQL For Analysis'
        ],
        '1-3_years': [
            'Statistics Foundations', 'Excel Advanced', 'SQL For Analysis',
            'Python Data Stack', 'BI Visualization', 'Experimentation AB Testing'
        ],
        '3-5_years': [
            'Statistics Foundations', 'Excel Advanced', 'SQL For Analysis',
            'Python Data Stack', 'BI Visualization', 'Experimentation AB Testing',
            'Big Data Technologies', 'Advanced Querying'
        ]
    };

    for (const [level, groups] of Object.entries(levels)) {
        let visibleSlugs = [];
        groups.forEach(g => {
             // Use rigorous matching: check if database group name INCLUDES our config name OR config name INCLUDES db group name
            const matchGroup = Object.keys(categoriesByGroup).find(dbGroup => 
                dbGroup.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(dbGroup.toLowerCase())
            );

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

    console.log('✅ Data Analyst seeding complete!');
    
  } catch (error) {
    console.error('Error seeding Data Analyst:', error);
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
