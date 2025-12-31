
const blind75Curriculum = {
    "study_approach": {
      "recommended_order": [
        "Start with Easy problems",
        "Progress to Medium problems",
        "Attempt Hard problems after mastering Medium",
        "Group by topic to reinforce concepts",
        "Mix topics after individual mastery"
      ],
      "practice_strategy": [
        "Solve without looking at solutions first",
        "Implement brute force approach first",
        "Optimize step by step",
        "Analyze time and space complexity",
        "Practice explaining solutions out loud",
        "Review similar problems together"
      ],
      "tracking_system": [
        "Track completion status for each problem",
        "Note time taken for each solution",
        "Record multiple approaches attempted",
        "Mark problems that need revision",
        "Track pattern recognition progress"
      ]
    },
    "problem_categories": {
      "01_warmup_easy_problems": {
        "category_description": "Fundamental problems to build confidence and basic pattern recognition",
        "problems": [
          { "id": 217, "title": "Contains Duplicate", "difficulty": "Easy", "pattern": "Hash Set", "time_to_solve": "15 min" },
          { "id": 242, "title": "Valid Anagram", "difficulty": "Easy", "pattern": "Frequency Counter", "time_to_solve": "15 min" },
          { "id": 1, "title": "Two Sum", "difficulty": "Easy", "pattern": "Hash Map", "time_to_solve": "20 min" },
          { "id": 20, "title": "Valid Parentheses", "difficulty": "Easy", "pattern": "Stack", "time_to_solve": "20 min" },
          { "id": 121, "title": "Best Time to Buy and Sell Stock", "difficulty": "Easy", "pattern": "Greedy", "time_to_solve": "20 min" },
          { "id": 70, "title": "Climbing Stairs", "difficulty": "Easy", "pattern": "Dynamic Programming", "time_to_solve": "20 min" },
          { "id": 206, "title": "Reverse Linked List", "difficulty": "Easy", "pattern": "Linked List", "time_to_solve": "20 min" },
          { "id": 21, "title": "Merge Two Sorted Lists", "difficulty": "Easy", "pattern": "Linked List", "time_to_solve": "25 min" },
          { "id": 141, "title": "Linked List Cycle", "difficulty": "Easy", "pattern": "Fast & Slow Pointer", "time_to_solve": "25 min" },
          { "id": 104, "title": "Maximum Depth of Binary Tree", "difficulty": "Easy", "pattern": "Tree DFS", "time_to_solve": "20 min" },
          { "id": 100, "title": "Same Tree", "difficulty": "Easy", "pattern": "Tree DFS", "time_to_solve": "20 min" },
          { "id": 226, "title": "Invert Binary Tree", "difficulty": "Easy", "pattern": "Tree DFS", "time_to_solve": "20 min" },
          { "id": 125, "title": "Valid Palindrome", "difficulty": "Easy", "pattern": "Two Pointers", "time_to_solve": "20 min" },
          { "id": 572, "title": "Subtree of Another Tree", "difficulty": "Easy", "pattern": "Tree DFS", "time_to_solve": "25 min" }
        ]
      },
      "02_array_string_patterns": {
        "category_description": "Core array and string manipulation problems with common patterns",
        "problems": [
          { "id": 53, "title": "Maximum Subarray", "difficulty": "Easy", "pattern": "Kadane's Algorithm", "time_to_solve": "25 min" },
          { "id": 238, "title": "Product of Array Except Self", "difficulty": "Medium", "pattern": "Prefix/Suffix Product", "time_to_solve": "30 min" },
          { "id": 152, "title": "Maximum Product Subarray", "difficulty": "Medium", "pattern": "Dynamic Programming", "time_to_solve": "35 min" },
          { "id": 153, "title": "Find Minimum in Rotated Sorted Array", "difficulty": "Medium", "pattern": "Binary Search", "time_to_solve": "30 min" },
          { "id": 33, "title": "Search in Rotated Sorted Array", "difficulty": "Medium", "pattern": "Binary Search", "time_to_solve": "35 min" },
          { "id": 15, "title": "3Sum", "difficulty": "Medium", "pattern": "Two Pointers", "time_to_solve": "40 min" },
          { "id": 11, "title": "Container With Most Water", "difficulty": "Medium", "pattern": "Two Pointers", "time_to_solve": "30 min" },
          { "id": 3, "title": "Longest Substring Without Repeating Characters", "difficulty": "Medium", "pattern": "Sliding Window", "time_to_solve": "35 min" },
          { "id": 424, "title": "Longest Repeating Character Replacement", "difficulty": "Medium", "pattern": "Sliding Window", "time_to_solve": "40 min" },
          { "id": 567, "title": "Permutation in String", "difficulty": "Medium", "pattern": "Sliding Window", "time_to_solve": "40 min" },
          { "id": 76, "title": "Minimum Window Substring", "difficulty": "Hard", "pattern": "Sliding Window", "time_to_solve": "50 min" },
          { "id": 49, "title": "Group Anagrams", "difficulty": "Medium", "pattern": "Hash Map", "time_to_solve": "30 min" },
          { "id": 5, "title": "Longest Palindromic Substring", "difficulty": "Medium", "pattern": "Two Pointers", "time_to_solve": "45 min" },
          { "id": 647, "title": "Palindromic Substrings", "difficulty": "Medium", "pattern": "Two Pointers", "time_to_solve": "40 min" },
          { "id": 128, "title": "Longest Consecutive Sequence", "difficulty": "Medium", "pattern": "Hash Set", "time_to_solve": "35 min" }
        ]
      },
      "03_linked_list_techniques": {
        "category_description": "Linked list manipulation and common interview patterns",
        "problems": [
          { "id": 143, "title": "Reorder List", "difficulty": "Medium", "pattern": "Fast & Slow Pointer", "time_to_solve": "40 min" },
          { "id": 19, "title": "Remove Nth Node From End of List", "difficulty": "Medium", "pattern": "Two Pointers", "time_to_solve": "30 min" },
          { "id": 138, "title": "Copy List with Random Pointer", "difficulty": "Medium", "pattern": "Hash Map", "time_to_solve": "45 min" },
          { "id": 2, "title": "Add Two Numbers", "difficulty": "Medium", "pattern": "Linked List", "time_to_solve": "40 min" },
          { "id": 23, "title": "Merge k Sorted Lists", "difficulty": "Hard", "pattern": "Heap/Priority Queue", "time_to_solve": "50 min" },
          { "id": 146, "title": "LRU Cache", "difficulty": "Medium", "pattern": "Hash Map + Doubly Linked List", "time_to_solve": "60 min" }
        ]
      },
      "04_tree_traversal_variations": {
        "category_description": "Binary tree and BST problems covering various traversal methods",
        "problems": [
          { "id": 124, "title": "Binary Tree Maximum Path Sum", "difficulty": "Hard", "pattern": "Tree DFS", "time_to_solve": "50 min" },
          { "id": 102, "title": "Binary Tree Level Order Traversal", "difficulty": "Medium", "pattern": "Tree BFS", "time_to_solve": "30 min" },
          { "id": 297, "title": "Serialize and Deserialize Binary Tree", "difficulty": "Hard", "pattern": "Tree DFS", "time_to_solve": "60 min" },
          { "id": 105, "title": "Construct Binary Tree from Preorder and Inorder Traversal", "difficulty": "Medium", "pattern": "Tree Construction", "time_to_solve": "45 min" },
          { "id": 98, "title": "Validate Binary Search Tree", "difficulty": "Medium", "pattern": "Tree DFS", "time_to_solve": "35 min" },
          { "id": 230, "title": "Kth Smallest Element in a BST", "difficulty": "Medium", "pattern": "Tree Inorder", "time_to_solve": "35 min" },
          { "id": 235, "title": "Lowest Common Ancestor of a Binary Search Tree", "difficulty": "Medium", "pattern": "Tree DFS", "time_to_solve": "30 min" },
          { "id": 208, "title": "Implement Trie (Prefix Tree)", "difficulty": "Medium", "pattern": "Trie", "time_to_solve": "40 min" }
        ]
      },
      "05_heap_stack_queue": {
        "category_description": "Problems focusing on heap, stack, and queue data structures",
        "problems": [
          { "id": 347, "title": "Top K Frequent Elements", "difficulty": "Medium", "pattern": "Heap", "time_to_solve": "35 min" },
          { "id": 295, "title": "Find Median from Data Stream", "difficulty": "Hard", "pattern": "Two Heaps", "time_to_solve": "60 min" },
          { "id": 155, "title": "Min Stack", "difficulty": "Medium", "pattern": "Stack", "time_to_solve": "30 min" },
          { "id": 150, "title": "Evaluate Reverse Polish Notation", "difficulty": "Medium", "pattern": "Stack", "time_to_solve": "35 min" },
          { "id": 22, "title": "Generate Parentheses", "difficulty": "Medium", "pattern": "Backtracking", "time_to_solve": "40 min" },
          { "id": 739, "title": "Daily Temperatures", "difficulty": "Medium", "pattern": "Monotonic Stack", "time_to_solve": "40 min" },
          { "id": 853, "title": "Car Fleet", "difficulty": "Medium", "pattern": "Stack", "time_to_solve": "45 min" }
        ]
      },
      "06_binary_search_applications": {
        "category_description": "Binary search variations and applications on different data structures",
        "problems": [
          { "id": 704, "title": "Binary Search", "difficulty": "Easy", "pattern": "Binary Search", "time_to_solve": "20 min" },
          { "id": 74, "title": "Search a 2D Matrix", "difficulty": "Medium", "pattern": "Binary Search", "time_to_solve": "35 min" },
          { "id": 875, "title": "Koko Eating Bananas", "difficulty": "Medium", "pattern": "Binary Search", "time_to_solve": "45 min" },
          { "id": 4, "title": "Median of Two Sorted Arrays", "difficulty": "Hard", "pattern": "Binary Search", "time_to_solve": "70 min" },
          { "id": 981, "title": "Time Based Key-Value Store", "difficulty": "Medium", "pattern": "Binary Search", "time_to_solve": "40 min" }
        ]
      },
      "07_graph_traversal_algorithms": {
        "category_description": "Graph theory problems covering BFS, DFS, and advanced graph algorithms",
        "problems": [
          { "id": 133, "title": "Clone Graph", "difficulty": "Medium", "pattern": "Graph BFS/DFS", "time_to_solve": "40 min" },
          { "id": 207, "title": "Course Schedule", "difficulty": "Medium", "pattern": "Topological Sort", "time_to_solve": "45 min" },
          { "id": 417, "title": "Pacific Atlantic Water Flow", "difficulty": "Medium", "pattern": "Graph DFS", "time_to_solve": "50 min" },
          { "id": 200, "title": "Number of Islands", "difficulty": "Medium", "pattern": "Graph DFS/BFS", "time_to_solve": "35 min" },
          { "id": 269, "title": "Alien Dictionary", "difficulty": "Hard", "pattern": "Topological Sort", "time_to_solve": "60 min" },
          { "id": 261, "title": "Graph Valid Tree", "difficulty": "Medium", "pattern": "Union Find", "time_to_solve": "40 min" },
          { "id": 127, "title": "Word Ladder", "difficulty": "Hard", "pattern": "Graph BFS", "time_to_solve": "60 min" }
        ]
      },
      "08_dynamic_programming_patterns": {
        "category_description": "Classic dynamic programming problems with different patterns",
        "problems": [
          { "id": 322, "title": "Coin Change", "difficulty": "Medium", "pattern": "Unbounded Knapsack", "time_to_solve": "45 min" },
          { "id": 300, "title": "Longest Increasing Subsequence", "difficulty": "Medium", "pattern": "DP with Binary Search", "time_to_solve": "50 min" },
          { "id": 1143, "title": "Longest Common Subsequence", "difficulty": "Medium", "pattern": "2D DP", "time_to_solve": "45 min" },
          { "id": 139, "title": "Word Break", "difficulty": "Medium", "pattern": "DP", "time_to_solve": "45 min" },
          { "id": 377, "title": "Combination Sum IV", "difficulty": "Medium", "pattern": "DP", "time_to_solve": "40 min" },
          { "id": 198, "title": "House Robber", "difficulty": "Medium", "pattern": "1D DP", "time_to_solve": "35 min" },
          { "id": 213, "title": "House Robber II", "difficulty": "Medium", "pattern": "1D DP", "time_to_solve": "40 min" },
          { "id": 91, "title": "Decode Ways", "difficulty": "Medium", "pattern": "1D DP", "time_to_solve": "40 min" },
          { "id": 62, "title": "Unique Paths", "difficulty": "Medium", "pattern": "2D DP", "time_to_solve": "35 min" },
          { "id": 55, "title": "Jump Game", "difficulty": "Medium", "pattern": "Greedy/DP", "time_to_solve": "35 min" },
          { "id": 416, "title": "Partition Equal Subset Sum", "difficulty": "Medium", "pattern": "0/1 Knapsack", "time_to_solve": "50 min" },
          { "id": 72, "title": "Edit Distance", "difficulty": "Medium", "pattern": "2D DP", "time_to_solve": "55 min" }
        ]
      },
      "09_backtracking_techniques": {
        "category_description": "Backtracking problems for combinatorial search and constraint satisfaction",
        "problems": [
          { "id": 78, "title": "Subsets", "difficulty": "Medium", "pattern": "Backtracking", "time_to_solve": "35 min" },
          { "id": 39, "title": "Combination Sum", "difficulty": "Medium", "pattern": "Backtracking", "time_to_solve": "40 min" },
          { "id": 46, "title": "Permutations", "difficulty": "Medium", "pattern": "Backtracking", "time_to_solve": "35 min" },
          { "id": 17, "title": "Letter Combinations of a Phone Number", "difficulty": "Medium", "pattern": "Backtracking", "time_to_solve": "35 min" },
          { "id": 79, "title": "Word Search", "difficulty": "Medium", "pattern": "Backtracking", "time_to_solve": "45 min" },
          { "id": 51, "title": "N-Queens", "difficulty": "Hard", "pattern": "Backtracking", "time_to_solve": "60 min" },
          { "id": 212, "title": "Word Search II", "difficulty": "Hard", "pattern": "Trie + Backtracking", "time_to_solve": "70 min" }
        ]
      },
      "10_greedy_intervals": {
        "category_description": "Greedy algorithms and interval-based problems",
        "problems": [
          { "id": 45, "title": "Jump Game II", "difficulty": "Medium", "pattern": "Greedy", "time_to_solve": "40 min" },
          { "id": 134, "title": "Gas Station", "difficulty": "Medium", "pattern": "Greedy", "time_to_solve": "45 min" },
          { "id": 846, "title": "Hand of Straights", "difficulty": "Medium", "pattern": "Greedy", "time_to_solve": "40 min" },
          { "id": 56, "title": "Merge Intervals", "difficulty": "Medium", "pattern": "Intervals", "time_to_solve": "35 min" },
          { "id": 57, "title": "Insert Interval", "difficulty": "Medium", "pattern": "Intervals", "time_to_solve": "40 min" },
          { "id": 435, "title": "Non-overlapping Intervals", "difficulty": "Medium", "pattern": "Intervals", "time_to_solve": "40 min" },
          { "id": 252, "title": "Meeting Rooms", "difficulty": "Easy", "pattern": "Intervals", "time_to_solve": "25 min" },
          { "id": 253, "title": "Meeting Rooms II", "difficulty": "Medium", "pattern": "Heap", "time_to_solve": "45 min" }
        ]
      },
      "11_miscellaneous_topics": {
        "category_description": "Mixed problems covering math, geometry, bit manipulation, and matrix operations",
        "problems": [
          { "id": 48, "title": "Rotate Image", "difficulty": "Medium", "pattern": "Matrix", "time_to_solve": "35 min" },
          { "id": 54, "title": "Spiral Matrix", "difficulty": "Medium", "pattern": "Matrix", "time_to_solve": "40 min" },
          { "id": 73, "title": "Set Matrix Zeroes", "difficulty": "Medium", "pattern": "Matrix", "time_to_solve": "40 min" },
          { "id": 202, "title": "Happy Number", "difficulty": "Easy", "pattern": "Fast & Slow Pointer", "time_to_solve": "25 min" },
          { "id": 66, "title": "Plus One", "difficulty": "Easy", "pattern": "Array", "time_to_solve": "20 min" },
          { "id": 371, "title": "Sum of Two Integers", "difficulty": "Medium", "pattern": "Bit Manipulation", "time_to_solve": "45 min" },
          { "id": 191, "title": "Number of 1 Bits", "difficulty": "Easy", "pattern": "Bit Manipulation", "time_to_solve": "20 min" },
          { "id": 338, "title": "Counting Bits", "difficulty": "Easy", "pattern": "DP + Bit Manipulation", "time_to_solve": "35 min" },
          { "id": 268, "title": "Missing Number", "difficulty": "Easy", "pattern": "Bit Manipulation", "time_to_solve": "25 min" },
          { "id": 190, "title": "Reverse Bits", "difficulty": "Easy", "pattern": "Bit Manipulation", "time_to_solve": "25 min" },
          { "id": 36, "title": "Valid Sudoku", "difficulty": "Medium", "pattern": "Hash Set", "time_to_solve": "35 min" },
          { "id": 37, "title": "Sudoku Solver", "difficulty": "Hard", "pattern": "Backtracking", "time_to_solve": "60 min" }
        ]
      },
      "12_design_problems": {
        "category_description": "System design and object-oriented design problems",
        "problems": [
          { "id": 211, "title": "Design Add and Search Words Data Structure", "difficulty": "Medium", "pattern": "Trie", "time_to_solve": "45 min" },
          { "id": 348, "title": "Design Tic-Tac-Toe", "difficulty": "Medium", "pattern": "Design", "time_to_solve": "40 min" }
        ]
      }
    },
    // We can also include study schedule, patterns cheatsheet if needed as general info sections or just let them be categories?
    // Let's treat them as categories for comprehensive coverage.
    "study_resources": {
      "study_schedule": [
        "30 Day Plan: Week 1 Fundamentals",
        "30 Day Plan: Week 2 Core Patterns",
        "30 Day Plan: Week 3 Advanced Structures",
        "30 Day Plan: Week 4 Complex Algorithms",
        "60 Day Plan Overview"
      ],
      "problem_patterns": [
        "Two Pointers Pattern",
        "Sliding Window Pattern",
        "Fast & Slow Pointer",
        "Merge Intervals",
        "Cyclic Sort",
        "In-place Reversal",
        "Tree BFS/DFS",
        "Two Heaps",
        "Subsets Pattern",
        "Topological Sort"
      ],
      "assessment_tracking": [
        "Progress Metrics",
        "Weak Area Identification",
        "Performance Goals"
      ]
    }
  };
  
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import slugify from 'slugify';

