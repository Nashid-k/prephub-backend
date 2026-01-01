import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

// DEFINING EXACTLY 3 MAIN GROUPS:
// 1. Data Structures
// 2. Algorithms
// 3. Blind 75
const dsaData = {
  "Data Structures": {
    "Arrays & Strings": [
      "Introduction to Arrays",
      "Dynamic Arrays (ArrayList/Vector)",
      "String Immutability & Storage",
      "StringBuilder/Buffer",
      "Two Dimensional Arrays"
    ],
    "Linked Lists": [
      "Singly Linked List Implementation",
      "Doubly Linked List Implementation",
      "Circular Linked List",
      "Floyd's Cycle Detection",
      "LRU Cache Design"
    ],
    "Stacks & Queues": [
      "Stack Operations (Push/Pop)",
      "Queue Operations (Enqueue/Dequeue)",
      "Monotonic Stack Pattern",
      "Priority Queue (Heap)",
      "Deque Implementation"
    ],
    "Trees & Graphs": [
      "Binary Tree Traversals (In/Pre/Post)",
      "Binary Search Tree (BST) Properties",
      "Trie (Prefix Tree)",
      "Graph Representations (Adj List/Matrix)",
      "Disjoint Set (Union-Find)"
    ],
    "Hash Tables": [
      "Hash Function Design",
      "Collision Resolution (Chaining/Probing)",
      "HashSet vs HashMap",
      "Rolling Hash (Rabin-Karp)"
    ]
  },

  "Algorithms": {
    "Sorting & Searching": [
      "Merge Sort",
      "Quick Sort",
      "Binary Search Fundamentals",
      "Search in Rotated Sorted Array",
      "Sorting Complexity Analysis"
    ],
    "Recursion & Backtracking": [
      "Recursion Basics & Stack Trace",
      "Generate Parentheses",
      "N-Queens Problem",
      "Sudoku Solver",
      "Word Search"
    ],
    "Dynamic Programming": [
      "Memoization vs Tabulation",
      "0/1 Knapsack Pattern",
      "Longest Common Subsequence",
      "Longest Increasing Subsequence",
      "Matrix Chain Multiplication"
    ],
    "Greedy & Bit Manipulation": [
      "Activity Selection Problem",
      "Huffman Coding",
      "XOR Operations & Tricks",
      "Bit Masking Techniques",
      "Fast Exponentiation"
    ],
    "Graph Algorithms": [
      "BFS & DFS Traversals",
      "Dijkstra's Shortest Path",
      "Topological Sort (Kahn's)",
      "Prim's & Kruskal's MST",
      "Bellman-Ford Algorithm"
    ]
  },

  "Blind 75": {
    "Array & Hashing": [
      "Contains Duplicate",
      "Valid Anagram",
      "Two Sum",
      "Group Anagrams",
      "Top K Frequent Elements",
      "Product of Array Except Self",
      "Encode and Decode Strings",
      "Longest Consecutive Sequence"
    ],
    "Two Pointers": [
      "Valid Palindrome",
      "3Sum",
      "Container With Most Water"
    ],
    "Sliding Window": [
      "Best Time to Buy and Sell Stock",
      "Longest Substring Without Repeating Characters",
      "Longest Repeating Character Replacement",
      "Minimum Window Substring"
    ],
    "Stack": [
      "Valid Parentheses",
      "Min Stack",
      "Evaluate Reverse Polish Notation",
      "Generate Parentheses",
      "Daily Temperatures",
      "Car Fleet",
      "Largest Rectangle in Histogram"
    ],
    "Binary Search": [
      "Binary Search",
      "Search a 2D Matrix",
      "Koko Eating Bananas",
      "Find Minimum in Rotated Sorted Array",
      "Search in Rotated Sorted Array",
      "Time Based Key-Value Store",
      "Median of Two Sorted Arrays"
    ],
    "Linked List": [
      "Reverse Linked List",
      "Merge Two Sorted Lists",
      "Reorder List",
      "Remove Nth Node From End of List",
      "Copy List with Random Pointer",
      "Add Two Numbers",
      "Linked List Cycle",
      "Find the Duplicate Number",
      "LRU Cache",
      "Merge K Sorted Lists",
      "Reverse Nodes in k-Group"
    ],
    "Trees": [
      "Invert Binary Tree",
      "Maximum Depth of Binary Tree",
      "Diameter of Binary Tree",
      "Balanced Binary Tree",
      "Same Tree",
      "Subtree of Another Tree",
      "Lowest Common Ancestor of a BST",
      "Binary Tree Level Order Traversal",
      "Validate Binary Search Tree",
      "Kth Smallest Element in a BST",
      "Construct Binary Tree from Preorder and Inorder Traversal",
      "Binary Tree Maximum Path Sum",
      "Serialize and Deserialize Binary Tree"
    ],
    "Tries": [
      "Implement Trie (Prefix Tree)",
      "Design Add and Search Words Data Structure",
      "Word Search II"
    ],
    "Backtracking": [
      "Subsets",
      "Combination Sum",
      "Permutations",
      "Subsets II",
      "Combination Sum II",
      "Word Search",
      "Palindrome Partitioning",
      "Letter Combinations of a Phone Number",
      "N-Queens"
    ],
    "Graphs": [
      "Number of Islands",
      "Clone Graph",
      "Max Area of Island",
      "Pacific Atlantic Water Flow",
      "Surrounded Regions",
      "Rotting Oranges",
      "Walls and Gates",
      "Course Schedule",
      "Course Schedule II",
      "Redundant Connection",
      "Number of Connected Components in an Undirected Graph",
      "Graph Valid Tree",
      "Word Ladder"
    ],
    "Advanced Graphs": [
      "Reconstruct Itinerary",
      "Min Cost to Connect All Points",
      "Network Delay Time",
      "Swim in Rising Water",
      "Alien Dictionary",
      "Cheapest Flights Within K Stops"
    ],
    "1-D DP": [
      "Climbing Stairs",
      "Min Cost Climbing Stairs",
      "House Robber",
      "House Robber II",
      "Longest Palindromic Substring",
      "Palindromic Substrings",
      "Decode Ways",
      "Coin Change",
      "Maximum Product Subarray",
      "Word Break",
      "Longest Increasing Subsequence",
      "Partition Equal Subset Sum"
    ],
    "2-D DP": [
      "Unique Paths",
      "Longest Common Subsequence",
      "Best Time to Buy and Sell Stock with Cooldown",
      "Coin Change II",
      "Target Sum",
      "Interleaving String",
      "Longest Increasing Path in a Matrix",
      "Distinct Subsequences",
      "Edit Distance",
      "Burst Balloons",
      "Regular Expression Matching"
    ],
    "Greedy": [
      "Maximum Subarray",
      "Jump Game",
      "Jump Game II",
      "Gas Station",
      "Hand of Straights",
      "Merge Triplets to Form Target Triplet",
      "Partition Labels",
      "Valid Parenthesis String"
    ],
    "Intervals": [
      "Insert Interval",
      "Merge Intervals",
      "Non-overlapping Intervals",
      "Meeting Rooms",
      "Meeting Rooms II"
    ],
    "Math & Geometry": [
      "Rotate Image",
      "Spiral Matrix",
      "Set Matrix Zeroes",
      "Happy Number",
      "Plus One",
      "Pow(x, n)",
      "Multiply Strings",
      "Detect Squares"
    ],
    "Bit Manipulation": [
      "Single Number",
      "Number of 1 Bits",
      "Counting Bits",
      "Reverse Bits",
      "Missing Number",
      "Sum of Two Integers",
      "Reverse Integer"
    ]
  }
};

