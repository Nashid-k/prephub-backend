
const flutterCurriculum = {
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

export { flutterCurriculum };
