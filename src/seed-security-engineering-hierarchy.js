
const securityCurriculum = {
  "Security_Engineering": {
    "security_fundamentals": {
      "core_principles": [
        "CIA Triad (Confidentiality, Integrity, Availability)",
        "Defense in depth and layered security",
        "Principle of least privilege",
        "Zero trust security model",
        "Secure by design principles",
        "Threat modeling methodologies (STRIDE, DREAD)"
      ],
      "cryptography_basics": [
        "Symmetric vs asymmetric encryption",
        "Hash functions and cryptographic hashing",
        "Digital signatures and certificates",
        "Key management and rotation",
        "TLS/SSL handshake process",
        "Perfect forward secrecy"
      ]
    },
    "application_security": {
      "common_vulnerabilities": [
        "OWASP Top 10 vulnerabilities",
        "Injection attacks (SQL, NoSQL, OS command)",
        "Cross-Site Scripting (XSS) prevention",
        "Cross-Site Request Forgery (CSRF) protection",
        "Server-Side Request Forgery (SSRF)",
        "XML External Entity (XXE) attacks"
      ],
      "secure_coding": [
        "Input validation and sanitization",
        "Output encoding and escaping",
        "Secure session management",
        "Authentication and authorization best practices",
        "Error handling without information disclosure",
        "Secure file upload handling"
      ]
    },
    "infrastructure_security": {
      "network_security": [
        "Network segmentation and microsegmentation",
        "Firewall configuration and management",
        "Intrusion Detection/Prevention Systems (IDS/IPS)",
        "VPN and secure remote access",
        "DDoS mitigation strategies",
        "Network monitoring and anomaly detection"
      ],
      "cloud_security": [
        "Cloud security shared responsibility model",
        "Identity and Access Management (IAM) best practices",
        "Security groups and network ACLs",
        "Secrets management and rotation",
        "Cloud security posture management",
        "Container and Kubernetes security"
      ]
    },
    "data_protection": {
      "data_security": [
        "Data classification and handling policies",
        "Encryption at rest and in transit",
        "Tokenization and data masking",
        "Data loss prevention (DLP) strategies",
        "Database security and access controls",
        "Privacy by design principles"
      ],
      "compliance_frameworks": [
        "GDPR compliance requirements",
        "HIPAA security rules",
        "PCI DSS compliance",
        "SOC 2 Type II certification",
        "ISO 27001 standards",
        "Industry-specific compliance requirements"
      ]
    },
    "identity_access": {
      "authentication": [
        "Multi-factor authentication (MFA) implementation",
        "Password policies and hashing algorithms",
        "Single Sign-On (SSO) with SAML/OAuth",
        "Biometric authentication systems",
        "Passwordless authentication flows",
        "Session management security"
      ],
      "authorization": [
        "Role-Based Access Control (RBAC)",
        "Attribute-Based Access Control (ABAC)",
        "Relationship-Based Access Control (ReBAC)",
        "Policy-based access control",
        "Just-in-time access provisioning",
        "Privileged access management"
      ]
    },
    "security_operations": {
      "monitoring_detection": [
        "Security Information and Event Management (SIEM)",
        "Security orchestration and automated response (SOAR)",
        "Threat intelligence integration",
        "Anomaly detection and behavioral analytics",
        "Incident response automation",
        "Forensics and evidence collection"
      ],
      "vulnerability_management": [
        "Vulnerability scanning and assessment",
        "Penetration testing methodologies",
        "Code review for security flaws",
        "Dependency vulnerability scanning",
        "Patch management lifecycle",
        "Security bug bounty programs"
      ]
    },
    "faang_interview_focus": [
      "Design secure authentication and authorization systems",
      "Implement data encryption and key management",
      "Handle security incident response",
      "Design secure microservices architectures",
      "Implement compliance and privacy requirements",
      "Secure cloud infrastructure and containers"
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
    let topic = await Topic.findOne({ slug: 'security-engineering' });
    if (!topic) {
      console.log('ℹ️ Security topic not found, creating...');
      topic = await Topic.create({
        name: 'Security Engineering',
        slug: 'security-engineering',
        description: 'Master application security, infrastructure protection, and cryptography',
        icon: '🛡️', // Shield for security
        order: 15, // Order after Reliability
        isNew: true
      });
    } else {
        topic.icon = '🛡️';
        topic.description = 'Master application security, infrastructure protection, and cryptography';
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
    const usedSlugs = new Set(); 

    const rootContent = securityCurriculum.Security_Engineering;

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
