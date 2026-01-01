import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slugify from 'slugify'; // Import slugify
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { htmlCssCurriculum } from '../hierarchy/seed-html-css-hierarchy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const formatName = (str) => {
    return str
        .replace(/^\d+_/, '')
        .split('_')
        .map(word => {
            if (['HTML', 'HTML5', 'CSS', 'CSS3', 'DOM', 'SEO', 'ARIA', 'DNS', 'HTTP', 'HTTPS', 'URL', 'URI', 'UX', 'UI', 'SVG', 'PNG', 'JPG', 'GIF', 'API', 'BEM', 'OOCSS', 'SMACSS', 'WCAG'].includes(word.toUpperCase())) {
                return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

const generateUniqueSlug = async (Model, baseText, topicId, scopeField = 'topicId') => {
    const baseSlug = slugify(baseText, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    // Check for collisions within the scope (topic)
    while (await Model.findOne({ [scopeField]: topicId, slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    return slug;
};

const seedHtmlCss = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'html-css-combined' });
        if (!topic) {
            console.log('Creating HTML & CSS topic...');
            topic = await Topic.create({
                name: 'HTML & CSS Combined',
                slug: 'html-css-combined',
                description: 'Master the building blocks of the web: HTML5 structure and Modern CSS3 layouts.',
                icon: '🎨',
                order: 1,
                color: '#e34c26'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing HTML & CSS data');
        }

        let order = 1;
        for (const [groupKey, groupValue] of Object.entries(htmlCssCurriculum)) {
            const groupName = formatName(groupKey);
            
            for (const [categoryKey, sectionList] of Object.entries(groupValue)) {
                const categoryName = formatName(categoryKey);
                const categorySlug = await generateUniqueSlug(Category, categoryName, topic._id);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: groupName,
                    order: order++
                });

                const sectionDocs = [];
                for (let i = 0; i < sectionList.length; i++) {
                    const sectionTitle = sectionList[i];
                    const sectionSlug = await generateUniqueSlug(Section, sectionTitle, topic._id);

                    const isCss = categoryName.includes('CSS') || groupName.includes('CSS') || groupName.includes('Styling') || groupName.includes('Layout');
                    const language = isCss ? 'css' : 'html';
                    
                    sectionDocs.push({
                        title: sectionTitle,
                        slug: sectionSlug,
                        description: `Detailed explanation of ${sectionTitle}`,
                        content: `## ${sectionTitle}\n\nContent coming soon...`,
                        categoryId: category._id,
                        topicId: topic._id,
                        order: i + 1,
                        difficulty: groupName.includes('Advanced') || groupName.includes('Expert') || groupName.includes('Architecture') ? 'advanced' : 
                                   groupName.includes('Foundations') || groupName.includes('Basics') ? 'beginner' : 'intermediate',
                        estimatedTime: 15,
                        codeExamples: [{
                            language: language,
                            code: isCss ? '/* CSS Example */\n.element {\n  property: value;\n}' : '<!-- HTML Example -->\n<element>\n  Content\n</element>',
                            explanation: 'Basic example structure'
                        }]
                    });
                }

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${groupName}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ HTML & CSS seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedHtmlCss();
