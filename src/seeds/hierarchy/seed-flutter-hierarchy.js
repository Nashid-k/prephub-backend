import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';

dotenv.config();

const flutterHierarchy = {
  "Foundations & Overview": {
    "Flutter Basics": [
      "What is Flutter?",
      "Advantages & Disadvantages",
      "Flutter Architecture",
      "Dart Language Overview",
      "Flutter Doctor & Inspector",
      "JIT vs AOT Compilation"
    ],
    "Project Setup": [
      "Pubspec.yaml File",
      "Packages vs Plugins",
      "Managing Dependencies",
      "Build Modes: Debug, Release, Profile"
    ]
  },
  "Dart Programming": {
    "Core Concepts": [
      "Variables & Types (var, final, const)",
      "String Interpolation",
      "Operators & Control Flow",
      "Functions & Parameters"
    ],
    "Collections": [
      "Lists, Maps, Sets",
      "Spread Operator (...)",
      "Collection Methods (map, where, forEach)",
      "Map vs forEach difference"
    ],
    "Error Handling": [
      "Try-Catch-Finally",
      "Try-Parse",
      "Rethrow & Assert"
    ],
    "OOP in Dart": [
      "Classes & Objects",
      "Constructors (Named, Factory)",
      "Inheritance & Mixins",
      "Abstract Classes & Interfaces",
      "Singleton Pattern",
      "Getters and Setters"
    ],
    "Advanced Types": [
      "Type Promotion & Casting",
      "Generics",
      "Typedef",
      "Never Type",
      "Pure vs Impure Functions"
    ]
  },
  "Widgets & UI": {
    "App Structure": [
      "main() vs runApp()",
      "MaterialApp & CupertinoApp",
      "Scaffold Widget",
      "SafeArea",
      "ThemeData"
    ],
    "Layout Basics": [
      "Container & SizedBox",
      "Padding & Margin",
      "Align & AspectRatio",
      "ColoredBox & ClipRRect"
    ],
    "Multi-child Layouts": [
      "Column & Row",
      "Stack & Positioned",
      "Expanded & Flexible",
      "ListView & GridView",
      "Table Widget"
    ],
    "Interactive Widgets": [
      "GestureDetector vs InkWell",
      "Buttons (Elevated, Text, Icon)",
      "TextField & TextFormField",
      "Forms & Validation",
      "Checkbox, Radio, Switch"
    ],
    "Visual Widgets": [
      "Text & RichText",
      "Image (Network, Asset, File)",
      "Icon & CircleAvatar",
      "Divider & Card"
    ],
    "Scrolling": [
      "Scroll Physics",
      "SingleChildScrollView",
      "ScrollController",
      "ShrinkWrap Property"
    ]
  },
  "State Management": {
    "State Concepts": [
      "What is State?",
      "Stateful vs Stateless Widgets",
      "setState() Method",
      "Widget Lifecycle"
    ],
    "Simple Reactive": [
      "InheritedWidget",
      "ValueNotifier & ValueListenableBuilder",
      "ChangeNotifier & Provider",
      "MultiProvider"
    ],
    "Advanced Patterns": [
      "BLoC Pattern (Events, States)",
      "Cubit (subset of BLoC)",
      "MultiBlocProvider",
      "GetX (State, Route, Dependency)",
      "Riverpod"
    ]
  },
  "Navigation & Routing": {
    "Imperative Navigation": [
      "Navigator Widget",
      "push(), pop(), pushNamed()",
      "Returning Values from Routes",
      "Current Route Name"
    ],
    "Declarative Routing": [
      "Router API",
      "GoRouter Package",
      "Named Routes",
      "Passing Arguments",
      "Deep Linking"
    ],
    "Dialogs": [
      "AlertDialog",
      "ModalBottomSheet",
      "SnackBar"
    ]
  },
  "Asynchronous Programming": {
    "Futures": [
      "Async & Await",
      "Future.then(), catchError()",
      "FutureBuilder Widget"
    ],
    "Streams": [
      "Stream vs Future",
      "StreamBuilder",
      "Async* & Yield"
    ],
    "Concurrency": [
      "Isolates",
      "Compute Function",
      "Zones in Flutter"
    ]
  },
  "Data Persistence": {
    "Key-Value Storage": [
      "Shared Preferences",
      "Local Storage Concepts"
    ],
    "Local Databases": [
      "SQLite with sqflite",
      "Hive (NoSQL)",
      "Database Migration"
    ],
    "File Storage": [
      "path_provider",
      "file_picker",
      "Reading/Writing Files"
    ]
  },
  "Networking & APIs": {
    "HTTP Communication": [
      "http & dio Packages",
      "HTTP Methods (GET, POST, PUT, DELETE)",
      "Headers & Interceptors",
      "JSON Serialization"
    ],
    "State Integration": [
      "Fetching Data in initState",
      "Loading & Error States",
      "Pull-to-Refresh"
    ]
  },
  "Platform Integration": {
    "Platform Channels": [
      "MethodChannel",
      "EventChannel",
      "BasicChannel",
      "Native Communication"
    ],
    "Native Features": [
      "Device Sensors",
      "Camera/Gallery (image_picker)",
      "Local Notifications",
      "In-App Purchases"
    ],
    "Platform UI": [
      "Cupertino vs Material",
      "Adaptive Apps",
      "SystemChrome"
    ]
  },
  "Advanced Concepts": {
    "Performance": [
      "Widget Rebuild Optimization",
      "Keys in Flutter",
      "addPostFrameCallback",
      "AnimationController",
      "Tree Shaking"
    ],
    "Animations": [
      "Implicit Animations",
      "Explicit Animations",
      "Hero Animations",
      "Physics-based Animations"
    ],
    "Testing": [
      "Unit Testing",
      "Widget Testing",
      "Integration Testing"
    ],
    "Security": [
      "Data Encryption",
      "SSL Pinning",
      "Secure Storage"
    ],
    "Miscellaneous": [
      "i18n & Localization",
      "Accessibility",
      "Responsive Design",
      "Dependency Injection"
    ]
  },
  "Deployment & DevOps": {
    "Build Process": [
      "Flutter Build (apk, appbundle, ipa)",
      "Code Signing",
      "App Icons & Splash Screens"
    ],
    "CI/CD": [
      "GitHub Actions",
      "Codemagic",
      "Fastlane"
    ],
    "Monitoring": [
      "Firebase Crashlytics",
      "Sentry",
      "Analytics"
    ]
  },
  "Practical Concepts": {
    "Architecture": [
      "Clean Architecture",
      "Repository Pattern",
      "Feature-first Structure"
    ],
    "Feature Implementation": [
      "Authentication Flow",
      "Real-time Features (WebSockets)",
      "State Restoration",
      "Offline-First Apps"
    ],
    "Problem Solving": [
      "Overflow Issues",
      "Keyboard Insets",
      "Performance Profiling",
      "Memory Leak Detection"
    ]
  }
};

