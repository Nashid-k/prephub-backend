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

const blind75Data = {
  "Blind_75_LeetCode_Questions": {
    "Array": [
      { "id": 1, "title": "Two Sum", "difficulty": "Easy" },
      { "id": 121, "title": "Best Time to Buy and Sell Stock", "difficulty": "Easy" },
      { "id": 217, "title": "Contains Duplicate", "difficulty": "Easy" },
      { "id": 238, "title": "Product of Array Except Self", "difficulty": "Medium" },
      { "id": 53, "title": "Maximum Subarray", "difficulty": "Easy" },
      { "id": 152, "title": "Maximum Product Subarray", "difficulty": "Medium" },
      { "id": 153, "title": "Find Minimum in Rotated Sorted Array", "difficulty": "Medium" },
      { "id": 33, "title": "Search in Rotated Sorted Array", "difficulty": "Medium" },
      { "id": 15, "title": "3Sum", "difficulty": "Medium" },
      { "id": 11, "title": "Container With Most Water", "difficulty": "Medium" }
    ],

    "String": [
      { "id": 3, "title": "Longest Substring Without Repeating Characters", "difficulty": "Medium" },
      { "id": 424, "title": "Longest Repeating Character Replacement", "difficulty": "Medium" },
      { "id": 567, "title": "Permutation in String", "difficulty": "Medium" },
      { "id": 76, "title": "Minimum Window Substring", "difficulty": "Hard" },
      { "id": 242, "title": "Valid Anagram", "difficulty": "Easy" },
      { "id": 49, "title": "Group Anagrams", "difficulty": "Medium" },
      { "id": 20, "title": "Valid Parentheses", "difficulty": "Easy" },
      { "id": 125, "title": "Valid Palindrome", "difficulty": "Easy" },
      { "id": 5, "title": "Longest Palindromic Substring", "difficulty": "Medium" },
      { "id": 647, "title": "Palindromic Substrings", "difficulty": "Medium" }
    ],

    "Linked_List": [
      { "id": 206, "title": "Reverse Linked List", "difficulty": "Easy" },
      { "id": 21, "title": "Merge Two Sorted Lists", "difficulty": "Easy" },
      { "id": 141, "title": "Linked List Cycle", "difficulty": "Easy" },
      { "id": 143, "title": "Reorder List", "difficulty": "Medium" },
      { "id": 19, "title": "Remove Nth Node From End of List", "difficulty": "Medium" },
      { "id": 138, "title": "Copy List with Random Pointer", "difficulty": "Medium" },
      { "id": 2, "title": "Add Two Numbers", "difficulty": "Medium" },
      { "id": 23, "title": "Merge k Sorted Lists", "difficulty": "Hard" },
      { "id": 146, "title": "LRU Cache", "difficulty": "Medium" }
    ],
    
    "Binary_Tree": [
      { "id": 104, "title": "Maximum Depth of Binary Tree", "difficulty": "Easy" },
      { "id": 100, "title": "Same Tree", "difficulty": "Easy" },
      { "id": 226, "title": "Invert Binary Tree", "difficulty": "Easy" },
      { "id": 124, "title": "Binary Tree Maximum Path Sum", "difficulty": "Hard" },
      { "id": 102, "title": "Binary Tree Level Order Traversal", "difficulty": "Medium" },
      { "id": 297, "title": "Serialize and Deserialize Binary Tree", "difficulty": "Hard" },
      { "id": 572, "title": "Subtree of Another Tree", "difficulty": "Easy" },
      { "id": 105, "title": "Construct Binary Tree from Preorder and Inorder Traversal", "difficulty": "Medium" },
      { "id": 98, "title": "Validate Binary Search Tree", "difficulty": "Medium" },
      { "id": 230, "title": "Kth Smallest Element in a BST", "difficulty": "Medium" },
      { "id": 235, "title": "Lowest Common Ancestor of a Binary Search Tree", "difficulty": "Medium" },
      { "id": 208, "title": "Implement Trie (Prefix Tree)", "difficulty": "Medium" }
    ],

    "Heap_Priority_Queue": [
      { "id": 23, "title": "Merge k Sorted Lists", "difficulty": "Hard" },
      { "id": 347, "title": "Top K Frequent Elements", "difficulty": "Medium" },
      { "id": 295, "title": "Find Median from Data Stream", "difficulty": "Hard" }
    ],

    "Stack": [
      { "id": 20, "title": "Valid Parentheses", "difficulty": "Easy" },
      { "id": 155, "title": "Min Stack", "difficulty": "Medium" },
      { "id": 150, "title": "Evaluate Reverse Polish Notation", "difficulty": "Medium" },
      { "id": 22, "title": "Generate Parentheses", "difficulty": "Medium" },
      { "id": 739, "title": "Daily Temperatures", "difficulty": "Medium" },
      { "id": 853, "title": "Car Fleet", "difficulty": "Medium" }
    ],

    "Binary_Search": [
      { "id": 704, "title": "Binary Search", "difficulty": "Easy" },
      { "id": 33, "title": "Search in Rotated Sorted Array", "difficulty": "Medium" },
      { "id": 153, "title": "Find Minimum in Rotated Sorted Array", "difficulty": "Medium" },
      { "id": 74, "title": "Search a 2D Matrix", "difficulty": "Medium" },
      { "id": 875, "title": "Koko Eating Bananas", "difficulty": "Medium" },
      { "id": 4, "title": "Median of Two Sorted Arrays", "difficulty": "Hard" },
      { "id": 981, "title": "Time Based Key-Value Store", "difficulty": "Medium" }
    ],

    "Graph": [
      { "id": 133, "title": "Clone Graph", "difficulty": "Medium" },
      { "id": 207, "title": "Course Schedule", "difficulty": "Medium" },
      { "id": 417, "title": "Pacific Atlantic Water Flow", "difficulty": "Medium" },
      { "id": 200, "title": "Number of Islands", "difficulty": "Medium" },
      { "id": 128, "title": "Longest Consecutive Sequence", "difficulty": "Medium" },
      { "id": 269, "title": "Alien Dictionary", "difficulty": "Hard" },
      { "id": 261, "title": "Graph Valid Tree", "difficulty": "Medium" },
      { "id": 127, "title": "Word Ladder", "difficulty": "Hard" }
    ],

    "Dynamic_Programming": [
      { "id": 70, "title": "Climbing Stairs", "difficulty": "Easy" },
      { "id": 322, "title": "Coin Change", "difficulty": "Medium" },
      { "id": 300, "title": "Longest Increasing Subsequence", "difficulty": "Medium" },
      { "id": 1143, "title": "Longest Common Subsequence", "difficulty": "Medium" },
      { "id": 139, "title": "Word Break", "difficulty": "Medium" },
      { "id": 377, "title": "Combination Sum IV", "difficulty": "Medium" },
      { "id": 198, "title": "House Robber", "difficulty": "Medium" },
      { "id": 213, "title": "House Robber II", "difficulty": "Medium" },
      { "id": 91, "title": "Decode Ways", "difficulty": "Medium" },
      { "id": 62, "title": "Unique Paths", "difficulty": "Medium" },
      { "id": 55, "title": "Jump Game", "difficulty": "Medium" },
      { "id": 647, "title": "Palindromic Substrings", "difficulty": "Medium" },
      { "id": 416, "title": "Partition Equal Subset Sum", "difficulty": "Medium" },
      { "id": 72, "title": "Edit Distance", "difficulty": "Medium" }
    ],

    "Backtracking": [
      { "id": 78, "title": "Subsets", "difficulty": "Medium" },
      { "id": 39, "title": "Combination Sum", "difficulty": "Medium" },
      { "id": 46, "title": "Permutations", "difficulty": "Medium" },
      { "id": 17, "title": "Letter Combinations of a Phone Number", "difficulty": "Medium" },
      { "id": 79, "title": "Word Search", "difficulty": "Medium" },
      { "id": 51, "title": "N-Queens", "difficulty": "Hard" },
      { "id": 212, "title": "Word Search II", "difficulty": "Hard" }
    ],

    "Greedy": [
      { "id": 121, "title": "Best Time to Buy and Sell Stock", "difficulty": "Easy" },
      { "id": 55, "title": "Jump Game", "difficulty": "Medium" },
      { "id": 45, "title": "Jump Game II", "difficulty": "Medium" },
      { "id": 134, "title": "Gas Station", "difficulty": "Medium" },
      { "id": 846, "title": "Hand of Straights", "difficulty": "Medium" }
    ],

    "Intervals": [
      { "id": 56, "title": "Merge Intervals", "difficulty": "Medium" },
      { "id": 57, "title": "Insert Interval", "difficulty": "Medium" },
      { "id": 435, "title": "Non-overlapping Intervals", "difficulty": "Medium" },
      { "id": 252, "title": "Meeting Rooms", "difficulty": "Easy" },
      { "id": 253, "title": "Meeting Rooms II", "difficulty": "Medium" }
    ],

    "Math_Geometry": [
      { "id": 48, "title": "Rotate Image", "difficulty": "Medium" },
      { "id": 54, "title": "Spiral Matrix", "difficulty": "Medium" },
      { "id": 73, "title": "Set Matrix Zeroes", "difficulty": "Medium" },
      { "id": 202, "title": "Happy Number", "difficulty": "Easy" },
      { "id": 66, "title": "Plus One", "difficulty": "Easy" }
    ],

    "Bit_Manipulation": [
      { "id": 371, "title": "Sum of Two Integers", "difficulty": "Medium" },
      { "id": 191, "title": "Number of 1 Bits", "difficulty": "Easy" },
      { "id": 338, "title": "Counting Bits", "difficulty": "Easy" },
      { "id": 268, "title": "Missing Number", "difficulty": "Easy" },
      { "id": 190, "title": "Reverse Bits", "difficulty": "Easy" }
    ],

    "Matrix": [
      { "id": 36, "title": "Valid Sudoku", "difficulty": "Medium" },
      { "id": 37, "title": "Sudoku Solver", "difficulty": "Hard" },
      { "id": 79, "title": "Word Search", "difficulty": "Medium" },
      { "id": 212, "title": "Word Search II", "difficulty": "Hard" }
    ],

    "Design": [
      { "id": 146, "title": "LRU Cache", "difficulty": "Medium" },
      { "id": 155, "title": "Min Stack", "difficulty": "Medium" },
      { "id": 208, "title": "Implement Trie (Prefix Tree)", "difficulty": "Medium" },
      { "id": 211, "title": "Design Add and Search Words Data Structure", "difficulty": "Medium" },
      { "id": 295, "title": "Find Median from Data Stream", "difficulty": "Hard" },
      { "id": 348, "title": "Design Tic-Tac-Toe", "difficulty": "Medium" },
      { "id": 981, "title": "Time Based Key-Value Store", "difficulty": "Medium" }
    ]
  }
}

