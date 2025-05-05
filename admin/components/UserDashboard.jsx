import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function UserDashboard({ userId }) {
	const [templates, setTemplates] = useState([])

	useEffect(() => {
		fetch(`/api/templates/user/${userId}`, {
			headers: { Authorization: 'Bearer AGENCY_API_KEY' }
		})
			.then((res) => res.json())
			.then(setTemplates)
	}, [])

	const removeTemplate = async (id) => {
		await fetch(`/api/templates/${id}`, {
			method: 'DELETE',
			headers: { Authorization: 'Bearer AGENCY_API_KEY' }
		})
		setTemplates(templates.filter((tpl) => tpl.id !== id))
	}

	return (
		<div className='p-6 space-y-6'>
			<h2 className='text-2xl font-bold'>My Submitted Templates</h2>
			{templates.map((tpl) => (
				<div
					key={tpl.id}
					className='bg-muted p-4 rounded flex gap-4 items-center'
				>
					<img
						src={tpl.preview}
						className='w-24 h-16 object-cover rounded'
					/>
					<div className='flex-1'>
						<div className='font-semibold'>{tpl.name}</div>
						<div className='text-sm text-muted-foreground'>
							Status: {tpl.status}
						</div>
						<div className='text-xs text-gray-400'>
							Synced: {new Date(tpl.syncedAt).toLocaleDateString()}
						</div>
					</div>
					<Button
						variant='destructive'
						onClick={() => removeTemplate(tpl.id)}
					>
						Remove
					</Button>
				</div>
			))}
		</div>
	)
}
