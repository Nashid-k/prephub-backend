
const networkingCurriculum = {
    "learning_approach": {
      "progression_path": [
        "Start with networking fundamentals and concepts",
        "Learn OSI and TCP/IP models in depth",
        "Study protocols and their implementations",
        "Practice network configuration and troubleshooting",
        "Master security, cloud, and advanced networking"
      ],
      "practice_methodology": [
        "Use network simulation tools (Cisco Packet Tracer, GNS3)",
        "Configure virtual networks and servers",
        "Analyze network traffic with Wireshark",
        "Set up home lab with routers and switches",
        "Participate in CTF (Capture The Flag) challenges"
      ],
      "skill_tiers": {
        "foundation": "Basic concepts, OSI model, IP addressing",
        "core": "Routing, switching, protocols, subnetting",
        "advanced": "Security, wireless, cloud networking",
        "expert": "Network design, automation, architecture"
      }
    },

    "01_networking_fundamentals": {
      "basic_concepts": [
        { "topic": "What is Computer Networking", "practice": "Draw basic network diagram" },
        { "topic": "Network components: Nodes, links, devices", "practice": "Identify components in home network" },
        { "topic": "Types of networks: LAN, WAN, MAN, PAN", "practice": "Map different network types in your environment" },
        { "topic": "Network topologies: Star, Bus, Ring, Mesh", "practice": "Design networks with different topologies" },
        { "topic": "Client-Server vs Peer-to-Peer models", "practice": "Setup simple P2P file sharing" }
      ],
      "transmission_media": [
        { "topic": "Wired media: UTP, STP, Fiber optics", "practice": "Identify cable types and connectors" },
        { "topic": "Wireless media: Radio waves, Infrared", "practice": "Analyze wireless signal strength" },
        { "topic": "Network interface cards (NICs)", "practice": "Check NIC properties in your computer" },
        { "topic": "Transmission modes: Simplex, Half-duplex, Full-duplex", "practice": "Test communication modes" },
        { "topic": "Bandwidth vs Throughput concepts", "practice": "Measure actual vs theoretical speeds" }
      ]
    },

    "02_osi_reference_model": {
      "layer_breakdown": [
        { "layer": "Physical Layer (Layer 1)", "functions": "Bits transmission, cabling, signals", "practice": "Identify physical layer components" },
        { "layer": "Data Link Layer (Layer 2)", "functions": "MAC addressing, framing, error detection", "practice": "Analyze Ethernet frames" },
        { "layer": "Network Layer (Layer 3)", "functions": "Logical addressing, routing, IP", "practice": "Trace route between networks" },
        { "layer": "Transport Layer (Layer 4)", "functions": "End-to-end communication, TCP/UDP", "practice": "Compare TCP vs UDP traffic" },
        { "layer": "Session Layer (Layer 5)", "functions": "Session establishment, management", "practice": "Monitor session establishment" },
        { "layer": "Presentation Layer (Layer 6)", "functions": "Data translation, encryption, compression", "practice": "Test data encryption" },
        { "layer": "Application Layer (Layer 7)", "functions": "Network services, HTTP, FTP, SMTP", "practice": "Capture application protocol traffic" }
      ],
      "encapsulation_process": [
        { "process": "Data encapsulation at each layer", "practice": "Trace data through OSI layers" },
        { "process": "PDU (Protocol Data Unit) names", "practice": "Identify PDUs at different layers" },
        { "process": "De-encapsulation process", "practice": "Analyze packet headers layer by layer" },
        { "process": "OSI model vs real-world protocols", "practice": "Map protocols to OSI layers" }
      ]
    },

    "03_tcp_ip_model": {
      "model_comparison": [
        { "topic": "TCP/IP model layers vs OSI model", "practice": "Create mapping between both models" },
        { "topic": "Application layer protocols", "practice": "Configure HTTP, FTP, DNS services" },
        { "topic": "Transport layer: TCP and UDP", "practice": "Analyze TCP handshake and UDP datagrams" },
        { "topic": "Internet layer: IP, ICMP, ARP", "practice": "Use ping and traceroute utilities" },
        { "topic": "Network Access layer", "practice": "Examine Ethernet and WiFi frames" }
      ],
      "protocol_suite": [
        { "protocol": "TCP: Connection-oriented reliability", "practice": "Monitor TCP connection states" },
        { "protocol": "UDP: Connectionless efficiency", "practice": "Stream media using UDP" },
        { "protocol": "IP: Internet Protocol fundamentals", "practice": "Analyze IP packet structure" },
        { "protocol": "ICMP: Error reporting and diagnostics", "practice": "Use ICMP for network testing" },
        { "protocol": "ARP: Address Resolution Protocol", "practice": "Clear and view ARP cache" }
      ]
    },

    "04_ip_addressing_subnetting": {
      "ip_addressing": [
        { "topic": "IPv4 address structure and classes", "practice": "Classify given IP addresses" },
        { "topic": "Private vs Public IP addresses", "practice": "Identify private IP ranges" },
        { "topic": "Subnet mask concept and purpose", "practice": "Calculate network and host portions" },
        { "topic": "CIDR (Classless Inter-Domain Routing)", "practice": "Convert between CIDR and subnet mask" },
        { "topic": "IPv6 addressing and notation", "practice": "Convert IPv6 addresses to compressed form" }
      ],
      "subnetting_techniques": [
        { "technique": "Subnetting based on host requirements", "practice": "Create subnets for given host counts" },
        { "technique": "Subnetting based on network requirements", "practice": "Divide network into specific number of subnets" },
        { "technique": "VLSM (Variable Length Subnet Masking)", "practice": "Design efficient IP allocation" },
        { "technique": "Supernetting/Route summarization", "practice": "Summarize multiple networks" },
        { "technique": "IPv6 subnetting concepts", "practice": "Subnet IPv6 address space" }
      ],
      "practical_addressing": [
        { "scenario": "Design IP scheme for small office", "practice": "Allocate IPs for different departments" },
        { "scenario": "Troubleshoot IP configuration issues", "practice": "Fix common IP problems" },
        { "scenario": "Configure static vs dynamic IPs", "practice": "Set up both static and DHCP configurations" },
        { "scenario": "Network address translation (NAT)", "practice": "Configure NAT on router" }
      ]
    },

    "05_data_link_layer": {
      "ethernet_technology": [
        { "topic": "Ethernet frame structure", "practice": "Analyze Ethernet frame in Wireshark" },
        { "topic": "MAC addressing format", "practice": "Find and modify MAC address" },
        { "topic": "CSMA/CD (Carrier Sense Multiple Access with Collision Detection)", "practice": "Simulate collision scenarios" },
        { "topic": "Ethernet standards: 10/100/1000/10G", "practice": "Identify Ethernet capabilities" },
        { "topic": "Ethernet switching concepts", "practice": "Configure basic switch operations" }
      ],
      "switching_operations": [
        { "operation": "MAC address table learning", "practice": "Monitor MAC table on switch" },
        { "operation": "Frame forwarding decisions", "practice": "Trace frame path through switches" },
        { "operation": "Broadcast and collision domains", "practice": "Design to limit broadcast domains" },
        { "operation": "Spanning Tree Protocol (STP)", "practice": "Configure STP to prevent loops" },
        { "operation": "VLAN (Virtual LAN) configuration", "practice": "Create and test VLANs" }
      ]
    },

    "06_network_layer_routing": {
      "routing_fundamentals": [
        { "topic": "Router components and functions", "practice": "Configure basic router settings" },
        { "topic": "Routing tables and decision making", "practice": "View and interpret routing table" },
        { "topic": "Static routing configuration", "practice": "Configure static routes between networks" },
        { "topic": "Dynamic routing protocols overview", "practice": "Compare different routing protocols" },
        { "topic": "Default gateway concept", "practice": "Configure and test default gateway" }
      ],
      "routing_protocols": [
        { "protocol": "RIP (Routing Information Protocol)", "practice": "Configure RIP on routers" },
        { "protocol": "OSPF (Open Shortest Path First)", "practice": "Setup OSPF routing areas" },
        { "protocol": "EIGRP (Enhanced Interior Gateway Routing Protocol)", "practice": "Configure EIGRP with metrics" },
        { "protocol": "BGP (Border Gateway Protocol)", "practice": "Simulate BGP peering" },
        { "protocol": "Route redistribution concepts", "practice": "Redistribute between routing protocols" }
      ],
      "advanced_routing": [
        { "topic": "Classless vs Classful routing", "practice": "Configure classless routing behavior" },
        { "topic": "Route summarization techniques", "practice": "Summarize routes for efficiency" },
        { "topic": "Policy-based routing", "practice": "Route traffic based on policies" },
        { "topic": "IPv6 routing configuration", "practice": "Configure IPv6 static and dynamic routing" }
      ]
    },

    "07_transport_layer_protocols": {
      "tcp_in_depth": [
        { "feature": "TCP three-way handshake", "practice": "Capture and analyze TCP handshake" },
        { "feature": "TCP sequence and acknowledgment numbers", "practice": "Trace TCP sequence flow" },
        { "feature": "TCP flow control (sliding window)", "practice": "Monitor window size adjustments" },
        { "feature": "TCP congestion control algorithms", "practice": "Observe congestion window behavior" },
        { "feature": "TCP connection termination", "practice": "Analyze TCP connection teardown" }
      ],
      "udp_characteristics": [
        { "characteristic": "UDP header structure", "practice": "Compare UDP vs TCP headers" },
        { "characteristic": "Connectionless nature of UDP", "practice": "Test UDP without connection setup" },
        { "characteristic": "UDP applications: DNS, VoIP, streaming", "practice": "Capture UDP-based application traffic" },
        { "characteristic": "UDP reliability considerations", "practice": "Implement reliability at application layer" }
      ],
      "port_concepts": [
        { "topic": "Port numbers and ranges", "practice": "Identify well-known port numbers" },
        { "topic": "Source vs Destination ports", "practice": "Analyze port usage in conversations" },
        { "topic": "Port scanning techniques", "practice": "Perform basic port scans (ethical)" },
        { "topic": "Ephemeral ports", "practice": "Monitor ephemeral port allocation" }
      ]
    },

    "08_application_layer_protocols": {
      "web_protocols": [
        { "protocol": "HTTP/HTTPS request-response cycle", "practice": "Capture and analyze HTTP traffic" },
        { "protocol": "DNS resolution process", "practice": "Trace DNS query resolution" },
        { "protocol": "FTP active vs passive modes", "practice": "Configure and test FTP transfers" },
        { "protocol": "Email protocols: SMTP, POP3, IMAP", "practice": "Configure email client protocols" },
        { "protocol": "DHCP lease process", "practice": "Capture DHCP exchange" }
      ],
      "network_services": [
        { "service": "NTP (Network Time Protocol)", "practice": "Configure time synchronization" },
        { "service": "SNMP (Simple Network Management Protocol)", "practice": "Setup SNMP monitoring" },
        { "service": "Syslog for logging", "practice": "Configure centralized logging" },
        { "service": "TFTP for simple transfers", "practice": "Use TFTP for configuration backup" },
        { "service": "Telnet vs SSH comparison", "practice": "Configure secure remote access" }
      ]
    },

    "09_network_security": {
      "security_fundamentals": [
        { "concept": "CIA Triad: Confidentiality, Integrity, Availability", "practice": "Apply CIA principles to network design" },
        { "concept": "Defense in depth strategy", "practice": "Design layered security architecture" },
        { "concept": "Threats vs Vulnerabilities vs Risks", "practice": "Identify and categorize security issues" },
        { "concept": "Security policies and procedures", "practice": "Create basic security policy" }
      ],
      "security_technologies": [
        { "technology": "Firewalls: Packet filtering, Stateful inspection", "practice": "Configure firewall rules" },
        { "technology": "VPN: Site-to-site and Remote access", "practice": "Setup VPN connection" },
        { "technology": "IDS/IPS: Intrusion Detection/Prevention Systems", "practice": "Configure and test IDS rules" },
        { "technology": "AAA: Authentication, Authorization, Accounting", "practice": "Implement AAA on network device" },
        { "technology": "SSL/TLS for secure communications", "practice": "Configure HTTPS with certificates" }
      ],
      "attack_mitigation": [
        { "attack": "DoS/DDoS attacks", "mitigation": "Configure DoS protection mechanisms" },
        { "attack": "Man-in-the-Middle attacks", "mitigation": "Implement protection against MITM" },
        { "attack": "ARP poisoning/spoofing", "mitigation": "Configure ARP security features" },
        { "attack": "DNS spoofing/cache poisoning", "mitigation": "Implement DNSSEC" },
        { "attack": "Port scanning and reconnaissance", "mitigation": "Configure detection and prevention" }
      ]
    },

    "10_wireless_networking": {
      "wireless_fundamentals": [
        { "topic": "Wireless standards: 802.11a/b/g/n/ac/ax", "practice": "Identify wireless capabilities" },
        { "topic": "Wireless components: AP, clients, antennas", "practice": "Configure wireless access point" },
        { "topic": "Wireless frequencies: 2.4GHz vs 5GHz", "practice": "Analyze channel usage" },
        { "topic": "SSID and BSSID concepts", "practice": "Configure multiple SSIDs" },
        { "topic": "Wireless signal strength and quality", "practice": "Measure signal metrics" }
      ],
      "wireless_security": [
        { "security": "WEP, WPA, WPA2, WPA3 evolution", "practice": "Configure different security modes" },
        { "security": "Enterprise wireless security: 802.1X", "practice": "Setup RADIUS authentication" },
        { "security": "Wireless encryption protocols", "practice": "Configure AES encryption" },
        { "security": "MAC address filtering", "practice": "Implement wireless access control" },
        { "security": "Wireless penetration testing", "practice": "Perform authorized security testing" }
      ],
      "advanced_wireless": [
        { "topic": "Wireless site survey techniques", "practice": "Perform basic site survey" },
        { "topic": "Wireless mesh networks", "practice": "Configure wireless mesh" },
        { "topic": "Wireless roaming and handoff", "practice": "Test client roaming between APs" },
        { "topic": "Wireless interference mitigation", "practice": "Identify and reduce interference" }
      ]
    },

    "11_network_services_advanced": {
      "directory_services": [
        { "service": "LDAP (Lightweight Directory Access Protocol)", "practice": "Configure LDAP directory" },
        { "service": "Active Directory integration", "practice": "Join devices to AD domain" },
        { "service": "Kerberos authentication", "practice": "Configure Kerberos for SSO" },
        { "service": "RADIUS for network authentication", "practice": "Setup RADIUS server" },
        { "service": "TACACS+ for device administration", "practice": "Configure TACACS+ for routers" }
      ],
      "virtualization": [
        { "topic": "Virtual LANs (VLANs) advanced concepts", "practice": "Configure VLAN trunking and routing" },
        { "topic": "Virtual Private Networks (VPNs) types", "practice": "Setup different VPN types" },
        { "topic": "Software Defined Networking (SDN)", "practice": "Experiment with SDN controller" },
        { "topic": "Network Function Virtualization (NFV)", "practice": "Deploy virtual network functions" },
        { "topic": "Container networking concepts", "practice": "Configure Docker/container networking" }
      ],
      "cloud_networking": [
        { "topic": "Cloud networking fundamentals", "practice": "Create VPC in cloud provider" },
        { "topic": "Virtual Private Cloud (VPC) design", "practice": "Design multi-tier cloud network" },
        { "topic": "Cloud load balancing", "practice": "Configure cloud load balancer" },
        { "topic": "Hybrid cloud networking", "practice": "Connect on-premise to cloud" },
        { "topic": "Cloud network security groups", "practice": "Configure cloud security policies" }
      ]
    },

    "12_network_troubleshooting": {
      "troubleshooting_methodology": [
        { "step": "Identify the problem", "tools": "Interview users, define problem scope" },
        { "step": "Establish theory of probable cause", "tools": "Question the obvious, consider multiple approaches" },
        { "step": "Test the theory", "tools": "Test theories systematically" },
        { "step": "Establish plan of action", "tools": "Document solution steps" },
        { "step": "Implement and verify solution", "tools": "Make changes, test thoroughly" },
        { "step": "Document findings and lessons", "tools": "Update documentation, share knowledge" }
      ],
      "troubleshooting_tools": [
        { "tool": "ping and traceroute/pathping", "usage": "Test connectivity and path discovery" },
        { "tool": "ipconfig/ifconfig/ip commands", "usage": "Check interface configuration" },
        { "tool": "nslookup/dig for DNS troubleshooting", "usage": "Test DNS resolution" },
        { "tool": "netstat and ss for connection monitoring", "usage": "View active connections and ports" },
        { "tool": "Wireshark for packet analysis", "usage": "Capture and analyze network traffic" },
        { "tool": "Nmap for network discovery", "usage": "Discover devices and services" }
      ],
      "common_problems": [
        { "problem": "IP configuration issues", "solution": "Check IP, subnet mask, gateway, DNS" },
        { "problem": "DNS resolution failures", "solution": "Test DNS server connectivity, check cache" },
        { "problem": "Duplicate IP addresses", "solution": "Identify conflicting devices, reassign IPs" },
        { "problem": "Switch port configuration issues", "solution": "Check VLAN assignment, port security" },
        { "problem": "Routing problems", "solution": "Verify routing table, test path" },
        { "problem": "Firewall/ACL blocking traffic", "solution": "Check firewall rules, test with disabled rules" }
      ]
    },

    "13_network_design_architecture": {
      "design_principles": [
        { "principle": "Hierarchical network design", "practice": "Design three-tier network architecture" },
        { "principle": "Modular design approach", "practice": "Design network modules for different functions" },
        { "principle": "Redundancy and high availability", "practice": "Design redundant paths and devices" },
        { "principle": "Scalability considerations", "practice": "Design for future growth" },
        { "principle": "Security by design", "practice": "Integrate security at every layer" }
      ],
      "enterprise_networking": [
        { "topic": "Campus network design", "practice": "Design network for university campus" },
        { "topic": "Data center network design", "practice": "Design spine-leaf data center architecture" },
        { "topic": "WAN design and connectivity", "practice": "Design multi-site WAN connectivity" },
        { "topic": "Remote access solutions", "practice": "Design VPN infrastructure for remote workers" },
        { "topic": "Network segmentation strategies", "practice": "Design segmented network for security" }
      ]
    },

    "14_network_automation": {
      "automation_fundamentals": [
        { "topic": "Network automation benefits and use cases", "practice": "Identify automation opportunities" },
        { "topic": "Python for network automation", "practice": "Write Python scripts for network tasks" },
        { "topic": "APIs in networking (REST, NETCONF)", "practice": "Use APIs to query network devices" },
        { "topic": "Configuration management tools", "practice": "Use Ansible for network configuration" },
        { "topic": "Infrastructure as Code (IaC) concepts", "practice": "Define network infrastructure as code" }
      ],
      "automation_tools": [
        { "tool": "Ansible for network automation", "practice": "Create Ansible playbooks for routers/switches" },
        { "tool": "Netmiko library for Python", "practice": "Automate device configuration with Netmiko" },
        { "tool": "NAPALM for multi-vendor automation", "practice": "Use NAPALM for configuration management" },
        { "tool": "Terraform for network provisioning", "practice": "Provision cloud network resources" },
        { "tool": "Git for network configuration versioning", "practice": "Version control network configurations" }
      ]
    },

    "15_emerging_technologies": {
      "future_networking": [
        { "technology": "5G network architecture", "practice": "Study 5G network slicing concepts" },
        { "technology": "IoT (Internet of Things) networking", "practice": "Design network for IoT devices" },
        { "technology": "Edge computing networks", "practice": "Design edge network architecture" },
        { "technology": "Intent-Based Networking (IBN)", "practice": "Explore IBN concepts and tools" },
        { "technology": "Quantum networking fundamentals", "practice": "Study quantum key distribution" }
      ],
      "specialized_networks": [
        { "network": "Industrial networks (SCADA, ICS)", "practice": "Design industrial control network" },
        { "network": "Healthcare networks", "practice": "Design HIPAA-compliant healthcare network" },
        { "network": "Financial networks", "practice": "Design secure financial transaction network" },
        { "network": "VoIP and unified communications", "practice": "Design network for voice/video services" },
        { "network": "Content Delivery Networks (CDN)", "practice": "Understand CDN architecture" }
      ]
    },

    "16_certification_preparation": {
      "entry_level_certs": [
        { "certification": "CompTIA Network+", "focus": "General networking knowledge, vendor-neutral" },
        { "certification": "Cisco CCNA", "focus": "Cisco-specific technologies, routing & switching" },
        { "certification": "JNCIA-Junos", "focus": "Juniper networking fundamentals" }
      ],
      "professional_certs": [
        { "certification": "CompTIA Security+", "focus": "Network security fundamentals" },
        { "certification": "Cisco CCNP Enterprise", "focus": "Advanced enterprise networking" },
        { "certification": "JNCIP-ENT", "focus": "Juniper enterprise routing and switching" }
      ],
      "expert_certs": [
        { "certification": "Cisco CCIE Enterprise", "focus": "Expert-level network design and troubleshooting" },
        { "certification": "JNCIE-ENT", "focus": "Expert-level Juniper network implementation" },
        { "certification": "(ISC)² CISSP", "focus": "Advanced information security" }
      ]
    },

    "17_practical_lab_setup": {
      "home_lab_options": [
        { "setup": "Virtual lab with GNS3/EVE-NG", "requirements": "Desktop with good RAM, virtualization enabled" },
        { "setup": "Physical lab with used equipment", "requirements": "Old routers/switches, cabling" },
        { "setup": "Cloud-based lab environment", "requirements": "Cloud provider account, virtual devices" },
        { "setup": "Hybrid lab approach", "requirements": "Combination of virtual and physical equipment" }
      ],
      "lab_exercises": [
        { "exercise": "Basic network setup and configuration", "skills": "IP addressing, basic routing" },
        { "exercise": "VLAN configuration and inter-VLAN routing", "skills": "Switch configuration, router-on-a-stick" },
        { "exercise": "Dynamic routing protocol implementation", "skills": "OSPF, EIGRP configuration" },
        { "exercise": "Network security implementation", "skills": "ACLs, firewalls, VPN setup" },
        { "exercise": "Network troubleshooting scenarios", "skills": "Problem identification and resolution" }
      ]
    }
}

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
