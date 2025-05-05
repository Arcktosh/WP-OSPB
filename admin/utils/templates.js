import { nanoid } from 'nanoid'
const API_URL = `${GML_BUILDER_DATA.root}gml-builder/v1/templates`
const SHARED_CACHE_KEY = 'GML_SHARED_TEMPLATES'
const UPLOAD_URL = 'https://gml-builder.io/api/templates/upload'
const GML_API_KEY = 'your-api-key' // (Optional: fetch this from WP options)

export async function getCustomTemplates() {
	const res = await fetch(API_URL, {
		headers: { 'X-WP-Nonce': GML_BUILDER_DATA.nonce }
	})
	return res.json()
}

export async function saveCustomTemplate(name, layout, preview) {
	const templates = await getCustomTemplates()
	const existing = templates.find((t) => t.name === name)

	if (existing) {
		Object.assign(existing, {
			layout,
			version: (existing.version || 1) + 1,
			updatedAt: new Date().toISOString(),
			preview
		})
	} else {
		templates.push({
			id: nanoid(),
			name,
			layout,
			preview,
			version: 1,
			createdAt: new Date().toISOString()
		})
	}

	await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': GML_BUILDER_DATA.nonce
		},
		body: JSON.stringify(templates)
	})
}

export async function deleteCustomTemplate(id) {
	const templates = await getCustomTemplates()
	const updated = templates.filter((tpl) => tpl.id !== id)

	await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': GML_BUILDER_DATA.nonce
		},
		body: JSON.stringify(updated)
	})
}

export async function exportTemplates() {
	const templates = await getCustomTemplates()
	const blob = new Blob([JSON.stringify(templates, null, 2)], {
		type: 'application/json'
	})
	const url = URL.createObjectURL(blob)

	const a = document.createElement('a')
	a.href = url
	a.download = 'gml-templates.json'
	a.click()

	URL.revokeObjectURL(url)
}

export async function importTemplatesFromFile(file) {
	const text = await file.text()
	const imported = JSON.parse(text)

	// Optional: merge by ID or name
	const existing = await getCustomTemplates()
	const merged = [...existing]

	imported.forEach((tpl) => {
		const exists = merged.find((t) => t.id === tpl.id || t.name === tpl.name)
		if (!exists) {
			merged.push(tpl)
		}
	})

	await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-WP-Nonce': GML_BUILDER_DATA.nonce
		},
		body: JSON.stringify(merged)
	})
}

export async function fetchSharedTemplates(force = false) {
	if (!force) {
		const cached = localStorage.getItem(SHARED_CACHE_KEY)
		if (cached) return JSON.parse(cached)
	}

	const res = await fetch('https://gml-builder.io/templates.json')
	const data = await res.json()
	localStorage.setItem(SHARED_CACHE_KEY, JSON.stringify(data))
	return data
}
export async function syncTemplateToCloud(template) {
	const res = await fetch(UPLOAD_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${GML_API_KEY}`
		},
		body: JSON.stringify(template)
	})

	if (!res.ok) throw new Error('Upload failed')
	return res.json()
}
