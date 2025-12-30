import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Section from './models/Section.js';
import Question from './models/Question.js';

dotenv.config();

const topics = [
  {
    name: 'JavaScript',
    slug: 'javascript',
    description: 'Master modern JavaScript from basics to advanced concepts',
    icon: 'JS',
    order: 1,
    color: '#f7df1e'
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Learn TypeScript for type-safe JavaScript development',
    icon: 'TS',
    order: 2,
    color: '#3178c6'
  },
  {
    name: 'MongoDB',
    slug: 'mongodb',
    description: 'NoSQL database for modern applications',
    icon: '🍃',
    order: 3,
    color: '#4db33d'
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    description: 'Server-side JavaScript runtime',
    icon: 'Node',
    order: 4,
    color: '#68a063'
  },
  {
    name: 'Express',
    slug: 'express',
    description: 'Fast, unopinionated web framework for Node.js',
    icon: 'Ex',
    order: 5,
    color: '#000000'
  },
  {
    name: 'React',
    slug: 'react',
    description: 'Build modern user interfaces with React',
    icon: '⚛️',
    order: 6,
    color: '#61dafb'
  },
  {
    name: 'DSA',
    slug: 'dsa',
    description: 'Essential DSA concepts for technical interviews',
    icon: 'DSA',
    order: 7,
    color: '#ff6b6b'
  }
];

const sections = {
  javascript: [
    { title: 'Basics & Fundamentals', slug: 'basics', order: 1, description: 'Variables, data types, operators', difficulty: 'beginner' },
    { title: 'Functions & Scope', slug: 'functions', order: 2, description: 'Functions, closures, scope chain', difficulty: 'beginner' },
    { title: 'Objects & Arrays', slug: 'objects-arrays', order: 3, description: 'Object manipulation, array methods', difficulty: 'beginner' },
    { title: 'Async JavaScript', slug: 'async', order: 4, description: 'Promises, async/await, callbacks', difficulty: 'intermediate' },
    { title: 'ES6+ Features', slug: 'es6', order: 5, description: 'Arrow functions, destructuring, spread/rest', difficulty: 'intermediate' },
    { title: 'Advanced Concepts', slug: 'advanced', order: 6, description: 'Prototypes, this keyword, classes', difficulty: 'advanced' }
  ],
  typescript: [
    { title: 'TypeScript Basics', slug: 'basics', order: 1, description: 'Types, interfaces, type inference', difficulty: 'beginner' },
    { title: 'Advanced Types', slug: 'advanced-types', order: 2, description: 'Generics, utility types, conditional types', difficulty: 'intermediate' },
    { title: 'Classes & OOP', slug: 'classes', order: 3, description: 'Classes, inheritance, access modifiers', difficulty: 'intermediate' },
    { title: 'Decorators & Modules', slug: 'decorators', order: 4, description: 'Decorators, namespaces, modules', difficulty: 'advanced' }
  ],
  mongodb: [
    { title: 'MongoDB Fundamentals', slug: 'basics', order: 1, description: 'Documents, collections, database basics', difficulty: 'beginner' },
    { title: 'CRUD Operations', slug: 'crud', order: 2, description: 'Create, read, update, delete operations', difficulty: 'beginner' },
    { title: 'Indexing & Performance', slug: 'indexing', order: 3, description: 'Indexes, query optimization', difficulty: 'intermediate' },
    { title: 'Aggregation Framework', slug: 'aggregation', order: 4, description: 'Pipeline stages, aggregation operators', difficulty: 'intermediate' },
    { title: 'Schema Design', slug: 'schema-design', order: 5, description: 'Data modeling, relationships', difficulty: 'advanced' }
  ],
  nodejs: [
    { title: 'Node.js Basics', slug: 'basics', order: 1, description: 'Event loop, modules, npm', difficulty: 'beginner' },
    { title: 'File System & Streams', slug: 'fs-streams', order: 2, description: 'Working with files and streams', difficulty: 'intermediate' },
    { title: 'Events & Buffers', slug: 'events', order: 3, description: 'Event emitters, buffers', difficulty: 'intermediate' },
    { title: 'Advanced Node.js', slug: 'advanced', order: 4, description: 'Child processes, clustering', difficulty: 'advanced' }
  ],
  express: [
    { title: 'Express Basics', slug: 'basics', order: 1, description: 'Routing, request/response', difficulty: 'beginner' },
    { title: 'Middleware', slug: 'middleware', order: 2, description: 'Custom middleware, error handling', difficulty: 'intermediate' },
    { title: 'REST APIs', slug: 'rest-apis', order: 3, description: 'Building RESTful APIs', difficulty: 'intermediate' },
    { title: 'Authentication & Security', slug: 'auth', order: 4, description: 'JWT, sessions, security best practices', difficulty: 'advanced' }
  ],
  react: [
    { title: 'React Fundamentals', slug: 'basics', order: 1, description: 'Components, JSX, props', difficulty: 'beginner' },
    { title: 'Hooks', slug: 'hooks', order: 2, description: 'useState, useEffect, custom hooks', difficulty: 'intermediate' },
    { title: 'State Management', slug: 'state-management', order: 3, description: 'Context API, Redux basics', difficulty: 'intermediate' },
    { title: 'Performance & Patterns', slug: 'performance', order: 4, description: 'Memoization, code splitting', difficulty: 'advanced' }
  ],
  dsa: [
    { title: 'Arrays & Strings', slug: 'arrays-strings', order: 1, description: 'Array manipulation, string algorithms', difficulty: 'beginner' },
    { title: 'Linked Lists', slug: 'linked-lists', order: 2, description: 'Singly, doubly linked lists', difficulty: 'beginner' },
    { title: 'Trees & Graphs', slug: 'trees-graphs', order: 3, description: 'Binary trees, BST, graph traversal', difficulty: 'intermediate' },
    { title: 'Dynamic Programming', slug: 'dynamic-programming', order: 4, description: 'Memoization, tabulation, DP patterns', difficulty: 'advanced' }
  ]
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Topic.deleteMany({});
    await Section.deleteMany({});
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert topics
    const insertedTopics = await Topic.insertMany(topics);
    console.log('📚 Inserted topics');

    // Insert sections for each topic
    for (const topic of insertedTopics) {
      const topicSections = sections[topic.slug];
      
      if (topicSections) {
        const sectionsToInsert = topicSections.map(section => ({
          ...section,
          topicId: topic._id
        }));
        
        await Section.insertMany(sectionsToInsert);
        console.log(`  ✅ Added sections for ${topic.name}`);
      }
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   Topics: ${insertedTopics.length}`);
    
    const totalSections = await Section.countDocuments();
    console.log(`   Sections: ${totalSections}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
