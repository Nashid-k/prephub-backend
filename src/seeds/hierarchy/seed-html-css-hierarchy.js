const htmlCssCurriculum = {
  "HTML5_Core_Foundations": {
    "01_web_architecture": [
      "Client-Server Architecture Deep Dive",
      "HTTP/1.1 vs HTTP/2 vs HTTP/3 Semantics",
      "Role of DNS (Domain Name System)",
      "The Browser Rendering Pipeline (Parsing, Style, Layout, Paint, Composite)",
      "Chrome DevTools Deep Dive (Elements, Console, Network, Performance)",
      "Anatomy of a URL/URI"
    ],
    "02_html_document_structure": [
      "The DOCTYPE Declaration and Quirks Mode",
      "The <html>, <head>, and <body> Tags",
      "Meta Tags for SEO (Description, Keywords, Robots)",
      "Open Graph Protocol (OGP) Tags (Facebook, Twitter Cards)",
      "Favicons and Manifest Files",
      "Character Sets (UTF-8)",
      "Viewports and Mobile scaling"
    ],
    "03_semantic_elements": [
      "Semantic vs Non-Semantic Elements",
      "Structuring Content with <header>, <nav>, <main>, <footer>",
      "Sectioning with <article> vs <section> vs <div>",
      "Aside and Supplemental Content (<aside>)",
      "Time and Address Elements (<time>, <address>)",
      "Figure and Figcaption",
      "When to use <hgroup> and Heading Hierarchy"
    ],
    "04_text_content_semantics": [
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

  "Forms_and_Interaction": {
    "05_form_structure": [
      "The <form> Element (action, method, enctype)",
      "Labeling Controls (<label>, for attribute)",
      "Grouping Controls (<fieldset>, <legend>)",
      "Button Types (submit, reset, button)",
      "GET vs POST Methods in Forms",
      "Autofocus and Tabindex"
    ],
    "06_input_types_attributes": [
      "Text Inputs (text, password, email, search, tel, url)",
      "Numeric Inputs (number, range)",
      "Date and Time Inputs (date, time, datetime-local, month, week)",
      "Choosers (color, file)",
      "Checkboxes vs Radio Buttons",
      "The 'name' and 'value' Attributes",
      "Placeholder vs Value",
      "Readonly vs Disabled"
    ],
    "07_validation_ux": [
      "HTML5 Built-in Validation (required, pattern, min, max, minlength, maxlength)",
      "Regular Expressions in 'pattern' attribute",
      "Custom Validation Messages (setCustomValidity)",
      "Autocomplete Attribute for UX and Security",
      "Datalists for Suggestions (<datalist>)",
      "Accessible Forms (aria-required, aria-invalid)"
    ]
  },

  "Multimedia_and_APIs": {
    "08_images_graphics": [
      "Image Formats (JPG, PNG, GIF, SVG, WebP, AVIF)",
      "The <img> Tag (src, alt, width, height)",
      "Responsive Images with 'srcset' and 'sizes'",
      "Art Direction with <picture> and <source>",
      "SVG: Scalable Vector Graphics (Inline vs External)",
      "Figures and Captions",
      "Favicons and Touch Icons",
      "Image Lazy Loading (loading='lazy')"
    ],
    "09_audio_video": [
      "The <audio> Element and Codecs",
      "The <video> Element (poster, controls, autoplay)",
      "Multiple Sources for Fallback (<source>)",
      "Track Element for Captions/Subtitles (<track>)",
      "Embedding Content with <iframe>",
      "Security Considerations for Iframes (sandbox)"
    ],
    "10_web_apis_integration": [
      "Geolocation API Usage",
      "Drag and Drop API Basics",
      "Web Storage API (localStorage, sessionStorage)",
      "Canvas API for 2D Graphics",
      "Dialog Element and Native Modals"
    ]
  },

  "CSS_Core_Fundamentals": {
    "11_selectors_cascade": [
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
    "12_box_model_layout": [
      "Content, Padding, Border, Margin",
      "Box Sizing: content-box vs border-box",
      "Margin Collapse Phenomena",
      "Display Property (block, inline, inline-block, none)",
      "Width, Height, Max/Min constraints",
      "Box Shadows and Border Radius",
      "Outlines vs Borders"
    ],
    "13_colors_backgrounds": [
      "Color formats: Hex, RGB, RGBA, HSL, HSLA, Keywords",
      "Modern Colors: OKLCH, Display-P3",
      "Opacity vs Alpha Channels",
      "Background Images (url, repeating)",
      "Background Positioning, Sizing (cover, contain), and Attachment",
      "Gradients (Linear, Radial, Conic)",
      "Multiple Backgrounds"
    ]
  },

  "Modern_Layout_Systems": {
    "14_flexbox_mastery": [
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
    "15_css_grid_mastery": [
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
    "16_legacy_and_positioning": [
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

  "Responsive_Design": {
    "17_media_queries": [
      "The Viewport Meta Tag",
      "Media Query Syntax (@media screen and ...)",
      "Breakpoints Best Practices (Mobile First vs Desktop First)",
      "Logical Operators in Media Queries (and, or, not)",
      "Orientation and Aspect Ratio Queries",
      "Reduced Motion API (prefers-reduced-motion)",
      "Dark Mode Support (prefers-color-scheme)",
      "Print Stylesheets"
    ],
    "18_modern_responsive_techniques": [
      "Relative Units: em vs rem",
      "Viewport Units: vw, vh, vmin, vmax",
      "Dynamic Viewport Units: dvh, lvh, svh",
      "Fluid Typography (clamp, min, max)",
      "Container Queries (@container)",
      "Picture Element for Art Direction",
      "Aspect Ratio Property"
    ]
  },

  "Advanced_Styling": {
    "19_typography": [
      "Font Families and Stacks",
      "Web Fonts (@font-face, Google Fonts)",
      "Variable Fonts",
      "Font Weight, Style, Variant",
      "Text Transform and Decoration",
      "Letter Spacing and Word Spacing",
      "Line Height and Vertical Rhythm",
      "Text Shadow and Effects",
      "Truncating Text (text-overflow, line-clamp)",
      "Writing Modes (vertical-rl)"
    ],
    "20_transforms_transitions": [
      "2D Transforms (translate, rotate, scale, skew)",
      "3D Transforms (perspective, rotate3d)",
      "Transform Origin",
      "CSS Transitions (property, duration, timing-function, delay)",
      "Bezier Curves and Easing Functions",
      "Performance: Will-change and Hardware Acceleration"
    ],
    "21_keyframes_animations": [
      "Defining Keyframes (@keyframes)",
      "Animation Properties (name, duration, iteration, direction)",
      "Chaining Animations",
      "Animation Fill Mode",
      "Pausing and Resuming Animations",
      "Step Animations (steps())"
    ],
    "22_filters_blend_modes": [
      "CSS Filters (blur, grayscale, brightness, contrast, hue-rotate)",
      "Backdrop Filters (glassmorphism)",
      "Mix Blend Modes (multiply, screen, overlay)",
      "Background Blend Modes",
      "Clipping and Masking (clip-path, mask)"
    ]
  },

  "Architecture_and_Maintenance": {
    "23_css_variables": [
      "Custom Properties (--variable-name)",
      "Declaration Scope (Global :root vs Local)",
      "Using var() with Fallbacks",
      "Theming with Variables (Dark/Light Switch)",
      "Interacting with JS (getPropertyValue, setProperty)",
      "Calculations with calc()"
    ],
    "24_methodologies": [
      "BEM (Block Element Modifier) Naming Convention",
      "OOCSS (Object Oriented CSS)",
      "SMACSS (Scalable and Modular Architecture)",
      "Utility-First CSS (Tailwind Philosophy explained)",
      "Atomic CSS"
    ],
    "25_preprocessors": [
      "Sass/SCSS Basics",
      "Variables ($color)",
      "Nesting Rules (&)",
      "Partials and Imports (@use, @forward)",
      "Mixins and Include (@mixin, @include)",
      "Extends and Inheritance (@extend)",
      "Sass Maps and Loops"
    ]
  },

  "Accessibility_A11y": {
    "26_a11y_fundamentals": [
      "What is Web Accessibility (WCAG)",
      "The DOM Order vs Visual Order",
      "Focus Management and Outline",
      "Skip Navigation Links",
      "Landmark Roles (banner, main, contentinfo)",
      "Accessible Colors and Contrast Ratios"
    ],
    "27_aria_roles_attributes": [
      "ARIA Basics (Accessible Rich Internet Applications)",
      "ARIA Labels (aria-label, aria-labelledby)",
      "State Attributes (aria-expanded, aria-hidden, aria-checked)",
      "Live Regions (aria-live)",
      "When NOT to use ARIA (Native semantics first)"
    ]
  },

  "Practical_Projects": {
    "beginner_projects": [
      "Personal Resume/CV Page (Semantic HTML)",
      "Product Landing Page (Flexbox)",
      "Tribute Page (Basic Layout)",
      "Documentation Page (Navigation and Sections)"
    ],
    "intermediate_projects": [
      "Responsive Image Gallery (Grid)",
      "Pricing Card Component (Flexbox + Hover Effects)",
      "Parallax Scrolling Website",
      "Hamburger Menu with CSS Only"
    ],
    "advanced_projects": [
      "Complex Grid Dashboard (Grid Areas)",
      "Interactive Multi-step Form (Advanced CSS Selectors)",
      "3D Product Card (Transforms)",
      "Dark/Light Mode Theme Switcher (Variables + JS)"
    ],
    "expert_projects": [
      "CSS Art (Single Div)",
      "Animated SVG Loader",
      "Clone of Netflix/YouTube Layout",
      "Accessible Modal Dialog"
    ]
  }
};

export { htmlCssCurriculum };
