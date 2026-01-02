import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const djangoHierarchy = {

  "01_web_and_framework_foundations": {
    "HTTP Basics": [
      "HTTP vs HTTPS",
      "Request-response cycle",
      "HTTP headers",
      "HTTP methods (GET, POST, PUT, DELETE)"
    ],
    "Status Codes": [
      "Common status codes",
      "200, 400, 401, 403, 404, 500",
      "Custom status codes"
    ],
    "Framework Basics": [
      "What is a Framework",
      "What is Django",
      "Pros and cons of Django",
      "MVT architecture",
      "MVC vs MVT"
    ]
  },

  "02_project_setup_and_configuration": {
    "Framework Basics": [
      "Django project structure",
      "Creating and managing apps"
    ],
    "Core Configuration": [
      "SECRET_KEY and DEBUG mode",
      "ALLOWED_HOSTS configuration",
      "Database configuration",
      "STATIC_ROOT and MEDIA_ROOT",
      "Virtual environment setup"
    ]
  },

  "03_project_and_app_structure": {
    "Core Files": [
      "settings.py",
      "urls.py (URL routing)",
      "wsgi.py and asgi.py",
      "__init__.py and __pycache__"
    ],
    "App Files": [
      "apps.py",
      "admin.py usage",
      "models.py and views.py",
      "App-level URL configuration"
    ]
  },

  "04_models_and_database": {
    "ORM Concepts": [
      "What is ORM",
      "Advantages of ORM over raw SQL",
      "Models creation and management"
    ],
    "Model Fields": [
      "Field types and options",
      "null=True vs blank=True",
      "Relationship fields (ForeignKey, ManyToMany)",
      "unique_together constraint"
    ],
    "Model Inheritance": [
      "Abstract model inheritance",
      "Proxy model inheritance",
      "Multi-table inheritance",
      "AbstractUser vs AbstractBaseUser"
    ],
    "Meta Class": [
      "Meta class in models",
      "Meta options configuration"
    ],
    "Migrations": [
      "makemigrations command",
      "migrate command",
      "Migration process",
      "Revert/unapply migrations"
    ],
    "Built-in Models": [
      "User model (default)",
      "User.is_authenticated property",
      "Group and Permission models"
    ]
  },

  "05_url_routing_and_views": {
    "URL Configuration": [
      "URL patterns",
      "path() and re_path()",
      "URL parameters",
      "Query parameters"
    ],
    "View Types": [
      "Function-Based Views (FBVs)",
      "Class-Based Views (CBVs)",
      "Generic Views",
      "Viewsets"
    ],
    "View Components": [
      "Request and response objects",
      "Context in Django views",
      "render() function",
      "redirect() and reverse()",
      "@login_required decorator"
    ]
  },

  "06_templates_and_forms": {
    "Template Basics": [
      "Django Template Language (DTL)",
      "Template inheritance",
      "Extend and block tags",
      "Template filters"
    ],
    "Context": [
      "Passing context to templates",
      "Context processors",
      "Custom context processors"
    ],
    "Form Types": [
      "Django Forms",
      "ModelForms",
      "Form validation"
    ],
    "Form Security": [
      "CSRF protection",
      "CSRF token usage",
      "Form security best practices"
    ]
  },

  "07_static_media_and_admin": {
    "File Management": [
      "Static files handling",
      "collectstatic command",
      "Media files handling",
      "File upload handling"
    ],
    "Admin Panel": [
      "Admin panel configuration",
      "Registering models",
      "Custom admin interfaces",
      "Superuser creation"
    ]
  },

  "08_authentication_sessions_and_security": {
    "Concepts": [
      "Authentication vs Authorization",
      "Django authentication system",
      "Permissions and groups"
    ],
    "Implementation": [
      "User registration",
      "Login/logout implementation",
      "authenticate() function",
      "Custom authentication backends"
    ],
    "Session Management": [
      "Django session framework",
      "Session configuration",
      "Session lifetime"
    ],
    "Cookies": [
      "Cookie handling",
      "Setting cookie expiry",
      "Cookies vs sessions"
    ],
    "CSRF Protection": [
      "CSRF attack prevention",
      "CSRF tokens"
    ],
    "XSS Protection": [
      "XSS prevention techniques",
      "Input validation"
    ],
    "Password Security": [
      "Password hashing",
      "SECRET_KEY security"
    ]
  },

  "09_middleware_signals_and_messages": {
    "Middleware Concepts": [
      "What is middleware",
      "Middleware order",
      "Custom middleware",
      "Built-in middleware"
    ],
    "Signal Concepts": [
      "Django signals",
      "pre_save vs post_save",
      "Signal configuration",
      "Custom signals"
    ],
    "Messages Framework": [
      "Django messages",
      "Message types",
      "Displaying messages"
    ]
  },

  "10_query_optimization_and_caching": {
    "QuerySet Optimization": [
      "select_related()",
      "prefetch_related()",
      "Raw SQL queries",
      "Bulk operations",
      "F and Q objects"
    ],
    "Cache Types": [
      "Browser caching",
      "Server-side caching",
      "Cache in Django",
      "Cache backends"
    ]
  },

  "11_async_rest_and_networking": {
    "Async Concepts": [
      "ASGI and async views",
      "Django Channels",
      "WebSocket support"
    ],
    "Serializers": [
      "Serializers in DRF",
      "Serializer fields",
      "Model serializers"
    ],
    "API Authentication": [
      "Token authentication",
      "JWT authentication",
      "Access vs Refresh tokens"
    ],
    "API Features": [
      "Viewsets",
      "Mixins",
      "Pagination",
      "Rate limiting"
    ],
    "CORS Concepts": [
      "Cross-Origin Resource Sharing",
      "CORS headers",
      "Preflight requests",
      "CORS configuration"
    ]
  },

  "12_networking_and_deployment": {
    "Network Basics": [
      "Client-Server architecture",
      "Port numbers",
      "DNS resolving"
    ],
    "URL Components": [
      "URL structure",
      "Query parameters",
      "Path parameters"
    ],
    "Protocols": [
      "TCP vs UDP",
      "SSH protocol"
    ],
    "Servers": [
      "WSGI (Web Server Gateway Interface)",
      "ASGI (Asynchronous Server Gateway Interface)",
      "Gunicorn usage",
      "Web vs Application servers"
    ],
    "Deployment": [
      "Production settings",
      "Static file serving",
      "Deployment configurations"
    ]
  },

  "13_advanced_features_and_tasks": {
    "Miscellaneous": [
      "Mixins usage",
      "Custom managers",
      "Email functionality",
      "Task queues"
    ]
  }

};


const seedDjangoHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create Django topic
    let djangoTopic = await Topic.findOne({ slug: 'django' });
    if (!djangoTopic) {
      const topicCount = await Topic.countDocuments();
      djangoTopic = await Topic.create({
        name: 'Django',
        slug: 'django',
        description: 'Master Django web framework - from fundamentals to advanced REST APIs, authentication, and deployment.',
        icon: '🦄',
        order: topicCount + 1,
        estimatedHours: 50
      });
      console.log('✅ Created Django topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(djangoHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '');
        
        let category = await Category.findOne({
          topicId: djangoTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: djangoTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName} in Django`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = `${categorySlug}-${sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,&]/g, '')
            .replace(/\//g, '-')}`;

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: djangoTopic._id,
              title: sectionTitle,
              slug: sectionSlug,
              order: sectionOrder++,
              description: `Learn about ${sectionTitle}`,
              difficulty: 'intermediate',
              estimatedTime: 25
            });
          }
        }
      }
    }

    console.log('🎉 Django hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Django:', error);
    process.exit(1);
  }
};

seedDjangoHierarchy();
