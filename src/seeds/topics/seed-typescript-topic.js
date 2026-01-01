import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slugify from 'slugify'; // Import slugify
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { typescriptCurriculum as typescriptData } from '../hierarchy/seed-typescript-hierarchy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const formatName = (str) => {
    return str
        .replace(/^\d+_/, '')
        .split('_')
        .map(word => {
            if (['TS', 'JS', 'API', 'AST', 'ES', 'DTO', 'ORM', 'UI', 'CLI'].includes(word.toUpperCase())) {
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

const seedTypeScript = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'typescript' });
        if (!topic) {
            console.log('Creating TypeScript topic...');
            topic = await Topic.create({
                name: 'TypeScript',
                slug: 'typescript',
                description: 'Master TypeScript: From Static Typing to Advanced Generics and Compiler API.',
                icon: '📘',
                order: 3, 
                color: '#3178C6'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing TypeScript data');
        }

        let order = 1;
        const rootData = typescriptData.TypeScript || typescriptData;

        for (const [groupKey, groupValue] of Object.entries(rootData)) {
            const groupName = formatName(groupKey); 
            
            // Case 1: Value is Array (Flat Group -> Single Category)
            if (Array.isArray(groupValue)) {
                const categoryName = groupName; // Use Group Name as Category Name
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
                for (let i = 0; i < groupValue.length; i++) {
                    const sectionTitle = groupValue[i];
                    const sectionSlug = await generateUniqueSlug(Section, sectionTitle, topic._id);

                    sectionDocs.push({
                        title: sectionTitle,
                        slug: sectionSlug,
                        description: `Detailed explanation of ${sectionTitle}`,
                        content: `## ${sectionTitle}\n\nContent coming soon...`,
                        categoryId: category._id,
                        topicId: topic._id,
                        order: i + 1,
                        difficulty: 'intermediate',
                        estimatedTime: 15
                    });
                }
                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${groupName}) with ${sectionDocs.length} sections`);

            } else {
                // Case 2: Value is Object (Group -> Multiple Categories)
                for (const [catKey, catValue] of Object.entries(groupValue)) {
                    const categoryName = formatName(catKey);
                    const categorySlug = await generateUniqueSlug(Category, categoryName, topic._id);

                    const category = await Category.create({
                        name: categoryName,
                        slug: categorySlug,
                        description: `Learn about ${categoryName}`,
                        topicId: topic._id,
                        group: groupName,
                        order: order++
                    });

                    // Flatten nested arrays if any (handle both direct array and object-wrapped array)
                    let sections = [];
                    if (Array.isArray(catValue)) {
                        sections = catValue;
                    } else {
                        // If it's an object of sections?? Unlikely based on hierarchy, but safe to flatten values
                        sections = Object.values(catValue).flat();
                    }

                    const sectionDocs = [];
                    for (let i = 0; i < sections.length; i++) {
                        const sectionTitle = sections[i];
                        if (typeof sectionTitle !== 'string') continue; // Safety check

                        const sectionSlug = await generateUniqueSlug(Section, sectionTitle, topic._id);

                        sectionDocs.push({
                            title: sectionTitle,
                            slug: sectionSlug,
                            description: `Detailed explanation of ${sectionTitle}`,
                            content: `## ${sectionTitle}\n\nContent coming soon...`,
                            categoryId: category._id,
                            topicId: topic._id,
                            order: i + 1,
                            difficulty: 'intermediate',
                            estimatedTime: 15
                        });
                    }
                    await Section.insertMany(sectionDocs);
                    console.log(`Created Category: ${categoryName} (Group: ${groupName}) with ${sectionDocs.length} sections`);
                }
            }
        }

        console.log('✅ TypeScript seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedTypeScript();
