
const osCurriculum = {
  "learning_approach": {
      "progression_path": [
        "Start with OS fundamentals and history",
        "Learn process and memory management",
        "Study file systems and storage",
        "Master concurrency and synchronization",
        "Explore advanced topics and security"
      ],
      "practice_methodology": [
        "Use virtual machines for OS experimentation",
        "Implement OS concepts in programming assignments",
        "Analyze Linux/Unix kernel source code",
        "Use debugging tools to understand OS behavior",
        "Build simple OS components from scratch"
      ],
      "skill_tiers": {
        "foundation": "Basic concepts, process management, memory basics",
        "core": "File systems, concurrency, I/O management",
        "advanced": "Virtualization, security, distributed systems",
        "expert": "Kernel development, performance tuning, OS design"
      }
    },

    "01_os_fundamentals": {
      "introduction": [
        { "topic": "What is an Operating System", "practice": "List OS components on your computer" },
        { "topic": "History and evolution of operating systems", "practice": "Research different OS generations" },
        { "topic": "Types of operating systems", "practice": "Compare desktop, server, mobile, embedded OS" },
        { "topic": "OS design goals and trade-offs", "practice": "Analyze design decisions in popular OS" },
        { "topic": "Kernel architectures: Monolithic vs Microkernel", "practice": "Compare Linux vs Minix architecture" }
      ],
      "system_architecture": [
        { "topic": "Computer system organization", "practice": "Map hardware components to OS functions" },
        { "topic": "Boot process: BIOS/UEFI to OS loading", "practice": "Trace boot process on your system" },
        { "topic": "System calls and API", "practice": "Write program using system calls" },
        { "topic": "Interrupts and interrupt handling", "practice": "Write interrupt handler in simulation" },
        { "topic": "Dual-mode operation: User vs Kernel mode", "practice": "Identify mode switches in program execution" }
      ]
    },

    "02_process_management": {
      "process_concepts": [
        { "topic": "Process vs Program", "practice": "Create multiple processes from single program" },
        { "topic": "Process states and state transitions", "practice": "Monitor process state changes" },
        { "topic": "Process Control Block (PCB)", "practice": "Examine process information in OS" },
        { "topic": "Process creation and termination", "practice": "Create and manage processes programmatically" },
        { "topic": "Process hierarchy and parenting", "practice": "Create process tree and examine relationships" }
      ],
      "process_scheduling": [
        { "algorithm": "First-Come, First-Served (FCFS)", "practice": "Simulate FCFS scheduling" },
        { "algorithm": "Shortest Job First (SJF)", "practice": "Implement SJF scheduler simulation" },
        { "algorithm": "Round Robin (RR)", "practice": "Simulate RR with different time quanta" },
        { "algorithm": "Priority Scheduling", "practice": "Implement priority-based scheduling" },
        { "algorithm": "Multilevel Queue Scheduling", "practice": "Design multi-level scheduler" },
        { "algorithm": "Multilevel Feedback Queue", "practice": "Implement adaptive scheduling" }
      ],
      "threads": [
        { "topic": "Threads vs Processes", "practice": "Compare thread and process creation overhead" },
        { "topic": "User-level vs Kernel-level threads", "practice": "Implement both threading models" },
        { "topic": "Thread libraries: Pthreads, Windows threads", "practice": "Write multi-threaded programs" },
        { "topic": "Thread pooling", "practice": "Implement thread pool for concurrent tasks" },
        { "topic": "Thread scheduling and priorities", "practice": "Set and observe thread priorities" }
      ]
    },

    "03_interprocess_communication": {
      "communication_models": [
        { "model": "Shared memory", "practice": "Implement shared memory between processes" },
        { "model": "Message passing", "practice": "Create message queue for IPC" },
        { "model": "Pipes and named pipes (FIFOs)", "practice": "Use pipes for process communication" },
        { "model": "Sockets for network IPC", "practice": "Implement client-server using sockets" },
        { "model": "Remote Procedure Calls (RPC)", "practice": "Create simple RPC mechanism" }
      ],
      "synchronization": [
        { "problem": "Race conditions", "practice": "Create and fix race condition" },
        { "problem": "Critical section problem", "practice": "Identify critical sections in code" },
        { "solution": "Mutex locks", "practice": "Implement mutual exclusion with mutex" },
        { "solution": "Semaphores", "practice": "Solve producer-consumer with semaphores" },
        { "solution": "Monitors", "practice": "Implement monitor for resource management" },
        { "solution": "Condition variables", "practice": "Use condition variables for synchronization" }
      ],
      "deadlocks": [
        { "concept": "Deadlock characterization", "practice": "Create deadlock scenario" },
        { "concept": "Deadlock prevention methods", "practice": "Implement prevention techniques" },
        { "concept": "Deadlock avoidance: Banker's algorithm", "practice": "Implement Banker's algorithm" },
        { "concept": "Deadlock detection and recovery", "practice": "Detect and recover from deadlock" }
      ]
    },

    "04_memory_management": {
      "memory_basics": [
        { "topic": "Memory hierarchy", "practice": "Measure access times at different hierarchy levels" },
        { "topic": "Address binding: Compile, Load, Execution time", "practice": "Trace address binding in program" },
        { "topic": "Logical vs Physical address space", "practice": "Convert logical to physical addresses" },
        { "topic": "Dynamic loading and linking", "practice": "Create dynamically loaded modules" },
        { "topic": "Swapping", "practice": "Obsive swap behavior under memory pressure" }
      ],
      "contiguous_allocation": [
        { "technique": "Fixed partitioning", "practice": "Simulate fixed partition memory allocation" },
        { "technique": "Variable partitioning", "practice": "Implement first-fit, best-fit, worst-fit" },
        { "problem": "External and internal fragmentation", "practice": "Measure fragmentation in different schemes" },
        { "solution": "Compaction", "practice": "Simulate memory compaction" }
      ],
      "paging": [
        { "concept": "Basic paging concept", "practice": "Simulate paging address translation" },
        { "concept": "Page tables and TLB", "practice": "Measure TLB hit/miss impact" },
        { "concept": "Multi-level paging", "practice": "Implement two-level page table" },
        { "concept": "Inverted page tables", "practice": "Compare with traditional page tables" },
        { "concept": "Page size selection trade-offs", "practice": "Analyze performance with different page sizes" }
      ],
      "segmentation": [
        { "concept": "Basic segmentation", "practice": "Implement segmented memory management" },
        { "concept": "Segmentation with paging", "practice": "Combine segmentation and paging" },
        { "concept": "Segment tables", "practice": "Manage segment descriptors" }
      ]
    },

    "05_virtual_memory": {
      "demand_paging": [
        { "concept": "Page fault handling", "practice": "Trace page fault sequence" },
        { "concept": "Pure demand paging", "practice": "Implement demand paging simulation" },
        { "concept": "Copy-on-write", "practice": "Use copy-on-write for process creation" },
        { "concept": "Page replacement algorithms", "practice": "Compare different replacement policies" }
      ],
      "page_replacement": [
        { "algorithm": "FIFO (First-In-First-Out)", "practice": "Simulate FIFO page replacement" },
        { "algorithm": "Optimal page replacement", "practice": "Implement optimal algorithm (theoretical)" },
        { "algorithm": "LRU (Least Recently Used)", "practice": "Implement LRU with different data structures" },
        { "algorithm": "Approximate LRU: Clock algorithm", "practice": "Implement clock page replacement" },
        { "algorithm": "Working set model", "practice": "Track working set of processes" }
      ],
      "allocation_strategies": [
        { "strategy": "Fixed allocation", "practice": "Allocate fixed frames to processes" },
        { "strategy": "Variable allocation", "practice": "Dynamically adjust frame allocation" },
        { "strategy": "Global vs Local replacement", "practice": "Compare global and local policies" },
        { "strategy": "Thrashing detection and prevention", "practice": "Detect and mitigate thrashing" }
      ]
    },

    "06_file_systems": {
      "file_concepts": [
        { "topic": "File attributes and operations", "practice": "Manipulate files programmatically" },
        { "topic": "File types and structures", "practice": "Work with different file formats" },
        { "topic": "File access methods: Sequential, Direct, Indexed", "practice": "Implement different access patterns" },
        { "topic": "Directory structures", "practice": "Navigate and manipulate directory trees" },
        { "topic": "File system mounting", "practice": "Mount different file systems" }
      ],
      "implementation": [
        { "structure": "Contiguous allocation", "practice": "Simulate contiguous file allocation" },
        { "structure": "Linked allocation", "practice": "Implement linked file blocks" },
        { "structure": "Indexed allocation", "practice": "Create indexed file structure" },
        { "structure": "Inodes in Unix/Linux", "practice": "Examine inode information" },
        { "structure": "Free space management", "practice": "Implement bitmap and linked list free space management" }
      ],
      "disk_management": [
        { "topic": "Disk structure and scheduling", "practice": "Simulate different disk scheduling algorithms" },
        { "algorithm": "FCFS disk scheduling", "practice": "Implement FCFS for disk requests" },
        { "algorithm": "SSTF (Shortest Seek Time First)", "practice": "Implement SSTF algorithm" },
        { "algorithm": "SCAN and C-SCAN", "practice": "Compare SCAN variants" },
        { "algorithm": "LOOK and C-LOOK", "practice": "Implement LOOK algorithms" },
        { "topic": "RAID levels 0-6", "practice": "Configure software RAID" }
      ]
    },

    "07_input_output_systems": {
      "io_hardware": [
        { "topic": "I/O devices classification", "practice": "Categorize devices by characteristics" },
        { "topic": "Device controllers", "practice": "Study device driver architecture" },
        { "topic": "Memory-mapped I/O vs Port-mapped I/O", "practice": "Compare I/O mapping techniques" },
        { "topic": "Direct Memory Access (DMA)", "practice": "Configure DMA for data transfer" },
        { "topic": "Interrupt-driven I/O", "practice": "Write interrupt-driven device handler" }
      ],
      "io_software": [
        { "layer": "Device drivers", "practice": "Write simple character device driver" },
        { "layer": "Device-independent OS software", "practice": "Study OS device abstraction layer" },
        { "layer": "User-level I/O software", "practice": "Implement I/O libraries" },
        { "concept": "Buffering and caching", "practice": "Implement I/O buffers" },
        { "concept": "Spooling", "practice": "Set up print spooler" }
      ],
      "storage_hierarchy": [
        { "level": "Registers and cache", "practice": "Measure cache performance impact" },
        { "level": "Main memory", "practice": "Monitor memory usage patterns" },
        { "level": "Secondary storage", "practice": "Compare SSD vs HDD performance" },
        { "level": "Tertiary storage", "practice": "Work with tape/archive storage" }
      ]
    },

    "08_protection_and_security": {
      "protection_mechanisms": [
        { "concept": "Access matrix model", "practice": "Implement access control matrix" },
        { "concept": "Access control lists (ACLs)", "practice": "Configure file system ACLs" },
        { "concept": "Capability-based systems", "practice": "Implement capability-based protection" },
        { "concept": "Domain switching", "practice": "Study domain transition mechanisms" },
        { "concept": "Principles of least privilege", "practice": "Apply least privilege in system design" }
      ],
      "security_fundamentals": [
        { "threat": "Malware: Viruses, worms, trojans", "practice": "Analyze malware behavior in sandbox" },
        { "threat": "Buffer overflow attacks", "practice": "Write and prevent buffer overflow" },
        { "defense": "Authentication mechanisms", "practice": "Implement multi-factor authentication" },
        { "defense": "Cryptography in OS security", "practice": "Use encryption for file system" },
        { "defense": "Intrusion detection systems", "practice": "Set up basic intrusion detection" }
      ],
      "security_policies": [
        { "policy": "Mandatory Access Control (MAC)", "practice": "Configure SELinux/AppArmor" },
        { "policy": "Discretionary Access Control (DAC)", "practice": "Work with Unix file permissions" },
        { "policy": "Role-Based Access Control (RBAC)", "practice": "Implement RBAC system" },
        { "policy": "Auditing and logging", "practice": "Set up comprehensive system logging" }
      ]
    },

    "09_distributed_systems": {
      "distributed_concepts": [
        { "topic": "Distributed system architectures", "practice": "Design distributed system components" },
        { "topic": "Network operating systems", "practice": "Configure network services" },
        { "topic": "Distributed file systems", "practice": "Set up NFS or similar distributed FS" },
        { "topic": "Name services and directory services", "practice": "Configure DNS/LDAP services" },
        { "topic": "Load balancing and fault tolerance", "practice": "Implement load balancing strategies" }
      ],
      "distributed_coordination": [
        { "algorithm": "Clock synchronization algorithms", "practice": "Implement NTP client/server" },
        { "algorithm": "Mutual exclusion in distributed systems", "practice": "Implement distributed lock manager" },
        { "algorithm": "Election algorithms", "practice": "Implement Bully or Ring election algorithm" },
        { "algorithm": "Atomic commit protocols", "practice": "Implement two-phase commit" },
        { "algorithm": "Consensus algorithms", "practice": "Study Paxos/Raft algorithms" }
      ],
      "distributed_file_systems": [
        { "system": "NFS (Network File System)", "practice": "Configure and mount NFS shares" },
        { "system": "AFS (Andrew File System)", "practice": "Study AFS architecture" },
        { "system": "Google File System architecture", "practice": "Design similar distributed FS" },
        { "system": "Hadoop HDFS", "practice": "Set up HDFS cluster" }
      ]
    },

    "10_virtualization": {
      "virtualization_concepts": [
        { "topic": "Types of virtualization", "practice": "Compare full vs para virtualization" },
        { "topic": "Hypervisor types: Type 1 vs Type 2", "practice": "Use different hypervisors" },
        { "topic": "Virtual machine architecture", "practice": "Create and configure VMs" },
        { "topic": "Live migration", "practice": "Migrate VM between hosts" },
        { "topic": "Resource allocation and scheduling in VMs", "practice": "Allocate CPU/memory to VMs" }
      ],
      "containerization": [
        { "topic": "Containers vs Virtual Machines", "practice": "Compare performance and isolation" },
        { "topic": "Docker architecture", "practice": "Build and deploy containerized applications" },
        { "topic": "Container orchestration", "practice": "Use Kubernetes for container management" },
        { "topic": "Container security", "practice": "Implement container security best practices" },
        { "topic": "Namespaces and cgroups", "practice": "Create custom namespaces and control groups" }
      ]
    },

    "11_real_time_systems": {
      "rtos_concepts": [
        { "topic": "Characteristics of real-time systems", "practice": "Identify RT requirements in systems" },
        { "topic": "Hard vs Soft real-time", "practice": "Compare timing constraints" },
        { "topic": "Real-time scheduling algorithms", "practice": "Implement Rate Monotonic and EDF" },
        { "topic": "Priority inversion problem", "practice": "Create and solve priority inversion" },
        { "topic": "Real-time operating systems", "practice": "Work with VxWorks or FreeRTOS" }
      ],
      "embedded_systems": [
        { "topic": "Embedded OS characteristics", "practice": "Compare embedded vs general-purpose OS" },
        { "topic": "Memory constraints in embedded systems", "practice": "Optimize memory usage" },
        { "topic": "Power management", "practice": "Implement power-saving modes" },
        { "topic": "Boot loaders and firmware", "practice": "Write simple boot loader" }
      ]
    },

    "12_case_studies": {
      "unix_linux": [
        { "topic": "Linux kernel architecture", "practice": "Explore Linux kernel source" },
        { "topic": "Process management in Linux", "practice": "Use ps, top, proc filesystem" },
        { "topic": "Linux memory management", "practice": "Monitor and tune memory usage" },
        { "topic": "Linux file systems: ext4, XFS, Btrfs", "practice": "Compare file system performance" },
        { "topic": "Linux device model", "practice": "Study device driver framework" }
      ],
      "windows": [
        { "topic": "Windows NT architecture", "practice": "Explore Windows system architecture" },
        { "topic": "Windows process and thread management", "practice": "Use Windows Task Manager and Process Explorer" },
        { "topic": "Windows registry", "practice": "Navigate and modify registry" },
        { "topic": "Windows security model", "practice": "Configure Windows security policies" },
        { "topic": "Windows file systems: NTFS, ReFS", "practice": "Compare NTFS features" }
      ],
      "mobile_os": [
        { "os": "Android architecture", "practice": "Study Android system components" },
        { "os": "iOS architecture", "practice": "Compare iOS security model" },
        { "os": "Mobile OS power management", "practice": "Optimize battery usage in apps" },
        { "os": "Mobile security features", "practice": "Implement mobile app security" }
      ]
    },

    "13_performance_tuning": {
      "monitoring_tools": [
        { "tool": "System performance monitors", "practice": "Use top, htop, vmstat, iostat" },
        { "tool": "Process monitoring tools", "practice": "Monitor specific process resource usage" },
        { "tool": "Memory analysis tools", "practice": "Analyze memory leaks and usage patterns" },
        { "tool": "I/O performance analysis", "practice": "Measure disk I/O performance" },
        { "tool": "Network monitoring", "practice": "Monitor network performance and connections" }
      ],
      "optimization_techniques": [
        { "technique": "CPU scheduling optimization", "practice": "Tune scheduler parameters" },
        { "technique": "Memory optimization", "practice": "Optimize swap usage and cache" },
        { "technique": "I/O optimization", "practice": "Optimize disk scheduling and caching" },
        { "technique": "File system optimization", "practice": "Tune file system parameters" },
        { "technique": "Network optimization", "practice": "Optimize network stack parameters" }
      ],
      "benchmarking": [
        { "benchmark": "CPU performance benchmarks", "practice": "Run and analyze CPU benchmarks" },
        { "benchmark": "Memory bandwidth tests", "practice": "Measure memory performance" },
        { "benchmark": "Disk I/O benchmarks", "practice": "Compare disk performance" },
        { "benchmark": "File system benchmarks", "practice": "Benchmark different file systems" },
        { "benchmark": "System stability testing", "practice": "Stress test system components" }
      ]
    },

    "14_os_development": {
      "development_tools": [
        { "tool": "Cross-compilation toolchains", "practice": "Set up cross-compiler for OS development" },
        { "tool": "Emulators and simulators", "practice": "Use QEMU for OS testing" },
        { "tool": "Debugging tools", "practice": "Use GDB for kernel debugging" },
        { "tool": "Build systems", "practice": "Create OS build system" },
        { "tool": "Version control for OS development", "practice": "Manage OS source code with Git" }
      ],
      "simple_os_components": [
        { "component": "Boot loader development", "practice": "Write simple boot loader" },
        { "component": "Minimal kernel", "practice": "Create kernel that prints to screen" },
        { "component": "Interrupt handling", "practice": "Implement interrupt descriptor table" },
        { "component": "Memory management module", "practice": "Implement basic paging" },
        { "component": "Simple scheduler", "practice": "Implement round-robin scheduler" }
      ],
      "educational_os": [
        { "os": "MINIX study and modification", "practice": "Modify MINIX source code" },
        { "os": "xv6 operating system", "practice": "Study and extend xv6" },
        { "os": "OS from scratch projects", "practice": "Follow OS development tutorials" }
      ]
    },

    "15_advanced_topics": {
      "research_areas": [
        { "area": "Microkernel design", "practice": "Study L4 microkernel" },
        { "area": "Exokernel and library OS", "practice": "Explore exokernel concepts" },
        { "area": "Multikernel architecture", "practice": "Study Barrelfish OS" },
        { "area": "Unikernel systems", "practice": "Create unikernel application" },
        { "area": "Formally verified OS", "practice": "Study seL4 verified microkernel" }
      ],
      "emerging_technologies": [
        { "tech": "Serverless computing and OS implications", "practice": "Deploy serverless functions" },
        { "tech": "Edge computing OS requirements", "practice": "Design OS for edge devices" },
        { "tech": "AI/ML optimized operating systems", "practice": "Study ML workload optimizations" },
        { "tech": "Quantum computing OS considerations", "practice": "Research quantum OS requirements" }
      ]
    },

    "16_career_paths": {
      "roles_and_skills": [
        { "role": "Systems Administrator", "skills": "OS installation, configuration, troubleshooting" },
        { "role": "DevOps Engineer", "skills": "Automation, containerization, cloud OS management" },
        { "role": "Kernel Developer", "skills": "C programming, hardware interaction, debugging" },
        { "role": "Embedded Systems Engineer", "skills": "RTOS, hardware constraints, optimization" },
        { "role": "Security Engineer", "skills": "OS security, hardening, vulnerability analysis" }
      ],
      "certifications": [
        { "cert": "CompTIA Linux+", "focus": "Linux system administration" },
        { "cert": "Red Hat Certified Engineer (RHCE)", "focus": "Advanced Linux administration" },
        { "cert": "Microsoft Certified: Windows Server", "focus": "Windows server administration" },
        { "cert": "LPIC (Linux Professional Institute Certification)", "focus": "Linux professional skills" }
      ]
    },

    "17_practical_projects": {
      "beginner_projects": [
        { "project": "System monitoring tool", "skills": "Process management, system calls" },
        { "project": "Simple shell implementation", "skills": "Process creation, I/O redirection" },
        { "project": "Memory allocator", "skills": "Memory management, fragmentation" },
        { "project": "File system analysis tool", "skills": "File system structures, disk I/O" }
      ],
      "intermediate_projects": [
        { "project": "Thread library implementation", "skills": "Thread management, synchronization" },
        { "project": "Virtual memory simulator", "skills": "Page tables, TLB, page replacement" },
        { "project": "Disk scheduling simulator", "skills": "I/O scheduling, performance analysis" },
        { "project": "Process scheduler simulator", "skills": "Scheduling algorithms, context switching" }
      ],
      "advanced_projects": [
        { "project": "Minimal operating system", "skills": "Boot process, hardware interaction, kernel design" },
        { "project": "Distributed file system", "skills": "Network programming, consistency, fault tolerance" },
        { "project": "Container runtime", "skills": "Namespaces, cgroups, security isolation" },
        { "project": "Real-time task scheduler", "skills": "RTOS concepts, timing guarantees" }
      ]
    }
}

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