const seedDSA = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Create Topic
        let topic = await Topic.findOne({ slug: 'dsa' });
        if (!topic) {
            console.log('Creating DSA topic...');
            topic = await Topic.create({
                name: 'Data Structures & Algorithms',
                slug: 'dsa',
                description: 'Master DSA with Blind 75, Core Data Structures, and Algorithms',
                icon: '🧩',
                order: 2,
                color: '#ef4444' // Red color for DSA
            });
        }

        // 2. Clear existing data for this topic
        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing DSA data');
        }

        const seenSlugs = new Set();
        const generateUniqueSlug = (title) => {
            let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            let slug = baseSlug;
            let counter = 1;
            while (seenSlugs.has(slug)) {
                counter++;
                slug = `${baseSlug}-${counter}`;
            }
            seenSlugs.add(slug);
            return slug;
        };

        let order = 1;

        // Iterate through the 3 main groups: Data Structures, Algorithms, Blind 75
        for (const [groupName, categoryData] of Object.entries(dsaData)) {
            
            // e.g. groupName = "Blind 75"
            // categoryData = { "Array & Hashing": [...], "Two Pointers": [...] }

            for (const [categoryName, sections] of Object.entries(categoryData)) {
                const categorySlug = generateUniqueSlug(categoryName);

                // Create the Category linked to the Group
                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: groupName, // THISENSURES THE 3 CARDS APPEAR ON FRONTEND
                    order: order++
                });

                const sectionDocs = sections.map((sectionTitle, index) => ({
                    title: sectionTitle,
                    slug: generateUniqueSlug(sectionTitle),
                    description: `Problem/Concept: ${sectionTitle}`,
                    content: `## ${sectionTitle}\n\nThis section covers ${sectionTitle}. Practice code coming soon.`,
                    categoryId: category._id,
                    topicId: topic._id,
                    order: index + 1,
                    difficulty: groupName === 'Blind 75' ? 'intermediate' : 'beginner',
                    estimatedTime: 20
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${groupName}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ DSA seeding complete with 3 Core Groups: Blind 75, Algorithms, Data Structures');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDSA();
