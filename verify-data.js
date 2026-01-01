
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './src/models/Topic.js';
import PathMap from './src/models/PathMap.js';

dotenv.config();

async function verify() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const topic = await Topic.findOne({ slug: 'nodejs' });
        if (!topic) {
            console.log('Node.js topic not found');
            process.exit(0);
        }
        
        console.log('Topic ID:', topic._id);
        
        const map = await PathMap.findOne({ 
            topicId: topic._id, 
            experienceLevel: '0-1_year' 
        });
        
        if (!map) {
            console.log('PathMap not found for Node.js Beginner');
        } else {
            console.log('PathMap Found!');
            console.log('Visible Slugs Count:', map.visibleCategorySlugs.length);
            console.log('Sample Slugs:', map.visibleCategorySlugs.slice(0, 5));
        }
        
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
verify();
