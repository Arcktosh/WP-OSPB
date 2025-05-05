<?php

/**
 * Plugin Name: GML Builder
 * Description: A modern, AI-enhanced visual page builder for agencies using WordPress.
 * Version: 1.0.0
 * Author: Ben Henning
 * Text Domain: gml-builder
 */

defined('ABSPATH') || exit;

// Define constants
define('GML_BUILDER_VERSION', '1.0.0');
define('GML_BUILDER_PATH', plugin_dir_path(__FILE__));
define('GML_BUILDER_URL', plugin_dir_url(__FILE__));

// Load core files
require_once GML_BUILDER_PATH . 'includes/class-gml-builder.php';
require_once GML_BUILDER_PATH . 'includes/class-gml-api.php';
require_once GML_BUILDER_PATH . 'includes/class-gml-renderer.php';
require_once GML_BUILDER_PATH . 'includes/class-gml-integrations.php';
require_once GML_BUILDER_PATH . 'includes/functions.php';

// Initialize plugin
add_action('plugins_loaded', function () {
	GML_Builder::init();
	GML_Builder_API::init();
	GML_Builder_Renderer::init();
	GML_Builder_Integrations::init();
});
