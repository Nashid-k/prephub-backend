import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { assignGroup } from '../utils/categoryGrouping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const dsaData = {
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
  },
  "DS - Fundamentals": {
    "01_data_structure_foundations": [
      "What is a Data Structure",
      "Why Data Structures are Important",
      "Data Structure vs Abstract Data Type",
      "Primitive vs Non-Primitive Data Structures",
      "Memory Layout and Organization"
    ],
    "02_complexity_analysis": [
      "Time Complexity of Data Structure Operations",
      "Space Complexity of Data Structure Storage",
      "Best Case, Average Case, Worst Case Analysis",
      "Amortized Analysis for Data Structures"
    ]
  },
  "DS - Linear": {
    "03_array_data_structures": [
      "Array Data Structure Definition",
      "Array Memory Allocation Pattern",
      "Multi-dimensional Arrays",
      "Jagged Arrays (Array of Arrays)",
      "Random Access Capability"
    ],
    "04_string_data_structures": [
      "String as a Data Structure",
      "String Representation in Memory",
      "String Immutability Concept",
      "String Interning"
    ],
    "05_linked_list_data_structures": [
      "Linked List Data Structure Concept",
      "Singly Linked List Structure",
      "Doubly Linked List Structure",
      "Circular Linked List Structure",
      "Pointer/Reference Mechanism"
    ],
    "06_stack_data_structure": [
      "Stack Data Structure Definition",
      "LIFO (Last-In-First-Out) Principle",
      "Stack Operations (Push/Pop/Peek)",
      "Stack using Array vs Linked List",
      "Stack Applications (Call Stack)"
    ],
    "07_queue_data_structure": [
      "Queue Data Structure Definition",
      "FIFO (First-In-First-Out) Principle",
      "Queue Operations (Enqueue/Dequeue)",
      "Circular Queue Structure",
      "Double-ended Queue (Deque)",
      "Priority Queue Structure"
    ]
  },
  "DS - Non-Linear": {
    "09_tree_data_structures": [
      "Tree Data Structure Definition",
      "Tree Terminology (Root, Parent, Child)",
      "Binary Tree Properties",
      "Binary Search Tree (BST)",
      "Trie (Prefix Tree)"
    ],
    "10_self_balancing_trees": [
      "Self-balancing Tree Concept",
      "AVL Tree Structure",
      "Red-Black Tree Structure",
      "B-Tree Structure (Multi-way Trees)",
      "Tree Rotations"
    ],
    "11_heap_data_structure": [
      "Heap Data Structure Definition",
      "Min-Heap vs Max-Heap",
      "Binary Heap Implementation",
      "Heap Operations (Insert, Extract)",
      "Priority Queue using Heap"
    ],
    "13_graph_data_structures": [
      "Graph Data Structure Definition",
      "Directed vs Undirected Graph",
      "Weighted vs Unweighted Graph",
      "Adjacency Matrix vs Adjacency List",
      "Graph Connectivity"
    ]
  },
  "DS - Advanced": {
    "08_hash_table_data_structure": [
      "Hash Table Data Structure Definition",
      "Hash Functions and Collisions",
      "Collision Resolution (Chaining, Probing)",
  "Hash Map vs Hash Set"
    ],
    "12_trie_data_structure": [
      "Trie Fundamentals",
      "Standard Trie vs Compressed Trie (Radix)",
      "Suffix Tree Structure",
      "Ternary Search Trie"
    ],
    "15_advanced_data_structures": [
      "Disjoint Set Union (Union-Find)",
      "Segment Tree Structure",
      "Fenwick Tree (Binary Indexed Tree)",
      "Bloom Filter Structure",
      "Skip List Structure"
    ],
    "14_memory_management_concepts": [
      "Stack Memory Characteristics",
      "Heap Memory Characteristics",
      "Memory Allocation Strategies",
      "Garbage Collection Concepts"
    ]
  },
  "Algo - Foundations": {
    "01_algorithm_foundations": [
      "What is an Algorithm",
      "Characteristics of Good Algorithms",
      "Brute Force vs Divide and Conquer",
      "Greedy vs Dynamic Programming"
    ],
    "02_complexity_analysis": [
      "Time Complexity (Big-O)",
      "Space Complexity",
      "Best/Average/Worst Case",
      "Recurrence Relations",
      "Master Theorem"
    ]
  },
  "Algo - Sorting": {
    "03_sorting_algorithms": {
       "Bubble Sort": ["Bubble Sort Mechanism", "Optimized Bubble Sort", "Complexity Analysis"],
       "Selection Sort": ["Selection Sort Mechanism", "Stable Selection Sort", "Complexity"],
       "Insertion Sort": ["Insertion Sort Mechanism", "Online Algorithm Property", "Complexity"],
       "Merge Sort": ["Divide and Conquer Strategy", "Recursive Merge Sort", "Complexity Analysis"],
       "Quick Sort": ["Partitioning (Lomuto/Hoare)", "Pivot Selection", "Quick Sort Analysis"],
       "Heap Sort": ["Heapify Operation", "Heap Sort Algorithm", "Complexity"],
       "Non-Comparison Sorts": ["Counting Sort", "Radix Sort", "Bucket Sort"]
    }
  },
  "Algo - Searching": {
    "04_searching_algorithms": [
      "Linear Search",
      "Binary Search (Iterative/Recursive)",
      "Ternary Search",
      "Interpolation Search",
      "Exponential Search"
    ],
    "12_string_algorithms": [
      "Naive String Matching",
      "Knuth-Morris-Pratt (KMP) Algorithm",
      "Rabin-Karp Algorithm",
      "Boyer-Moore Algorithm",
      "Longest Common Prefix"
    ]
  },
  "Algo - Graph & Tree": {
    "16_graph_algorithms": [
       "BFS vs DFS Traversal",
       "Dijkstra's Shortest Path",
       "Bellman-Ford Algorithm",
       "Floyd-Warshall Algorithm",
       "Prim's & Kruskal's MST",
       "Topological Sorting",
       "Strongly Connected Components"
    ],
    "17_tree_algorithms": [
       "Tree Traversals (In/Pre/Post/Level)",
       "Morris Traversal",
       "Lowest Common Ancestor (LCA)",
       "Serialize/Deserialize Tree",
       "View Problems (Left/Right/Top/Bottom)"
    ]
  },
  "Algo - Paradigms": {
    "05_recursion_algorithms": [
       "Recursion Fundamentals",
       "Tail Recursion",
       "Tower of Hanoi",
       "Backtracking Basics"
    ],
    "06_backtracking_algorithms": [
       "N-Queens Problem",
       "Sudoku Solver",
       "Rat in a Maze",
       "Subset Sum Problem",
       "Permutations & Combinations"
    ],
    "07_dynamic_programming": [
       "Memoization vs Tabulation",
       "0/1 Knapsack Problem",
       "Longest Common Subsequence",
       "Longest Increasing Subsequence",
       "Matrix Chain Multiplication"
    ],
    "08_greedy_algorithms": [
       "Activity Selection Problem",
       "Huffman Coding",
       "Fractional Knapsack",
       "Minimum Spanning Tree (Greedy)"
    ],
    "09_divide_conquer": [
       "Merge Sort & Quick Sort",
       "Binary Search",
       "Closest Pair of Points",
       "Strassen's Matrix Multiplication"
    ]
  },
  "Algo - Advanced": {
    "15_bit_manipulation_algorithms": [
       "Bitwise Operators",
       "Bit Masking",
       "Kernighan's Algorithm",
       "Magic Number Generation"
    ],
    "14_mathematical_algorithms": [
       "Sieve of Eratosthenes",
       "Euclidean Algorithm (GCD)",
       "Modular Exponentiation",
       "Catalan Numbers"
    ],
    "19_advanced_algorithms": [
       "Convex Hull (Graham Scan)",
       "K-D Trees",
       "Reservoir Sampling",
       "Approximate Algorithms"
    ]
  }
};

