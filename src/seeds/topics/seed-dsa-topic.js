import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const seedDSATopic = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let topic = await Topic.findOne({ slug: 'dsa' });
    if (!topic) {
      console.log('DSA topic not found, creating...');
      topic = await Topic.create({
        name: 'Data Structures & Algorithms',
        slug: 'dsa',
        description: 'Master the fundamentals of computer science',
        icon: '🧮',
        order: 1,
        color: '#8b5cf6'
      });
      console.log('DSA topic created.');
    } else {
        console.log('DSA topic already exists.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding DSA topic:', error);
    process.exit(1);
  }
};

seedDSATopic();
