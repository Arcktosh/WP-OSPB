import { useState } from 'react'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast' // optional notification
import { saveCustomTemplate, syncTemplateToCloud } from '../utils/templates'

export default function SaveTemplateDialog({ layout }) {
	const [name, setName] = useState('')
	const [preview, setPreview] = useState('')

	async function handleSave() {
		if (!name.trim()) return

		const previewElement = document.getElementById('gml-layout-preview')
		let preview = ''

		if (previewElement) {
			const canvas = await html2canvas(previewElement, {
				backgroundColor: '#fff',
				scale: 0.5
			})
			preview = canvas.toDataURL('image/png')
		}

		await saveCustomTemplate(name, layout, preview)
		toast({ title: 'Template saved!' })
		setName('')
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Save as Template</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Save Custom Template</DialogHeader>
				<div className='space-y-4'>
					{/* <Input
						type='file'
						accept='image/*'
						onChange={(e) => {
							const file = e.target.files[0]
							if (!file) return
							const reader = new FileReader()
							reader.onload = () => setManualPreview(reader.result)
							reader.readAsDataURL(file)
						}}
					/> */}
					<Input
						type='file'
						accept='image/*'
						onChange={(e) => {
							const file = e.target.files[0]
							if (!file) return
							const reader = new FileReader()
							reader.onload = () => setPreview(reader.result)
							reader.readAsDataURL(file)
						}}
					/>
					<Button onClick={handleSave}>Save</Button>
				</div>
			</DialogContent>
			<Button
				variant='secondary'
				onClick={async () => {
					try {
						await syncTemplateToCloud({
							...template,
							author: 'Your Agency Name'
						})
						toast({ title: 'Synced to GML cloud!' })
					} catch {
						toast({ title: 'Failed to sync', variant: 'destructive' })
					}
				}}
			>
				Sync to GML Cloud
			</Button>
		</Dialog>
	)
}
