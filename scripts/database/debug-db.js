
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../src/models/Topic.js';
import Category from '../../src/models/Category.js';
import Section from '../../src/models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Using DB:', process.env.MONGODB_URI);

        const topics = await Topic.find({}).sort({ order: 1 });
        console.log(`Found ${topics.length} topics in database.\n`);

        for (const topic of topics) {
            console.log(`\n----------------------------------------`);
            console.log(`📘 Topic: ${topic.name} (Slug: ${topic.slug})`);
            console.log(`   ID: ${topic._id}`);
            
            const categories = await Category.find({ topicId: topic._id }).sort({ order: 1 });
            console.log(`   📂 Categories: ${categories.length}`);
            
            let totalSections = 0;
            for (const cat of categories) {
                const sections = await Section.countDocuments({ categoryId: cat._id });
                totalSections += sections;
                // Optional: Print detail if needed, but summary is better for "all seeds"
                // console.log(`     - ${cat.name}: ${sections} sections`);
            }
            
            // Check for orphaned sections (old seed style or errors)
            const orphanedSections = await Section.countDocuments({ topicId: topic._id, categoryId: { $exists: false } });
            const nullCatSections = await Section.countDocuments({ topicId: topic._id, categoryId: null });
            
            console.log(`   📄 Total Sections: ${totalSections + orphanedSections + nullCatSections}`);
            
            if (orphanedSections > 0 || nullCatSections > 0) {
                 console.log(`   ⚠️  WARNING: Orphaned Sections (No Category): ${orphanedSections + nullCatSections}`);
            }
            
            if (categories.length === 0 && (totalSections + orphanedSections) === 0) {
                console.log(`   ⚠️  EMPTY TOPIC`);
            }
        }
        console.log(`\n----------------------------------------`);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debug();
