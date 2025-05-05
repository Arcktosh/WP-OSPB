<?php

defined('ABSPATH') || exit;

class GML_Builder_API
{
	// 	register_rest_route('gml-builder/v1', '/template/(?P<id>[a-zA-Z0-9_-]+)', [
	//     'methods'             => 'GET',
	//     'callback'            => [__CLASS__, 'get_single_template'],
	//     'permission_callback' => '__return_true',
	// ]);

	public static function init()
	{
		add_action('rest_api_init', [__CLASS__, 'register_routes']);
	}

	public static function register_routes()
	{
		register_rest_route('gml-builder/v1', '/templates', [
			'methods'             => ['GET', 'POST'],
			'callback'            => [__CLASS__, 'handle_templates'],
			'permission_callback' => function () {
				return current_user_can('edit_theme_options');
			}
		]);
	}

	public static function handle_layout($request)
	{
		$post_id = (int) $request['id'];

		if ('POST' === $request->get_method()) {
			$data = $request->get_json_params();
			update_post_meta($post_id, '_gml_layout', wp_json_encode($data));
			return rest_ensure_response(['status' => 'saved']);
		}

		$layout = get_post_meta($post_id, '_gml_layout', true);
		return rest_ensure_response(json_decode($layout ?: '[]', true));
	}

	public static function handle_templates($request)
	{
		$option_key = 'gml_custom_templates';

		if ('POST' === $request->get_method()) {
			$templates = $request->get_json_params();
			update_option($option_key, $templates);
			return rest_ensure_response(['status' => 'saved']);
		}

		$stored = get_option($option_key, []);
		return rest_ensure_response($stored);
	}

	public static function get_single_template($request)
	{
		$templates = get_option('gml_custom_templates', []);
		$tpl = array_filter($templates, fn($t) => $t['id'] === $request['id']);
		return rest_ensure_response(array_values($tpl)[0] ?? []);
	}
}
