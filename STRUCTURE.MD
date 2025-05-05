/wp-ospb/
│
├── gml-builder.php # Main plugin bootstrap file
├── uninstall.php # Cleanup on uninstall
├── README.md
├── .gitignore
├── package.json # JS dependencies (React, WP Scripts, Tailwind)
├── tailwind.config.js
├── postcss.config.js
│
├── /admin/ # React app for builder UI (uses WP Scripts)
│ ├── index.js # Entry point for builder
│ ├── App.jsx # React root component
│ ├── components/ # Builder components (e.g., Block, Sidebar, Toolbar)
│ ├── utils/
│ └── styles/ # Tailwind CSS and global styles
│
├── /includes/
│ ├── class-gml-builder.php # Core builder logic
│ ├── class-gml-renderer.php # PHP rendering for frontend
│ ├── class-gml-api.php # REST endpoints for saving/loading layouts
│ ├── class-gml-integrations.php # Compatibility with plugins (WooCommerce, etc.)
│ └── functions.php # Helper functions
│
├── /templates/ # PHP templates for rendering saved layouts
│ ├── block.php
│ └── layout.php
│
├── /assets/
│ ├── /js/
│ ├── /css/
│ └── /icons/
│
├── /languages/ # .pot/.po/.mo files for translation
│
└── /docker/ (optional)
├── docker-compose.yml # Local WP setup (optional for contributors)
└── wp.env # Environment variables
