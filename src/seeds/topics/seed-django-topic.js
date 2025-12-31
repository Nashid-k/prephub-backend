import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const djangoData = {
  "Django_Fundamentals": {
    "01_framework_basics": {
      "core_concepts": [
        "What is Django - Python Web Framework",
        "MVT Architecture (Model-View-Template)",
        "Django vs Other Frameworks",
        "Pros and Cons of Django"
      ],
      "project_setup": [
        "Creating a Django Project",
        "Project vs App Structure",
        "Virtual Environment Setup",
        "Dependencies Management (requirements.txt)"
      ]
    },

    "02_project_structure": {
      "project_files": [
        "settings.py - Configuration",
        "urls.py - URL Routing",
        "wsgi.py - WSGI Configuration",
        "asgi.py - ASGI Configuration"
      ],
      "app_files": [
        "models.py - Database Models",
        "views.py - Business Logic",
        "urls.py - App Routing",
        "admin.py - Admin Configuration",
        "apps.py - App Configuration"
      ]
    },

    "03_configuration": {
      "critical_settings": [
        "SECRET_KEY Management",
        "DEBUG Mode and Security",
        "ALLOWED_HOSTS Configuration",
        "Database Configuration (DATABASES)"
      ],
      "file_handling": [
        "STATIC_URL and STATIC_ROOT",
        "MEDIA_URL and MEDIA_ROOT",
        "Static File Serving",
        "Media File Uploads"
      ],
      "internationalization": [
        "TIME_ZONE and LANGUAGE_CODE",
        "Internationalization Settings"
      ]
    }
  },

  "Database_Models": {
    "01_orm_basics": [
      "Object-Relational Mapping (ORM)",
      "Advantages of Django ORM",
      "Model Definition Syntax",
      "Database Migrations"
    ],

    "02_model_fields": {
      "field_types": [
        "CharField, TextField",
        "IntegerField, DecimalField",
        "DateTimeField, DateField",
        "BooleanField"
      ],
      "field_options": [
        "null=True vs blank=True",
        "default Values",
        "unique and db_index",
        "choices Option"
      ]
    },

    "03_relationships": [
      "ForeignKey - Many-to-One",
      "OneToOneField - One-to-One",
      "ManyToManyField - Many-to-Many",
      "related_name Parameter",
      "on_delete Options"
    ],

    "04_model_operations": {
      "queries": [
        "Creating Objects (create, save)",
        "Retrieving Objects (get, filter, all)",
        "Updating Objects",
        "Deleting Objects"
      ],
      "optimizations": [
        "select_related() - ForeignKey Optimization",
        "prefetch_related() - ManyToMany Optimization",
        "QuerySet Caching",
        "only() and defer() for Partial Loading"
      ]
    },

    "05_advanced_models": [
      "Model Inheritance (Abstract, Multi-table)",
      "Custom User Model",
      "Model Meta Options",
      "Custom Model Managers"
    ]
  },

  "Views_Templates": {
    "01_view_types": {
      "function_based": [
        "Function-Based Views Structure",
        "Request and Response Objects",
        "Decorators for Views"
      ],
      "class_based": [
        "Class-Based Views Basics",
        "Generic Class-Based Views",
        "View Mixins"
      ]
    },

    "02_template_system": [
      "Django Template Language (DTL)",
      "Template Inheritance (extends, block)",
      "Template Tags and Filters",
      "Context Variables in Templates"
    ],

    "03_common_patterns": [
      "CRUD Operations Implementation",
      "Form Handling in Views",
      "Redirecting and Reverse URL Lookup",
      "Context Data Preparation"
    ]
  },

  "Forms_Validation": {
    "01_form_basics": [
      "Django Forms Creation",
      "ModelForms for Model Binding",
      "Form Field Types and Validation",
      "Rendering Forms in Templates"
    ],

    "02_form_handling": [
      "Processing Form Submissions",
      "Form Validation and Error Handling",
      "File Upload Forms",
      "CSRF Protection in Forms"
    ],

    "03_custom_validation": [
      "Custom Form Validation Methods",
      "Custom Form Widgets",
      "Dynamic Form Generation"
    ]
  },

  "URL_Routing": {
    "routing_basics": [
      "URL Patterns and Path Converters",
      "Named URL Patterns",
      "URL Parameters Capture",
      "App Namespacing"
    ],

    "reverse_urls": [
      "reverse() Function",
      "reverse_lazy() for Class-Based Views",
      "url Template Tag",
      "Dynamic URL Generation"
    ]
  },

  "Admin_Interface": {
    "admin_configuration": [
      "Registering Models in Admin",
      "Customizing Admin Display",
      "Admin Actions",
      "Inline Model Admins"
    ],

    "user_management": [
      "Creating Superusers",
      "User Permissions in Admin",
      "Custom Admin Templates",
      "Admin Site Customization"
    ]
  },

  "Authentication_Authorization": {
    "01_user_authentication": [
      "Django Authentication System",
      "User Model and Authentication Backends",
      "Login/Logout Implementation",
      "User Registration"
    ],

    "02_authorization": [
      "Permissions System",
      "@login_required Decorator",
      "@permission_required Decorator",
      "User Groups and Permissions"
    ],

    "03_advanced_auth": [
      "Custom Authentication Backends",
      "Password Validation and Policies",
      "Session Authentication",
      "Social Authentication Basics"
    ]
  },

  "REST_APIs": {
    "01_drf_basics": [
      "Django REST Framework Setup",
      "Serializers (ModelSerializer)",
      "APIView and ViewSets",
      "Request/Response Formats"
    ],

    "02_api_features": [
      "Authentication (Token, JWT)",
      "Permissions and Throttling",
      "Pagination",
      "Filtering and Searching"
    ],

    "03_api_design": [
      "RESTful URL Design",
      "HTTP Methods Usage",
      "Status Codes Appropriately",
      "API Versioning"
    ]
  },

  "Security": {
    "essential_security": [
      "CSRF Protection",
      "XSS Prevention",
      "SQL Injection Prevention",
      "Clickjacking Protection"
    ],

    "authentication_security": [
      "Password Hashing",
      "Session Security",
      "HTTPS Enforcement",
      "Security Headers"
    ],

    "input_validation": [
      "Form Validation",
      "File Upload Validation",
      "Input Sanitization",
      "Safe Database Queries"
    ]
  },

  "Performance_Optimization": {
    "database_optimization": [
      "Query Optimization (select_related, prefetch_related)",
      "Database Indexing",
      "Bulk Operations",
      "Caching Strategies"
    ],

    "application_optimization": [
      "Template Caching",
      "Static File Optimization",
      "Middleware Optimization",
      "Connection Pooling"
    ]
  },

  "Deployment": {
    "pre_deployment": [
      "Production Settings Configuration",
      "Static Files Collection",
      "Database Migrations in Production",
      "Environment Variables"
    ],

    "deployment_stack": [
      "WSGI Servers (Gunicorn, uWSGI)",
      "ASGI Servers (Daphne)",
      "Web Servers (Nginx, Apache)",
      "Process Management (systemd, supervisor)"
    ],

    "cloud_deployment": [
      "Deployment to Heroku",
      "Deployment to AWS/GCP",
      "Docker Containerization",
      "CI/CD Pipeline Basics"
    ]
  },

  "Essential_Middleware": [
    "Common Middleware Components",
    "Custom Middleware Creation",
    "Middleware Order and Execution",
    "Security Middleware"
  ],

  "Signals": [
    "Signal Basics (pre_save, post_save)",
    "Custom Signal Creation",
    "Signal Receivers",
    "When to Use Signals"
  ],

  "Testing": {
    "testing_basics": [
      "Django Test Framework",
      "Model Testing",
      "View Testing",
      "Form Testing"
    ],

    "api_testing": [
      "DRF API Testing",
      "Authentication Testing",
      "Integration Testing",
      "Test Database Setup"
    ]
  },

  "Common_Patterns_Best_Practices": {
    "project_structure": [
      "App Organization",
      "Reusable Apps Design",
      "Settings Configuration Management",
      "Environment-based Configuration"
    ],

    "code_organization": [
      "Business Logic Placement",
      "Utility Functions",
      "Custom Template Tags",
      "Management Commands"
    ],

    "development_workflow": [
      "Migration Best Practices",
      "Debugging Techniques",
      "Logging Configuration",
      "Error Handling"
    ]
  },

  "Practical_Projects_Checklist": {
    "must_implement_features": {
      "authentication": [
        "User Registration",
        "Login/Logout",
        "Password Reset",
        "Profile Management"
      ],
      "crud_operations": [
        "Create/Read/Update/Delete Models",
        "Form Validation",
        "File Uploads",
        "Search Functionality"
      ],
      "api_endpoints": [
        "RESTful API Creation",
        "Authentication Endpoints",
        "CRUD API Operations",
        "API Documentation"
      ],
      "admin_features": [
        "Custom Admin Interface",
        "Bulk Actions",
        "Export Functionality",
        "Dashboard Views"
      ]
    },

    "common_project_types": [
      "Blog/CMS Application",
      "E-commerce Platform",
      "Task Management System",
      "Social Media Features",
      "API Backend Service"
    ]
  },

  "Interview_Preparation": {
    "common_concepts": [
      "MVT Architecture",
      "ORM and Queries",
      "Authentication System",
      "Forms and Validation",
      "URL Routing",
      "Middleware",
      "Signals",
      "Security Features"
    ],

    "practical_questions": [
      "Implement Custom User Model",
      "Create REST API Endpoint",
      "Optimize Database Queries",
      "Handle File Uploads",
      "Implement Pagination",
      "Add Caching Layer",
      "Set Up Authentication"
    ]
  }
};

