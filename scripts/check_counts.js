import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Topic from '../src/models/Topic.js';
import Category from '../src/models/Category.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkCounts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const topics = await Topic.find({});
        console.log('Topic Category Counts:');
        
        for (const topic of topics) {
            const count = await Category.countDocuments({ topicId: topic._id });
            const groups = await Category.distinct('group', { topicId: topic._id });
            const genericCount = await Category.countDocuments({ 
                topicId: topic._id,
                $or: [
                    { group: { $exists: false } },
                    { group: null },
                    { group: 'General' },
                    { group: 'general' },
                    { group: 'General Modules' }
                ]
            });

            console.log(`- ${topic.name} (${topic.slug}): ${count} categories. Groups: [${groups.join(', ')}]. Generic: ${genericCount}`);
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkCounts();
