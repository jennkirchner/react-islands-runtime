import React from 'react';
import { Island, resolveIslandModule } from 'react-islands-runtime/ssr';

import CartSSR from '../../../../_shared/runtime/src/islands/Cart.ssr.jsx';
import ProductSearchSSR from '../../../../_shared/runtime/src/islands/ProductSearch.ssr.jsx';
import { getCarouselBlock } from '../../../../_shared/carousels.js';
import { CarouselBlock } from '../../../../_shared/components/CarouselBlock.jsx';
import { ensureBlock, moveBlockAfter, moveBlockToFront } from '../../../../_shared/homepageBlocks.js';
import { getLandingPage, getHeroBanners } from '../../../models/content.model.js';

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
	ensureBlock(blocks, 'carousel', () => getCarouselBlock('test-data'));

	const arrangedBlocks = moveBlockAfter(moveBlockToFront(blocks, 'product_search'), 'carousel', 'product_search');

	return {
		page: {
			title: page?.title || 'Test Data',
			blocks: arrangedBlocks,
		},
	};
};

export const head = (props) => ({ title: props.page?.title || 'Test Data' });

export const Page = ({ page }) => {
	return (
		<main className="test-data-page">
			{(page?.blocks || []).map((b, i) => {
				if (b.type === 'product_search') {
					return (
						<section key={i} className="test-data-search-card">
							<h2 className="test-data-card-title">Search Local Surf Gear</h2>
							<p className="test-data-card-copy">
								Type anything from “glass” to “fins” and the island will query the checked-in product
								fixtures.
							</p>
							<Island
								islandKey={b.islandKey}
								hydrate={b.hydrate || 'immediate'}
								props={{ placeholder: 'Search local test products...' }}
								resolveIslandModule={resolveIslandModule}
							>
								<ProductSearchSSR placeholder="Search local test products..." />
							</Island>
						</section>
					);
				}
				if (b.type === 'hero') {
					return (
						<section key={i} className="test-data-hero">
							<div className="test-data-hero__content">
								<span className="test-data-hero__eyebrow">{b.eyebrow || 'Test Data'}</span>
								<h1 className="test-data-hero__title">{b.title}</h1>
								<p className="test-data-hero__subtitle">{b.subtitle}</p>
								<ul className="test-data-hero__meta">
									<li>OKLab palette</li>
									<li>liquid glass surfaces</li>
									<li>local CMS + catalog fixtures</li>
								</ul>
							</div>
							<div className="test-data-hero__visual">
								<img src={b.image || '/app-images/liquid-glass-board.jpg'} alt={b.title} />
								<div className="test-data-hero__swash">liquid glass line</div>
							</div>
						</section>
					);
				}

				if (b.type === 'promo') {
					return (
						<section key={i} className="test-data-promo">
							<div className="test-data-promo__title">{b.title}</div>
							<p className="test-data-promo__body">{b.body}</p>
						</section>
					);
				}

				if (b.type === 'carousel') {
					return <CarouselBlock key={i} block={b} className="test-data-carousel-card" />;
				}

				if (b.type === 'cart_mini') {
					return (
						<section key={i} className="test-data-cart-card">
							<h2 className="test-data-card-title">Mini Cart</h2>
							<p className="test-data-card-copy">
								A simple fixture-backed cart shell for island hydration checks.
							</p>
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
