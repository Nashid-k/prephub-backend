
const dataStructuresCurriculum = {
  "01_data_structure_foundations": {
    "introduction": [
      "What is a Data Structure",
      "Why Data Structures are Important",
      "Data Structure vs Abstract Data Type",
      "Data Structure Design Principles"
    ],
    "classification": [
      "Primitive vs Non-Primitive Data Structures",
      "Built-in vs User-defined Data Structures",
      "Homogeneous vs Heterogeneous Data Structures",
      "Linear vs Non-linear Data Structures",
      "Static vs Dynamic Data Structures"
    ],
    "memory_concepts": [
      "Contiguous vs Non-contiguous Memory Allocation",
      "Memory Layout and Organization",
      "Index-based Access Mechanisms",
      "Memory Addressing Concepts"
    ]
  },
  "02_complexity_analysis": {
    "analysis_basics": [
      "Time Complexity of Data Structure Operations",
      "Space Complexity of Data Structure Storage",
      "Best Case, Average Case, Worst Case Analysis",
      "Amortized Analysis for Data Structures"
    ],
    "trade_offs": [
      "Space-Time Trade-offs in Data Structures",
      "Access Time vs Storage Efficiency",
      "Static vs Dynamic Structure Trade-offs"
    ]
  },
  "03_array_data_structures": {
    "array_fundamentals": [
      "Array Data Structure Definition",
      "Array Memory Allocation Pattern",
      "Array Indexing Mechanism",
      "Zero-based vs One-based Indexing"
    ],
    "array_types": [
      "One-dimensional Arrays",
      "Multi-dimensional Arrays",
      "Rectangular Arrays",
      "Jagged Arrays (Array of Arrays)",
      "Sparse Arrays"
    ],
    "array_properties": [
      "Array Size and Capacity",
      "Array Bounds and Limitations",
      "Array Contiguous Memory Property",
      "Random Access Capability"
    ],
    "array_operations_complexity": [
      "Array Access Operation - O(1)",
      "Array Search Operation - O(n)",
      "Array Insert Operation - O(n)",
      "Array Delete Operation - O(n)",
      "Array Update Operation - O(1)"
    ]
  },
  "04_string_data_structures": {
    "string_fundamentals": [
      "String as a Data Structure",
      "String Representation in Memory",
      "Character Encoding Schemes (ASCII, UTF-8, UTF-16)",
      "Null-terminated vs Length-prefixed Strings"
    ],
    "string_properties": [
      "String Immutability Concept",
      "String Interning",
      "String Pool Mechanism",
      "Character vs String Distinction"
    ],
    "special_characters": [
      "Escape Sequences",
      "Control Characters",
      "Unicode Characters",
      "Special String Literals"
    ]
  },
  "05_linked_list_data_structures": {
    "linked_list_fundamentals": [
      "Linked List Data Structure Concept",
      "Node Structure and Composition",
      "Pointer/Reference Mechanism",
      "Non-contiguous Memory Allocation"
    ],
    "linked_list_types": [
      "Singly Linked List Structure",
      "Doubly Linked List Structure",
      "Circular Linked List Structure",
      "Circular Doubly Linked List Structure",
      "Multi-linked List Structure"
    ],
    "linked_list_operations_complexity": [
      "Linked List Access Operation - O(n)",
      "Linked List Search Operation - O(n)",
      "Linked List Insert at Head - O(1)",
      "Linked List Insert at Tail - O(n) or O(1) with tail pointer",
      "Linked List Delete Operation - O(n)"
    ],
    "linked_list_properties": [
      "Linked List vs Array Comparison",
      "Linked List Memory Overhead",
      "Linked List Cache Performance",
      "Linked List Dynamic Size Advantage"
    ]
  },
  "06_stack_data_structure": {
    "stack_fundamentals": [
      "Stack Data Structure Definition",
      "LIFO (Last-In-First-Out) Principle",
      "Stack Top Pointer Concept",
      "Stack Abstract Data Type"
    ],
    "stack_operations": [
      "Push Operation Mechanism",
      "Pop Operation Mechanism",
      "Peek/Top Operation",
      "Stack Empty Condition",
      "Stack Full Condition"
    ],
    "stack_implementations": [
      "Stack using Array Implementation",
      "Stack using Linked List Implementation",
      "Fixed-size vs Dynamic Stack",
      "Stack Overflow and Underflow Conditions"
    ],
    "stack_applications": [
      "Function Call Stack (Call Stack)",
      "Expression Evaluation Stacks",
      "Undo-Redo Mechanisms",
      "Backtracking Algorithms Support"
    ]
  },
  "07_queue_data_structure": {
    "queue_fundamentals": [
      "Queue Data Structure Definition",
      "FIFO (First-In-First-Out) Principle",
      "Queue Front and Rear Pointers",
      "Queue Abstract Data Type"
    ],
    "queue_types": [
      "Simple/Linear Queue Structure",
      "Circular Queue Structure",
      "Double-ended Queue (Deque) Structure",
      "Priority Queue Structure",
      "Bounded vs Unbounded Queues"
    ],
    "queue_operations": [
      "Enqueue Operation Mechanism",
      "Dequeue Operation Mechanism",
      "Front/Peek Operation",
      "Queue Empty Condition",
      "Queue Full Condition"
    ],
    "queue_implementations": [
      "Queue using Array Implementation",
      "Queue using Linked List Implementation",
      "Circular Buffer Implementation",
      "Priority Queue Implementations"
    ],
    "queue_applications": [
      "Task Scheduling Systems",
      "Message Queues",
      "Breadth-First Search Support",
      "Producer-Consumer Patterns"
    ]
  },
  "08_hash_table_data_structure": {
    "hash_table_fundamentals": [
      "Hash Table Data Structure Definition",
      "Key-Value Pair Storage",
      "Direct Addressing vs Hashing",
      "Hash Table Load Factor Concept"
    ],
    "hash_functions": [
      "Hash Function Requirements",
      "Uniform Hash Distribution",
      "Deterministic Hash Property",
      "Common Hash Functions"
    ],
    "collision_resolution": [
      "Separate Chaining Method",
      "Open Addressing Methods",
      "Linear Probing Technique",
      "Quadratic Probing Technique",
      "Double Hashing Technique"
    ],
    "hash_table_properties": [
      "Average Case vs Worst Case Performance",
      "Hash Table Resizing Strategies",
      "Hash Table Memory Usage",
      "Hash Table vs Array Comparison"
    ],
    "hash_table_variants": [
      "Hash Map Structure",
      "Hash Set Structure",
      "Concurrent Hash Tables",
      "Perfect Hash Tables"
    ]
  },
  "09_tree_data_structures": {
    "tree_fundamentals": [
      "Tree Data Structure Definition",
      "Hierarchical Structure",
      "Tree Terminology (Root, Parent, Child, Leaf, Internal)",
      "Tree Properties (Height, Depth, Degree, Level)"
    ],
    "binary_tree_types": [
      "Binary Tree Structure",
      "Full Binary Tree Property",
      "Complete Binary Tree Property",
      "Perfect Binary Tree Property",
      "Balanced vs Unbalanced Binary Trees",
      "Degenerate/Skewed Binary Trees"
    ],
    "binary_search_tree": [
      "Binary Search Tree (BST) Definition",
      "BST Ordering Property",
      "BST Search Operation",
      "BST Insert Operation",
      "BST Delete Operation",
      "BST Traversal Complexity"
    ],
    "nary_trees": [
      "N-ary Tree Structure",
      "Ternary Tree Structure",
      "General Tree Structure",
      "Tree Representation Methods"
    ]
  },
  "10_self_balancing_trees": {
    "balancing_concepts": [
      "Self-balancing Tree Concept",
      "Balance Factor Calculation",
      "Tree Rotation Operations",
      "Rebalancing Strategies"
    ],
    "avl_trees": [
      "AVL Tree Structure",
      "AVL Balance Conditions",
      "AVL Rotations (Left, Right, Left-Right, Right-Left)",
      "AVL Tree Height Guarantee"
    ],
    "red_black_trees": [
      "Red-Black Tree Structure",
      "Red-Black Tree Properties",
      "Red-Black Tree Color Rules",
      "Red-Black Tree Insertion and Deletion"
    ],
    "other_balanced_trees": [
      "B-Tree Structure (Multi-way Trees)",
      "B+ Tree Structure",
      "Splay Tree Structure",
      "Treap Structure"
    ]
  },
  "11_heap_data_structure": {
    "heap_fundamentals": [
      "Heap Data Structure Definition",
      "Heap Order Property",
      "Complete Binary Tree Property",
      "Array-based Heap Implementation"
    ],
    "heap_types": [
      "Min-Heap Structure",
      "Max-Heap Structure",
      "Binary Heap Implementation",
      "Binomial Heap Structure",
      "Fibonacci Heap Structure"
    ],
    "heap_operations": [
      "Heapify Operation (Bubble-up, Bubble-down)",
      "Build Heap Operation",
      "Insert Operation (Percolate Up)",
      "Extract Min/Max Operation (Percolate Down)",
      "Delete Operation",
      "Heap Sort Mechanism"
    ],
    "priority_queue": [
      "Priority Queue Abstract Data Type",
      "Priority Queue using Heap",
      "Priority Queue Operations",
      "Priority Queue Applications"
    ]
  },
  "12_trie_data_structure": {
    "trie_fundamentals": [
      "Trie Data Structure Definition",
      "Prefix Tree Structure",
      "Trie Node Structure",
      "Trie Path Representation"
    ],
    "trie_types": [
      "Standard Trie Structure",
      "Compressed Trie (Radix Tree)",
      "Suffix Tree Structure",
      "Ternary Search Trie"
    ],
    "trie_operations": [
      "Trie Insert Operation",
      "Trie Search Operation",
      "Prefix Search Operation",
      "Trie Delete Operation"
    ],
    "trie_properties": [
      "Trie Space Complexity",
      "Trie Time Complexity for Operations",
      "Trie Memory Efficiency Considerations",
      "Trie Serialization Methods"
    ]
  },
  "13_graph_data_structures": {
    "graph_fundamentals": [
      "Graph Data Structure Definition",
      "Graph Components (Vertices, Edges)",
      "Graph vs Tree Comparison",
      "Graph Theory Basics"
    ],
    "graph_types": [
      "Directed Graph (Digraph)",
      "Undirected Graph",
      "Weighted Graph",
      "Unweighted Graph",
      "Connected vs Disconnected Graph",
      "Complete Graph (Clique)",
      "Bipartite Graph",
      "Cyclic vs Acyclic Graph"
    ],
    "graph_representations": [
      "Adjacency Matrix Representation",
      "Adjacency List Representation",
      "Edge List Representation",
      "Incidence Matrix Representation",
      "Comparison of Representations"
    ],
    "graph_properties": [
      "Graph Degree (In-degree, Out-degree)",
      "Graph Path and Cycle Concepts",
      "Graph Connectivity",
      "Graph Density"
    ]
  },
  "14_memory_management_concepts": {
    "memory_types": [
      "Stack Memory Characteristics",
      "Heap Memory Characteristics",
      "Static Memory Allocation",
      "Dynamic Memory Allocation"
    ],
    "memory_allocation": [
      "Memory Allocation Strategies",
      "Memory Fragmentation (Internal, External)",
      "Memory Pool Management",
      "Garbage Collection Concepts"
    ],
    "memory_issues": [
      "Memory Leak Detection",
      "Memory Corruption Issues",
      "Stack Overflow Conditions",
      "Heap Overflow Conditions"
    ],
    "memory_units": [
      "Memory Measurement Units (Byte, KB, MB, GB)",
      "Binary vs Decimal Prefixes (Kibibyte vs Kilobyte)",
      "Memory Alignment and Padding"
    ]
  },
  "15_advanced_data_structures": {
    "specialized_structures": [
      "Disjoint Set Union (Union-Find) Structure",
      "Segment Tree Structure",
      "Fenwick Tree (Binary Indexed Tree)",
      "Bloom Filter Structure",
      "Skip List Structure"
    ],
    "cache_optimized": [
      "Cache-aware Data Structures",
      "Cache-oblivious Data Structures",
      "B-trees for Disk Storage"
    ],
    "concurrent_structures": [
      "Concurrent Data Structures",
      "Lock-free Data Structures",
      "Wait-free Data Structures"
    ]
  },
  "16_comparative_analysis": {
    "access_patterns": [
      "Random Access Data Structures",
      "Sequential Access Data Structures",
      "Indexed Access Data Structures",
      "Key-based Access Data Structures"
    ],
    "performance_comparison": [
      "Array vs Linked List Comparison",
      "Hash Table vs Balanced Tree Comparison",
      "Stack vs Queue Comparison",
      "Heap vs Priority Queue Comparison"
    ],
    "use_case_analysis": [
      "When to Use Which Data Structure",
      "Data Structure Selection Criteria",
      "Trade-off Analysis for Common Scenarios"
    ]
  },
  "17_data_structure_design": {
    "design_principles": [
      "Data Structure Interface Design",
      "Encapsulation of Implementation Details",
      "Error Handling in Data Structures",
      "Iteration and Enumeration Support"
    ],
    "optimization_techniques": [
      "Memory Optimization for Data Structures",
      "Cache Optimization Techniques",
      "Parallel Access Optimization",
      "Persistent Data Structure Design"
    ],
    "implementation_considerations": [
      "Generic/Template-based Implementations",
      "Thread-safe Implementations",
      "Serialization Support",
      "Clone/Copy Operations"
    ]
  },
  "18_real_world_applications": {
    "system_applications": [
      "File System Data Structures",
      "Database Indexing Structures",
      "Compiler Symbol Tables",
      "Network Routing Tables"
    ],
    "application_patterns": [
      "LRU Cache Implementation",
      "Circular Buffer Applications",
      "Priority Queue in Task Scheduling",
      "Trie in Autocomplete Systems"
    ],
    "domain_specific": [
      "Geographic Data Structures (Quadtree, Octree)",
      "Game Development Data Structures",
      "Financial Data Structures",
      "Scientific Computing Structures"
    ]
  },
  "19_practical_implementation": {
    "implementation_patterns": [
      "Node-based Implementations",
      "Array-based Implementations",
      "Hybrid Implementations",
      "Memory Pool Implementations"
    ],
    "testing_validation": [
      "Data Structure Unit Testing",
      "Performance Benchmarking",
      "Memory Usage Profiling",
      "Concurrency Testing"
    ],
    "debugging_techniques": [
      "Visualization of Data Structures",
      "State Verification Methods",
      "Invariant Checking",
      "Consistency Validation"
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
      lowerName.includes('self-balancing') || 
      lowerName.includes('memory management') || 
      lowerName.includes('graph') ||
      lowerName.includes('trie') ||
      lowerName.includes('concurrent') ||
      lowerName.includes('system') ||
      lowerName.includes('design')) {
    return 'advanced';
  }
  
  if (lowerName.includes('tree') || 
      lowerName.includes('heap') || 
      lowerName.includes('hash') || 
      lowerName.includes('linked list') ||
      lowerName.includes('stack') ||
      lowerName.includes('queue')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find Main Topic (Data Structures)
    // We'll search for 'data-structures' slug first, or create it.
    let topic = await Topic.findOne({ slug: 'data-structures' });
    
    if (!topic) {
        // Try alternate naming 
        topic = await Topic.findOne({ slug: 'dsa-datastructures' });
    }

    if (!topic) {
      console.log('ℹ️ Data Structures topic not found, creating...');
      topic = await Topic.create({
        name: 'Data Structures',
        slug: 'data-structures',
        description: 'Master the fundamental building blocks of efficient software',
        icon: '🧱',
        order: 7, 
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

    const getGroupForCategory = (catName) => {
        const lower = catName.toLowerCase();
        if (lower.includes('foundations') || lower.includes('complexity') || lower.includes('analysis') || lower.includes('memory')) return 'Fundamentals';
        if (lower.includes('array') || lower.includes('string') || lower.includes('linked list') || lower.includes('stack') || lower.includes('queue')) return 'Linear Data Structures';
        if (lower.includes('tree') || lower.includes('heap') || lower.includes('trie') || lower.includes('graph')) return 'Non-Linear Data Structures';
        if (lower.includes('hash')) return 'Hashing';
        if (lower.includes('advanced') || lower.includes('design') || lower.includes('implementation') || lower.includes('real world')) return 'Advanced Topics';
        return 'General';
    };

    for (const [catKey, sectionsObj] of Object.entries(dataStructuresCurriculum)) {
      // Format Category Name: "01_data_structure_foundations" -> "Data Structure Foundations"
      let catName = catKey.replace(/^\d+_/, '').split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const category = await Category.create({
        name: catName,
        slug: slugify(catName, { lower: true, strict: true }),
        topicId: topic._id,
        group: getGroupForCategory(catName),
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
          .replace('Bst', 'BST')
          .replace('Avl', 'AVL')
          .replace('Lru', 'LRU')
          .replace('Fifo', 'FIFO')
          .replace('Lifo', 'LIFO')
          .replace('Cpu', 'CPU')
          .replace('Api', 'API')
          .replace('Utf', 'UTF')
          .replace('Ascii', 'ASCII');

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
