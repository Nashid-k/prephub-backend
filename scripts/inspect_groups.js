import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Topic from '../src/models/Topic.js';
import Category from '../src/models/Category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkGroups = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const topics = ['javascript', 'python', 'system-design', 'react'];
        
        for (const slug of topics) {
            const topic = await Topic.findOne({ slug });
            if (!topic) continue;
            
            console.log(`\nTopic: ${topic.name}`);
            const groups = await Category.distinct('group', { topicId: topic._id });
            console.log('Groups:', groups);
            
            // Show a few samples to see mapping
            const samples = await Category.find({ topicId: topic._id }).limit(5);
            samples.forEach(s => console.log(`  - ${s.name} -> ${s.group}`));
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkGroups();
