
const algorithmsCurriculum = {

  "00_algorithm_mental_models": {
    "algorithm_concepts": [
      "What is an Algorithm",
      "Why Algorithms are Needed",
      "Characteristics of Good Algorithms",
      "Algorithm Design Guidelines",
      "Algorithm Analysis Methodology"
    ],
    "algorithm_properties": [
      "Algorithm Correctness",
      "Algorithm Termination",
      "Deterministic vs Non-deterministic Algorithms",
      "Exact vs Approximation Algorithms"
    ]
  },

  "01_problem_solving_strategies": {
    "problem_solving_approaches": [
      "Brute Force Approach",
      "Divide and Conquer Strategy",
      "Greedy Approach",
      "Dynamic Programming Approach",
      "Backtracking Approach",
      "Branch and Bound Approach"
    ]
  },

  "02_complexity_and_analysis": {
    "time_complexity": [
      "Time Complexity Concepts",
      "Best Case Time Complexity",
      "Average Case Time Complexity",
      "Worst Case Time Complexity",
      "Amortized Analysis"
    ],
    "space_complexity": [
      "Space Complexity Concepts",
      "Auxiliary Space",
      "In-place Algorithms",
      "Space-Time Trade-off"
    ],
    "asymptotic_notations": [
      "Big-O Notation (Upper Bound)",
      "Big-Ω Notation (Lower Bound)",
      "Big-Θ Notation (Tight Bound)",
      "Little-o Notation",
      "Little-ω Notation"
    ],
    "complexity_classes": [
      "O(1) - Constant Time",
      "O(log n) - Logarithmic Time",
      "O(n) - Linear Time",
      "O(n log n) - Linearithmic Time",
      "O(n²) - Quadratic Time",
      "O(n³) - Cubic Time",
      "O(2ⁿ) - Exponential Time",
      "O(n!) - Factorial Time"
    ],
    "practical_analysis": [
      "Analyzing Loop Complexity",
      "Analyzing Nested Loop Complexity",
      "Analyzing Recursive Algorithm Complexity",
      "Master Theorem Application",
      "Recurrence Relation Solving"
    ]
  },

  "03_recursion_core": {
    "recursion_concepts": [
      "Recursion Fundamentals",
      "Base Case and Recursive Case",
      "Recursion Tree Visualization",
      "Recursion vs Iteration"
    ],
    "recursion_types": [
      "Direct Recursion",
      "Indirect Recursion",
      "Tail Recursion",
      "Head Recursion",
      "Tree Recursion",
      "Nested Recursion"
    ],
    "recursion_analysis": [
      "Time Complexity of Recursive Algorithms",
      "Space Complexity of Recursive Algorithms",
      "Recurrence Relation Formulation",
      "Solving Recurrence Relations"
    ],
    "recursion_problems": [
      "Factorial Calculation",
      "Fibonacci Sequence Generation",
      "Tower of Hanoi Problem",
      "GCD Calculation (Euclidean Algorithm)",
      "Power Calculation (Fast Exponentiation)"
    ]
  },

  "04_searching_algorithms": {
    "linear_search": [
      "Linear Search Algorithm",
      "Linear Search Time Complexity",
      "Linear Search Applications"
    ],
    "binary_search": [
      "Binary Search Algorithm (Iterative)",
      "Binary Search Algorithm (Recursive)",
      "Binary Search Time Complexity",
      "Binary Search Space Complexity"
    ],
    "advanced_searching": [
      "Ternary Search Algorithm",
      "Exponential Search Algorithm",
      "Interpolation Search Algorithm",
      "Fibonacci Search Algorithm"
    ],
    "searching_concepts": [
      "Search Space Reduction",
      "Search in Rotated Sorted Array",
      "Search in Infinite Array",
      "Search in Matrix"
    ],
    "searching_applications": [
      "Find Element Closest to Target",
      "Find Minimum in Rotated Sorted Array",
      "Find Peak Element",
      "Find First/Last Occurrence"
    ]
  },

  "05_sorting_algorithms": {
    "01_bubble_sort": [
      "Bubble Sort Mechanism",
      "Optimized Bubble Sort",
      "Time and Space Complexity",
      "Stable vs Unstable",
      "When to use Bubble Sort"
    ],
    "02_selection_sort": [
      "Selection Sort Mechanism",
      "Time and Space Complexity",
      "Stability Analysis",
      "When to use Selection Sort"
    ],
    "03_insertion_sort": [
      "Insertion Sort Mechanism",
      "Adaptive Nature",
      "Time and Space Complexity",
      "Online Algorithm Property",
      "When to use Insertion Sort"
    ],
    "04_merge_sort": [
      "Divide and Conquer Strategy",
      "Merge Step Logic",
      "Recursive Implementation",
      "Iterative Implementation",
      "Analysis of Complexity",
      "Stability of Merge Sort"
    ],
    "05_quick_sort": [
      "Partitioning Logic (Lomuto vs Hoare)",
      "Pivot Selection Strategies",
      "Recursive Implementation",
      "Worst Case Analysis",
      "Randomized Quick Sort",
      "Quick Sort vs Merge Sort"
    ],
    "06_heap_sort": [
      "Binary Heap Data Structure",
      "Heapify Operation",
      "Heap Sort Algorithm",
      "Time and Space Complexity",
      "Applications of Heap Sort"
    ],
    "07_counting_sort": [
      "Key-Indexed Counting",
      "Non-Comparison Sorting",
      "Complexity Analysis",
      "Limitations and Constraints"
    ],
    "08_radix_sort": [
      "LSD vs MSD Radix Sort",
      "Digit-by-Digit Sorting",
      "Complexity Analysis",
      "Applications"
    ],
    "09_bucket_sort": [
      "Scatter-Gather Approach",
      "Bucket Distribution",
      "Complexity Analysis",
      "When to use Bucket Sort"
    ],
    "10_sorting_concepts": [
      "Stability in Sorting",
      "In-place vs Out-of-place",
      "Adaptive Algorithms",
      "Lower Bound of Comparison Sorting",
      "External Sorting"
    ]
  },

  "06_array_string_foundations": {
    "array_algorithms": [
      "Array Rotation Algorithms",
      "Find Missing Number in Array",
      "Find Duplicate Number in Array",
      "Find Majority Element in Array",
      "Maximum Product Subarray",
      "Maximum Sum Circular Subarray"
    ],
    "string_algorithms": [
      "String Reversal Algorithms",
      "Palindrome Checking Algorithms",
      "Anagram Detection Algorithms",
      "String Compression Algorithms"
    ]
  },

  "07_two_pointer_and_sliding_window": {
    "two_pointer_concepts": [
      "Two Pointer Technique",
      "Fast and Slow Pointer Pattern",
      "Left and Right Pointer Pattern"
    ],
    "two_pointer_problems": [
      "Two Sum Problem",
      "Three Sum Problem",
      "Container With Most Water",
      "Trapping Rain Water",
      "Remove Duplicates from Sorted Array",
      "Valid Palindrome Check",
      "Linked List Cycle Detection",
      "Merge Two Sorted Arrays"
    ],
    "sliding_window_concepts": [
      "Sliding Window Technique",
      "Fixed Size Window",
      "Variable Size Window",
      "Prefix Sum Technique"
    ],
    "sliding_window_problems": [
      "Maximum Sum Subarray of Size K",
      "Longest Substring Without Repeating Characters",
      "Minimum Window Substring",
      "Longest Subarray with Sum K",
      "Fruit Into Baskets Problem",
      "Maximum Average Subarray",
      "Permutation in String"
    ]
  },

  "08_backtracking_and_dp": {
    "backtracking_concepts": [
      "Backtracking Algorithm Pattern",
      "State Space Tree",
      "Pruning Techniques",
      "Constraint Satisfaction"
    ],
    "backtracking_problems": [
      "N-Queens Problem",
      "Sudoku Solver",
      "Rat in a Maze",
      "Hamiltonian Path",
      "Graph Coloring Problem",
      "Subset Sum Problem",
      "Permutation Generation",
      "Combination Generation"
    ],
    "dp_concepts": [
      "Dynamic Programming Principles",
      "Optimal Substructure Property",
      "Overlapping Subproblems",
      "Memoization Technique",
      "Tabulation Technique"
    ],
    "dp_problems": [
      "Fibonacci Sequence (DP Solution)",
      "Longest Common Subsequence",
      "Longest Increasing Subsequence",
      "0/1 Knapsack Problem",
      "Coin Change Problem",
      "Edit Distance Problem",
      "Matrix Chain Multiplication",
      "Longest Palindromic Subsequence"
    ]
  },

  "09_greedy_algorithms": {
    "greedy_concepts": [
      "Greedy Choice Property",
      "Optimal Substructure in Greedy",
      "Greedy vs Dynamic Programming"
    ],
    "greedy_problems": [
      "Activity Selection Problem",
      "Huffman Coding",
      "Fractional Knapsack Problem",
      "Job Sequencing Problem",
      "Minimum Spanning Tree (Prim's, Kruskal's)",
      "Dijkstra's Shortest Path",
      "Coin Change (Greedy Approach)"
    ],
    "greedy_analysis": [
      "Proving Greedy Optimality",
      "When Greedy Fails",
      "Greedy Approximation Algorithms"
    ]
  },

  "10_tree_and_graph_algorithms": {
    "tree_algorithms": [
      "Inorder Traversal Algorithm",
      "Preorder Traversal Algorithm",
      "Postorder Traversal Algorithm",
      "Level Order Traversal Algorithm",
      "Morris Traversal Algorithms",
      "Lowest Common Ancestor (LCA) Algorithms"
    ],
    "graph_algorithms": [
      "Breadth First Search (BFS) Algorithm",
      "Depth First Search (DFS) Algorithm",
      "Topological Sorting",
      "Cycle Detection in Graphs",
      "Strongly Connected Components (Kosaraju's, Tarjan's)"
    ]
  },

  "11_advanced_and_real_world": {
    "advanced_algorithms": [
      "Network Flow (Ford-Fulkerson)",
      "Convex Hull Algorithms (Graham Scan, Jarvis March)",
      "Randomized Quick Sort",
      "Approximation Algorithms"
    ],
    "real_world_applications": [
      "Load Balancing Algorithms",
      "Caching Algorithms (LRU, LFU)",
      "Consistent Hashing",
      "Rate Limiting Algorithms"
    ]
  },

  "12_practice_and_competitive": {
    "practice_strategies": [
      "Design Brute Force Solution First",
      "Optimize Step by Step",
      "Dry Run and Edge Case Testing",
      "Time and Space Trade-offs"
    ],
    "competitive_programming": [
      "Segment Tree Implementation",
      "Fenwick Tree (Binary Indexed Tree)",
      "Union-Find (Disjoint Set Union)",
      "Trie Data Structure Algorithms"
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

const categorizeDifficulty = (name, parentName) => {
  const lowerName = name.toLowerCase() + ' ' + parentName.toLowerCase();
  
  if (lowerName.includes('advanced') || 
      lowerName.includes('dynamic programming') || 
      lowerName.includes('graph') || 
      lowerName.includes('backtracking') ||
      lowerName.includes('complexity') ||
      lowerName.includes('system design') ||
      lowerName.includes('competitive') ||
      lowerName.includes('randomized') ||
      lowerName.includes('approximation')) {
    return 'advanced';
  }
  
  if (lowerName.includes('tree') || 
      lowerName.includes('heap') || 
      lowerName.includes('recursion') || 
      lowerName.includes('sorting') ||
      lowerName.includes('searching') ||
      lowerName.includes('sliding window') ||
      lowerName.includes('two pointer')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (Algorithms)
    // Note: User might have called it "Algorithms" or "DSA" or "Algorithms & Data Structures"
    // We'll search for 'algorithms' slug first, or create it.
    let topic = await Topic.findOne({ slug: 'algorithms' });
    
    if (!topic) {
        // Try alternate naming if needed, or just create
        topic = await Topic.findOne({ slug: 'dsa-algorithms' });
    }

    if (!topic) {
      console.log('ℹ️ Algorithms topic not found, creating...');
      topic = await Topic.create({
        name: 'Algorithms',
        slug: 'algorithms',
        description: 'Master fundamental and advanced algorithms',
        icon: '🧮',
        order: 6,
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

    for (const [catKey, sectionsObj] of Object.entries(algorithmsCurriculum)) {
      // Format Category Name: "01_algorithm_foundations" -> "Algorithm Foundations"
      let catName = catKey.replace(/^\d+_/, '').split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
    const getGroupForCategory = (catName) => {
        const lower = catName.toLowerCase();
        if (lower.includes('foundations') || lower.includes('complexity') || lower.includes('mathematical') || lower.includes('bit manipulation')) return 'Fundamentals';
        if (lower.includes('sorting') || lower.includes('searching') || lower.includes('recursion') || lower.includes('divide')) return 'Core Algorithms';
        if (lower.includes('graph') || lower.includes('tree') || lower.includes('heap') || lower.includes('string') || lower.includes('array')) return 'Data Structure Algorithms';
        if (lower.includes('dynamic') || lower.includes('backtracking') || lower.includes('greedy') || lower.includes('two pointer') || lower.includes('sliding window')) return 'Advanced Paradigms';
        return 'Specialized Topics';
    };

      const category = await Category.create({
        name: catName,
        slug: slugify(`DSA ${catName}`, { lower: true, strict: true }),
        topicId: topic._id,
        order: categoryOrder++,
        group: getGroupForCategory(catName),
        description: `Master ${catName}`
      });

      console.log(`  📂 Created Category: ${category.name}`);

      let sectionOrder = 1;
      
      const sectionsToProcess = Array.isArray(sectionsObj) 
        ? { "Core Concepts": sectionsObj } 
        : sectionsObj;

      for (const [secKey, keyPoints] of Object.entries(sectionsToProcess)) {
        // Format Section Title
        let secTitle = secKey.split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Fix abbreviation casing
        secTitle = secTitle
          .replace('Bfs', 'BFS')
          .replace('Dfs', 'DFS')
          .replace('Dp', 'DP')
          .replace('Lru', 'LRU')
          .replace('Lfu', 'LFU')
          .replace('Gcd', 'GCD')
          .replace('Lca', 'LCA')
          .replace('Kmp', 'KMP')
          .replace('Xor', 'XOR')
          .replace('Lcs', 'LCS')
          .replace('Lis', 'LIS')
          .replace('Trie', 'Trie') // It's a proper noun/structure name usually capitalized
          .replace('Mst', 'MST');

        // Determine difficulty
        const difficulty = categorizeDifficulty(secTitle, catName);

        // Generate a description from key points
        const description = `Learn about ${keyPoints.slice(0, 3).join(', ')}...`;

        await Section.create({
          title: secTitle,
          slug: slugify(`${catName}-${secTitle}`, { lower: true, strict: true }),
          categoryId: category._id,
          topicId: topic._id,
          order: sectionOrder++,
          description: description,
          content: `## ${secTitle}\n\n${description}\n\n### Key Concepts:\n${keyPoints.map(kp => `- ${kp}`).join('\n')}`,
          difficulty: difficulty,
          estimatedTime: 15 + (keyPoints.length * 2), // Rough estimate
          isNew: false,
          isPro: false
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
