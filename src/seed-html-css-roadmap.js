import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from './models/Topic.js';
import Category from './models/Category.js';
import Section from './models/Section.js';
import slugify from 'slugify';

dotenv.config();

const htmlCssData = {
  "HTML_CSS_Integrated_Roadmap": {
    "phase_1_foundations": {
      "web_fundamentals": [
        "How the Web Works (Client-Server Model)",
        "What is HTML? (HyperText Markup Language)",
        "What is CSS? (Cascading Style Sheets)",
        "Browser Developer Tools Introduction",
        "Text Editors and IDEs (VS Code, Sublime, etc.)"
      ],
      "html_setup_structure": [
        "HTML Document Structure (!DOCTYPE, html, head, body)",
        "Creating Your First HTML Page",
        "Head Section Elements (title, meta, link, style)",
        "HTML Comments",
        "Viewing HTML in Browser"
      ],
      "css_setup_methods": [
        "Three Ways to Add CSS (Inline, Internal, External)",
        "CSS Syntax (Selectors, Properties, Values)",
        "Creating Your First CSS File",
        "CSS Comments",
        "Linking CSS to HTML"
      ]
    },
    // ... rest of the JSON data will be pasted here in implementation ...
    "phase_2_basic_html_elements": {
      "text_content": [
        "Headings (h1 to h6)",
        "Paragraphs (p)",
        "Line Breaks (br) and Horizontal Rules (hr)",
        "Text Formatting (strong, em, mark, small, del, ins)",
        "Quotations (blockquote, q, cite)",
        "Computer Code (code, pre, kbd, samp, var)"
      ],
      "links_images": [
        "Anchor Tags (a) with href Attribute",
        "Absolute vs Relative URLs",
        "Image Tag (img) with src and alt Attributes",
        "Image Formats (JPEG, PNG, SVG, WebP)",
        "Image Dimensions and Aspect Ratio"
      ],
      "lists_tables": [
        "Ordered Lists (ol, li)",
        "Unordered Lists (ul, li)",
        "Definition Lists (dl, dt, dd)",
        "Table Structure (table, thead, tbody, tfoot, tr, th, td)",
        "Table Attributes (colspan, rowspan)",
        "Table Styling Basics"
      ]
    },
    "phase_3_css_fundamentals": {
      "css_selectors": [
        "Element Selectors",
        "Class Selectors (.)",
        "ID Selectors (#)",
        "Grouping Selectors",
        "Universal Selector (*)",
        "Descendant Selectors (space)",
        "Child Selectors (>)",
        "Adjacent Sibling Selectors (+)",
        "General Sibling Selectors (~)"
      ],
      "css_box_model": [
        "What is the Box Model?",
        "Content, Padding, Border, Margin",
        "box-sizing Property (content-box vs border-box)",
        "Width and Height Properties",
        "Margin Collapsing"
      ],
      "text_styling": [
        "font-family and Web Fonts (Google Fonts)",
        "font-size (px, em, rem, %, vw)",
        "font-weight (bold, normal, 100-900)",
        "font-style (italic, oblique)",
        "text-align, text-decoration, text-transform",
        "line-height and letter-spacing",
        "color Property and Color Values (hex, rgb, rgba, hsl, hsla, named colors)"
      ]
    },
    "phase_4_html_forms_semantics": {
      "html_forms": [
        "Form Element (form) with action and method",
        "Input Types (text, password, email, number, date, etc.)",
        "Textarea Element",
        "Select and Option Elements (Dropdowns)",
        "Radio Buttons and Checkboxes",
        "Buttons (button, input type='submit/reset')",
        "Label Element and for Attribute",
        "Fieldset and Legend",
        "Form Validation Attributes (required, pattern, min, max)"
      ],
      "semantic_html": [
        "HTML5 Semantic Elements",
        "header, nav, main, section, article",
        "aside, footer, figure, figcaption",
        "Semantic vs Non-semantic Elements",
        "Accessibility Benefits of Semantic HTML"
      ],
      "multimedia": [
        "Audio Element (audio)",
        "Video Element (video)",
        "Embedding with iframe",
        "Figure and Figcaption"
      ]
    },
    "phase_5_css_layout_basics": {
      "display_property": [
        "display: block",
        "display: inline",
        "display: inline-block",
        "display: none vs visibility: hidden"
      ],
      "positioning": [
        "position: static (default)",
        "position: relative",
        "position: absolute",
        "position: fixed",
        "position: sticky",
        "z-index Property"
      ],
      "floats": [
        "float: left and float: right",
        "clear Property",
        "Float-based Layouts (Legacy)"
      ],
      "backgrounds": [
        "background-color",
        "background-image",
        "background-repeat, background-position, background-size",
        "background-attachment",
        "Multiple Backgrounds",
        "Linear and Radial Gradients"
      ]
    },
    "phase_6_modern_layouts": {
      "flexbox": {
        "flex_container": [
          "display: flex",
          "flex-direction (row, column, row-reverse, column-reverse)",
          "flex-wrap (nowrap, wrap, wrap-reverse)",
          "justify-content (flex-start, center, flex-end, space-between, space-around, space-evenly)",
          "align-items (stretch, flex-start, center, flex-end, baseline)",
          "align-content (for multi-line flex containers)",
          "gap, row-gap, column-gap"
        ],
        "flex_items": [
          "order Property",
          "flex-grow",
          "flex-shrink",
          "flex-basis",
          "flex Shorthand",
          "align-self"
        ]
      },
      "css_grid": {
        "grid_container": [
          "display: grid",
          "grid-template-columns and grid-template-rows",
          "grid-template-areas",
          "grid-gap (gap, row-gap, column-gap)",
          "justify-items and align-items",
          "justify-content and align-content",
          "grid-auto-columns and grid-auto-rows"
        ],
        "grid_items": [
          "grid-column and grid-row",
          "grid-area",
          "justify-self and align-self"
        ],
        "grid_layouts": [
          "Creating Common Layouts (Header, Sidebar, Main, Footer)",
          "Responsive Grid Layouts",
          "Grid vs Flexbox: When to Use Each"
        ]
      }
    },
    "phase_7_responsive_design": {
      "responsive_basics": [
        "What is Responsive Web Design?",
        "Mobile-First vs Desktop-First Approach",
        "Viewport Meta Tag",
        "Fluid Layouts with Percentages",
        "max-width and min-width"
      ],
      "media_queries": [
        "Media Query Syntax (@media)",
        "Breakpoints (Common Values: 320px, 480px, 768px, 992px, 1200px)",
        "Media Features (width, height, orientation, resolution)",
        "Logical Operators (and, or, not, only)",
        "Mobile-First Media Queries"
      ],
      "responsive_units": [
        "Relative Units (em, rem, %, vw, vh, vmin, vmax)",
        "When to Use px vs rem/em",
        "Root Font Size and rem Calculations",
        "Viewport Units for Full-screen Layouts"
      ],
      "responsive_images": [
        "srcset Attribute",
        "sizes Attribute",
        "picture Element",
        "Art Direction with picture",
        "Image Optimization for Performance"
      ]
    },
    "phase_8_css_advanced_topics": {
      "transforms_transitions": [
        "transform Property (translate, rotate, scale, skew)",
        "CSS Transitions (transition-property, transition-duration, transition-timing-function, transition-delay)",
        "Transition Shorthand",
        "Hover Effects and Interactive Elements"
      ],
      "animations": [
        "@keyframes Rule",
        "animation-name, animation-duration, animation-timing-function",
        "animation-delay, animation-iteration-count",
        "animation-direction, animation-fill-mode",
        "animation-play-state",
        "Animation Shorthand"
      ],
      "variables": [
        "CSS Custom Properties (Variables)",
        "Declaring Variables (:root selector)",
        "Using Variables (var() function)",
        "Fallback Values",
        "Theming with CSS Variables"
      ],
      "pseudo_classes_elements": [
        "Link Pseudo-classes (:link, :visited, :hover, :active)",
        "Form Pseudo-classes (:focus, :checked, :disabled, :required)",
        "Structural Pseudo-classes (:first-child, :last-child, :nth-child)",
        "Pseudo-elements (::before, ::after, ::first-letter, ::first-line)",
        "Creating Tooltips with Pseudo-elements"
      ]
    },
    "phase_9_forms_styling_accessibility": {
      "form_styling": [
        "Styling Input Fields",
        "Custom Checkboxes and Radio Buttons",
        "Styling Select Dropdowns",
        "Form Validation Styling (:valid, :invalid)",
        "Creating Custom Form Controls"
      ],
      "accessibility": [
        "What is Web Accessibility?",
        "Semantic HTML for Accessibility",
        "ARIA Roles and Attributes",
        "Keyboard Navigation",
        "Screen Reader Considerations",
        "Color Contrast and Visual Accessibility",
        "Focus Management"
      ]
    },
    "phase_10_css_methodologies_preprocessors": {
      "css_methodologies": [
        "BEM (Block Element Modifier)",
        "OOCSS (Object-Oriented CSS)",
        "SMACSS (Scalable and Modular Architecture for CSS)",
        "Utility-First CSS (Tailwind CSS approach)"
      ],
      "css_preprocessors": {
        "sass_scss": [
          "What is Sass/SCSS?",
          "Variables in Sass",
          "Nesting",
          "Mixins",
          "Functions",
          "Partial Files and @import/@use",
          "Compilation to CSS"
        ],
        "less": [
          "LESS Basics",
          "Variables and Mixins",
          "Comparison with Sass"
        ]
      },
      "css_frameworks": [
        "When to Use CSS Frameworks",
        "Bootstrap Fundamentals",
        "Tailwind CSS Approach",
        "Foundation, Bulma, etc."
      ]
    },
    "phase_11_performance_optimization": {
      "css_performance": [
        "CSS Specificity and Performance",
        "Minifying CSS",
        "Critical CSS (Above-the-fold)",
        "CSS Delivery Optimization",
        "Reducing Render-blocking CSS"
      ],
      "image_optimization": [
        "Image Compression Tools",
        "Choosing the Right Image Format",
        "Lazy Loading Images",
        "Responsive Images Implementation"
      ]
    },
    "phase_12_cross_browser_compatibility": {
      "browser_support": [
        "Browser Market Share",
        "Vendor Prefixes (-webkit-, -moz-, -ms-, -o-)",
        "Feature Detection (@supports rule)",
        "CSS Reset vs Normalize.css",
        "Progressive Enhancement"
      ],
      "testing": [
        "Cross-browser Testing Tools",
        "BrowserStack and Similar Services",
        "Mobile Device Testing",
        "Browser Developer Tools for Testing"
      ]
    },
    "phase_13_project_patterns": {
      "common_components": [
        "Navigation Bars (Horizontal, Vertical, Responsive)",
        "Hero Sections",
        "Card Components",
        "Modals and Popups",
        "Accordions",
        "Tabs",
        "Carousels/Sliders",
        "Footers",
        "Breadcrumbs",
        "Pagination"
      ],
      "layout_patterns": [
        "Holy Grail Layout",
        "Sidebar Layouts",
        "Card Grid Layouts",
        "Split-screen Layouts",
        "Full-screen Layouts",
        "Asymmetrical Layouts"
      ]
    },
    "phase_14_tools_workflow": {
      "development_tools": [
        "Browser Developer Tools Deep Dive",
        "CSS Validators",
        "Color Palette Tools",
        "Typography Tools",
        "Design Handoff Tools (Figma, Sketch, Adobe XD)"
      ],
      "version_control": [
        "Git Basics for HTML/CSS Projects",
        ".gitignore for Web Projects",
        "Collaboration Workflow"
      ],
      "build_tools": [
        "npm Basics for Frontend",
        "PostCSS and Autoprefixer",
        "Bundlers (Webpack, Parcel) for CSS"
      ]
    },
    "phase_15_practical_projects": {
      "beginner_projects": [
        "Personal Portfolio Website",
        "Restaurant Menu Page",
        "Product Landing Page",
        "Blog Template",
        "Resume/CV Webpage"
      ],
      "intermediate_projects": [
        "E-commerce Product Page",
        "Dashboard Interface",
        "Social Media Profile Page",
        "Hotel Booking Form",
        "Event Registration Page"
      ],
      "advanced_projects": [
        "Full Responsive Website with Multiple Pages",
        "CSS-Only Interactive Games",
        "Admin Dashboard with Complex Grids",
        "CSS Art Challenge",
        "Framework-free Component Library"
      ]
    },
    "phase_16_modern_features": {
      "css_features": [
        "CSS Custom Properties (Advanced Theming)",
        "CSS Grid Subgrid",
        "Container Queries",
        "CSS Nesting (Native)",
        "CSS Scroll Snap",
        "CSS Logical Properties (for RTL support)",
        "CSS Houdini (Experimental)"
      ],
      "html_features": [
        "HTML5 APIs Overview",
        "Web Components Basics",
        "Progressive Web App Features"
      ]
    }
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const formatTitle = (key) => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const seed = async () => {
  await connectDB();

  try {
    const roadmap = htmlCssData.HTML_CSS_Integrated_Roadmap;
    
    // 1. Create Main Topic
    let topic = await Topic.findOne({ slug: 'html-css-combined' });
    if (!topic) {
      topic = await Topic.create({
        name: 'HTML & CSS Combined',
        slug: 'html-css-combined',
        description: 'A comprehensive roadmap for mastering modern web design with HTML5 and CSS3.',
        icon: '🎨',
        color: 'from-orange-500 to-blue-500',
        order: 1 // High priority
      });
      console.log('✅ Created Topic: HTML & CSS Combined');
    } else {
      console.log('ℹ️  Topic already exists: HTML & CSS Combined');
    }

    // 2. Iterate Phases (Categories)
    let categoryOrder = 1;

    for (const [phaseKey, phaseContent] of Object.entries(roadmap)) {
      const categorySlug = slugify(phaseKey, { lower: true, strict: true });
      const categoryTitle = formatTitle(phaseKey);

      let category = await Category.findOne({ slug: categorySlug, topicId: topic._id });
      if (!category) {
        category = await Category.create({
          topicId: topic._id,
          name: categoryTitle,
          slug: categorySlug,
          description: `Mastering ${categoryTitle}`,
          order: categoryOrder++
        });
        console.log(`  ✅ Created Category: ${categoryTitle}`);
      } else {
        console.log(`  ℹ️  Category exists: ${categoryTitle}`);
      }

      // 3. Iterate Groups/Items (Sections)
      let sectionOrder = 1;

      for (const [groupKey, items] of Object.entries(phaseContent)) {
        // Check if items is an array or object (nested)
        if (Array.isArray(items)) {
          // Regular list of sections
           for (const itemTitle of items) {
             const sectionSlug = slugify(itemTitle, { lower: true, strict: true });
             
             // Create Section
             const exists = await Section.findOne({ slug: sectionSlug, topicId: topic._id });
             if (!exists) {
               await Section.create({
                 topicId: topic._id,
                 categoryId: category._id,
                 title: itemTitle,
                 slug: sectionSlug,
                 description: `Learn about ${itemTitle}`,
                 content: `# ${itemTitle}\n\nThis content is being generated by AI...`, // Placeholder, regular AI flow will fill this on demand if empty
                 order: sectionOrder++,
                 difficulty: 'beginner',
                 estimatedMinutes: 15
               });
               // console.log(`    Created Section: ${itemTitle}`);
             }
           }
        } else if (typeof items === 'object') {
          // Nested object (e.g. flexbox -> flex_container -> [...])
          // Flatten: Group Key becomes prefix? Or just add all as sections?
          // Strategy: Treat sub-keys as grouping but make items sections.
          
          for (const [subKey, subItems] of Object.entries(items)) {
             if (Array.isArray(subItems)) {
                for (const subItemTitle of subItems) {
                   const sectionSlug = slugify(`${groupKey}-${subItemTitle}`, { lower: true, strict: true });
                   const fullTitle = `${formatTitle(groupKey)}: ${subItemTitle}`; // "Flexbox: display: flex"
                   
                   const exists = await Section.findOne({ slug: sectionSlug, topicId: topic._id });
                    if (!exists) {
                      await Section.create({
                        topicId: topic._id,
                        categoryId: category._id,
                        title: fullTitle, // More descriptive title for nested items
                        slug: sectionSlug,
                        description: `Learn about ${fullTitle}`,
                        content: `# ${fullTitle}\n\nThis content is being generated by AI...`,
                        order: sectionOrder++,
                        difficulty: 'intermediate',
                        estimatedMinutes: 20
                      });
                    }
                }
             }
          }
        }
      }
      console.log(`    ✅ Processed ${sectionOrder - 1} sections for ${categoryTitle}`);
    }

    console.log('\n🎉 Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
};

seed();
