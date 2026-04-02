import React from 'react';
import { Island, resolveIslandModule } from 'react-islands-runtime/ssr';

import CartSSR from '../../../../_shared/runtime/src/islands/Cart.ssr.jsx';
import ProductSearchSSR from '../../../../_shared/runtime/src/islands/ProductSearch.ssr.jsx';
import { CarouselBlock } from '../../../../_shared/components/CarouselBlock.jsx';
import { normalizeHomepageBlocks } from '../../../../_shared/homepageBlocks.js';
import { getLandingPage } from '../../../models/agility.model.js';

export const loader = async () => {
	const page = await getLandingPage('home');
	const blocks = normalizeHomepageBlocks(Array.isArray(page?.blocks) ? page.blocks : [], 'agility-demo');

	return {
		page: {
			title: page?.title || 'Agility Demo',
			blocks,
		},
	};
};

export const head = (props) => ({ title: props.page?.title || 'Agility Demo' });

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
