
const osCurriculum = {

  "00_computing_and_execution_prerequisites": {
    "machine_basics": [
      "What Happens When a Computer Powers On",
      "Role of CPU, RAM, Storage, I/O Devices",
      "Instruction Execution Cycle",
      "Why an Operating System Exists"
    ],
    "program_vs_system": [
      "Program vs Process vs Thread",
      "User Programs vs System Software",
      "Why Hardware Cannot Be Used Directly"
    ]
  },

  "01_operating_system_foundations": {
    "os_introduction": [
      "What is an Operating System",
      "History and Evolution of Operating Systems",
      "Types of Operating Systems (Batch, Time-sharing, Distributed, Embedded)",
      "OS Design Goals and Trade-offs",
      "Kernel Architectures (Monolithic, Microkernel, Hybrid)"
    ],
    "system_architecture": [
      "Computer System Organization",
      "Boot Process (BIOS/UEFI → Bootloader → Kernel)",
      "System Calls and OS APIs",
      "Interrupts and Trap Handling",
      "User Mode vs Kernel Mode",
      "Privilege Transitions"
    ]
  },

  "02_process_and_cpu_management": {
    "process_concepts": [
      "Program vs Process",
      "Process States and Transitions",
      "Process Control Block (PCB)",
      "Process Creation and Termination",
      "Process Hierarchies"
    ],
    "cpu_scheduling": [
      "Why Scheduling is Required",
      "FCFS Scheduling",
      "SJF Scheduling",
      "Priority Scheduling",
      "Round Robin Scheduling",
      "Multilevel Queue Scheduling",
      "Multilevel Feedback Queue Scheduling"
    ],
    "threads_and_multithreading": [
      "Threads vs Processes",
      "User-level vs Kernel-level Threads",
      "Thread Libraries (Pthreads, Windows Threads)",
      "Thread Pools",
      "Thread Scheduling and Priorities"
    ]
  },

  "03_concurrency_and_interprocess_communication": {
    "ipc_models": [
      "Shared Memory",
      "Message Passing",
      "Pipes and FIFOs",
      "Sockets for IPC",
      "Remote Procedure Calls (RPC)"
    ],
    "synchronization_primitives": [
      "Race Conditions",
      "Critical Section Problem",
      "Mutex Locks",
      "Semaphores",
      "Monitors",
      "Condition Variables"
    ],
    "deadlocks": [
      "Deadlock Characterization",
      "Deadlock Prevention",
      "Deadlock Avoidance (Banker's Algorithm)",
      "Deadlock Detection",
      "Deadlock Recovery"
    ]
  },

  "04_memory_management_fundamentals": {
    "memory_basics": [
      "Memory Hierarchy",
      "Logical vs Physical Address Space",
      "Address Binding (Compile, Load, Execution Time)",
      "Dynamic Loading and Linking",
      "Swapping"
    ],
    "contiguous_allocation": [
      "Fixed Partitioning",
      "Variable Partitioning",
      "First-fit, Best-fit, Worst-fit",
      "Internal and External Fragmentation",
      "Memory Compaction"
    ]
  },

  "05_paging_and_segmentation": {
    "paging": [
      "Basic Paging",
      "Page Tables",
      "Translation Lookaside Buffer (TLB)",
      "Multi-level Paging",
      "Inverted Page Tables",
      "Page Size Trade-offs"
    ],
    "segmentation": [
      "Basic Segmentation",
      "Segment Tables",
      "Segmentation with Paging"
    ]
  },

  "06_virtual_memory_systems": {
    "demand_paging": [
      "Page Fault Handling",
      "Pure Demand Paging",
      "Copy-on-Write",
      "Working Set Model"
    ],
    "page_replacement": [
      "FIFO",
      "Optimal Page Replacement",
      "LRU",
      "Clock Algorithm"
    ],
    "allocation_policies": [
      "Fixed vs Variable Allocation",
      "Global vs Local Replacement",
      "Thrashing Detection and Prevention"
    ]
  },

  "07_file_systems_and_storage": {
    "file_abstractions": [
      "File Attributes and Operations",
      "File Types and Structures",
      "Access Methods",
      "Directory Structures",
      "Mounting File Systems"
    ],
    "file_system_implementation": [
      "Contiguous Allocation",
      "Linked Allocation",
      "Indexed Allocation",
      "Inodes (Unix/Linux)",
      "Free Space Management"
    ],
    "disk_and_raid": [
      "Disk Structure",
      "Disk Scheduling Algorithms (FCFS, SSTF, SCAN, LOOK)",
      "RAID Levels (0–6)"
    ]
  },

  "08_input_output_and_device_management": {
    "io_hardware": [
      "I/O Device Classification",
      "Device Controllers",
      "Memory-mapped vs Port-mapped I/O",
      "DMA",
      "Interrupt-driven I/O"
    ],
    "io_software": [
      "Device Drivers",
      "Device-independent I/O Software",
      "User-level I/O Software",
      "Buffering and Caching",
      "Spooling"
    ],
    "storage_hierarchy": [
      "Registers and Cache",
      "Main Memory",
      "Secondary Storage",
      "Tertiary Storage"
    ]
  },

  "09_protection_and_security": {
    "protection_models": [
      "Access Matrix",
      "Access Control Lists (ACLs)",
      "Capability-based Systems",
      "Domain Switching",
      "Principle of Least Privilege"
    ],
    "security_mechanisms": [
      "Malware (Viruses, Worms, Trojans)",
      "Buffer Overflow Attacks",
      "Authentication Mechanisms",
      "Cryptography in OS",
      "Intrusion Detection Systems"
    ],
    "security_policies": [
      "DAC",
      "MAC",
      "RBAC",
      "Auditing and Logging"
    ]
  },

  "10_virtualization_and_containerization": {
    "virtualization": [
      "Types of Virtualization",
      "Hypervisors (Type 1 vs Type 2)",
      "Virtual Machine Architecture",
      "Live Migration",
      "VM Resource Scheduling"
    ],
    "containers": [
      "Containers vs Virtual Machines",
      "Docker Architecture",
      "Namespaces and cgroups",
      "Container Orchestration (Kubernetes)",
      "Container Security"
    ]
  },

  "11_distributed_operating_systems": {
    "distributed_foundations": [
      "Distributed System Architectures",
      "Network Operating Systems",
      "Distributed File Systems",
      "Naming and Directory Services",
      "Fault Tolerance and Load Balancing"
    ],
    "coordination_algorithms": [
      "Clock Synchronization",
      "Distributed Mutual Exclusion",
      "Leader Election Algorithms",
      "Two-Phase Commit",
      "Consensus Algorithms (Paxos, Raft)"
    ]
  },

  "12_real_time_and_embedded_systems": {
    "rtos": [
      "Hard vs Soft Real-Time Systems",
      "Real-Time Scheduling (RM, EDF)",
      "Priority Inversion",
      "RTOS Characteristics"
    ],
    "embedded_os": [
      "Embedded OS Constraints",
      "Memory and Power Management",
      "Bootloaders and Firmware"
    ]
  },

  "13_case_studies_and_real_systems": {
    "unix_linux": [
      "Linux Kernel Architecture",
      "Linux Process Management",
      "Linux Memory Management",
      "Linux File Systems",
      "Linux Device Model"
    ],
    "windows": [
      "Windows NT Architecture",
      "Windows Process and Thread Management",
      "Windows Registry",
      "Windows Security Model",
      "NTFS and ReFS"
    ],
    "mobile_systems": [
      "Android Architecture",
      "iOS Architecture",
      "Mobile Power Management",
      "Mobile Security Models"
    ]
  },

  "14_performance_analysis_and_tuning": {
    "monitoring": [
      "CPU Monitoring",
      "Memory Monitoring",
      "Disk I/O Analysis",
      "Network Monitoring"
    ],
    "optimization": [
      "Scheduler Tuning",
      "Memory and Swap Optimization",
      "File System Optimization",
      "Network Stack Tuning"
    ],
    "benchmarking": [
      "CPU Benchmarks",
      "Memory Benchmarks",
      "Disk Benchmarks",
      "Stress and Stability Testing"
    ]
  },

  "15_operating_system_development": {
    "tooling": [
      "Cross Compilation",
      "Emulators (QEMU)",
      "Kernel Debugging (GDB)",
      "Build Systems",
      "Version Control"
    ],
    "hands_on_components": [
      "Bootloader Development",
      "Minimal Kernel",
      "Interrupt Handling",
      "Basic Paging",
      "Simple Scheduler"
    ],
    "educational_os": [
      "xv6",
      "MINIX",
      "OS from Scratch Projects"
    ]
  },

  "16_research_and_future_directions": {
    "advanced_kernels": [
      "Microkernels (L4)",
      "Exokernels",
      "Multikernels (Barrelfish)",
      "Unikernels",
      "Formally Verified OS (seL4)"
    ],
    "emerging_domains": [
      "Serverless OS Design",
      "Edge Computing OS",
      "AI/ML Optimized OS",
      "Quantum OS Concepts"
    ]
  },

  "17_career_paths_and_mastery_projects": {
    "roles": [
      "Systems Administrator",
      "DevOps Engineer",
      "Kernel Developer",
      "Embedded Engineer",
      "Security Engineer"
    ],
    "projects": [
      "Shell Implementation",
      "Virtual Memory Simulator",
      "File System Analyzer",
      "Container Runtime",
      "Minimal Operating System"
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
      lowerName.includes('kernel') || 
      lowerName.includes('development') || 
      lowerName.includes('tuning') ||
      lowerName.includes('expert') ||
      lowerName.includes('distributed')) {
    return 'advanced';
  }
  
  if (lowerName.includes('management') || 
      lowerName.includes('scheduling') || 
      lowerName.includes('virtualization') || 
      lowerName.includes('file system') ||
      lowerName.includes('synchronization') ||
      lowerName.includes('intermediate')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


// Mapping Formatters specifically for creating titles/descriptions from object items
const getTitle = (item) => {
    if (typeof item === 'string') return item;
    if (item.topic) return item.topic;
    if (item.algorithm) return item.algorithm;
    if (item.model) return item.model;
    if (item.problem) return item.problem;
    if (item.solution) return item.solution;
    if (item.concept) return item.concept;
    if (item.technique) return item.technique;
    if (item.strategy) return item.strategy;
    if (item.structure) return item.structure;
    if (item.layer) return item.layer;
    if (item.os) return item.os;
    if (item.level) return item.level;
    if (item.threat) return item.threat;
    if (item.defense) return item.defense;
    if (item.policy) return item.policy;
    if (item.system) return item.system;
    if (item.tool) return item.tool;
    if (item.benchmark) return item.benchmark;
    if (item.component) return item.component;
    if (item.area) return item.area;
    if (item.tech) return item.tech;
    if (item.role) return item.role;
    if (item.cert) return item.cert;
    if (item.project) return item.project;

    // Fallback
    if (typeof item === 'object') return Object.values(item)[0];
    return String(item);
};

const getContent = (item, secTitle) => {
    if (typeof item === 'string') return `## ${secTitle}\n\n${item}`;
    
    let content = `## ${secTitle}\n\n`;
    
    // Map various keys to content
    const contentKeys = [
        ['practice', 'Practice'],
        ['responsibilities', 'Key Responsibilities'],
        ['skills', 'Required Skills'],
        ['focus', 'Focus Areas'],
        ['description', 'Description']
    ];

    contentKeys.forEach(([key, label]) => {
        if (item[key]) {
            content += `**${label}**: ${item[key]}\n\n`;
        }
    });
    
    content += `In this section, we explore ${secTitle} in the context of Operating Systems. Use the AI Chat to visualize process states, memory management diagrams, or simulate scheduling algorithms.`;
    
    return content;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic (System Design)
    let topic = await Topic.findOne({ slug: 'operating-systems' });
    if (!topic) {
      console.log('ℹ️ OS topic not found, creating...');
      topic = await Topic.create({
        name: 'Operating Systems',
        slug: 'operating-systems',
        description: 'Understand the core software that manages computer hardware and resources',
        icon: '💻',
        order: 10, // Order after System Design
        isNew: true
      });
    } else {
        // Update metadata if exists to ensure it looks good
        topic.icon = '💻';
        topic.description = 'Understand the core software that manages computer hardware and resources';
        topic.isNew = true;
        await topic.save();
    }
    console.log(`📌 Using Topic: ${topic.name}`);

    // 2. Clear existing structure
    console.log('🧹 Clearing existing categories and sections...');
    const categories = await Category.find({ topicId: topic._id });
    const categoryIds = categories.map(c => c._id);
    await Section.deleteMany({ categoryId: { $in: categoryIds } });
    await Category.deleteMany({ topicId: topic._id });

    // 3. Process new structure with DEEP mapping
    console.log('🏗️ Building new DEEP hierarchy...');
    
    let categoryOrder = 1;
    let totalSections = 0;
    const usedSlugs = new Set(); // Track used slugs to prevent duplicates

    for (const [groupKey, groupParams] of Object.entries(osCurriculum)) {
       // LEVEL 1: GROUP (Module)
       // e.g. "01_os_fundamentals" -> "Os Fundamentals"
       let groupName = groupKey.replace(/^\d+_/, '').split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       console.log(`  📦 Processing Group: ${groupName}`);

       let categoriesToProcess = groupParams;
       
       // Handle simplified structure (just in case)
       if (typeof groupParams !== 'object') continue;
       
       for (const [catKey, items] of Object.entries(groupParams)) {
           // LEVEL 2: CATEGORY (Chapter)
           // e.g. "process_scheduling" -> "Process Scheduling"
           let catName = catKey.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

           const category = await Category.create({
            name: catName,
            slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }), // Unique slug
            topicId: topic._id,
            order: categoryOrder++,
            description: `Chapter on ${catName}`,
            group: groupName // THIS IS KEY for the tabs!
           });
           
           console.log(`    📂 Created Category: ${catName} (Group: ${groupName})`);

           // LEVEL 3: SECTIONS (Lessons)
           let sectionItems = [];
           if (Array.isArray(items)) {
               sectionItems = items;
           } else if (typeof items === 'object') {
               sectionItems = Object.entries(items).map(([k, v]) => ({ topic: k, practice: v }));
           } else {
               sectionItems = [items];
           }

           let sectionOrder = 1;

           for (const item of sectionItems) {
               const secTitle = getTitle(item);
               const secContent = getContent(item, secTitle);
               
               // Deduplicate Slugs
               let baseSlug = slugify(secTitle, { lower: true, strict: true });
               if (!baseSlug) baseSlug = `section-${sectionOrder}`; // Fallback for empty/invalid titles
               
               let uniqueSlug = baseSlug;
               let counter = 1;
               
               while (usedSlugs.has(uniqueSlug)) {
                   uniqueSlug = `${baseSlug}-${counter}`;
                   counter++;
               }
               usedSlugs.add(uniqueSlug);
               
               await Section.create({
                  title: secTitle,
                  slug: uniqueSlug,
                  categoryId: category._id,
                  topicId: topic._id,
                  order: sectionOrder++,
                  description: `Deep dive into ${secTitle}`,
                  content: secContent,
                  difficulty: categorizeDifficulty(secTitle, groupName),
                  estimatedTime: 15,
                  isNew: false,
                  isPro: categorizeDifficulty(secTitle, groupName) === 'expert', // Mark expert as pro
                  keyPoints: [secTitle, groupName]
               });
               
               totalSections++;
           }
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
