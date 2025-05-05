import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function ModeToggle({ preview, setPreview }) {
	return (
		<div className='flex items-center space-x-2'>
			<Switch
				checked={preview}
				onCheckedChange={setPreview}
			/>
			<Label>{preview ? 'Preview Mode' : 'Edit Mode'}</Label>
		</div>
	)
}
