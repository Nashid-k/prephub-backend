
const algorithmsCurriculum = {
  "01_algorithm_foundations": {
    "algorithm_concepts": [
      "What is an Algorithm",
      "Why Algorithms are Needed",
      "Characteristics of Good Algorithms",
      "Algorithm Design Guidelines",
      "Algorithm Analysis Methodology"
    ],
    "problem_solving_approaches": [
      "Brute Force Approach",
      "Divide and Conquer Strategy",
      "Greedy Approach",
      "Dynamic Programming Approach",
      "Backtracking Approach",
      "Branch and Bound Approach"
    ],
    "algorithm_properties": [
      "Algorithm Correctness",
      "Algorithm Termination",
      "Deterministic vs Non-deterministic Algorithms",
      "Exact vs Approximation Algorithms"
    ]
  },
  "02_complexity_analysis": {
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
  "03_sorting_algorithms": {
    "comparison_based_sorting": [
      "Bubble Sort Algorithm",
      "Selection Sort Algorithm",
      "Insertion Sort Algorithm",
      "Merge Sort Algorithm",
      "Quick Sort Algorithm",
      "Heap Sort Algorithm",
      "Shell Sort Algorithm"
    ],
    "non_comparison_sorting": [
      "Counting Sort Algorithm",
      "Radix Sort Algorithm",
      "Bucket Sort Algorithm"
    ],
    "sorting_properties": [
      "Stable vs Unstable Sorting",
      "In-place vs Out-of-place Sorting",
      "Adaptive Sorting Algorithms",
      "Online Sorting Algorithms"
    ],
    "sorting_analysis": [
      "Time Complexity Comparison of Sorting Algorithms",
      "Space Complexity Comparison of Sorting Algorithms",
      "When to Use Which Sorting Algorithm",
      "Worst-case Input for Quick Sort",
      "Why Quick Sort is Not Stable"
    ],
    "sorting_variations": [
      "Sort Nearly Sorted Array",
      "Sort Partially Sorted Array",
      "External Sorting Algorithms",
      "Parallel Sorting Algorithms"
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
  "05_recursion_algorithms": {
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
  "06_backtracking_algorithms": {
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
    "backtracking_optimization": [
      "Branch and Bound Technique",
      "Memoization in Backtracking",
      "Heuristic Search Methods"
    ]
  },
  "07_dynamic_programming": {
    "dp_concepts": [
      "Dynamic Programming Principles",
      "Optimal Substructure Property",
      "Overlapping Subproblems",
      "Memoization Technique",
      "Tabulation Technique"
    ],
    "dp_approaches": [
      "Top-down Approach (Memoization)",
      "Bottom-up Approach (Tabulation)",
      "Space Optimization in DP"
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
    ],
    "dp_patterns": [
      "1D DP Problems",
      "2D DP Problems",
      "DP on Trees",
      "DP on Graphs",
      "Bitmask DP"
    ]
  },
  "08_greedy_algorithms": {
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
  "09_divide_conquer": {
    "divide_conquer_concepts": [
      "Divide and Conquer Strategy",
      "Divide Step",
      "Conquer Step",
      "Combine Step"
    ],
    "divide_conquer_problems": [
      "Merge Sort Implementation",
      "Quick Sort Implementation",
      "Binary Search Implementation",
      "Closest Pair of Points",
      "Strassen's Matrix Multiplication",
      "Maximum Subarray Sum (Divide & Conquer)",
      "Karatsuba Algorithm for Multiplication"
    ]
  },
  "10_two_pointer_algorithms": {
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
    ]
  },
  "11_sliding_window_algorithms": {
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
  "12_string_algorithms": {
    "string_basics": [
      "String Reversal Algorithms",
      "Palindrome Checking Algorithms",
      "Anagram Detection Algorithms",
      "String Compression Algorithms"
    ],
    "pattern_matching": [
      "Naive String Matching",
      "Knuth-Morris-Pratt (KMP) Algorithm",
      "Rabin-Karp Algorithm",
      "Boyer-Moore Algorithm"
    ],
    "string_manipulation": [
      "Longest Common Prefix",
      "Longest Palindromic Substring",
      "Longest Repeating Subsequence",
      "Edit Distance Between Strings",
      "String Interleaving Problem"
    ]
  },
  "13_array_algorithms": {
    "array_manipulation": [
      "Array Rotation Algorithms",
      "Find Missing Number in Array",
      "Find Duplicate Number in Array",
      "Find Majority Element in Array",
      "Maximum Product Subarray",
      "Maximum Sum Circular Subarray"
    ],
    "subarray_problems": [
      "Kadane's Algorithm (Maximum Subarray Sum)",
      "Maximum Product Subarray",
      "Subarray with Given Sum",
      "Count Subarrays with Given XOR",
      "Longest Increasing Subarray"
    ],
    "array_transformation": [
      "Move Zeroes to End",
      "Segregate 0s and 1s",
      "Dutch National Flag Problem",
      "Next Permutation",
      "Rotate Array by K Positions"
    ]
  },
  "14_mathematical_algorithms": {
    "number_theory": [
      "Sieve of Eratosthenes",
      "Euclidean Algorithm (GCD)",
      "Extended Euclidean Algorithm",
      "Modular Exponentiation",
      "Prime Factorization Algorithms"
    ],
    "combinatorics": [
      "Binomial Coefficient Calculation",
      "Catalan Numbers",
      "Permutations Generation",
      "Combinations Generation"
    ],
    "numerical_algorithms": [
      "Fast Exponentiation",
      "Matrix Exponentiation",
      "Newton-Raphson Method",
      "Monte Carlo Algorithms"
    ]
  },
  "15_bit_manipulation_algorithms": {
    "bit_operations": [
      "Bitwise AND, OR, XOR Operations",
      "Left Shift and Right Shift",
      "Bit Masking Techniques",
      "Bit Counting Algorithms"
    ],
    "bit_problems": [
      "Single Number Problem",
      "Counting Set Bits",
      "Find Missing Number Using XOR",
      "Power of Two Check",
      "Swap Two Numbers Without Temp"
    ]
  },
  "16_graph_algorithms": {
    "graph_traversal": [
      "Breadth First Search (BFS) Algorithm",
      "Depth First Search (DFS) Algorithm",
      "BFS vs DFS Comparison",
      "Applications of BFS and DFS"
    ],
    "shortest_path": [
      "Dijkstra's Algorithm",
      "Bellman-Ford Algorithm",
      "Floyd-Warshall Algorithm",
      "A* Search Algorithm"
    ],
    "minimum_spanning_tree": [
      "Prim's Algorithm",
      "Kruskal's Algorithm",
      "Boruvka's Algorithm"
    ],
    "graph_problems": [
      "Topological Sorting",
      "Cycle Detection in Graphs",
      "Strongly Connected Components (Kosaraju's, Tarjan's)",
      "Articulation Points and Bridges",
      "Bipartite Graph Checking",
      "Network Flow (Ford-Fulkerson)"
    ]
  },
  "17_tree_algorithms": {
    "tree_traversal": [
      "Inorder Traversal Algorithm",
      "Preorder Traversal Algorithm",
      "Postorder Traversal Algorithm",
      "Level Order Traversal Algorithm",
      "Morris Traversal Algorithms"
    ],
    "tree_properties": [
      "Check if Binary Tree is Balanced",
      "Check if Binary Tree is Symmetric",
      "Check if Binary Tree is BST",
      "Height/Diameter of Binary Tree",
      "Lowest Common Ancestor (LCA) Algorithms"
    ],
    "tree_operations": [
      "Construct Tree from Traversals",
      "Serialize and Deserialize Binary Tree",
      "Invert/Mirror Binary Tree",
      "Flatten Binary Tree to Linked List"
    ],
    "bst_algorithms": [
      "Search in BST",
      "Insert in BST",
      "Delete in BST",
      "Kth Smallest Element in BST",
      "Floor and Ceil in BST"
    ]
  },
  "18_heap_algorithms": {
    "heap_operations": [
      "Heapify Algorithm",
      "Build Heap Algorithm",
      "Heap Sort Algorithm",
      "Priority Queue Operations"
    ],
    "heap_problems": [
      "Kth Largest Element",
      "Kth Smallest Element",
      "Top K Frequent Elements",
      "Merge K Sorted Lists",
      "Find Median from Data Stream"
    ]
  },
  "19_advanced_algorithms": {
    "computational_geometry": [
      "Convex Hull Algorithms (Graham Scan, Jarvis March)",
      "Line Intersection Detection",
      "Point in Polygon Test",
      "Closest Pair of Points"
    ],
    "randomized_algorithms": [
      "Randomized Quick Sort",
      "Monte Carlo Algorithms",
      "Las Vegas Algorithms"
    ],
    "approximation_algorithms": [
      "Vertex Cover Approximation",
      "Traveling Salesman Problem Approximation",
      "Set Cover Approximation"
    ]
  },
  "20_algorithm_design_patterns": {
    "common_patterns": [
      "Prefix Sum Pattern",
      "Sliding Window Pattern",
      "Two Pointer Pattern",
      "Fast and Slow Pointer Pattern",
      "Merge Intervals Pattern",
      "Cyclic Sort Pattern",
      "In-place Reversal Pattern",
      "Tree BFS Pattern",
      "Tree DFS Pattern",
      "Two Heaps Pattern",
      "Subsets Pattern",
      "Modified Binary Search Pattern",
      "Top K Elements Pattern",
      "K-way Merge Pattern",
      "Topological Sort Pattern"
    ]
  },
  "21_algorithm_practice_strategies": {
    "problem_solving_approach": [
      "Understand the Problem Statement",
      "Identify Input Constraints",
      "Design Brute Force Solution First",
      "Analyze Time and Space Complexity",
      "Optimize Step by Step",
      "Edge Cases Consideration",
      "Test with Sample Inputs"
    ],
    "implementation_techniques": [
      "Algorithm Pseudocode Writing",
      "Step-by-step Implementation",
      "Modular Code Organization",
      "Efficient Data Structure Selection",
      "Optimization Techniques Application"
      ],
    "debugging_testing": [
      "Algorithm Dry Run",
      "Corner Case Testing",
      "Performance Testing",
      "Memory Usage Testing",
      "Algorithm Visualization"
    ]
  },
  "22_competitive_programming_algorithms": {
    "essential_algorithms": [
      "Binary Search Variations",
      "Two Pointer Techniques",
      "Sliding Window Optimizations",
      "Prefix Sum Applications",
      "Segment Tree Implementation",
      "Fenwick Tree (Binary Indexed Tree)",
      "Union-Find (Disjoint Set Union)",
      "Trie Data Structure Algorithms"
    ],
    "problem_categories": [
      "Ad Hoc Problems",
      "Dynamic Programming Problems",
      "Graph Theory Problems",
      "Number Theory Problems",
      "Geometry Problems",
      "String Processing Problems"
    ]
  },
  "23_real_world_algorithm_applications": {
    "system_design": [
      "Load Balancing Algorithms",
      "Caching Algorithms (LRU, LFU)",
      "Consistent Hashing",
      "Rate Limiting Algorithms"
    ],
    "data_processing": [
      "Sorting Large Datasets",
      "Data Compression Algorithms",
      "Pattern Matching in Big Data",
      "Stream Processing Algorithms"
    ],
    "machine_learning": [
      "K-means Clustering Algorithm",
      "K-nearest Neighbors Algorithm",
      "Decision Tree Algorithms",
      "Gradient Descent Optimization"
    ]
  }
};

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';
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
      
      const category = await Category.create({
        name: catName,
        slug: slugify(catName, { lower: true, strict: true }),
        topicId: topic._id,
        order: categoryOrder++,
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
          slug: slugify(secTitle, { lower: true, strict: true }),
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
