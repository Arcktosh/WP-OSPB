import { Button } from '@/components/ui/button'
import { Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react'

export default function BlockToolbar({
	onDuplicate,
	onDelete,
	onMoveUp,
	onMoveDown
}) {
	return (
		<div className='flex gap-2 justify-end mb-2'>
			<Button
				size='icon'
				variant='ghost'
				onClick={onMoveUp}
			>
				<ArrowUp size={16} />
			</Button>
			<Button
				size='icon'
				variant='ghost'
				onClick={onMoveDown}
			>
				<ArrowDown size={16} />
			</Button>
			<Button
				size='icon'
				variant='ghost'
				onClick={onDuplicate}
			>
				<Copy size={16} />
			</Button>
			<Button
				size='icon'
				variant='destructive'
				onClick={onDelete}
			>
				<Trash2 size={16} />
			</Button>
		</div>
	)
}
