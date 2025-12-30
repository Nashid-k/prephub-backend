import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const algorithmData = {
  "Algorithms": {
    "01_foundations_and_complexity": {
      "algorithm_concepts": [
        "What is an algorithm",
        "Why algorithms are needed",
        "Guidelines to write an algorithm",
        "Brute force approach",
        "Divide and conquer technique",
        "Divide and conquer strategy"
      ],
      "complexity_analysis": [
        "Time complexity (best, average, worst)",
        "Space complexity",
        "Big-O notation",
        "Big-Theta notation",
        "Big-Omega notation",
        "Asymptotic analysis",
        "Understanding logarithmic values",
        "Time complexity of recursion",
        "Time complexity of sorting algorithms",
        "Time complexity of searching algorithms",
        "Time complexity of hash table operations",
        "Nested loop complexity",
        "Array vs linked list access complexity",
        "O(1), O(log n), O(n), O(n log n), O(n²)"
      ]
    },

    "02_sorting_algorithms": {
      "sorting_concepts": [
        "Stable sorting",
        "In-place sorting",
        "Pivot selection impact",
        "Choosing the right sorting algorithm",
        "Why Quick Sort is not Stable"
      ],
      "sorting_algorithms": [
        "Bubble Sort",
        "Insertion Sort",
        "Selection Sort",
        "Merge Sort",
        "Quick Sort",
        "Heap Sort"
      ],
      "sorting_problems": [
        "Sort Nearly Sorted Array",
        "Merge two sorted arrays",
        "Merge two sorted linked lists",
        "Quick sort without additional array",
        "Worst-case input for quick sort",
        "Sort string using merge sort",
        "Sort string using heap sort",
        "Sort string using quick sort",
        "Sort string using stack",
        "Sort array of students using merge sort",
        "Sort array of objects by property",
        "Sort nodes in linked list",
        "Maintain sorted singly linked list"
      ]
    },

    "03_searching_algorithms": {
      "searching_algorithms": [
        "Linear Search",
        "Binary Search (iterative)",
        "Binary Search (recursive)"
      ],
      "searching_concepts": [
        "Binary search vs linear search",
        "Limitations of binary search"
      ],
      "searching_problems": [
        "Find Element Closest to Target",
        "Binary search in rotated sorted array",
        "Min in Rotated Sorted Array",
        "Binary search in string array",
        "Replace elements in binary search"
      ]
    },

    "04_recursion_and_backtracking": {
      "recursion_concepts": [
        "Recursion Basics",
        "Recursion implementation",
        "Base case",
        "Direct recursion",
        "Indirect recursion",
        "Tail recursion",
        "Head recursion",
        "Binary recursion",
        "Mutual recursion",
        "Space complexity of recursion",
        "Advantages of Recursion",
        "Disadvantages of Recursion",
        "Applications of recursion",
        "Backtracking",
        "Backtracking in DFS"
      ],
      "recursion_problems": [
        "Factorial",
        "Fibonacci series",
        "Sum of array using recursion",
        "Reverse string using recursion",
        "Remove character using recursion",
        "Sum of even numbers using recursion",
        "Fibonacci under limit",
        "Recursion limited to N calls",
        "Remove duplicates using recursion"
      ]
    },

    "05_algorithmic_patterns": {
      "patterns": [
        "Two pointer technique",
        "Sliding window pattern",
        "Fast and slow pointer"
      ],
      "two_pointer_algorithms": [
        "Two Sum algorithm (O(n))",
        "Two sum in sorted array algorithm",
        "Reverse string using two pointers",
        "Reverse words using two pointers",
        "Palindrome checking algorithm",
        "Remove nth node from end algorithm",
        "Remove duplicates from sorted array algorithm",
        "Cycle detection algorithm"
      ],
      "sliding_window_algorithms": [
        "Buy and sell stock algorithm",
        "Maximum subarray sum (Kadane's algorithm)",
        "Longest substring without repeating characters algorithm",
        "Largest substring without vowels algorithm",
        "Longest consecutive repeating characters algorithm",
        "String permutations (anagram search) algorithm"
      ]
    },

    "06_graph_algorithms": {
      "graph_traversal_algorithms": [
        "Breadth First Search (BFS)",
        "Depth First Search (DFS)"
      ],
      "graph_algorithm_concepts": [
        "Complexity of BFS",
        "Complexity of DFS",
        "BFS vs DFS"
      ],
      "graph_problem_algorithms": [
        "Detect Cycle in Directed Graph algorithm",
        "Detect Cycle in Undirected Graph algorithm",
        "Shortest Path in Unweighted Graph (BFS) algorithm",
        "Dijkstra Algorithm",
        "Minimum Spanning Tree algorithm",
        "Prim's Algorithm",
        "Kruskal's Algorithm",
        "Tarjan's Algorithm",
        "Number of Islands algorithm"
      ]
    },

    "07_string_algorithms": [
      "Reverse each word using stack algorithm",
      "Pattern matching algorithm (regex-like)",
      "Valid anagram algorithm",
      "Longest repeating characters algorithm",
      "Transform string pattern algorithm (APPLE case)",
      "Swap first and last characters algorithm",
      "First non-repeating character algorithm",
      "Palindrome checking algorithm",
      "Balanced parentheses algorithm"
    ],

    "08_array_algorithms": [
      "Check if array is sorted algorithm (O(n))",
      "Remove duplicates algorithm (O(n))",
      "Find third largest element algorithm",
      "Find second longest word algorithm",
      "Find missing number algorithm",
      "Maximum subarray sum (Kadane's algorithm)",
      "Move zeroes to end algorithm",
      "Sum of prime numbers algorithm"
    ],

    "09_tree_algorithms": [
      "Lowest Common Ancestor (LCA) algorithm",
      "Check if Tree is Balanced algorithm",
      "Check if Tree is Perfect algorithm",
      "Check if Tree is Full algorithm",
      "Check if Two Trees are Identical algorithm",
      "Check if Subtree algorithm",
      "Sum of Left Leaf Nodes algorithm",
      "Remove Duplicates from Binary Tree algorithm",
      "Max Nodes in Binary Tree of Height h algorithm",
      "Kth Smallest Element in BST algorithm"
    ],

    "10_heap_algorithms": [
      "Heap Sort Algorithm",
      "Kth Largest Element using Heap algorithm",
      "Kth Largest Element in Array algorithm",
      "Top K Frequent Elements algorithm"
    ]
  },

  "Practice_Problems": {
      "leetcode_algorithm_problems": [
        "102 Binary Tree Level Order Traversal algorithm",
        "133 Clone Graph algorithm",
        "200 Number of Islands algorithm",
        "215 Kth Largest Element in Array algorithm",
        "230 Kth Smallest Element in BST algorithm",
        "Blind 75 LeetCode Problems"
      ],
      "algorithm_practice_recommendations": [
        "Brute force then optimal algorithm",
        "Solve without built-in functions",
        "Time-bound algorithm practice",
        "Debug algorithms with print statements",
        "Explain algorithm solutions aloud"
      ],
      "algorithm_focus_areas": [
        "Improve second largest logic with negatives algorithm",
        "Largest substring without vowels algorithm",
        "Fibonacci under limit recursion algorithm",
        "Improve algorithm logic building"
      ]
  }
};

