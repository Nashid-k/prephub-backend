
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PathMap from './src/models/PathMap.js';
import Topic from './src/models/Topic.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const fixPathMaps = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Topics that were refactored and likely have slug mismatches
        const targetSlugs = [
            'javascript', 
            'nodejs', 
            'express', 
            'mongodb', 
            'dsa', 
            'blind-75', 
            'algorithms', 
            'data-structures',
            'react',
            'angular',
            'nextjs',
            'aws-cloud',
            'git-version-control',
            'java',
            'postgresql',
            'python',
            'django',
            'typescript',
            'html-css-combined'
        ];

        const topics = await Topic.find({ slug: { $in: targetSlugs } });
        const topicIds = topics.map(t => t._id);

        console.log(`Found ${topics.length} topics to clear PathMaps for.`);

        const result = await PathMap.deleteMany({ topicId: { $in: topicIds } });
        
        console.log(`✅ Deleted ${result.deletedCount} stale PathMap entries.`);
        console.log('Use can now see ALL content on the dashboard.');

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

fixPathMaps();
