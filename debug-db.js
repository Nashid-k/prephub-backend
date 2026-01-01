
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './src/models/Topic.js';
import Category from './src/models/Category.js';
import Section from './src/models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Using DB:', process.env.MONGODB_URI);

        const topicSlug = 'react';
        const topic = await Topic.findOne({ slug: topicSlug });

        if (!topic) {
            console.log(`Topic '${topicSlug}' NOT FOUND.`);
            process.exit(0);
        }

        console.log(`\nTopic: ${topic.name} (${topic._id})`);
        
        const categories = await Category.find({ topicId: topic._id }).sort({ order: 1 });
        console.log(`Categories Found: ${categories.length}`);
        
        for (const cat of categories) {
            const sections = await Section.countDocuments({ categoryId: cat._id });
            console.log(` - [${cat.order}] ${cat.name} (Slug: ${cat.slug}) -> ${sections} sections`);
        }
        
        // Check for orphaned sections (old seed style)
        const orphanedSections = await Section.countDocuments({ topicId: topic._id, categoryId: { $exists: false } });
        const nullCatSections = await Section.countDocuments({ topicId: topic._id, categoryId: null });
        
        if (orphanedSections > 0 || nullCatSections > 0) {
             console.log(`\n⚠️  WARNING: Found sections without categories (Old Seed Style?):`);
             console.log(` - No categoryId field: ${orphanedSections}`);
             console.log(` - categoryId is null: ${nullCatSections}`);
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debug();
