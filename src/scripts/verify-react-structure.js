
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../models/Topic.js';
import Category from '../models/Category.js';
import Section from '../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const verifyReact = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB');

        const topic = await Topic.findOne({ slug: 'react' });
        if (!topic) {
            console.error('❌ React topic not found!');
            process.exit(1);
        }
        console.log(`✅ Found Topic: ${topic.name} (${topic.slug})`);

        const categories = await Category.find({ topicId: topic._id }).sort({ order: 1 });
        console.log(`✅ Found ${categories.length} Categories`);

        for (const cat of categories) {
            const sections = await Section.find({ categoryId: cat._id }).sort({ order: 1 });
            console.log(`   📂 ${cat.order}. ${cat.name} [Group: ${cat.group}] - ${sections.length} sections`);
            // Check first 3 sections
            for (const sec of sections.slice(0, 3)) {
                console.log(`      📄 ${sec.order}. ${sec.title}`);
            }
            if (sections.length > 3) console.log('      ...');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyReact();
