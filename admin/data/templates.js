import { nanoid } from 'nanoid'

export const templates = [
	{
		name: 'Hero Section',
		layout: [
			{
				id: nanoid(),
				type: 'text',
				value: 'Welcome to our agency',
				styles: { padding: 'p-6', backgroundColor: '#fef3c7' }
			}
		]
	},
	{
		name: 'Intro + CTA',
		layout: [
			{
				id: nanoid(),
				type: 'text',
				value: 'Let’s grow your brand.',
				styles: { padding: 'p-4', backgroundColor: '#e0f2fe' }
			},
			{
				id: nanoid(),
				type: 'text',
				value: 'Contact us today to get started.',
				styles: { padding: 'p-2' }
			}
		]
	}
]
