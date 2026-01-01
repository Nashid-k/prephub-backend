import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../../models/Topic.js';
import Category from '../../models/Category.js';
import Section from '../../models/Section.js';
import PathMap from '../../models/PathMap.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { assignGroup } from '../utils/categoryGrouping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const flutterData = {
  "Flutter_Fundamentals": {
    "01_flutter_basics": {
      "core_concepts": [
        "What is Flutter - Cross-Platform Framework",
        "Flutter Architecture Layers",
        "Dart Language Overview",
        "Hot Reload vs Hot Restart"
      ],
      "development_setup": [
        "Flutter SDK Installation",
        "IDE Setup (VS Code/Android Studio)",
        "Flutter Doctor Commands",
        "Creating First Flutter Project"
      ]
    },

    "02_project_structure": {
      "key_files": [
        "pubspec.yaml - Dependencies & Configuration",
        "main.dart - Application Entry Point",
        "MaterialApp/CupertinoApp Setup",
        "Project Folder Organization"
      ],
      "build_modes": [
        "Debug Mode (Hot Reload)",
        "Release Mode (Optimized Build)",
        "Profile Mode (Performance Testing)"
      ]
    }
  },

  "Dart_Essentials": {
    "01_basic_syntax": [
      "Variables (var, final, const)",
      "Data Types (String, int, double, bool)",
      "Null Safety & Null Aware Operators",
      "String Interpolation"
    ],

    "02_control_flow": [
      "if-else Conditions",
      "for, while, do-while Loops",
      "switch-case Statements",
      "Ternary Operator"
    ],

    "03_functions": [
      "Function Declaration & Calling",
      "Named & Optional Parameters",
      "Arrow Functions",
      "Higher-Order Functions"
    ],

    "04_collections": [
      "Lists (Fixed & Growable)",
      "Maps (Key-Value Pairs)",
      "Sets (Unique Values)",
      "Collection Methods (map, where, forEach)"
    ],

    "05_oop_dart": [
      "Classes & Objects",
      "Constructors (Default, Named)",
      "Inheritance (extends)",
      "Mixins (with)",
      "Abstract Classes"
    ],

    "06_async_programming": [
      "Futures & async/await",
      "Error Handling (try-catch)",
      "Streams Basics",
      "FutureBuilder/StreamBuilder Usage"
    ]
  },

  "Widgets_UI": {
    "01_widget_basics": [
      "Everything is a Widget",
      "Stateless vs Stateful Widgets",
      "Widget Tree & Composition",
      "BuildContext Understanding"
    ],

    "02_layout_widgets": {
      "single_child": [
        "Container (Padding, Margin, Decoration)",
        "SizedBox (Fixed Dimensions)",
        "Padding Widget",
        "Align & Center"
      ],
      "multi_child": [
        "Column & Row (Main/Cross Axis Alignment)",
        "Stack & Positioned",
        "Expanded & Flexible",
        "ListView & GridView"
      ]
    },

    "03_basic_widgets": [
      "Text & RichText",
      "Image (Asset, Network)",
      "Icon & IconButton",
      "Card & Divider"
    ],

    "04_input_widgets": [
      "TextField & TextFormField",
      "Buttons (ElevatedButton, TextButton)",
      "Checkbox, Radio, Switch",
      "DropdownButton"
    ],

    "05_scrolling": [
      "SingleChildScrollView",
      "ListView.builder (Performance)",
      "CustomScrollView",
      "ScrollController Basics"
    ],

    "06_responsive_design": [
      "MediaQuery for Screen Info",
      "LayoutBuilder for Adaptive Layouts",
      "Orientation Changes",
      "SafeArea for Notches"
    ]
  },

  "State_Management": {
    "01_state_concepts": [
      "Ephemeral vs App State",
      "StatefulWidget Lifecycle",
      "setState() Method",
      "When to Lift State Up"
    ],

    "02_basic_state_management": [
      "Provider Package Setup",
      "ChangeNotifier & ChangeNotifierProvider",
      "Consumer Widget",
      "context.read() vs context.watch()"
    ],

    "03_advanced_state_management": {
      "bloc_pattern": [
        "BLoC Architecture (Events, States)",
        "Cubit (Simpler BLoC)",
        "BlocProvider & BlocBuilder",
        "State Management Best Practices"
      ],
      "getx_pattern": [
        "GetX Controller & .obs",
        "Obx & GetBuilder",
        "GetX Dependency Management",
        "GetX Navigation"
      ]
    }
  },

  "Navigation_Routing": {
    "01_basic_navigation": [
      "Navigator.push() & pop()",
      "Named Routes Setup",
      "Passing Data Between Screens",
      "Returning Data from Screens"
    ],

    "02_advanced_navigation": [
      "GoRouter Package",
      "Nested Navigation",
      "Route Guards & Middleware",
      "Deep Linking"
    ],

    "03_dialogs_snackbars": [
      "AlertDialog & SimpleDialog",
      "ModalBottomSheet",
      "SnackBar for Notifications",
      "Custom Dialog Implementation"
    ]
  },

  "Networking_API": {
    "01_http_requests": [
      "http Package Setup",
      "GET, POST Requests",
      "Request Headers & Parameters",
      "Error Handling"
    ],

    "02_data_parsing": [
      "JSON Serialization/Deserialization",
      "Model Classes with fromJson/toJson",
      "json_serializable Package",
      "Handling API Responses"
    ],

    "03_state_management_integration": [
      "Loading & Error States UI",
      "Pull-to-Refresh Implementation",
      "Pagination",
      "Caching Strategies"
    ]
  },

  "Local_Storage": {
    "01_key_value_storage": [
      "Shared Preferences Package",
      "Reading/Writing Simple Data",
      "Secure Storage Options"
    ],

    "02_database_storage": [
      "SQLite with sqflite",
      "NoSQL with Hive",
      "Database Models & CRUD",
      "Migrations"
    ],

    "03_file_storage": [
      "File Picking (file_picker)",
      "Reading/Writing Files",
      "Path Provider Package",
      "Image Caching"
    ]
  },

  "Platform_Integration": {
    "01_native_features": [
      "Camera/Gallery Access (image_picker)",
      "Local Notifications",
      "Location Services",
      "Sensors Usage"
    ],

    "02_packages_plugins": [
      "Finding & Evaluating Packages",
      "Popular Package Categories",
      "Native Plugin Communication Basics"
    ],

    "03_platform_ui": [
      "Material vs Cupertino Widgets",
      "Adaptive Apps",
      "Platform-specific Styling"
    ]
  },

  "Forms_Validation": {
    "form_handling": [
      "Form & FormField Widgets",
      "TextFormField Validation",
      "FormKey & GlobalKey",
      "Form Submission Handling"
    ],

    "validation_patterns": [
      "Built-in Validators",
      "Custom Validators",
      "Real-time Validation",
      "Form State Management"
    ]
  },

  "Animations": {
    "basic_animations": [
      "Implicit Animations (AnimatedContainer)",
      "Explicit Animations (AnimationController)",
      "Tween Animations",
      "Hero Animations"
    ],

    "advanced_animations": [
      "Custom Painter",
      "Physics-based Animations",
      "Performance Considerations",
      "Animation Packages"
    ]
  },

  "Firebase_Integration": {
    "firebase_setup": [
      "Firebase Console Setup",
      "FlutterFire Configuration (CLI)",
      "GoogleServices Json/Plist",
      "Firebase Options"
    ],
    "authentication": [
      "Email/Password Auth",
      "Google Sign-In",
      "Phone Authentication",
      "Anonymous Auth",
      "User Session Management"
    ],
    "cloud_firestore": [
      "Firestore Data Model",
      "CRUD Operations",
      "Real-time Updates (Streams)",
      "Complex Queries & Indexes",
      "Security Rules"
    ],
    "other_services": [
      "Firebase Storage (Images/Files)",
      "Cloud Functions Basics",
      "Firebase Analytics",
      "Crashlytics Setup",
      "Remote Config"
    ]
  },

  "Advanced_State_Management": {
    "riverpod_deep_dive": [
      "Riverpod vs Provider",
      "Providers Types (State, Future, Stream)",
      "Riverpod Modifiers (autoDispose, family)",
      "Testing with Riverpod"
    ],
    "bloc_advanced": [
      "Bloc Testing",
      "Bloc to Bloc Communication",
      "Hydrated Bloc (Persisting State)",
      "Freezed Code Generation"
    ]
  },

  "App_Architecture": {
    "architectural_patterns": [
      "MVVM (Model-View-ViewModel)",
      "Clean Architecture Layers",
      "Feature-first Project Structure",
      "Dependency Injection Pattern"
    ],
    "repository_pattern": [
      "Repository Concept",
      "Data Sources (Remote/Local)",
      "Caching Strategies",
      "Error Handling Layer"
    ]
  },

  "Theming_And_Styling": {
    "advanced_theming": [
      "ThemeData Customization",
      "ColorSchemes (Material 3)",
      "Dark Mode Implementation",
      "Custom Fonts & Typography",
      "Component Themes"
    ],
    "responsive_layouts": [
      "LayoutBuilder vs MediaQuery",
      "FractionallySizedBox",
      "AspectRatio Widget",
      "Adaptive Adaptive Scaffolds"
    ]
  },

  "Internationalization_i18n": {
    "localization_setup": [
      "Adding Supported Locales",
      "L10n Arb Files",
      "Generating Localized Strings",
      "Dynamic Language Switching",
      "Formatting Dates/Numbers for Locales"
    ]
  },

  "Performance_Optimization": {
    "devtools_usage": [
      "Flutter DevTools Overview",
      "Performance Overlay",
      "Widget Inspector",
      "Memory Profiling"
    ],
    "rendering_pipeline": [
      "Build vs Layout vs Paint",
      "const Constructors",
      "RepaintBoundaries",
      "Listview Optimization"
    ]
  },

  "Native_Integration": {
    "platform_channels": [
      "MethodChannel (Dart to Native)",
      "EventChannel (Streams)",
      "Writing Android (Kotlin) Code",
      "Writing iOS (Swift) Code"
    ],
    "background_processing": [
      "WorkManager",
      "Isolates for Heavy Computation",
      "Background Fetch"
    ]
  },

  "Flutter_Web_And_Desktop": {
    "web_support": [
      "Web-specific Considerations",
      "SEO for Flutter Web",
      "URL Strategy (PathUrlStrategy)",
      "PWA Configuration"
    ],
    "desktop_support": [
      "Windows/MacOS/Linux Support",
      "Keyboard Shortcuts",
      "Desktop-specific UI patterns",
      "Menu Bars and System Tray"
    ]
  },

  "Deployment_CI_CD": {
    "store_deployment": [
      "App Signing (Keystore/Certificates)",
      "Google Play Store Release",
      "Apple App Store Release",
      "App Icons and Splash Screens"
    ],
    "ci_cd_pipelines": [
      "GitHub Actions for Flutter",
      "Codemagic Basics",
      "Fastlane Setup",
      "Automated Testing in CI"
    ]
  },

  "Advanced_UI_Challenges": {
    "custom_painting": [
      "CustomPainter & Canvas",
      "Path & Curves",
      "Drawing Shapes & Gradients",
      "Complex UI Replications"
    ],
    "advanced_effects": [
      "Shaders & FragmentShaders",
      "BackdropFilter & Blurs",
      "Slivers Deep Dive",
      "Transform & Matrix4"
    ]
  },

  "Testing": {
    "testing_types": [
      "Unit Testing (Business Logic)",
      "Widget Testing (UI Components)",
      "Integration Testing (Full Flows)",
      "Golden Tests (Snapshot Testing)"
    ],

    "testing_tools": [
      "test & flutter_test Packages",
      "Mocking Dependencies",
      "Test Coverage",
      "CI/CD Integration"
    ]
  },

  "Performance_Optimization": {
    "performance_tips": [
      "const Constructors Usage",
      "Keys in Flutter",
      "ListView.builder for Large Lists",
      "Image Optimization"
    ],

    "debugging_tools": [
      "Flutter Inspector",
      "Performance Overlay",
      "Dart DevTools",
      "Memory Profiling"
    ]
  },

  "Deployment": {
    "01_app_builds": [
      "Android APK/AAB Generation",
      "iOS IPA Generation",
      "Code Signing Setup",
      "App Icons & Splash Screens"
    ],

    "02_app_store_deployment": [
      "Google Play Store Submission",
      "Apple App Store Submission",
      "App Metadata & Screenshots",
      "Release Management"
    ],

    "03_continuous_integration": [
      "GitHub Actions Setup",
      "Automated Testing Pipeline",
      "Automated Builds",
      "Code Analysis Tools"
    ]
  },

  "Project_Architecture": {
    "common_patterns": [
      "Repository Pattern",
      "Service Layer",
      "Feature-based Organization",
      "Clean Architecture Basics"
    ],

    "best_practices": [
      "Separation of Concerns",
      "Dependency Injection",
      "Error Handling Strategy",
      "Logging Implementation"
    ]
  },

  "Essential_Projects": {
    "learning_projects": [
      "Todo List App (CRUD, Local Storage)",
      "Weather App (API Integration, State Management)",
      "E-commerce App (Complex UI, Cart Management)",
      "Chat App (Real-time Features, Authentication)"
    ],

    "must_know_features": [
      "Authentication Flow",
      "REST API Integration",
      "Local Database Usage",
      "File Upload/Download",
      "Push Notifications"
    ]
  },

  "Interview_Preparation": {
    "common_concepts": [
      "Widget Lifecycle",
      "State Management Choices",
      "Performance Optimization",
      "Navigation Patterns",
      "Error Handling Strategies"
    ],

    "practical_skills": [
      "Build a Simple App from Scratch",
      "Debug Common Issues",
      "Optimize Existing Code",
      "Implement Complex UI",
      "Integrate Third-party APIs"
    ]
  }
};