dotenv.config();

const categorizeDifficulty = (str) => {
    const s = str.toLowerCase();
    if (s.includes('hard') || s.includes('advanced') || s.includes('design') || s.includes('system')) return 'advanced';
    if (s.includes('medium') || s.includes('graph') || s.includes('tree') || s.includes('heap')) return 'intermediate';
    return 'beginner';
};


const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (Blind 75)
    let topic = await Topic.findOne({ slug: 'blind-75' });
    if (!topic) {
        // Fallback
        topic = await Topic.findOne({ slug: 'blind75' });
    }
    
    if (!topic) {
      console.log('ℹ️ Blind 75 topic not found, creating...');
      topic = await Topic.create({
        name: 'Blind 75',
        slug: 'blind-75',
        description: '75 Essential LeetCode problems to ace technical interviews',
        icon: '🎯',
        order: 1, // Prime spot
        isNew: false
      });
    }
    console.log(`📌 Using Topic: ${topic.name}`);

    // 2. Clear existing structure for this topic only
    console.log('🧹 Clearing existing categories and sections...');
    const categories = await Category.find({ topicId: topic._id });
    const categoryIds = categories.map(c => c._id);
    await Section.deleteMany({ categoryId: { $in: categoryIds } });
    await Category.deleteMany({ topicId: topic._id });

    // 3. Process new structure
    console.log('🏗️ Building new hierarchy...');
    
    let categoryOrder = 1;
    let totalSections = 0;

    // A. Handle Problem Categories
    for (const [catKey, catData] of Object.entries(blind75Curriculum.problem_categories)) {
        let catName = catKey.replace(/^\d+_/, '').split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        const category = await Category.create({
            name: catName,
            slug: slugify(catName, { lower: true, strict: true }),
            topicId: topic._id,
            order: categoryOrder++,
            description: catData.category_description || `Master ${catName}`
        });
        console.log(`  📂 Created Category: ${category.name}`);

        let sectionOrder = 1;
        // The "problems" array contains objects, not just strings.
        for (const problem of catData.problems) {
            const secTitle = `${problem.id}. ${problem.title}`;
            
            // Build rich content
            const description = `Pattern: ${problem.pattern} | Difficulty: ${problem.difficulty} | Est. Time: ${problem.time_to_solve}`;
            const content = `## ${problem.title}\n\n**Difficulty**: ${problem.difficulty}\n**Pattern**: ${problem.pattern}\n**Target Time**: ${problem.time_to_solve}\n\n### Problem Description\n(LeetCode Problem #${problem.id})\n\n### Approach\n1. Understand the constraints.\n2. Apply the **${problem.pattern}** pattern.\n3. Implement solution.\n\n### Key Concepts\n- ${problem.pattern}\n- Time Complexity Analysis\n- Space Complexity Analysis`;

            let difficulty = 'beginner';
            if (problem.difficulty === 'Medium') difficulty = 'intermediate';
            if (problem.difficulty === 'Hard') difficulty = 'advanced';

            await Section.create({
                title: secTitle,
                slug: slugify(`${problem.id}-${problem.title}`, { lower: true, strict: true }),
                categoryId: category._id,
                topicId: topic._id,
                order: sectionOrder++,
                description: description,
                content: content,
                difficulty: difficulty,
                estimatedTime: parseInt(problem.time_to_solve) || 30,
                isNew: false,
                isPro: false,
                keyPoints: [problem.pattern, `LeetCode #${problem.id}`, problem.difficulty]
            });
            totalSections++;
        }
    }

    // B. Handle Study Resources (Study Approach, Schedule, Resources)
    // We'll group them into a "Study Guide" super-category or individual categories depending on size.
    // Let's map "study_approach", "study_schedule", "problem_patterns_cheatsheet", "assessment_tracking" 
    // from the JSON root if available, or use the "study_resources" constructed above.
    
    // We already moved them to "study_resources" and logic to process "study_approach" separately for robust structure
    const additionalCats = ["study_approach", "study_resources"];
    
    // Process "study_approach" from root
    if (blind75Curriculum.study_approach) {
         const category = await Category.create({
            name: "Study Approach & Strategy",
            slug: "study-approach-strategy",
            topicId: topic._id,
            order: categoryOrder++,
            description: "Proven strategies to tackle Blind 75"
        });
        
        let secOrd = 1;
        for (const [key, items] of Object.entries(blind75Curriculum.study_approach)) {
            const title = key.split('_').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
            const desc = `Best practices for ${title}`;
            await Section.create({
                title: title, 
                slug: slugify(title, {lower:true, strict:true}),
                categoryId: category._id,
                topicId: topic._id,
                order: secOrd++,
                description: desc,
                content: `## ${title}\n\n${items.map(i=>`- ${i}`).join('\n')}`,
                difficulty: 'beginner',
                isNew: false
            });
            totalSections++;
        }
    }
    
    // Process "study_resources" constructed manually (schedule, patterns, tracking)
    if (blind75Curriculum.study_resources) {
         const category = await Category.create({
            name: "Resources & Schedules",
            slug: "resources-schedules",
            topicId: topic._id,
            order: categoryOrder++,
            description: "Study plans and cheat sheets"
        });
        
        let secOrd = 1;
        for (const [key, items] of Object.entries(blind75Curriculum.study_resources)) {
            const title = key.split('_').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
             const desc = `Resources for ${title}`;
             
             // Items might be strings or objects in original JSON but here they are strings
            await Section.create({
                title: title, 
                slug: slugify(title, {lower:true, strict:true}),
                categoryId: category._id,
                topicId: topic._id,
                order: secOrd++,
                description: desc,
                content: `## ${title}\n\n${items.map(i=>`- ${i}`).join('\n')}`,
                difficulty: 'beginner',
                isNew: false
            });
             totalSections++;
        }
    }


    console.log(`\n✅ Seeding Complete!`);
    console.log(`   - Categories: ${categoryOrder - 1}`);
    console.log(`   - Sections: ${totalSections}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedHierarchy();
