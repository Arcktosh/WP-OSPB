// File: admin/index.js

import { render } from '@wordpress/element'
import App from './App'

// Entry point for React app
document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('gml-builder-root')
	if (root) {
		render(<App />, root)
	}
})
