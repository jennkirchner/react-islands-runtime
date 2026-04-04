import React from 'react';
import { Island, resolveIslandModule } from 'react-islands-runtime/ssr';

import CartSSR from '../../../../_shared/runtime/src/islands/Cart.ssr.jsx';
import ProductSearchSSR from '../../../../_shared/runtime/src/islands/ProductSearch.ssr.jsx';
import { getCarouselBlock } from '../../../../_shared/carousels.js';
import { CarouselBlock } from '../../../../_shared/components/CarouselBlock.jsx';
import { ensureBlock, moveBlockAfter, moveBlockToFront } from '../../../../_shared/homepageBlocks.js';
import { getLandingPage, getHeroBanners } from '../../../models/contentstack.model.js';

export const loader = async () => {
	const page = await getLandingPage('home');
	const rawBlocks = Array.isArray(page?.blocks) ? page.blocks : [];

	let heroBlocks = [];
	if (!rawBlocks.some((b) => b.type === 'hero')) {
		const heroes = await getHeroBanners();
		heroBlocks = (heroes || []).map((hero) => ({
			type: 'hero',
			title: hero?.title || hero?.heading || hero?.name || 'Weekly Ad',
			subtitle: hero?.subtitle || hero?.tagline || hero?.description || '',
		}));
	}

	const blocks = [...rawBlocks, ...heroBlocks];

	ensureBlock(blocks, 'product_search', () => ({
		type: 'product_search',
		islandKey: 'product_search',
		hydrate: 'immediate',
	}));
	ensureBlock(blocks, 'cart_mini', () => ({
		type: 'cart_mini',
		islandKey: 'cart',
		hydrate: 'immediate',
	}));
	ensureBlock(blocks, 'carousel', () => getCarouselBlock('contentstack-commercetools-demo'));

	const arrangedBlocks = blocks.some((block) => block.type === 'hero')
		? moveBlockAfter(moveBlockAfter(blocks, 'product_search', 'hero'), 'carousel', 'product_search')
		: moveBlockAfter(moveBlockToFront(blocks, 'product_search'), 'carousel', 'product_search');

	return {
		page: {
			title: page?.title || 'Contentstack + Commercetools',
			blocks: arrangedBlocks,
		},
	};
};

export const head = (props) => ({ title: props.page?.title || 'Contentstack + Commercetools' });

export const Page = ({ page }) => {
	return (
		<main>
			{(page?.blocks || []).map((b, i) => {
				if (b.type === 'hero') {
					return (
						<section key={i} style={{ marginBottom: 24 }}>
							<h1 style={{ margin: 0 }}>{b.title}</h1>
							<p style={{ marginTop: 8 }}>{b.subtitle}</p>
						</section>
					);
				}

				if (b.type === 'promo') {
					return (
						<section key={i} style={{ marginBottom: 24, padding: 16, border: '1px solid #eee' }}>
							<strong>{b.title}</strong>
							<p style={{ marginTop: 8 }}>{b.body}</p>
						</section>
					);
				}

				if (b.type === 'carousel') {
					return <CarouselBlock key={i} block={b} style={{ marginBottom: 24 }} />;
				}

				if (b.type === 'product_search') {
					return (
						<section key={i} style={{ marginBottom: 24 }}>
							<h2>Search</h2>
							<Island
								islandKey={b.islandKey}
								hydrate={b.hydrate || 'immediate'}
								props={{ placeholder: 'Search products...' }}
								resolveIslandModule={resolveIslandModule}
							>
								<ProductSearchSSR placeholder="Search products..." />
							</Island>
						</section>
					);
				}

				if (b.type === 'cart_mini') {
					return (
						<section key={i} style={{ marginBottom: 24 }}>
							<h2>Cart</h2>
							<Island
								islandKey={b.islandKey}
								hydrate={b.hydrate || 'immediate'}
								props={{}}
								resolveIslandModule={resolveIslandModule}
							>
								<CartSSR />
							</Island>
						</section>
					);
				}

				return null;
			})}
		</main>
	);
};
