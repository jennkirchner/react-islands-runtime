const surfSlides = [
	{
		eyebrow: 'Glass line',
		title: 'Liquid Glass Board',
		body: 'Pinned as the calm lead frame while the rest of the surf set keeps moving.',
		image: '/app-images/liquid-glass-board.jpg',
	},
	{
		eyebrow: 'Fin set',
		title: 'Glacier Fins',
		body: 'A cooler translucent accent frame for side-scroll movement.',
		image: '/app-images/liquid-glass-fins.jpg',
	},
	{
		eyebrow: 'Accessory',
		title: 'Pearl Goggles',
		body: 'Soft OKLab highlights and a glossy shell for quick carousel checks.',
		image: '/app-images/liquid-glass-goggles.jpg',
	},
	{
		eyebrow: 'Deck pad',
		title: 'Sea Foam Traction',
		body: 'An extra frame so the pinned rail has real forward motion on wide screens.',
		image: '/app-images/liquid-glass-board.jpg',
	},
	{
		eyebrow: 'Wax kit',
		title: 'Cloud Wax Set',
		body: 'Another surf-ready pane to keep the scrolling rail useful after the sticky lead card.',
		image: '/app-images/liquid-glass-fins.jpg',
	},
	{
		eyebrow: 'Travel',
		title: 'Drift Board Bag',
		body: 'Adds enough depth for multi-pane scrolling and arrow controls to stay meaningful.',
		image: '/app-images/liquid-glass-goggles.jpg',
	},
];

export const getCarouselBlock = (experience) => {
	if (experience === 'test-data') {
		return {
			type: 'carousel',
			title: 'Surf Carousel Lab',
			variant: 'pin-first-marquee',
			options: {
				pauseOnHover: true,
				stickyPaneCount: 1,
				visibleScrollPanes: 2,
				stickySlideSizeRatio: '2:1',
				minHeight: 350,
				maxHeight: 450,
				slideImageTextRatio: [3, 2],
				showArrows: true,
				showDots: false,
				autoPlayMs: 0,
			},
			slides: surfSlides,
		};
	}

	if (experience === 'contentstack-commercetools') {
		return {
			type: 'carousel',
			title: 'CMS + Commerce Highlights',
			variant: 'spotlight-dots',
			options: {
				showDots: true,
				showArrows: true,
				autoPlayMs: 3200,
				pauseOnHover: true,
			},
			slides: [
				{
					eyebrow: 'Contentstack',
					title: 'Campaign Hero',
					body: 'One frame at a time so editorial storytelling stays focused.',
					image: '/app-images/liquid-glass-board.jpg',
				},
				{
					eyebrow: 'Commercetools',
					title: 'Catalog Moment',
					body: 'The active dot fills as the product narrative advances.',
					image: '/app-images/liquid-glass-fins.jpg',
				},
				{
					eyebrow: 'Integrated',
					title: 'Search To Cart',
					body: 'A compact framed spotlight for the content-plus-commerce path.',
					image: '/app-images/liquid-glass-goggles.jpg',
				},
			],
		};
	}

	if (experience === 'contentstack') {
		return {
			type: 'carousel',
			title: 'Contentstack Story Frames',
			variant: 'editorial-stack',
			options: {
				showDots: false,
				showArrows: true,
				autoPlayMs: 3600,
				pauseOnHover: true,
			},
			slides: [
				{
					eyebrow: 'Story',
					title: 'Editorial Campaign',
					body: 'A stacked treatment for content-led merchandising.',
					image: '/app-images/liquid-glass-board.jpg',
				},
				{
					eyebrow: 'Feature',
					title: 'Hero Module',
					body: 'A second frame to validate CMS-driven sequencing.',
					image: '/app-images/liquid-glass-fins.jpg',
				},
				{
					eyebrow: 'CTA',
					title: 'Landing Flow',
					body: 'A softer third frame for homepage storytelling.',
					image: '/app-images/liquid-glass-goggles.jpg',
				},
			],
		};
	}

	if (experience === 'agility') {
		return {
			type: 'carousel',
			title: 'Agility Motion Shelf',
			variant: 'floating-cards',
			options: {
				showDots: false,
				showArrows: true,
				autoPlayMs: 3400,
				pauseOnHover: true,
			},
			slides: [
				{
					eyebrow: 'Agility',
					title: 'Composable Content',
					body: 'A card-based carousel that feels more modular and block-driven.',
					image: '/app-images/liquid-glass-board.jpg',
				},
				{
					eyebrow: 'Blocks',
					title: 'Flexible Layouts',
					body: 'Each frame reads like a movable content zone.',
					image: '/app-images/liquid-glass-fins.jpg',
				},
				{
					eyebrow: 'Preview',
					title: 'Editorial Cards',
					body: 'Good for verifying CMS-friendly block rendering.',
					image: '/app-images/liquid-glass-goggles.jpg',
				},
			],
		};
	}

	return {
		type: 'carousel',
		title: 'Commerce Frames',
		variant: 'peek-strip',
		options: {
			showDots: false,
			showArrows: true,
			autoPlayMs: 3000,
			pauseOnHover: true,
		},
		slides: [
			{
				eyebrow: 'Board',
				title: 'Aqua Driftboard',
				body: 'A commerce-first carousel with peeking next cards.',
				image: '/app-images/liquid-glass-board.jpg',
			},
			{
				eyebrow: 'Fin',
				title: 'Glacier Fins',
				body: 'Makes motion visible without taking over the page.',
				image: '/app-images/liquid-glass-fins.jpg',
			},
			{
				eyebrow: 'Gear',
				title: 'Pearl Goggles',
				body: 'A simple product-focused strip for storefront validation.',
				image: '/app-images/liquid-glass-goggles.jpg',
			},
		],
	};
};
