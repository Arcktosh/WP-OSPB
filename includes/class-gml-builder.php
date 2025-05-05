<?php
// File: includes/class-gml-builder.php

defined('ABSPATH') || exit;

class GML_Builder
{
	public static function init()
	{
		add_action('admin_enqueue_scripts', [__CLASS__, 'enqueue_admin_assets']);
		add_action('admin_menu', [__CLASS__, 'register_builder_menu']);
	}

	public static function enqueue_admin_assets($hook)
	{
		// Load assets only on our builder page
		if ($hook !== 'toplevel_page_gml-builder') return;

		// Enqueue built React app (replace with actual build output)
		wp_enqueue_script(
			'gml-builder-app',
			GML_BUILDER_URL . 'assets/js/builder.js',
			['wp-element', 'wp-i18n', 'wp-api-fetch'],
			GML_BUILDER_VERSION,
			true
		);

		wp_enqueue_style(
			'gml-builder-style',
			GML_BUILDER_URL . 'assets/css/builder.css',
			[],
			GML_BUILDER_VERSION
		);

		wp_localize_script('gml-builder-app', 'GML_BUILDER_DATA', [
			'root'     => esc_url_raw(rest_url()),
			'nonce'    => wp_create_nonce('wp_rest'),
			'assets'   => GML_BUILDER_URL . 'assets/',
			'version'  => GML_BUILDER_VERSION
		]);
	}

	public static function register_builder_menu()
	{
		add_menu_page(
			__('GML Builder', 'gml-builder'),
			__('GML Builder', 'gml-builder'),
			'edit_posts',
			'gml-builder',
			[__CLASS__, 'render_builder_app'],
			'dashicons-layout',
			56
		);
	}

	public static function render_builder_app()
	{
		echo '<div id="gml-builder-root"></div>';
	}
}
