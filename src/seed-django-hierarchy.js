import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';

dotenv.config();

const djangoHierarchy = {
  "Django Fundamentals": {
    "Framework Basics": [
      "What is a Framework",
      "What is Django",
      "Pros and cons of Django",
      "MVT architecture",
      "MVC vs MVT",
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
  "Project Structure": {
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
  "Models & ORM": {
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
    ]
  },
  "Database": {
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
  "Views": {
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
  "Templates": {
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
    ]
  },
  "Forms": {
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
  "Admin Interface": {
    "Admin Panel": [
      "Admin panel configuration",
      "Registering models",
      "Custom admin interfaces",
      "Superuser creation"
    ]
  },
  "URL Routing": {
    "URL Configuration": [
      "URL patterns",
      "path() and re_path()",
      "URL parameters",
      "Query parameters"
    ]
  },
  "Static & Media Files": {
    "File Management": [
      "Static files handling",
      "collectstatic command",
      "Media files handling",
      "File upload handling"
    ]
  },
  "Authentication & Authorization": {
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
    ]
  },
  "Sessions & Cookies": {
    "Session Management": [
      "Django session framework",
      "Session configuration",
      "Session lifetime"
    ],
    "Cookies": [
      "Cookie handling",
      "Setting cookie expiry",
      "Cookies vs sessions"
    ]
  },
  "Middleware": {
    "Middleware Concepts": [
      "What is middleware",
      "Middleware order",
      "Custom middleware",
      "Built-in middleware"
    ]
  },
  "Signals": {
    "Signal Concepts": [
      "Django signals",
      "pre_save vs post_save",
      "Signal configuration",
      "Custom signals"
    ]
  },
  "Security": {
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
  "HTTP Protocol": {
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
    ]
  },
  "Web Servers & Deployment": {
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
  "Django REST Framework": {
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
    ]
  },
  "Networking Concepts": {
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
    ]
  },
  "CORS": {
    "CORS Concepts": [
      "Cross-Origin Resource Sharing",
      "CORS headers",
      "Preflight requests",
      "CORS configuration"
    ]
  },
  "Caching": {
    "Cache Types": [
      "Browser caching",
      "Server-side caching",
      "Cache in Django",
      "Cache backends"
    ]
  },
  "Asynchronous Programming": {
    "Async Concepts": [
      "ASGI and async views",
      "Django Channels",
      "WebSocket support"
    ]
  },
  "Query Optimization": {
    "QuerySet Optimization": [
      "select_related()",
      "prefetch_related()",
      "Raw SQL queries",
      "Bulk operations",
      "F and Q objects"
    ]
  },
  "Advanced Features": {
    "Messages Framework": [
      "Django messages",
      "Message types",
      "Displaying messages"
    ],
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
