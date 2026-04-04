export const ensureBlock = (blocks, type, factory) => {
	if (!blocks.some((block) => block.type === type)) blocks.push(factory());
};

export const moveBlockAfter = (blocks, type, anchorType) => {
	const blockIndex = blocks.findIndex((block) => block.type === type);
	if (blockIndex === -1) return blocks;

	const anchorIndex = blocks.findIndex((block) => block.type === anchorType);
	if (anchorIndex === -1) return blocks;
	if (blockIndex === anchorIndex + 1) return blocks;

	const next = [...blocks];
	const [block] = next.splice(blockIndex, 1);
	const refreshedAnchorIndex = next.findIndex((item) => item.type === anchorType);
	next.splice(refreshedAnchorIndex + 1, 0, block);
	return next;
};

export const moveBlockToFront = (blocks, type) => {
	const blockIndex = blocks.findIndex((block) => block.type === type);
	if (blockIndex <= 0) return blocks;

	const next = [...blocks];
	const [block] = next.splice(blockIndex, 1);
	next.unshift(block);
	return next;
};
