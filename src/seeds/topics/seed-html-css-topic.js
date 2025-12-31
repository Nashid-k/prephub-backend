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

const htmlCssData = {
  "HTML_CSS_Fundamentals": {
    "01_web_basics": {
      "core_concepts": [
        "How Websites Work (Client-Server Model)",
        "HTML - Structure and Content",
        "CSS - Styling and Presentation",
        "Browser Developer Tools Introduction"
      ],
      "development_setup": [
        "Code Editor Setup (VS Code)",
        "File Structure for Web Projects",
        "Browser Testing Basics",
        "Live Server/Preview Tools"
      ]
    },

    "02_html_basics": {
      "document_structure": [
        "HTML5 Doctype",
        "Basic Structure (html, head, body)",
        "Head Elements (title, meta, link)",
        "HTML Comments"
      ],
      "text_elements": [
        "Headings (h1-h6)",
        "Paragraphs (p)",
        "Text Formatting (strong, em, mark)",
        "Lists (ul, ol, li)",
        "Quotes and Code (blockquote, code)"
      ],
      "multimedia": [
        "Images (img with alt text)",
        "Links (a with href)",
        "Audio and Video Elements",
        "iframes for Embedding"
      ]
    }
  },

  "CSS_Basics": {
    "01_css_introduction": {
      "css_syntax": [
        "Selectors and Properties",
        "Inline, Internal, External CSS",
        "CSS Comments",
        "Basic Styling Rules"
      ],
      "text_styling": [
        "Font Properties (font-family, size, weight)",
        "Text Alignment and Decoration",
        "Color Values (hex, rgb, named colors)",
        "Line Height and Spacing"
      ]
    },

    "02_box_model": [
      "Content, Padding, Border, Margin",
      "Width and Height Properties",
      "box-sizing: border-box",
      "Margin Collapsing",
      "Box Model Visualization"
    ],

    "03_css_selectors": [
      "Element Selectors",
      "Class and ID Selectors",
      "Descendant and Child Selectors",
      "Pseudo-classes (:hover, :focus)",
      "Pseudo-elements (::before, ::after)"
    ]
  },

  "HTML_Forms_Tables": {
    "forms": [
      "Form Element (action, method)",
      "Input Types (text, email, password)",
      "Textarea, Select, Radio, Checkbox",
      "Labels and Accessibility",
      "Form Validation Attributes"
    ],

    "tables": [
      "Table Structure (table, tr, th, td)",
      "Table Headers and Captions",
      "Rowspan and Colspan",
      "Basic Table Styling"
    ]
  },

  "Semantic_HTML": [
    "HTML5 Semantic Elements",
    "header, nav, main, section, article",
    "aside, footer, figure, figcaption",
    "Semantic Markup Benefits",
    "Accessibility Improvements"
  ],

  "CSS_Layout": {
    "01_display_position": [
      "display: block, inline, inline-block",
      "position: static, relative, absolute",
      "position: fixed, sticky",
      "z-index for Layering",
      "Float Basics (legacy)"
    ],

    "02_flexbox": {
      "flex_container": [
        "display: flex",
        "flex-direction (row, column)",
        "justify-content (alignment)",
        "align-items (cross-axis alignment)",
        "flex-wrap for Wrapping"
      ],
      "flex_items": [
        "flex-grow, flex-shrink",
        "flex-basis",
        "order Property",
        "align-self for Individual Items"
      ]
    },

    "03_css_grid": {
      "grid_container": [
        "display: grid",
        "grid-template-columns and rows",
        "gap for Spacing",
        "grid-template-areas",
        "Grid Alignment Properties"
      ],
      "grid_items": [
        "grid-column and grid-row",
        "Grid Area Placement",
        "Responsive Grid Patterns"
      ]
    }
  },

  "Responsive_Design": {
    "01_responsive_basics": [
      "Mobile-First Approach",
      "Viewport Meta Tag",
      "Fluid Layouts with Percentages",
      "max-width and min-width"
    ],

    "02_media_queries": [
      "@media Rule Syntax",
      "Breakpoints (768px, 992px, 1200px)",
      "Device Features (screen, print)",
      "Mobile-First Media Queries"
    ],

    "03_responsive_units": [
      "Relative Units (em, rem, %)",
      "Viewport Units (vw, vh)",
      "When to Use Different Units",
      "Root Font Size Strategy"
    ],

    "04_responsive_images": [
      "srcset for Multiple Resolutions",
      "sizes Attribute",
      "picture Element for Art Direction",
      "Image Optimization"
    ]
  },

  "CSS_Advanced": {
    "01_backgrounds": [
      "Background Color and Image",
      "Background Positioning and Repeat",
      "Multiple Backgrounds",
      "CSS Gradients (linear, radial)"
    ],

    "02_transforms_transitions": [
      "Transform (translate, rotate, scale)",
      "CSS Transitions (duration, timing)",
      "Hover Effects",
      "Transform Origin"
    ],

    "03_animations": [
      "@keyframes Rule",
      "Animation Properties",
      "Animation Timing Functions",
      "Simple Animation Examples"
    ],

    "04_variables": [
      "CSS Custom Properties",
      "Variable Declaration (:root)",
      "Using Variables (var())",
      "Theming with Variables"
    ]
  },

  "Forms_Styling": [
    "Styling Input Fields",
    "Custom Checkboxes and Radios",
    "Form Validation Styling",
    "Focus States and Accessibility",
    "Form Layout Patterns"
  ],

  "Accessibility": [
    "Semantic HTML for Accessibility",
    "ARIA Roles and Attributes Basics",
    "Keyboard Navigation",
    "Color Contrast Requirements",
    "Screen Reader Considerations"
  ],

  "CSS_Methodologies": [
    "BEM Naming Convention",
    "Component-based Styling",
    "Utility Classes Pattern",
    "CSS Architecture Basics"
  ],

  "Preprocessors": {
    "sass_scss": [
      "Variables in Sass",
      "Nesting Selectors",
      "Mixins for Reusable Code",
      "Partial Files and Import",
      "Sass Compilation"
    ]
  },

  "CSS_Frameworks": {
    "framework_basics": [
      "When to Use Frameworks",
      "Bootstrap Grid System",
      "Utility-First CSS (Tailwind)",
      "Customizing Frameworks"
    ]
  },

  "Performance_Optimization": {
    "css_performance": [
      "Minifying CSS",
      "Critical CSS Extraction",
      "Reducing Render-blocking",
      "CSS Specificity Optimization"
    ],
    "image_optimization": [
      "Image Compression",
      "Lazy Loading",
      "Responsive Image Techniques",
      "Modern Image Formats"
    ]
  },

  "Cross_Browser": [
    "Browser Compatibility Testing",
    "Vendor Prefixes",
    "Feature Detection (@supports)",
    "CSS Resets vs Normalize"
  ],

  "Common_Components": {
    "navigation": [
      "Navbar Implementation",
      "Responsive Navigation",
      "Dropdown Menus",
      "Mobile Hamburger Menus"
    ],
    "ui_components": [
      "Card Components",
      "Modal/Popup Windows",
      "Accordions and Tabs",
      "Loading Spinners",
      "Tooltips and Badges"
    ],
    "layout_patterns": [
      "Hero Sections",
      "Feature Grids",
      "Testimonial Sections",
      "Footer Layouts",
      "Sidebar Layouts"
    ]
  },

  "Development_Tools": {
    "browser_tools": [
      "Chrome DevTools Elements Panel",
      "CSS Inspection and Editing",
      "Responsive Design Mode",
      "Performance Auditing"
    ],
    "development_workflow": [
      "CSS Linters",
      "Browser Sync Tools",
      "CSS Validators",
      "Color Palette Tools"
    ]
  },

  "Modern_Features": [
    "CSS Custom Properties (Advanced)",
    "CSS Grid Subgrid",
    "Container Queries",
    "CSS Scroll Snap",
    "Logical Properties (RTL support)"
  ],

  "Essential_Projects": {
    "beginner_projects": [
      "Personal Portfolio Website",
      "Restaurant Menu Page",
      "Blog Layout",
      "Product Landing Page"
    ],
    "intermediate_projects": [
      "E-commerce Product Page",
      "Dashboard Interface",
      "Social Media Clone",
      "Admin Panel Layout"
    ],
    "advanced_projects": [
      "Responsive Web Application",
      "CSS Framework from Scratch",
      "Interactive Portfolio",
      "Complex Layout Challenges"
    ]
  },

  "Best_Practices": {
    "01_code_quality": [
      "Consistent Naming Conventions",
      "CSS Organization Strategies",
      "Commenting and Documentation",
      "Code Reusability Patterns"
    ],
    "02_performance": [
      "Efficient Selector Writing",
      "CSS Delivery Optimization",
      "Animation Performance",
      "Memory Management"
    ],
    "03_maintainability": [
      "Modular CSS Structure",
      "Design System Basics",
      "Component Isolation",
      "Refactoring Strategies"
    ]
  },

  "Interview_Preparation": {
    "html_concepts": [
      "Semantic HTML Usage",
      "Form Validation",
      "Accessibility Features",
      "SEO Best Practices"
    ],
    "css_concepts": [
      "Box Model Understanding",
      "Flexbox vs Grid Usage",
      "Responsive Design Patterns",
      "CSS Specificity Rules"
    ],
    "practical_skills": [
      "Build Responsive Layout from Scratch",
      "Create Accessible Components",
      "Optimize Website Performance",
      "Cross-browser Compatibility Fixes"
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

const seedHtmlCss = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        let topic = await Topic.findOne({ slug: 'html-css' });
        if (!topic) {
            console.log('Creating HTML/CSS topic...');
            topic = await Topic.create({
                name: 'HTML/CSS',
                slug: 'html-css',
                description: 'Master modern web design with HTML and CSS',
                icon: '🎨',
                order: 13,
                color: '#E34C26'
            });
        }

        const categoriesToDelete = await Category.find({ topicId: topic._id });
        const categoryIds = categoriesToDelete.map(c => c._id);
        if (categoryIds.length > 0) {
            await Section.deleteMany({ categoryId: { $in: categoryIds } });
            await Category.deleteMany({ _id: { $in: categoryIds } });
            console.log('Cleared existing HTML/CSS data');
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
        for (const [mainKey, mainValue] of Object.entries(htmlCssData)) {
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
                    difficulty: categoryName.includes('Advanced') || categoryName.includes('Performance') || categoryName.includes('Preprocessors') ? 'advanced' : 
                               categoryName.includes('Basics') || categoryName.includes('Fundamentals') || categoryName.includes('Web Basics') ? 'beginner' : 'intermediate',
                    estimatedTime: 15
                }));

                await Section.insertMany(sectionDocs);
                console.log(`Created Category: ${categoryName} (Group: ${formatName(mainKey)}) with ${sectionDocs.length} sections`);
            }
        }

        console.log('✅ HTML/CSS seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedHtmlCss();
