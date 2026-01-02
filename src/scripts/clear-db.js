
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../models/Topic.js';
import Category from '../models/Category.js';
import Section from '../models/Section.js';
import Question from '../models/Question.js';
import PathMap from '../models/PathMap.js';

// Load environment variables
dotenv.config();

const clearDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear Collections
    console.log('Clearing Topic collection...');
    const topicResult = await Topic.deleteMany({});
    console.log(`Deleted ${topicResult.deletedCount} topics.`);

    console.log('Clearing Category collection...');
    const categoryResult = await Category.deleteMany({});
    console.log(`Deleted ${categoryResult.deletedCount} categories.`);

    console.log('Clearing Section collection...');
    const sectionResult = await Section.deleteMany({});
    console.log(`Deleted ${sectionResult.deletedCount} sections.`);

    console.log('Clearing Question collection...');
    const questionResult = await Question.deleteMany({});
    console.log(`Deleted ${questionResult.deletedCount} questions.`);
    
    console.log('Clearing PathMap collection...');
    const pathMapResult = await PathMap.deleteMany({});
    console.log(`Deleted ${pathMapResult.deletedCount} path maps.`);

    console.log('Database cleared successfully!');
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

clearDatabase();
