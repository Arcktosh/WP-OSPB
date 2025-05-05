import TextBlock from '../components/TextBlock'

export const blockRegistry = {
	text: TextBlock
}

export function renderBlock(block, index, update, preview = false) {
	const BlockComponent = blockRegistry[block.type]
	if (!BlockComponent) return null

	const styles = `${block.styles?.padding || ''} ${block.styles?.rounded || ''}`
	const background = block.styles?.backgroundColor

	return (
		<div
			key={index}
			className={styles}
			style={{ backgroundColor: background }}
		>
			<BlockComponent
				value={block.value}
				onChange={(value) => !preview && update(index, { ...block, value })}
				preview={preview}
			/>
		</div>
	)
}
