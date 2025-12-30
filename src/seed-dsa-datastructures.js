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

const dataStructureData = {
  "Data_Structures": {
    "01_foundations": [
      "What is a Data Structure",
      "Types of Data Structures",
      "Linear vs Non-Linear Data Structures",
      "Primitive vs Non-Primitive Data Types",
      "Hierarchical Data Structures",
      "Contiguous vs Non-Contiguous Memory Allocation",
      "Index-based Access",
      "Homogeneous vs Heterogeneous Data Structures",
      "Time Complexity of Data Structure Operations",
      "Space Complexity of Data Structure Storage"
    ],

    "02_arrays": {
      "concepts": [
        "Array Basics",
        "Array Memory Allocation",
        "Multi-dimensional Array",
        "Jagged Array",
        "Sparse Array",
        "Subarray Concept",
        "2D Array Syntax",
        "Array Limitations"
      ],
      "operations": [
        "Array Access Operation",
        "Array Insert Operation",
        "Array Delete Operation",
        "Array Traversal Operation"
      ]
    },

    "03_strings": {
      "concepts": [
        "String Data Structure",
        "String Immutability",
        "Character vs String",
        "String Encoding (ASCII, UTF-8)",
        "Escape Sequences",
        "Control Characters"
      ],
      "operations": [
        "String Concatenation",
        "String Slicing",
        "String Comparison",
        "String Searching"
      ]
    },

    "04_linked_lists": {
      "concepts": [
        "Linked List Data Structure",
        "Linked List vs Array",
        "Why Linked List is Linear",
        "Memory Allocation in Linked List",
        "Applications of Linked List",
        "Advantages of Linked Lists",
        "Disadvantages of Linked Lists"
      ],
      "types": [
        "Singly Linked List",
        "Doubly Linked List",
        "Circular Linked List",
        "Circular Doubly Linked List",
        "Multi-linked List"
      ],
      "singly_operations": [
        "Singly Linked List Implementation",
        "Insert at Beginning",
        "Insert at Specific Position",
        "Delete Node at Specific Position",
        "Traverse Singly Linked List"
      ],
      "doubly_operations": [
        "Doubly Linked List Implementation",
        "Insert Node After Specific Position",
        "Delete by Value in Doubly Linked List",
        "Traverse Doubly Linked List"
      ],
      "circular_operations": [
        "Circular Linked List Implementation",
        "Validate Circular Linked List",
        "Insert in Circular Linked List",
        "Delete in Circular Linked List"
      ]
    },

    "05_stacks": {
      "concepts": [
        "Stack Data Structure",
        "Stack Operations (Push, Pop, Peek)",
        "Stack Pointer",
        "Stack Overflow vs Underflow",
        "Call Stack",
        "LIFO Principle"
      ],
      "implementations": [
        "Stack using Array",
        "Stack using Linked List",
        "Stack using Queue"
      ],
      "applications": [
        "Undo-Redo Functionality",
        "Expression Evaluation",
        "Function Call Management"
      ]
    },

    "06_queues": {
      "concepts": [
        "Queue Data Structure",
        "Queue Operations (Enqueue, Dequeue, Front)",
        "FIFO Principle",
        "Head vs Tail Pointers"
      ],
      "types": [
        "Simple Queue",
        "Circular Queue",
        "Priority Queue",
        "Double Ended Queue (Deque)",
        "Monotonic Queue",
        "Bounded Queue"
      ],
      "implementations": [
        "Queue using Array",
        "Queue using Linked List",
        "Queue using Stack"
      ],
      "applications": [
        "Task Scheduling",
        "Buffer Handling",
        "Breadth-First Traversal Support"
      ]
    },

    "07_hash_tables": {
      "concepts": [
        "Hash Table Data Structure",
        "Hash Function",
        "Collision in Hash Tables",
        "Load Factor",
        "Rehashing",
        "Hash Table vs Array",
        "Hash Table vs Hash Set",
        "Hashing vs Encryption"
      ],
      "collision_handling": [
        "Separate Chaining",
        "Linear Probing",
        "Quadratic Probing",
        "Double Hashing",
        "Open Addressing"
      ],
      "advanced": [
        "Perfect Hash Function",
        "Hash Table Implementation Structure"
      ]
    },

    "08_trees": {
      "tree_terminology": [
        "Tree Data Structure",
        "Root Node",
        "Parent Node",
        "Child Node",
        "Leaf Nodes",
        "Internal Nodes",
        "Sibling Nodes",
        "Depth of Node",
        "Height of Tree",
        "Degree of Node",
        "Degree of Tree",
        "Level of Node"
      ],
      "tree_types": [
        "Binary Tree",
        "Full Binary Tree",
        "Complete Binary Tree",
        "Perfect Binary Tree",
        "Balanced vs Unbalanced Tree",
        "Degenerate Tree",
        "Binary Search Tree (BST)",
        "N-ary Tree",
        "Ternary Tree"
      ],
      "tree_traversals": [
        "Tree Traversal Methods",
        "Inorder Traversal",
        "Preorder Traversal",
        "Postorder Traversal",
        "Level Order Traversal"
      ],
      "bst_operations": [
        "BST Insertion Operation",
        "BST Search Operation",
        "BST Deletion Operation",
        "BST Structure Validation"
      ]
    },

    "09_self_balancing_trees": [
      "AVL Tree",
      "AVL Rotations",
      "Red-Black Tree",
      "Splay Tree",
      "B-Tree",
      "Segment Tree",
      "Fenwick Tree (Binary Indexed Tree)"
    ],

    "10_heaps": {
      "concepts": [
        "Heap Data Structure",
        "Heap Property",
        "Min Heap",
        "Max Heap",
        "Heapify Operation",
        "Build Heap Operation",
        "Heap as Complete Binary Tree"
      ],
      "priority_queue": [
        "Priority Queue Data Structure",
        "Priority Queue using Heap"
      ],
      "limitations": [
        "Limitations of Heap",
        "Heap Memory Considerations"
      ]
    },

    "11_tries": {
      "concepts": [
        "Trie Data Structure",
        "Prefix Trie",
        "Suffix Trie",
        "Compressed Trie"
      ],
      "operations": [
        "Trie Insertion",
        "Trie Search",
        "Prefix Search in Trie",
        "Deletion in Trie"
      ],
      "applications_limitations": [
        "Applications of Trie",
        "Trie Memory Inefficiency",
        "Trie Serialization & Deserialization"
      ]
    },

    "12_graphs": {
      "concepts": [
        "Graph Data Structure",
        "Graph vs Tree",
        "Vertex/Node",
        "Edge/Arc",
        "Directed vs Undirected Graph",
        "Weighted vs Unweighted Graph"
      ],
      "types": [
        "Connected vs Disconnected Graph",
        "Complete Graph",
        "Bipartite Graph",
        "Cyclic vs Acyclic Graph"
      ],
      "representations": [
        "Adjacency Matrix",
        "Adjacency List",
        "Edge List",
        "Graph Representation in Memory"
      ],
      "properties": [
        "Degree of Vertex",
        "In-degree vs Out-degree",
        "Path in Graph",
        "Cycle in Graph"
      ]
    },

    "13_memory_management": {
      "memory_types": [
        "Stack Memory",
        "Heap Memory",
        "Virtual Memory",
        "Memory Pool"
      ],
      "allocation": [
        "Static Memory Allocation",
        "Dynamic Memory Allocation",
        "Advantages of Static Allocation",
        "Disadvantages of Dynamic Allocation"
      ],
      "concepts": [
        "Memory Leak",
        "Circular Reference",
        "Garbage Collection",
        "Memory Deallocation"
      ],
      "issues": [
        "Stack Overflow vs Heap Overflow",
        "Memory Padding",
        "Preventing Memory Leaks"
      ],
      "units": [
        "Memory Units (Byte, Kilobyte, Kibibyte, etc.)"
      ]
    },

    "14_advanced_data_structures": [
      "Monotonic Stack",
      "Monotonic Queue",
      "Buckets Structure",
      "Circular Buffers",
      "WeakMap",
      "WeakSet",
      "Typed Arrays"
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

const seedDataStructures = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const topic = await Topic.findOne({ slug: 'dsa' });
    if (!topic) {
      console.error('DSA Topic not found. Run seed-dsa-topic.js first.');
      process.exit(1);
    }

    // Clear existing Data Structures categories and sections
    const categoriesToDelete = await Category.find({ topicId: topic._id, group: /^Data Structures:/ });
    const categoryIds = categoriesToDelete.map(c => c._id);

    if (categoryIds.length > 0) {
        await Section.deleteMany({ categoryId: { $in: categoryIds } });
        console.log(`Cleared ${categoryIds.length} existing Data Structures categories and their sections`);
        await Category.deleteMany({ _id: { $in: categoryIds } });
    } else {
        console.log('No existing Data Structures categories to clear');
    }

    const mainData = dataStructureData["Data_Structures"];

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
        const groupString = `Data Structures:${subGroupName}`;
        
        if (Array.isArray(subGroupData)) {
             const categoryName = subGroupName;
             const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
             
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
                const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');

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

    // Process Main Data Structures
    for (const [key, value] of Object.entries(mainData)) {
        await processSubGroup(key, value);
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDataStructures();
