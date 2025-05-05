import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TemplatesDashboard() {
	const [pending, setPending] = useState([])

	useEffect(() => {
		fetch('/api/templates/pending', {
			headers: { Authorization: 'Bearer MOD_API_KEY' }
		})
			.then((res) => res.json())
			.then(setPending)
	}, [])

	const handleAction = async (id, action) => {
		await fetch(`/api/templates/${id}/${action}`, {
			method: 'POST',
			headers: { Authorization: 'Bearer MOD_API_KEY' }
		})
		setPending(pending.filter((tpl) => tpl.id !== id))
	}

	return (
		<div className='p-6 space-y-6'>
			<h2 className='text-2xl font-bold'>Pending Template Submissions</h2>
			{pending.map((tpl) => (
				<div
					key={tpl.id}
					className='flex gap-4 items-center bg-muted p-4 rounded'
				>
					<img
						src={tpl.preview}
						className='w-24 h-16 object-cover rounded'
					/>
					<div className='flex-1'>
						<div className='font-medium'>{tpl.name}</div>
						<div className='text-sm text-muted-foreground'>
							Submitted by {tpl.submittedBy}
						</div>
					</div>
					<div className='flex gap-2'>
						<Button onClick={() => handleAction(tpl.id, 'approve')}>
							Approve
						</Button>
						<Button
							variant='destructive'
							onClick={() => handleAction(tpl.id, 'reject')}
						>
							Reject
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}
