export async function saveLayout(postId, layout) {
	return fetch(`${GML_BUILDER_DATA.root}gml-builder/v1/layout/${postId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': GML_BUILDER_DATA.nonce
		},
		body: JSON.stringify(layout)
	}).then((res) => res.json())
}