const seedFlutterHierarchy = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Create Flutter topic
    let flutterTopic = await Topic.findOne({ slug: 'flutter' });
    if (!flutterTopic) {
      const topicCount = await Topic.countDocuments();
      flutterTopic = await Topic.create({
        name: 'Flutter',
        slug: 'flutter',
        description: 'Master Flutter framework for cross-platform mobile development - from Dart fundamentals to production-ready apps.',
        icon: '🦋',
        order: topicCount + 1,
        estimatedHours: 60
      });
      console.log('✅ Created Flutter topic');
    }

    // Seed hierarchy
    let categoryOrder = 1;
    for (const [groupName, categories] of Object.entries(flutterHierarchy)) {
      for (const [categoryName, sections] of Object.entries(categories)) {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[()&]/g, '');
        
        let category = await Category.findOne({
          topicId: flutterTopic._id,
          slug: categorySlug
        });

        if (!category) {
          category = await Category.create({
            topicId: flutterTopic._id,
            name: categoryName,
            slug: categorySlug,
            group: groupName,
            order: categoryOrder++,
            description: `Learn ${categoryName} in Flutter`
          });
          console.log(`✅ Created category: ${categoryName}`);
        }

        let sectionOrder = 1;
        for (const sectionTitle of sections) {
          const sectionSlug = `${categorySlug}-${sectionTitle.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[().,&/]/g, '')
            .replace(/:/g, '')}`;

          const existingSection = await Section.findOne({
            categoryId: category._id,
            slug: sectionSlug
          });

          if (!existingSection) {
            await Section.create({
              categoryId: category._id,
              topicId: flutterTopic._id,
              title: sectionTitle,
              slug: sectionSlug,
              order: sectionOrder++,
              description: `Learn about ${sectionTitle}`,
              difficulty: 'intermediate',
              estimatedTime: 30
            });
          }
        }
      }
    }

    console.log('🎉 Flutter hierarchy seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Flutter:', error);
    process.exit(1);
  }
};

seedFlutterHierarchy();
