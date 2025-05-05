import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

export default function TextBlock({ value, onChange, preview }) {
	return preview ? (
		<div className='text-base leading-relaxed'>{value}</div>
	) : (
		<Card className='w-full max-w-2xl'>
			<CardContent className='p-4'>
				<Textarea
					className='min-h-[100px]'
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</CardContent>
		</Card>
	)
}
