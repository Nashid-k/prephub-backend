const htmlCssCurriculum = {

  "01_web_and_browser_foundations": {
    "web_architecture": [
      "Client-Server Architecture Deep Dive",
      "HTTP/1.1 vs HTTP/2 vs HTTP/3 Semantics",
      "Role of DNS (Domain Name System)",
      "Anatomy of a URL/URI"
    ],
    "browser_engine_internals": [
      "The Browser Rendering Pipeline (Parsing, Style, Layout, Paint, Composite)",
      "Chrome DevTools Deep Dive (Elements, Console, Network, Performance)"
    ]
  },

  "02_html_document_and_semantics": {
    "document_structure": [
      "The DOCTYPE Declaration and Quirks Mode",
      "The <html>, <head>, and <body> Tags",
      "Character Sets (UTF-8)",
      "Viewports and Mobile scaling",
      "Favicons and Manifest Files"
    ],
    "metadata_and_seo": [
      "Meta Tags for SEO (Description, Keywords, Robots)",
      "Open Graph Protocol (OGP) Tags (Facebook, Twitter Cards)"
    ],
    "semantic_layout_elements": [
      "Semantic vs Non-Semantic Elements",
      "Structuring Content with <header>, <nav>, <main>, <footer>",
      "Sectioning with <article> vs <section> vs <div>",
      "Aside and Supplemental Content (<aside>)",
      "Figure and Figcaption",
      "Time and Address Elements (<time>, <address>)",
      "When to use <hgroup> and Heading Hierarchy"
    ],
    "text_level_semantics": [
      "Importance of Heading Levels (h1-h6)",
      "Paragraphs and Line Breaks (<p>, <br>, <hr>)",
      "Lists: Ordered (<ol>), Unordered (<ul>), Description Lists (<dl>)",
      "Inline Semantics: <strong> vs <b>, <em> vs <i>",
      "Quotations: <blockquote>, <q>, <cite>",
      "Preformatted Text and Code (<pre>, <code>, <kbd>, <samp>, <var>)",
      "Subscript and Superscript (<sub>, <sup>)",
      "Marking Text (<mark>, <ins>, <del>)"
    ]
  },

  "03_forms_and_user_input": {
    "form_structure": [
      "The <form> Element (action, method, enctype)",
      "Labeling Controls (<label>, for attribute)",
      "Grouping Controls (<fieldset>, <legend>)",
      "Button Types (submit, reset, button)",
      "GET vs POST Methods in Forms",
      "Autofocus and Tabindex"
    ],
    "input_controls": [
      "Text Inputs (text, password, email, search, tel, url)",
      "Numeric Inputs (number, range)",
      "Date and Time Inputs (date, time, datetime-local, month, week)",
      "Choosers (color, file)",
      "Checkboxes vs Radio Buttons",
      "The 'name' and 'value' Attributes",
      "Placeholder vs Value",
      "Readonly vs Disabled"
    ],
    "validation_and_accessibility": [
      "HTML5 Built-in Validation (required, pattern, min, max, minlength, maxlength)",
      "Regular Expressions in 'pattern' attribute",
      "Custom Validation Messages (setCustomValidity)",
      "Autocomplete Attribute for UX and Security",
      "Datalists for Suggestions (<datalist>)",
      "Accessible Forms (aria-required, aria-invalid)"
    ]
  },

  "04_css_language_foundations": {
    "selectors_and_cascade": [
      "Universal (*), Type, Class (.), ID (#) Selectors",
      "Descendant vs Child (>) Selectors",
      "Sibling Selectors (+, ~)",
      "Attribute Selectors ([attr], [attr=val], [attr^=val], etc.)",
      "Pseudo-classes (Hover, Focus, Active, Visited, Checked)",
      "Structural Pseudo-classes (nth-child, first-of-type, etc.)",
      "Pseudo-elements (::before, ::after, ::placeholder)",
      "The Cascade Algorithm (Origin, Specificity, Order)",
      "Calculating Specificity Scores",
      "!important usage and pitfalls",
      "Inheritance (inherit, initial, unset, revert)"
    ],
    "box_model_and_display": [
      "Content, Padding, Border, Margin",
      "Box Sizing: content-box vs border-box",
      "Margin Collapse Phenomena",
      "Display Property (block, inline, inline-block, none)",
      "Width, Height, Max/Min constraints",
      "Box Shadows and Border Radius",
      "Outlines vs Borders"
    ],
    "colors_and_backgrounds": [
      "Color formats: Hex, RGB, RGBA, HSL, HSLA, Keywords",
      "Modern Colors: OKLCH, Display-P3",
      "Opacity vs Alpha Channels",
      "Background Images (url, repeating)",
      "Background Positioning, Sizing (cover, contain), and Attachment",
      "Gradients (Linear, Radial, Conic)",
      "Multiple Backgrounds"
    ]
  },

  "05_layout_systems": {
    "flexbox_mastery": [
      "Flex Container vs Flex Items",
      "Flex Direction (row, column, reverse)",
      "Wrapping (wrap, nowrap)",
      "Justify Content (Main Axis Alignment)",
      "Align Items (Cross Axis Alignment)",
      "Align Content (Multi-line Alignment)",
      "Flex Grow, Flex Shrink, Flex Basis",
      "The 'flex' Shorthand",
      "Ordering Items (order property)",
      "Gap in Flexbox",
      "Common Flexbox Patterns (Navbar, Centering)"
    ],
    "grid_mastery": [
      "Grid Container vs Grid Items",
      "Grid Template Columns and Rows",
      "The 'fr' Unit",
      "Grid Lines, Areas, and Naming",
      "Grid Gap (gap, row-gap, column-gap)",
      "Justify and Align in Grid",
      "Implicit vs Explicit Grids",
      "Auto-fill vs Auto-fit Repetition Patterns",
      "Minmax() Function",
      "Spanning Columns and Rows",
      "Subgrid (Modern Feature)"
    ],
    "positioning_and_legacy": [
      "Position Static (Default)",
      "Position Relative (Layout Context)",
      "Position Absolute (Removed from Flow)",
      "Position Fixed (Viewport Relative)",
      "Position Sticky (Scroll/Threshold)",
      "Z-Index and Stacking Contexts",
      "Floats (left, right) and Converting Layouts",
      "Clearfix Hacks and Flow Root (display: flow-root)"
    ]
  },

  "06_responsive_and_adaptive_design": {
    "media_queries": [
      "The Viewport Meta Tag",
      "Media Query Syntax (@media screen and ...)",
      "Breakpoints Best Practices (Mobile First vs Desktop First)",
      "Logical Operators in Media Queries (and, or, not)",
      "Orientation and Aspect Ratio Queries",
      "Reduced Motion API (prefers-reduced-motion)",
      "Dark Mode Support (prefers-color-scheme)",
      "Print Stylesheets"
    ],
    "modern_responsive_techniques": [
      "Relative Units: em vs rem",
      "Viewport Units: vw, vh, vmin, vmax",
      "Dynamic Viewport Units: dvh, lvh, svh",
      "Fluid Typography (clamp, min, max)",
      "Container Queries (@container)",
      "Aspect Ratio Property"
    ]
  },

  "07_media_graphics_and_web_apis": {
    "images_and_graphics": [
      "Image Formats (JPG, PNG, GIF, SVG, WebP, AVIF)",
      "The <img> Tag (src, alt, width, height)",
      "Responsive Images with 'srcset' and 'sizes'",
      "Art Direction with <picture> and <source>",
      "SVG: Scalable Vector Graphics (Inline vs External)",
      "Image Lazy Loading (loading='lazy')"
    ],
    "audio_video_and_iframes": [
      "The <audio> Element and Codecs",
      "The <video> Element (poster, controls, autoplay)",
      "Multiple Sources for Fallback (<source>)",
      "Track Element for Captions/Subtitles (<track>)",
      "Embedding Content with <iframe>",
      "Security Considerations for Iframes (sandbox)"
    ],
    "web_platform_apis": [
      "Geolocation API Usage",
      "Drag and Drop API Basics",
      "Web Storage API (localStorage, sessionStorage)",
      "Canvas API for 2D Graphics",
      "Dialog Element and Native Modals"
    ]
  },

  "08_advanced_css_and_visual_effects": {
    "typography": [
      "Font Families and Stacks",
      "Web Fonts (@font-face, Google Fonts)",
      "Variable Fonts",
      "Font Weight, Style, Variant",
      "Line Height and Vertical Rhythm",
      "Text Shadow and Effects",
      "Truncating Text (text-overflow, line-clamp)",
      "Writing Modes (vertical-rl)"
    ],
    "transforms_and_animation": [
      "2D Transforms (translate, rotate, scale, skew)",
      "3D Transforms (perspective, rotate3d)",
      "CSS Transitions",
      "Bezier Curves and Easing Functions",
      "Keyframes (@keyframes)",
      "Animation Fill Mode",
      "Step Animations (steps())"
    ],
    "filters_and_composition": [
      "CSS Filters (blur, grayscale, brightness)",
      "Backdrop Filters (glassmorphism)",
      "Mix Blend Modes",
      "Clip-path and Masking"
    ]
  },

  "09_css_architecture_and_scalability": {
    "css_variables_and_theming": [
      "Custom Properties (--variable-name)",
      "Using var() with Fallbacks",
      "Theming (Dark/Light Mode)",
      "calc() with CSS Variables",
      "JS Interaction with CSS Variables"
    ],
    "css_methodologies": [
      "BEM (Block Element Modifier)",
      "OOCSS",
      "SMACSS",
      "Utility-First CSS",
      "Atomic CSS"
    ],
    "preprocessors": [
      "Sass/SCSS Basics",
      "Nesting",
      "Mixins",
      "Extends",
      "Maps and Loops"
    ]
  },

  "10_accessibility_and_quality": {
    "a11y_fundamentals": [
      "WCAG Principles",
      "Focus Management",
      "Landmark Roles",
      "Contrast Ratios",
      "Skip Navigation Links"
    ],
    "aria": [
      "ARIA Roles",
      "ARIA States",
      "ARIA Live Regions",
      "When NOT to use ARIA"
    ]
  },

  "11_real_world_projects": {
    "beginner_projects": [
      "Personal Resume/CV Page",
      "Product Landing Page",
      "Documentation Page"
    ],
    "intermediate_projects": [
      "Responsive Image Gallery",
      "Pricing Cards",
      "Parallax Website"
    ],
    "advanced_projects": [
      "Dashboard Layout",
      "Multi-step Form",
      "3D Product Card",
      "Theme Switcher"
    ],
    "expert_projects": [
      "CSS Art",
      "Animated SVG Loader",
      "Netflix/YouTube Clone",
      "Accessible Modal Dialog"
    ]
  }

};


export { htmlCssCurriculum };