const formatName = (str) => {
    return str
        .replace(/^\\d+_/, '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const seedFlutter = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'flutter' });
        if (!topic) {
            console.log('Creating Flutter topic...');
            topic = await Topic.create({
                name: 'Flutter',
                slug: 'flutter',
                description: 'Build beautiful cross-platform apps with Flutter',
                icon: '🦋',
                order: 10,
                color: '#02569B'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ topicId: topic._id });
            await Category.deleteMany({ topicId: topic._id });
            console.log('Cleared existing Flutter data');
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

        let order = 1;
        for (const [mainKey, mainValue] of Object.entries(flutterData)) {
            const groupName = formatName(mainKey); // Use mainKey as group - maintains study order!
            
            for (const [key, value] of Object.entries(mainValue)) {
                const categoryName = formatName(key);
                const categorySlug = generateUniqueSlug(categoryName);

                const category = await Category.create({
                    name: categoryName,
                    slug: categorySlug,
                    description: `Learn about ${categoryName}`,
                    topicId: topic._id,
                    group: groupName,
                    order: order++
                });

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
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Performance') ? 'advanced' : 
                               categoryName.includes('Basics') || categoryName.includes('Flutter') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        // --- PathMap Generation ---
        console.log('Generating PathMaps for Experience Levels...');

        const allCategories = await Category.find({ topicId: topic._id });
        const categoriesByGroup = {};
        allCategories.forEach(c => {
            if (!categoriesByGroup[c.group]) categoriesByGroup[c.group] = [];
            categoriesByGroup[c.group].push(c.slug);
        });

        const levels = {
            '0-1_year': [
                'Flutter Fundamentals', 'Dart Essentials', 'Widgets UI', 'Navigation Routing', 
                'Networking API', 'Forms Validation', 'Essential Projects'
            ],
            '1-3_years': [
                'Flutter Fundamentals', 'Dart Essentials', 'Widgets UI', 'Navigation Routing', 
                'Networking API', 'Forms Validation', 'Essential Projects',
                'State Management', 'Local Storage', 'Platform Integration', 'Animations', 
                'Firebase Integration', 'Testing'
            ],
            '3-5_years': [
                'Flutter Fundamentals', 'Dart Essentials', 'Widgets UI', 'Navigation Routing', 
                'Networking API', 'Forms Validation', 'Essential Projects',
                'State Management', 'Local Storage', 'Platform Integration', 'Animations', 
                'Firebase Integration', 'Testing',
                'Advanced State Management', 'App Architecture', 'Theming And Styling', 
                'Internationalization i18n', 'Performance Optimization', 'Native Integration',
                'Flutter Web And Desktop', 'Deployment CI CD', 'Advanced UI Challenges', 'Project Architecture', 'Interview Preparation'
            ]
        };

        for (const [level, groups] of Object.entries(levels)) {
            let visibleSlugs = [];
            groups.forEach(g => {
                const matchGroup = Object.keys(categoriesByGroup).find(k => k.toLowerCase() === g.toLowerCase());
                if (matchGroup && categoriesByGroup[matchGroup]) {
                    visibleSlugs = [...visibleSlugs, ...categoriesByGroup[matchGroup]];
                }
            });

            await PathMap.findOneAndUpdate(
                { topicId: topic._id, experienceLevel: level },
                { 
                    topicId: topic._id,
                    experienceLevel: level,
                    visibleCategorySlugs: visibleSlugs 
                },
                { upsert: true, new: true }
            );
            console.log(`Created PathMap for ${level}: ${visibleSlugs.length} categories`);
        }

        console.log('✅ Flutter seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedFlutter();