// Helper to format strings: "Dynamic_Programming" -> "Dynamic Programming"
const formatName = (str) => {
    return str.replace(/_/g, ' ');
};

// Map LeetCode difficulty to Schema Enum
const mapDifficulty = (diff) => {
    switch (diff) {
        case 'Easy': return 'beginner';
        case 'Medium': return 'intermediate';
        case 'Hard': return 'advanced';
        default: return 'beginner';
    }
};

const seedBlind75 = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Find DSA Topic
        let topic = await Topic.findOne({ slug: 'dsa' });
        if (!topic) {
            console.error('DSA topic not found. Run seed-dsa-topic.js first.');
            process.exit(1);
        }

        // 2. Clear existing Blind 75 data
        const categoriesToDelete = await Category.find({ topicId: topic._id, group: /^Blind 75:/ });
        const categoryIds = categoriesToDelete.map(c => c._id);
        
        // Also find "Blind 75" categories (in case group format changed)
        const oldReview = await Category.find({ topicId: topic._id, group: 'blind-75' });
        oldReview.forEach(c => categoryIds.push(c._id));

        if (categoryIds.length > 0) {
            await Section.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ _id: { $in: categoryIds } });
            console.log(`Cleared ${categoryIds.length} existing Blind 75 categories and their sections`);
        }

        const data = blind75Data["Blind_75_LeetCode_Questions"];
        
        // Helper to ensure unique slugs
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

        // 3. Process Data
        let order = 1;
        for (const [key, questions] of Object.entries(data)) {
            const categoryName = formatName(key);
            const categorySlug = `blind75-${categoryName.toLowerCase().replace(/ /g, '-')}`;

            // Create Category grouped under "Blind 75"
            // Note: TopicPage logic splits this automatically if we format group as "Blind 75:CategoryName"
            // But checking TopicPage.jsx, it uses groupedData[tab][subGroup].
            // If we use group='blind 75', it puts all in one bucket?
            // The user request shows "Array", "String" etc as subgroups.
            // So we should use group='Blind 75:Array', etc?
            // Let's stick to the convention used for Algos -> 'Algorithms:Sorting'
            // So here: 'Blind 75:Array'
            
            const category = await Category.create({
                name: categoryName,
                slug: categorySlug,
                description: `Blind 75 Practice Questions for ${categoryName}`,
                topicId: topic._id,
                group: `Blind 75:${categoryName}`, 
                order: order++
            });

            const sectionDocs = questions.map((q, index) => ({
                title: q.title,
                slug: generateUniqueSlug(q.title),
                description: `Practice ${q.title} (LeetCode #${q.id})`,
                content: `### Problem Description\n\nSolve the **${q.title}** problem.\n\nDifficulty: **${q.difficulty}**\n\n[LeetCode Link](https://leetcode.com/problems/${q.title.toLowerCase().replace(/ /g, '-')}/)`,
                categoryId: category._id,
                topicId: topic._id,
                order: index + 1,
                difficulty: mapDifficulty(q.difficulty),
                keyPoints: [`LeetCode ID: ${q.id}`, `Difficulty: ${q.difficulty}`, 'Blind 75'],
                isCompleted: false
            }));

            await Section.insertMany(sectionDocs);
            console.log(`Created Category: ${categoryName} with ${sectionDocs.length} questions`);
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedBlind75();
