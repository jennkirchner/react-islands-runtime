import { getDemoCarouselBlock } from './carousels.js';

const ensureBlock = (blocks, type, factory) => {
	if (!blocks.some((block) => block.type === type)) blocks.push(factory());
};

const moveBlockAfter = (blocks, type, anchorType) => {
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

const moveBlockToFront = (blocks, type) => {
	const blockIndex = blocks.findIndex((block) => block.type === type);
	if (blockIndex <= 0) return blocks;

	const next = [...blocks];
	const [block] = next.splice(blockIndex, 1);
	next.unshift(block);
	return next;
};

export const normalizeHomepageBlocks = (blocks = [], demoName) => {
	const next = [...blocks];

	ensureBlock(next, 'product_search', () => ({
		type: 'product_search',
		islandKey: 'product_search',
		hydrate: 'immediate',
	}));
	ensureBlock(next, 'cart_mini', () => ({
		type: 'cart_mini',
		islandKey: 'cart',
		hydrate: 'immediate',
	}));
	ensureBlock(next, 'carousel', () => getDemoCarouselBlock(demoName));

	if (next.some((block) => block.type === 'hero')) {
		const searchAfterHero = moveBlockAfter(next, 'product_search', 'hero');
		return moveBlockAfter(searchAfterHero, 'carousel', 'product_search');
	}

	const searchFirst = moveBlockToFront(next, 'product_search');
	return moveBlockAfter(searchFirst, 'carousel', 'product_search');
};
