import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader
} from '@/components/ui/dialog'
import { templates } from '../data/templates'
import {
	deleteCustomTemplate,
	fetchSharedTemplates,
	getCustomTemplates
} from '../utils/templates'
import TemplateImportExport from './TemplateImportExport'

export default function TemplateLibrary({ onInsert }) {
	const [customTemplates, setCustomTemplates] = useState(getCustomTemplates())
	const [sharedTemplates, setSharedTemplates] = useState([])
	const [templates, setTemplates] = useState(customTemplates)
	const [search, setSearch] = useState('')
	const [category, setCategory] = useState('All')

	useEffect(() => {
		getCustomTemplates().then(setCustomTemplates)
		fetchSharedTemplates().then(setSharedTemplates)
	}, [])

	const filteredTemplates = sharedTemplates.filter((tpl) => {
		const matchSearch =
			tpl.name.toLowerCase().includes(search.toLowerCase()) ||
			(tpl.keywords || []).some((k) => k.includes(search.toLowerCase()))
		const matchCategory = category === 'All' || tpl.category === category
		return matchSearch && matchCategory
	})

	const categories = [
		'All',
		...new Set(sharedTemplates.map((tpl) => tpl.category || 'Uncategorized'))
	]

	return (
		<>
			<a
				href={`/gml-template-preview/?id=${tpl.id}`}
				target='_blank'
				rel='noopener noreferrer'
				className='underline text-sm text-blue-600'
			>
				Preview
			</a>
			<Input
				placeholder='Search templates'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className='border p-1 rounded'
			>
				{categories.map((c) => (
					<option
						key={c}
						value={c}
					>
						{c}
					</option>
				))}
			</select>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline'>+ Templates</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>Select a Template</DialogHeader>
					<div className='grid gap-4 py-4'>
						{templates.map((tpl, idx) => (
							<Button
								key={idx}
								variant='secondary'
								onClick={() => onInsert(tpl.layout)}
							>
								<div
									key={tpl.id}
									className='flex gap-3 items-center bg-muted p-2 rounded cursor-pointer'
									onClick={() => onInsert(tpl.layout)}
								>
									{tpl.preview && (
										<img
											src={tpl.preview}
											alt={tpl.name}
											className='w-16 h-12 object-cover rounded'
										/>
									)}
									<div className='flex-1 font-medium'>{tpl.name}</div>
								</div>
							</Button>
						))}
						{customTemplates.map((tpl, idx) => (
							<Button
								key={tpl.id}
								variant='secondary'
								className='justify-between'
								onClick={() => onInsert(tpl.layout)}
							>
								<div
									key={tpl.id}
									className='flex gap-3 items-center bg-muted p-2 rounded cursor-pointer'
									onClick={() => onInsert(tpl.layout)}
								>
									{tpl.preview && (
										<img
											src={tpl.preview}
											alt={tpl.name}
											className='w-16 h-12 object-cover rounded'
										/>
									)}
									<div className='flex-1 font-medium'>{tpl.name}</div>
								</div>

								<Button
									size='icon'
									variant='ghost'
									onClick={(e) => {
										e.stopPropagation()
										deleteCustomTemplate(tpl.id).then(() =>
											getCustomTemplates().then(setTemplates)
										)
									}}
								>
									<Trash2 size={16} />
								</Button>
							</Button>
						))}
						<h3 className='text-lg font-semibold'>Shared Templates</h3>
						{sharedTemplates.map((tpl) => (
							<div
								key={tpl.id}
								className='flex gap-3 items-center bg-muted p-2 rounded cursor-pointer'
								onClick={() => onInsert(tpl.layout)}
							>
								{tpl.preview && (
									<img
										src={tpl.preview}
										alt={tpl.name}
										className='w-16 h-12 object-cover rounded'
									/>
								)}
								<div className='flex-1'>{tpl.name}</div>
							</div>
						))}
						<TemplateImportExport
							onRefresh={() => getCustomTemplates().then(setTemplates)}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