// Helper to format strings: "01_foundations_and_complexity" -> "Foundations And Complexity"
const formatName = (str) => {
    return str
        .replace(/^\d+_/, '') // Remove leading numbers
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedAlgorithms = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const topic = await Topic.findOne({ slug: 'dsa' });
    if (!topic) {
      console.error('DSA Topic not found. Run seed-dsa-topic.js first.');
      process.exit(1);
    }

    // Clear existing Algorithms categories and sections
    const categoriesToDelete = await Category.find({ topicId: topic._id, group: /^Algorithms:/ });
    const categoryIds = categoriesToDelete.map(c => c._id);

    if (categoryIds.length > 0) {
        await Section.deleteMany({ categoryId: { $in: categoryIds } });
        console.log(`Cleared ${categoryIds.length} existing Algorithms categories and their sections`);
        await Category.deleteMany({ _id: { $in: categoryIds } });
    } else {
        console.log('No existing Algorithms categories to clear');
    }

    const mainData = algorithmData["Algorithms"];
    const practiceData = algorithmData["Practice_Problems"];

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

    // Function to process a subgroup
    const processSubGroup = async (subGroupKey, subGroupData) => {
        const subGroupName = formatName(subGroupKey);
        const groupString = `Algorithms:${subGroupName}`;
        
        if (Array.isArray(subGroupData)) {
             const categoryName = subGroupName;
             const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
             
             // Fix: use topicId
             const category = await Category.create({
                name: categoryName,
                slug: categorySlug,
                description: `Learn about ${categoryName}`,
                topicId: topic._id,
                group: groupString,
                order: 1
             });

             const sectionDocs = subGroupData.map((sectionTitle, index) => ({
                title: sectionTitle,
                slug: generateUniqueSlug(sectionTitle),
                description: `Detailed explanation of ${sectionTitle}`,
                content: 'Coming soon...',
                categoryId: category._id, 
                topicId: topic._id,
                order: index + 1,
                isCompleted: false
             }));

             await Section.insertMany(sectionDocs);
             console.log(`Created Category: ${categoryName} with ${sectionDocs.length} sections`);

        } else {
            let order = 1;
            for (const [catKey, sections] of Object.entries(subGroupData)) {
                const categoryName = formatName(catKey);
                // Ensure category slug is unique too? Unlikely to collide within topic but good practice?
                // For now assuming category keys are unique enough in the map.
                const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');

                // Fix: use topicId
                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Detailed study of ${categoryName}`,
                    topicId: topic._id,
                    group: groupString,
                    order: order++
                });

                const sectionDocs = sections.map((sectionTitle, index) => ({
                    title: sectionTitle,
                    slug: generateUniqueSlug(sectionTitle),
                    description: `Detailed explanation of ${sectionTitle}`,
                    content: 'Coming soon...',
                    categoryId: category._id,
                    topicId: topic._id,
                    order: index + 1,
                    isCompleted: false
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} with ${sectionDocs.length} sections`);
            }
        }
    };

    // Process Main Algorithms
    for (const [key, value] of Object.entries(mainData)) {
        await processSubGroup(key, value);
    }

    // Process Practice Problems
    if (practiceData) {
         await processSubGroup("Practice_Problems", practiceData);
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedAlgorithms();
