
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../models/Topic.js';
import Category from '../models/Category.js';
import Section from '../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const verify = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const topics = await Topic.find().sort({ order: 1 });
    console.log(`\n📊 Found ${topics.length} Topics:\n`);
    
    console.log(`| Order | Topic Name | Slug | Categories | Sections |`);
    console.log(`|---|---|---|---|---|`);

    for (const topic of topics) {
      const catCount = await Category.countDocuments({ topicId: topic._id });
      const secCount = await Section.countDocuments({ topicId: topic._id });
      console.log(`| ${topic.order} | ${topic.name} | ${topic.slug} | ${catCount} | ${secCount} |`);
    }

    const totalCategories = await Category.countDocuments();
    const totalSections = await Section.countDocuments();

    console.log(`\n📈 TOTALS: Categories=${totalCategories}, Sections=${totalSections}`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

verify();