const formatName = (str) => {
    return str
        .replace(/^\\d+_/, '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedDSA = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'dsa' });
        if (!topic) {
            console.log('Creating DSA topic...');
            topic = await Topic.create({
                name: 'Data Structures & Algorithms',
                slug: 'dsa',
                description: 'Master DSA with Blind 75, Core Data Structures, and Algorithms',
                icon: '🧩',
                order: 2,
                color: '#ef4444' 
            });
        }

        // Clear existing data for this topic
        await Section.deleteMany({ topicId: topic._id });
        await Category.deleteMany({ topicId: topic._id });
        console.log('Cleared existing DSA data');

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

        // Iterate through the main groups
        for (const [groupName, categoryData] of Object.entries(dsaData)) {
            
            // Handle specialized sorting structure where values are objects, not arrays
            if (groupName === 'Algo - Sorting') {
                 for (const [categoryName, sections] of Object.entries(categoryData["03_sorting_algorithms"])) {
                    const categorySlug = generateUniqueSlug(categoryName);
                    
                    const category = await Category.create({
                        name: categoryName,
                        slug: categorySlug,
                        description: `Learn about ${categoryName}`,
                        topicId: topic._id,
                        group: groupName, // All show up under "Algo - Sorting" tab
                        order: order++
                    });

                    const sectionDocs = sections.map((sectionTitle, index) => ({
                        title: sectionTitle,
                        slug: generateUniqueSlug(sectionTitle),
                        description: `Detailed explanation of ${sectionTitle}`,
                        content: `## ${sectionTitle}\n\nContent coming soon...`,
                        categoryId: category._id,
                        topicId: topic._id,
                        order: index + 1,
                        difficulty: 'intermediate',
                        estimatedTime: 20
                    }));
                    await Section.insertMany(sectionDocs);
                    console.log(`Created Category: ${categoryName} with ${sectionDocs.length} sections`);
                 }
                 continue;
            }


            for (const [key, value] of Object.entries(categoryData)) {
                // Determine Category Name
                // If it's Blind 75, keys are already nice names. 
                // If it's from source files, keys are like "01_data_structure_foundations"
                let categoryName = key.includes('_') ? formatName(key) : key;
                
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: groupName,
                    order: order++
                });
                
                let sections = Array.isArray(value) ? value : [];
                
                // If value is not array (rare case in my manual construction above but possible if I messed up), handle it
                if (!Array.isArray(value)) {
                     // Flatten object values
                     sections = Object.values(value).flat();
                }

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

        console.log('✅ DSA seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDSA();