// Helper to format strings: "01_framework_basics" -> "Framework Basics"
const formatName = (str) => {
    return str
        .replace(/^\\d+_/, '') // Remove leading numbers
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedDjango = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // 1. Create Topic
        let topic = await Topic.findOne({ slug: 'django' });
        if (!topic) {
            console.log('Creating Django topic...');
            topic = await Topic.create({
                name: 'Django',
                slug: 'django',
                description: 'Master Django web framework for Python',
                icon: '🎸',
                order: 6,
                color: '#092e20'
            });
        }

        // 2. Clear existing data
        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ _id: { $in: categoryIds } });
            console.log('Cleared existing Django data');
        }

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

        // 3. Process Data
        let order = 1;
        for (const [mainKey, mainValue] of Object.entries(djangoData)) {
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: formatName(mainKey),
                    order: order++
                });

                // Handle value being Array (direct sections) or Object (subgroups which we flatten)
                let sections = [];
                if (Array.isArray(value)) {
                    sections = value;
                } else {
                    for (const [subKey, subItems] of Object.entries(value)) {
                        sections = [...sections, ...subItems];
                    }
                }

                const sectionDocs = sections.map((sectionTitle, index) => ({
                    title: sectionTitle,
                    slug: generateUniqueSlug(sectionTitle),
                    description: `Detailed explanation of ${sectionTitle}`,
                    content: 'Coming soon...',
                    categoryId: category._id,
                    topicId: topic._id,
                    order: index + 1,
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Security') ? 'advanced' : 
                               categoryName.includes('Basics') || categoryName.includes('Framework') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ Django seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDjango();
