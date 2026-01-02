
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PathMap from '../../src/models/PathMap.js';
import Topic from '../../src/models/Topic.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const checkPathMaps = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const topics = await Topic.find({ slug: { $in: ['javascript', 'dsa', 'nodejs'] } });
        
        for (const topic of topics) {
            console.log(`\nTopic: ${topic.name} (${topic.slug})`);
            const maps = await PathMap.find({ topicId: topic._id });
            
            if (maps.length === 0) {
                 console.log("  No PathMaps found (Should show ALL content)");
            } else {
                 console.log(`  Found ${maps.length} PathMaps:`);
                 maps.forEach(m => {
                     console.log(`    - Level: ${m.experienceLevel}`);
                     console.log(`      Visible Categories: ${m.visibleCategorySlugs.length}`);
                     console.log(`      Sample Slugs: ${m.visibleCategorySlugs.slice(0, 3).join(', ')}...`);
                 });
            }
        }
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

checkPathMaps();
