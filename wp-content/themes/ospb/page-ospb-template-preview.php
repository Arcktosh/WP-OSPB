<?php

/**
 * Template Name: GML Template Preview
 */
get_header(); ?>

<div id="gml-template-preview-root" class="max-w-4xl mx-auto p-8"></div>

<script type="module">
	import {
		createElement
	} from "https://unpkg.com/react@18/umd/react.development.js";
	import {
		createRoot
	} from "https://unpkg.com/react-dom@18/umd/react-dom.development.js";

	const params = new URLSearchParams(window.location.search);
	const id = params.get('id');

	fetch(`/wp-json/gml-builder/v1/template/${id}`)
		.then(res => res.json())
		.then(data => {
			const layout = data.layout || [];

			const Block = ({
				type,
				value
			}) => {
				switch (type) {
					case 'text':
						return createElement('div', {
							className: "mb-4 text-lg"
						}, value);
					default:
						return null;
				}
			};

			const elements = layout.map((block, idx) =>
				createElement(Block, {
					key: idx,
					...block
				})
			);

			const root = createRoot(document.getElementById("gml-template-preview-root"));
			root.render(createElement('div', {}, elements));
		});

	const useButton = document.createElement("button");
	useButton.innerText = "Use This Template";
	useButton.className = "bg-blue-600 text-white px-4 py-2 mt-6 rounded";
	useButton.onclick = () => {
		localStorage.setItem("GML_TEMPLATE_TO_INSERT", JSON.stringify(data.layout));
		window.location.href = "/wp-admin/admin.php?page=gml-builder"; // or builder for a specific post
	};

	document.getElementById("gml-template-preview-root").appendChild(useButton);
</script>

<?php get_footer(); ?>