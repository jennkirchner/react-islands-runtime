// Local content model (non-vendor) using surf shop fixture data
import { listSurfProducts } from '../../_shared/app-data/surf-shop.js';

export const getLandingPage = async () => {
	const products = listSurfProducts({ limit: 3 }).products;
	return {
		title: 'Surf Shop Daily Drops',
		blocks: [
			{ type: 'hero', title: 'Glassline Collection', subtitle: 'Liquid glass surf essentials.' },
			{
				type: 'promo',
				title: 'Featured Boards',
				body: products.map((p) => p.name).join(', '),
			},
			{ type: 'product_search', islandKey: 'product_search', hydrate: 'immediate' },
			{ type: 'cart_mini', islandKey: 'cart', hydrate: 'immediate' },
		],
	};
};
