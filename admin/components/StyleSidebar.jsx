import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function StyleSidebar({ styles, onChange }) {
	return (
		<Card className='w-64'>
			<CardContent className='space-y-4 p-4'>
				<div>
					<Label>Padding</Label>
					<Input
						type='text'
						value={styles.padding || ''}
						onChange={(e) => onChange({ ...styles, padding: e.target.value })}
						placeholder='e.g. p-4'
					/>
				</div>
				<div>
					<Label>Background Color</Label>
					<Input
						type='color'
						value={styles.backgroundColor || '#ffffff'}
						onChange={(e) =>
							onChange({ ...styles, backgroundColor: e.target.value })
						}
					/>
				</div>
				<div>
					<Label>Border Radius</Label>
					<Input
						type='text'
						value={styles.rounded || ''}
						onChange={(e) => onChange({ ...styles, rounded: e.target.value })}
						placeholder='e.g. rounded-lg'
					/>
				</div>
			</CardContent>
		</Card>
	)
}
