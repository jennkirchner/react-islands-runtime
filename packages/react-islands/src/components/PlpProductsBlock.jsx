import React from 'react';

export const PlpProductsBlock = ({ block, className = '', style }) => {
	const items = Array.isArray(block?.items) ? block.items.filter(Boolean) : [];
	if (!items.length) return null;

	return (
		<section className={['plp-products', className].filter(Boolean).join(' ')} style={style}>
			<div className="plp-products__header">
				<h2 className="plp-products__title">{block?.title || 'Products'}</h2>
				{block?.href ? (
					<a className="plp-products__link" href={block.href}>
						{block?.hrefLabel || 'View all'}
					</a>
				) : null}
			</div>

			<div className="plp-products__layout">
				{items.map((item, index) => {
					const content = (
						<>
							{item?.image || item?.fallbackImage ? (
								<div className="plp-products__media">
									<img
										src={item.image || item.fallbackImage}
										alt={item?.imageAlt || item?.title || ''}
										onError={(event) => {
											const fallbackSrc = item?.fallbackImage;
											if (!fallbackSrc) return;
											if (event.currentTarget.src.endsWith(fallbackSrc)) return;
											event.currentTarget.src = fallbackSrc;
										}}
									/>
								</div>
							) : null}
							<div className="plp-products__content">
								{item?.eyebrow ? <div className="plp-products__eyebrow">{item.eyebrow}</div> : null}
								{item?.price ? <div className="plp-products__price">{item.price}</div> : null}
								<h3 className="plp-products__item-title">{item?.title || 'Untitled product'}</h3>
								{item?.description ? <div className="plp-products__description">{item.description}</div> : null}
							</div>
						</>
					);

					return item?.href ? (
						<a key={`${item?.title || 'item'}-${index}`} className="plp-products__card" href={item.href}>
							{content}
						</a>
					) : (
						<article key={`${item?.title || 'item'}-${index}`} className="plp-products__card">
							{content}
						</article>
					);
				})}
			</div>
		</section>
	);
};
