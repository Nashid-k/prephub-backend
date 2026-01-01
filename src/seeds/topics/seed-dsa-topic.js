import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const dsaData = {
  "Introduction": {
    "Complexity Analysis": [
      "Big O Notation",
      "Time Complexity",
      "Space Complexity",
      "Best, Average, Worst Case",
      "Asymptotic Analysis"
    ]
  },
  "Linear Data Structures": {
    "Arrays": [
      "Introduction to Arrays",
      "Static vs Dynamic Arrays",
      "Array Operations (Insert, Delete)",
      "Two Dimensional Arrays",
      "Array Rotation Algorithms"
    ],
    "Linked Lists": [
      "Singly Linked List",
      "Doubly Linked List",
      "Circular Linked List",
      "Reverse Linked List",
      "Detect Loop in Linked List"
    ],
    "Stacks": [
      "Stack Operations (Push, Pop)",
      "Stack Implementation",
      "Applications of Stack"
    ],
    "Queues": [
      "Queue Operations (Enqueue, Dequeue)",
      "Circular Queue",
      "Priority Queue",
      "Deque (Double Ended Queue)"
    ]
  },
  "Non-Linear Data Structures": {
    "Trees": [
      "Introduction to Trees",
      "Binary Trees",
      "Tree Traversals",
      "Binary Search Tree (BST)",
      "AVL Trees",
      // "Red-Black Trees", // Advanced
      "Heaps (Min/Max)"
    ],
    "Graphs": [
      "Introduction to Graphs",
      "Graph Representations (Adjacency Matrix/List)",
      "BFS (Breadth First Search)",
      "DFS (Depth First Search)",
      "Dijkstra Algorithm"
    ],
    "Hashing": [
      "Introduction to Hashing",
      "Hash Functions",
      "Collision Handling",
      "Hash Map Implementation"
    ]
  },
  "Algorithms": {
    "Sorting": [
      "Bubble Sort",
      "Selection Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort"
    ],
    "Searching": [
      "Linear Search",
      "Binary Search",
      "Two Pointers Technique"
    ],
    "Recursion": [
      "Introduction to Recursion",
      "Factorial",
      "Fibonacci Series",
      "Tower of Hanoi"
    ],
    "Dynamic Programming": [
      "Introduction to DP",
      "Memoization vs Tabulation",
      "Climbing Stairs",
      "Longest Common Subsequence"
    ]
  }
};

const seedDSATopic = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Create/Update Topic
    let topic = await Topic.findOne({ slug: 'dsa' });
    if (!topic) {
        console.log('Creating DSA topic...');
        topic = await Topic.create({
            name: 'Data Structures & Algorithms',
            slug: 'dsa',
            description: 'Master the fundamentals of computer science',
            icon: '🧮',
            order: 1,
            color: '#8b5cf6'
        });
    } else {
        console.log('DSA topic exists. Updating metadata...');
        topic.name = 'Data Structures & Algorithms';
        topic.description = 'Master the fundamentals of computer science';
        topic.icon = '🧮';
        topic.color = '#8b5cf6';
        await topic.save();
    }

    // 2. Clear existing categories and sections
    console.log('Clearing old DSA data...');
    // Find all categories for this topic to delete their sections
    const categories = await Category.find({ topic: topic._id });
    const categoryIds = categories.map(c => c._id);
    await Section.deleteMany({ category: { $in: categoryIds } });
    await Category.deleteMany({ topic: topic._id });
    
    // Explicitly delete any orphan sections with dsa slug parts if any remained (optional safety)
    // await Section.deleteMany({ topic: topic._id }); // If Section model had topic ref, but it usually relies on category

    console.log('Seeding new DSA content...');

    let categoryOrder = 1;
    let sectionOrder = 1;

    for (const [groupName, categoriesData] of Object.entries(dsaData)) {
      for (const [categoryName, sectionsData] of Object.entries(categoriesData)) {
        
        let category = await Category.create({
          name: categoryName,
          slug: slugify(categoryName, { lower: true, strict: true }),
          description: `Learn about ${categoryName}`,
          topic: topic._id,
          topicId: topic._id, // Add explicit topicId as required by schema
          order: categoryOrder++,
          group: groupName,
          icon: '📝' // Default icon
        });

        // Loop through sections (flat array assumed here based on dsaData structure)
        for (const sectionTitle of sectionsData) {
            await Section.create({
                title: sectionTitle,
                slug: slugify(sectionTitle, { lower: true, strict: true }),
                category: category._id,
                topicId: topic._id, // Add explicit topicId
                order: sectionOrder++,
                content: `Introduction to ${sectionTitle}.`, // Placeholder content
                description: `Complete guide to ${sectionTitle}` // Add required description
            });
        }
      }
    }

    console.log('✅ DSA seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DSA topic:', error);
    process.exit(1);
  }
};

seedDSATopic();
