import { useState } from 'react'
import { nanoid } from 'nanoid'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove
} from '@dnd-kit/sortable'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { renderBlock } from './blocks'
import BlockInserter from './components/BlockInserter'
import BlockToolbar from './components/BlockToolbar'
import SortableItem from './components/SortableItem'
import TemplateLibrary from './components/TemplateLibrary'
import { saveLayout } from './utils/api'
import SaveTemplateDialog from './components/SaveTemplateDialog'

export default function App() {
	const [layout, setLayout] = useState([
		{ id: 'block-1', type: 'text', value: 'Welcome to GML Builder' }
	])
	const [globalStyles, setGlobalStyles] = useState({
		font: 'sans',
		primaryColor: '#0ea5e9'
	})
	const [selectedIndex, setSelectedIndex] = useState(null)
	const [previewMode, setPreviewMode] = useState(false)
	const postId = new URLSearchParams(window.location.search).get('post') || 1

	const insertBlock = (type) => {
		setLayout((prev) => [...prev, { id: nanoid(), type, value: '' }])
	}

	const updateBlock = (index, value) => {
		const updated = [...layout]
		updated[index].value = value
		setLayout(updated)
	}

	const insertTemplate = (tpl) => {
		const withIds = tpl.map((block) => ({ ...block, id: nanoid() }))
		setLayout((prev) => [...prev, ...withIds])
	}

	const handleSave = () => {
		// Save the layout and global styles to the server
		saveLayout(postId, { globalStyles, layout })
	}

	const handleDragEnd = (event) => {
		const { active, over } = event
		if (active.id !== over.id) {
			const oldIndex = layout.findIndex((b) => b.id === active.id)
			const newIndex = layout.findIndex((b) => b.id === over.id)
			setLayout(arrayMove(layout, oldIndex, newIndex))
		}
	}

	useEffect(() => {
		const insert = localStorage.getItem('GML_TEMPLATE_TO_INSERT')
		if (insert) {
			const parsed = JSON.parse(insert)
			const withIds = parsed.map((b) => ({ ...b, id: nanoid() }))
			setLayout((prev) => [...prev, ...withIds])
			localStorage.removeItem('GML_TEMPLATE_TO_INSERT')
			toast({ title: 'Template inserted successfully.' })
		}
	}, [])

	return (
		<div
			className={`p-4 space-y-6 max-w-3xl mx-auto font-${globalStyles.font}`}
			style={{ '--color-primary': globalStyles.primaryColor }}
		>
			<h1 className='text-2xl font-bold'>Page Builder</h1>
			<TemplateLibrary onInsert={insertTemplate} />
			<SaveTemplateDialog layout={layout} />
			<BlockInserter onInsert={insertBlock} />
			<div id='gml-layout-preview'>
				<DndContext
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={layout.map((b) => b.id)}
						strategy={verticalListSortingStrategy}
					>
						{layout.map((block, index) => (
							<SortableItem
								key={block.id}
								id={block.id}
								onClick={() => setSelectedIndex(index)}
							>
								<div className='border rounded p-2 bg-white shadow'>
									<BlockToolbar
										onDuplicate={() => {
											const newBlock = { ...block, id: nanoid() }
											const updated = [...layout]
											updated.splice(index + 1, 0, newBlock)
											setLayout(updated)
										}}
										onDelete={() => {
											const updated = layout.filter((_, i) => i !== index)
											setLayout(updated)
											setSelectedIndex(null)
										}}
										onMoveUp={() => {
											if (index === 0) return
											setLayout(arrayMove(layout, index, index - 1))
										}}
										onMoveDown={() => {
											if (index === layout.length - 1) return
											setLayout(arrayMove(layout, index, index + 1))
										}}
									/>
									{renderBlock(block, index, updateBlock, previewMode)}
								</div>
							</SortableItem>
						))}
					</SortableContext>
				</DndContext>
			</div>
			<GlobalStyleControls
				styles={globalStyles}
				onChange={setGlobalStyles}
			/>
			<Button onClick={handleSave}>Save Layout</Button>
			{selectedIndex !== null && (
				<StyleSidebar
					styles={layout[selectedIndex].styles || {}}
					onChange={(style) => {
						const updated = [...layout]
						updated[selectedIndex].styles = style
						setLayout(updated)
					}}
				/>
			)}
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>Page Builder</h1>
				<ModeToggle
					preview={previewMode}
					setPreview={setPreviewMode}
				/>
			</div>
		</div>
	)
}
