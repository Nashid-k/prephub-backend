
const networkingCurriculum = {

  "00_how_to_learn_networking": {
    "learning_approach": {
      "progression_path": [
        "Understand what networking solves (communication)",
        "Learn layered models (OSI, TCP/IP)",
        "Master addressing, routing, and switching",
        "Study transport and application protocols",
        "Apply security, wireless, cloud, and automation",
        "Design, troubleshoot, and scale networks"
      ],
      "practice_methodology": [
        "Use Cisco Packet Tracer / GNS3 / EVE-NG",
        "Capture packets with Wireshark",
        "Build virtual + physical home labs",
        "Troubleshoot broken networks intentionally",
        "Participate in CTFs and lab challenges"
      ],
      "skill_tiers": {
        "foundation": "Concepts, OSI, IP addressing",
        "core": "Routing, switching, subnetting, protocols",
        "advanced": "Security, wireless, cloud",
        "expert": "Architecture, automation, design"
      }
    }
  },

  "01_networking_foundations": {
    "basic_concepts": [
      "What is Computer Networking",
      "Network components: Nodes, links, devices",
      "Types of networks: LAN, WAN, MAN, PAN",
      "Network topologies: Star, Bus, Ring, Mesh",
      "Client-Server vs Peer-to-Peer models"
    ],
    "transmission_media": [
      "Wired media: UTP, STP, Fiber optics",
      "Wireless media: Radio waves, Infrared",
      "Network interface cards (NICs)",
      "Transmission modes: Simplex, Half-duplex, Full-duplex",
      "Bandwidth vs Throughput"
    ]
  },

  "02_layered_models_and_data_flow": {
    "osi_model": [
      "Physical Layer",
      "Data Link Layer",
      "Network Layer",
      "Transport Layer",
      "Session Layer",
      "Presentation Layer",
      "Application Layer"
    ],
    "encapsulation": [
      "Encapsulation and De-encapsulation",
      "Protocol Data Units (PDU)",
      "OSI vs real-world protocol mapping"
    ],
    "tcp_ip_model": [
      "TCP/IP vs OSI comparison",
      "Application Layer protocols",
      "Transport Layer (TCP/UDP)",
      "Internet Layer (IP, ICMP, ARP)",
      "Network Access Layer"
    ]
  },

  "03_ip_addressing_and_subnetting": {
    "ip_fundamentals": [
      "IPv4 structure and classes",
      "Private vs Public IPs",
      "Subnet masks",
      "CIDR notation",
      "IPv6 basics and notation"
    ],
    "subnetting": [
      "Host-based subnetting",
      "Network-based subnetting",
      "VLSM",
      "Supernetting / Route summarization",
      "IPv6 subnetting"
    ],
    "addressing_practice": [
      "Design IP scheme for small office",
      "Static vs DHCP addressing",
      "NAT configuration",
      "Troubleshooting IP conflicts"
    ]
  },

  "04_data_link_layer_and_switching": {
    "ethernet": [
      "Ethernet frame structure",
      "MAC addressing",
      "CSMA/CD",
      "Ethernet standards",
      "Switching fundamentals"
    ],
    "switching": [
      "MAC address table learning",
      "Broadcast and collision domains",
      "Spanning Tree Protocol (STP)",
      "VLAN configuration",
      "Inter-VLAN routing concepts"
    ]
  },

  "05_network_layer_and_routing": {
    "routing_basics": [
      "Router functions",
      "Routing tables",
      "Static routing",
      "Default gateway",
      "Classful vs Classless routing"
    ],
    "dynamic_routing": [
      "RIP",
      "OSPF",
      "EIGRP",
      "BGP",
      "Route redistribution"
    ],
    "advanced_routing": [
      "Policy-based routing",
      "Route summarization",
      "IPv6 routing"
    ]
  },

  "06_transport_layer_deep_dive": {
    "tcp": [
      "Three-way handshake",
      "Sequence & acknowledgment numbers",
      "Flow control",
      "Congestion control",
      "Connection termination"
    ],
    "udp": [
      "UDP header",
      "Connectionless communication",
      "DNS / VoIP / Streaming use cases",
      "Application-level reliability"
    ],
    "ports": [
      "Well-known vs ephemeral ports",
      "Source vs destination ports",
      "Port scanning concepts"
    ]
  },

  "07_application_layer_protocols": {
    "core_protocols": [
      "HTTP/HTTPS",
      "DNS",
      "FTP (active/passive)",
      "SMTP, POP3, IMAP",
      "DHCP"
    ],
    "network_services": [
      "NTP",
      "SNMP",
      "Syslog",
      "TFTP",
      "SSH vs Telnet"
    ]
  },

  "08_network_security_fundamentals": {
    "security_concepts": [
      "CIA Triad",
      "Defense in depth",
      "Threats vs vulnerabilities vs risks",
      "Security policies"
    ],
    "security_technologies": [
      "Firewalls",
      "VPNs",
      "IDS / IPS",
      "AAA",
      "SSL / TLS"
    ],
    "attack_mitigation": [
      "DoS/DDoS",
      "MITM",
      "ARP poisoning",
      "DNS spoofing",
      "Reconnaissance detection"
    ]
  },

  "09_wireless_networking": {
    "wireless_basics": [
      "802.11 standards",
      "APs, antennas",
      "2.4GHz vs 5GHz",
      "SSID / BSSID",
      "Signal strength"
    ],
    "wireless_security": [
      "WEP → WPA3",
      "802.1X",
      "Encryption",
      "MAC filtering",
      "Authorized penetration testing"
    ],
    "advanced_wireless": [
      "Site surveys",
      "Mesh networks",
      "Roaming and handoff",
      "Interference mitigation"
    ]
  },

  "10_identity_virtualization_and_cloud_networking": {
    "identity_services": [
      "LDAP",
      "Active Directory",
      "Kerberos",
      "RADIUS",
      "TACACS+"
    ],
    "virtualization": [
      "Advanced VLANs",
      "VPN types",
      "SDN",
      "NFV",
      "Container networking"
    ],
    "cloud_networking": [
      "Cloud networking fundamentals",
      "VPC design",
      "Cloud load balancing",
      "Hybrid networking",
      "Security groups"
    ]
  },

  "11_network_troubleshooting": {
    "methodology": [
      "Problem identification",
      "Root cause analysis",
      "Testing hypotheses",
      "Implementation and verification",
      "Documentation"
    ],
    "tools": [
      "ping, traceroute",
      "ipconfig / ifconfig",
      "nslookup / dig",
      "netstat / ss",
      "Wireshark",
      "Nmap"
    ],
    "common_issues": [
      "IP misconfiguration",
      "DNS failures",
      "Duplicate IPs",
      "VLAN issues",
      "Routing failures",
      "Firewall blocking"
    ]
  },

  "12_network_design_and_architecture": {
    "design_principles": [
      "Hierarchical design",
      "Modular networks",
      "Redundancy and HA",
      "Scalability",
      "Security by design"
    ],
    "enterprise_design": [
      "Campus networks",
      "Data center (spine-leaf)",
      "WAN",
      "Remote access",
      "Segmentation"
    ]
  },

  "13_network_automation_and_devops": {
    "automation_fundamentals": [
      "Why automate networks",
      "Python for networking",
      "APIs (REST, NETCONF)",
      "Configuration management",
      "Infrastructure as Code"
    ],
    "tools": [
      "Ansible",
      "Netmiko",
      "NAPALM",
      "Terraform",
      "Git"
    ]
  },

  "14_emerging_and_specialized_networks": {
    "future_tech": [
      "5G",
      "IoT",
      "Edge computing",
      "Intent-Based Networking",
      "Quantum networking"
    ],
    "specialized_domains": [
      "Industrial (SCADA)",
      "Healthcare",
      "Financial networks",
      "VoIP",
      "CDNs"
    ]
  },

  "15_certifications_and_labs": {
    "certifications": [
      "Network+",
      "CCNA → CCNP → CCIE",
      "JNCIA → JNCIE",
      "Security+",
      "CISSP"
    ],
    "labs": [
      "Virtual labs",
      "Physical labs",
      "Cloud labs",
      "Hybrid setups"
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
      lowerName.includes('bgp') || 
      lowerName.includes('ccie') || 
      lowerName.includes('expert') ||
      lowerName.includes('automation') ||
      lowerName.includes('design') ||
      lowerName.includes('security') ||
      lowerName.includes('quantum')) {
    return 'advanced';
  }
  
  if (lowerName.includes('routing') || 
      lowerName.includes('switching') || 
      lowerName.includes('subnetting') || 
      lowerName.includes('wireless') ||
      lowerName.includes('troubleshooting') ||
      lowerName.includes('intermediate')) {
    return 'intermediate';
  }
  
  return 'beginner';
};


// Mapping Formatters specifically for creating titles/descriptions from object items
const getTitle = (item) => {
    if (typeof item === 'string') return item;
    
    // Explicit title keys for Networking
    if (item.topic) return item.topic;
    if (item.layer) return item.layer;
    if (item.process) return item.process;
    if (item.protocol) return item.protocol;
    if (item.technique) return item.technique;
    if (item.operation) return item.operation;
    if (item.feature) return item.feature;
    if (item.characteristic) return item.characteristic;
    if (item.service) return item.service;
    if (item.concept) return item.concept;
    if (item.technology) return item.technology;
    if (item.attack) return item.attack;
    if (item.security) return item.security;
    if (item.step) return item.step;
    if (item.tool) return item.tool;
    if (item.problem) return item.problem;
    if (item.principle) return item.principle;
    if (item.network) return item.network;
    if (item.certification) return item.certification;
    if (item.setup) return item.setup;
    if (item.exercise) return item.exercise;
    
    // Fallback
    if (typeof item === 'object') return Object.values(item)[0];
    return String(item);
};

const getContent = (item, secTitle) => {
    if (typeof item === 'string') return `## ${secTitle}\n\n${item}`;
    
    let content = `## ${secTitle}\n\n`;
    
    // Map various keys to content
    const contentKeys = [
        ['practice', 'Practical Exercise'],
        ['functions', 'Functions'],
        ['usage', 'Common Usage'],
        ['tools', 'Recommended Tools'],
        ['solution', 'Solution Strategy'],
        ['mitigation', 'Mitigation Strategy'],
        ['requirements', 'Requirements'],
        ['skills', 'Skills Gained'],
        ['focus', 'Focus Area'],
        ['description', 'Description']
    ];

    contentKeys.forEach(([key, label]) => {
        if (item[key]) {
            content += `**${label}**: ${item[key]}\n\n`;
        }
    });
    
    content += `In this section, we explore ${secTitle} within Computer Networking. Use the AI Chat to simulate network configurations, analyze packet captures, or design network topologies.`;
    
    return content;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic (System Design)
    let topic = await Topic.findOne({ slug: 'networking' });
    if (!topic) {
      console.log('ℹ️ Networking topic not found, creating...');
      topic = await Topic.create({
        name: 'Networking',
        slug: 'networking',
        description: 'Master computer networking, from OSI model to advanced cloud architectures',
        icon: '🌐', // Globe icon for networking
        order: 11, // Order after Operating Systems
        isNew: true
      });
    } else {
        // Update metadata if exists to ensure it looks good
        topic.icon = '🌐';
        topic.description = 'Master computer networking, from OSI model to advanced cloud architectures';
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

    for (const [groupKey, groupParams] of Object.entries(networkingCurriculum)) {
       // LEVEL 1: GROUP (Module)
       // e.g. "01_networking_fundamentals" -> "Networking Fundamentals"
       let groupName = groupKey.replace(/^\d+_/, '').split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       console.log(`  📦 Processing Group: ${groupName}`);

       let categoriesToProcess = groupParams;
       
       // Handle simplified structure (just in case)
       if (typeof groupParams !== 'object') continue;
       
       for (const [catKey, items] of Object.entries(groupParams)) {
           // LEVEL 2: CATEGORY (Chapter)
           // e.g. "basic_concepts" -> "Basic Concepts"
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
