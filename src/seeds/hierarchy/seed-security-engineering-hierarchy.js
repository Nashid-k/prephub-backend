
const securityCurriculum = {

  "00_security_engineering_mindset": {
    "security_thinking": [
      "Why security failures happen in real systems",
      "Security as a risk management problem",
      "Usability vs security trade-offs",
      "Preventive vs detective vs corrective controls",
      "Shift-left security mindset"
    ],
    "threat_landscape": [
      "Common attacker motivations",
      "Internal vs external threats",
      "Supply chain attacks overview",
      "Security incidents vs breaches",
      "Security economics basics"
    ]
  },

  "01_security_fundamentals": {
    "core_principles": [
      "CIA Triad (Confidentiality, Integrity, Availability)",
      "Defense in depth and layered security",
      "Principle of least privilege",
      "Zero trust security model",
      "Secure by design principles"
    ],
    "threat_modeling": [
      "Why threat modeling matters",
      "STRIDE threat model",
      "DREAD risk assessment",
      "Attack surface identification",
      "Trust boundaries and data flows"
    ]
  },

  "02_cryptography_foundations": {
    "cryptography_basics": [
      "Symmetric vs asymmetric encryption",
      "Block vs stream ciphers",
      "Hash functions and cryptographic hashing",
      "Password hashing vs encryption",
      "Salting and key stretching"
    ],
    "public_key_infrastructure": [
      "Digital signatures",
      "Certificates and Certificate Authorities (CA)",
      "TLS/SSL handshake process",
      "Perfect Forward Secrecy (PFS)",
      "Certificate rotation and revocation"
    ],
    "key_management": [
      "Key generation and entropy",
      "Key storage and protection",
      "Key rotation strategies",
      "Secrets vs keys",
      "Hardware Security Modules (HSMs)"
    ]
  },

  "03_application_security_fundamentals": {
    "common_vulnerabilities": [
      "OWASP Top 10 overview",
      "Injection attacks (SQL, NoSQL, OS command)",
      "Cross-Site Scripting (XSS)",
      "Cross-Site Request Forgery (CSRF)",
      "Server-Side Request Forgery (SSRF)",
      "XML External Entity (XXE) attacks"
    ],
    "secure_coding_practices": [
      "Input validation and sanitization",
      "Output encoding and escaping",
      "Secure error handling (no information leakage)",
      "Secure file upload handling",
      "Secure deserialization"
    ]
  },

  "04_authentication_and_session_security": {
    "authentication": [
      "Password policies and hashing algorithms",
      "Multi-factor authentication (MFA)",
      "Passwordless authentication flows",
      "Biometric authentication considerations",
      "Session fixation and hijacking prevention"
    ],
    "session_management": [
      "Secure session tokens",
      "Session expiration strategies",
      "HttpOnly and Secure cookies",
      "SameSite cookie attributes",
      "Token-based vs session-based auth"
    ]
  },

  "05_authorization_and_access_control": {
    "authorization_models": [
      "Role-Based Access Control (RBAC)",
      "Attribute-Based Access Control (ABAC)",
      "Relationship-Based Access Control (ReBAC)",
      "Policy-based access control"
    ],
    "privileged_access": [
      "Just-in-time access provisioning",
      "Privileged Access Management (PAM)",
      "Separation of duties",
      "Audit logging for privileged actions"
    ]
  },

  "06_identity_federation_and_sso": {
    "identity_protocols": [
      "OAuth 2.0 fundamentals",
      "OpenID Connect (OIDC)",
      "SAML authentication flows",
      "JWT structure and security considerations"
    ],
    "identity_security": [
      "Token expiration and refresh strategies",
      "Audience and scope validation",
      "Preventing token leakage",
      "Identity provider trust models"
    ]
  },

  "07_infrastructure_and_network_security": {
    "network_security": [
      "Network segmentation and microsegmentation",
      "Firewall configuration and management",
      "Intrusion Detection and Prevention Systems (IDS/IPS)",
      "DDoS mitigation strategies",
      "Network monitoring and anomaly detection"
    ],
    "secure_connectivity": [
      "VPN and secure remote access",
      "Mutual TLS (mTLS)",
      "Private networking and bastion hosts",
      "Zero trust networking principles"
    ]
  },

  "08_cloud_and_container_security": {
    "cloud_security_fundamentals": [
      "Shared responsibility model",
      "Cloud Identity and Access Management (IAM)",
      "Security groups and network ACLs",
      "Secrets management and rotation"
    ],
    "container_security": [
      "Container image security",
      "Vulnerability scanning for containers",
      "Runtime security controls",
      "Least privilege containers"
    ],
    "kubernetes_security": [
      "Kubernetes RBAC",
      "Pod security standards",
      "Network policies",
      "Secrets management in Kubernetes"
    ]
  },

  "09_data_protection_and_privacy": {
    "data_security": [
      "Data classification and handling policies",
      "Encryption at rest and in transit",
      "Tokenization and data masking",
      "Database security and access controls",
      "Data Loss Prevention (DLP)"
    ],
    "privacy_by_design": [
      "Data minimization principles",
      "Purpose limitation",
      "User consent management",
      "Right to access and deletion"
    ]
  },

  "10_compliance_and_governance": {
    "compliance_frameworks": [
      "GDPR requirements",
      "HIPAA security rules",
      "PCI DSS compliance",
      "SOC 2 Type II controls",
      "ISO 27001 standards"
    ],
    "governance_practices": [
      "Policy development",
      "Risk assessments",
      "Audit readiness",
      "Evidence collection and documentation"
    ]
  },

  "11_security_monitoring_and_detection": {
    "security_operations": [
      "Security Information and Event Management (SIEM)",
      "Log correlation and analysis",
      "Threat intelligence integration",
      "Behavioral analytics"
    ],
    "automated_response": [
      "Security Orchestration and Automated Response (SOAR)",
      "Incident response automation",
      "Containment and isolation strategies"
    ]
  },

  "12_vulnerability_and_exposure_management": {
    "vulnerability_management": [
      "Vulnerability scanning and assessment",
      "Dependency vulnerability scanning",
      "Patch management lifecycle",
      "Security debt tracking"
    ],
    "offensive_security": [
      "Penetration testing methodologies",
      "Red teaming vs blue teaming",
      "Security code reviews",
      "Bug bounty programs"
    ]
  },

  "13_incident_response_and_forensics": {
    "incident_response": [
      "Incident classification and severity levels",
      "Containment, eradication, recovery",
      "Root cause analysis",
      "Lessons learned and prevention"
    ],
    "forensics": [
      "Evidence collection and preservation",
      "Log forensics",
      "Memory and disk analysis basics",
      "Chain of custody"
    ]
  },

  "14_secure_system_design": {
    "architecture_security": [
      "Secure microservices architectures",
      "Trust boundaries in distributed systems",
      "Defense against lateral movement",
      "Secure APIs and service-to-service auth"
    ],
    "supply_chain_security": [
      "Dependency trust and verification",
      "Software Bill of Materials (SBOM)",
      "CI/CD pipeline security",
      "Artifact signing and verification"
    ]
  },

  "15_faang_interview_and_real_world_focus": {
    "design_questions": [
      "Design secure authentication systems",
      "Design scalable authorization models",
      "Secure multi-tenant architectures",
      "Design secure data storage systems"
    ],
    "operational_questions": [
      "Handling security incidents",
      "Responding to zero-day vulnerabilities",
      "Balancing security with developer velocity",
      "Security trade-offs in large systems"
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
  
  if (lowerName.includes('faang') || 
      lowerName.includes('cryptography') || 
      lowerName.includes('architecture') || 
      lowerName.includes('advanced') ||
      lowerName.includes('orchestration') ||
      lowerName.includes('forensics') ||
      lowerName.includes('zeros trust')) {
    return 'advanced';
  }
  
  if (lowerName.includes('vulnerability') || 
      lowerName.includes('infrastructure') || 
      lowerName.includes('compliance') || 
      lowerName.includes('operations') ||
      lowerName.includes('cloud') ||
      lowerName.includes('detection')) {
    return 'intermediate';
  }
  
  return 'beginner';
};

const getTitle = (item) => {
    return String(item);
};

const getContent = (item, secTitle) => {
    return `## ${secTitle}\n\nIn this section, we explore **${secTitle}** in the context of Security Engineering.\n\n### Key Concepts\n- Understanding the core principles of ${secTitle}\n- Threat landscape and attack vectors\n- Mitigation strategies and security controls\n\n### Practical Application\nUse the AI Chat to ask for specific security configurations (e.g., AWS IAM policies, Nginx security headers), attack simulations, or secure code reviews.`;
};

const seedHierarchy = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Find or Create Main Topic
    let topic = await Topic.findOneAndUpdate(
      { slug: 'security-engineering' },
      {
        name: 'Security Engineering',
        slug: 'security-engineering',
        description: 'Master application security, infrastructure protection, and cryptography',
        icon: '🛡️',
        order: 15,
        isNew: true
      },
      { new: true, upsert: true }
    );
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
    const usedSlugs = new Set(); 

    const rootContent = securityCurriculum;

    for (const [groupKey, groupParams] of Object.entries(rootContent)) {
       // LEVEL 1: GROUP (Module)
       let groupName = groupKey.replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
       
       if (Array.isArray(groupParams)) {
           // Case: The group IS the category (e.g. FAANG Interview Focus)
           let catName = groupName; 
           
           const category = await Category.create({
                name: catName,
                slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }),
                topicId: topic._id,
                order: categoryOrder++,
                description: `Chapter on ${catName}`,
                group: 'Interview Prep' // Group interview stuff
           });
           
           console.log(`    📂 Created Direct Category: ${catName}`);
           
           let sectionOrder = 1;

           for (const item of groupParams) {
               const secTitle = getTitle(item);
               const secContent = getContent(item, secTitle);
               
               let baseSlug = slugify(secTitle, { lower: true, strict: true });
               if (!baseSlug) baseSlug = `section-${sectionOrder}`;
               
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
                  difficulty: 'advanced',
                  estimatedTime: 20,
                  isNew: false,
                  isPro: true,
                  keyPoints: [secTitle, 'Security', 'Interview']
               });
               totalSections++;
           }

       } else {
           // Standard Case: Group -> Object of Categories
           console.log(`  📦 Processing Group: ${groupName}`);

           for (const [catKey, items] of Object.entries(groupParams)) {
               // LEVEL 2: CATEGORY
               let catName = catKey.replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

               const category = await Category.create({
                name: catName,
                slug: slugify(`${groupName}-${catName}`, { lower: true, strict: true }), 
                topicId: topic._id,
                order: categoryOrder++,
                description: `Chapter on ${catName}`,
                group: groupName 
               });
               
               console.log(`    📂 Created Category: ${catName} (Group: ${groupName})`);

               // LEVEL 3: SECTIONS
               let sectionItems = items; 
               
               let sectionOrder = 1;

               for (const item of sectionItems) {
                   const secTitle = getTitle(item);
                   const secContent = getContent(item, secTitle);
                   
                   let baseSlug = slugify(secTitle, { lower: true, strict: true });
                   if (!baseSlug) baseSlug = `section-${sectionOrder}`;
                   
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
                      isPro: categorizeDifficulty(secTitle, groupName) === 'advanced',
                      keyPoints: [secTitle, groupName]
                   });
                   
                   totalSections++;
               }
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
