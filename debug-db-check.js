
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

const checkCounts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const topics = await Topic.find({}).sort({ order: 1 });
        console.log('\n--- TOPIC COUNTS ---');
        
        for (const topic of topics) {
            const catCount = await Category.countDocuments({ topicId: topic._id });
            const secCount = await Section.countDocuments({ topicId: topic._id });
            
            console.log(`Topic: ${topic.name.padEnd(20)} | Slug: ${topic.slug.padEnd(15)} | Cats: ${catCount.toString().padEnd(4)} | Sections: ${secCount}`);
            
            // Special check for JavaScript if it's zero
            if ((topic.slug === 'javascript' || topic.slug === 'dsa') && secCount === 0) {
                 console.log(`   [WARNING] ${topic.name} has 0 sections!`);
            }
        }
        
        console.log('\n--------------------');
        
        // Check for "Orphaned" sections (sections with no valid topic)
        const allTopics = topics.map(t => t._id);
        const orphanedSections = await Section.countDocuments({ topicId: { $nin: allTopics } });
        console.log(`Orphaned Sections (Invalid TopicId): ${orphanedSections}`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkCounts();
