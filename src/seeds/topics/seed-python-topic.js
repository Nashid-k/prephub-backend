import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slugify from 'slugify';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { pythonCurriculum as pythonData } from '../hierarchy/seed-python-hierarchy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const formatName = (str) => {
    return str
        .replace(/^\d+_/, '')
        .split('_')
        .map(word => {
            if (['OOP', 'PEP', 'GIL', 'API', 'ORM', 'CSV', 'WSGI', 'ASGI', 'ABC', 'MRO', 'LEGB', 'JSON'].includes(word.toUpperCase())) {
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

const seedPython = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'python' });
        if (!topic) {
            console.log('Creating Python topic...');
            topic = await Topic.create({
                name: 'Python',
                slug: 'python',
                description: 'Master Python: From Scripts to Data Science and Web Development.',
                icon: '🐍',
                order: 4, 
                color: '#3776AB'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing Python data');
        }

        let order = 1;
        for (const [mainKey, mainValue] of Object.entries(pythonData)) {
            const groupName = formatName(mainKey); 
            
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = await generateUniqueSlug(Category, `Python ${categoryName}`, topic._id);

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
                        difficulty: categoryName.includes('Advanced') || categoryName.includes('Metaprogramming') || categoryName.includes('Concurrency') || categoryName.includes('Science') ? 'advanced' : 
                                   categoryName.includes('Basics') || categoryName.includes('Foundations') || categoryName.includes('Environment') ? 'beginner' : 'intermediate',
                        estimatedTime: 15
                    });
                }

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${groupName}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ Python seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedPython();
