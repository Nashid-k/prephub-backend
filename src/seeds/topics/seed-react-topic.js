import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slugify from 'slugify'; // Import slugify
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { reactCurriculum as reactData } from '../hierarchy/seed-react-hierarchy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const formatName = (str) => {
    return str
        .replace(/^\d+_/, '')
        .split('_')
        .map(word => {
            if (['JSX', 'DOM', 'API', 'HOC', 'CLI', 'ES6', 'REST', 'SSR', 'CSR', 'SEO', 'JWT', 'HTTP', 'HTTPS', 'JSON'].includes(word.toUpperCase())) {
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

const seedReact = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'react' });
        if (!topic) {
            console.log('Creating React topic...');
            topic = await Topic.create({
                name: 'React',
                slug: 'react',
                description: 'A JavaScript library for building user interfaces',
                icon: '⚛️',
                order: 5,
                color: '#61DAFB'
            });
        }

        // Robust Cleanup
        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing React data');
        }

        let order = 1;
        for (const [mainKey, mainValue] of Object.entries(reactData)) {
            const groupName = formatName(mainKey); 
            
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = await generateUniqueSlug(Category, `React ${categoryName}`, topic._id);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: groupName,
                    order: order++
                });

                let sections = [];
                if (Array.isArray(value)) {
                    sections = value;
                } else {
                    for (const [subKey, subItems] of Object.entries(value)) {
                        sections = [...sections, ...subItems];
                    }
                }

                const sectionDocs = [];
                for (let i = 0; i < sections.length; i++) {
                    const sectionTitle = sections[i];
                    const sectionSlug = await generateUniqueSlug(Section, sectionTitle, topic._id);

                    sectionDocs.push({
                        title: sectionTitle,
                        slug: sectionSlug,
                        description: `Detailed explanation of ${sectionTitle}`,
                        content: `## ${sectionTitle}\n\nContent coming soon...`,
                        categoryId: category._id,
                        topicId: topic._id,
                        order: i + 1,
                        difficulty: categoryName.includes('Advanced') || categoryName.includes('Optimization') || categoryName.includes('Testing') || categoryName.includes('Redux') ? 'advanced' : 
                                   categoryName.includes('Introduction') || categoryName.includes('Fundamentals') || categoryName.includes('Basic') ? 'beginner' : 'intermediate',
                        estimatedTime: 15
                    });
                }

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${groupName}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ React seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedReact();
