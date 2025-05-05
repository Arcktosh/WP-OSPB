import { exportTemplates, importTemplatesFromFile } from '../utils/templates'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function TemplateImportExport({ onRefresh }) {
	const handleImport = async (e) => {
		const file = e.target.files[0]
		if (file) {
			await importTemplatesFromFile(file)
			onRefresh?.()
		}
	}

	return (
		<div className='flex items-center gap-4 mt-2'>
			<Button
				variant='outline'
				onClick={exportTemplates}
			>
				Export Templates
			</Button>
			<Input
				type='file'
				accept='.json'
				onChange={handleImport}
			/>
		</div>
	)
}
