import React from 'react';

const toCssSize = (value) => {
	if (typeof value === 'number' && Number.isFinite(value)) return `${value}px`;
	if (typeof value === 'string' && value.trim()) return value;
	return undefined;
};

const toPositiveNumber = (value) => {
	const next = Number(value);
	return Number.isFinite(next) && next > 0 ? next : undefined;
};

const parseRatioPair = (value, firstKey, secondKey) => {
	if (Array.isArray(value) && value.length >= 2) {
		const first = toPositiveNumber(value[0]);
		const second = toPositiveNumber(value[1]);
		if (first && second) return { first, second };
	}

	if (value && typeof value === 'object') {
		const first = toPositiveNumber(value[firstKey]);
		const second = toPositiveNumber(value[secondKey]);
		if (first && second) return { first, second };
	}

	if (typeof value === 'string') {
		const parts = value
			.split(/[:/,\s]+/)
			.map((part) => toPositiveNumber(part))
			.filter(Boolean);
		if (parts.length >= 2) return { first: parts[0], second: parts[1] };
	}

	return undefined;
};

const parseSlideImageTextRatio = (value) => {
	const ratio = parseRatioPair(value, 'image', 'text');
	return ratio ? { image: ratio.first, text: ratio.second } : undefined;
};

const parseStickySlideSizeRatio = (value) => {
	const ratio = parseRatioPair(value, 'sticky', 'slide');
	return ratio ? { sticky: ratio.first, slide: ratio.second } : undefined;
};

const SlideCard = ({ slide, index, cardClassName }) => (
	<article
		className={['carousel__slide', cardClassName].filter(Boolean).join(' ')}
		data-carousel-slide=""
		data-carousel-index={index}
	>
		<div className="carousel__media">
			<img src={slide.image} alt={slide.title} draggable="false" />
		</div>
		<div className="carousel__copy">
			{slide.eyebrow ? <span className="carousel__eyebrow">{slide.eyebrow}</span> : null}
			<h3 className="carousel__slide-title">{slide.title}</h3>
			<p className="carousel__slide-body">{slide.body}</p>
		</div>
	</article>
);

const CarouselSSR = ({ title, slides = [], variant = 'peek-strip', accentIconSrc, options = {} }) => {
	const pinnedPaneCount = Math.max(0, Math.min(options.stickyPaneCount || 0, slides.length));
	const hasPinnedPane = pinnedPaneCount > 0;
	const pinnedSlides = slides.slice(0, pinnedPaneCount);
	const scrollSlides = slides.slice(pinnedPaneCount);
	const visibleScrollPanes = Math.max(1, options.visibleScrollPanes || 1);
	const minHeight = toCssSize(options.minHeight);
	const maxHeight = toCssSize(options.maxHeight);
	const slideImageTextRatio = parseSlideImageTextRatio(options.slideImageTextRatio);
	const stickySlideSizeRatio = parseStickySlideSizeRatio(options.stickySlideSizeRatio);
	const spotlight = variant === 'spotlight-dots';

	return (
		<div className={`carousel carousel--${variant}`}>
			<div className="carousel__header">
				<h2 className="carousel__title">{title}</h2>
				{options.showArrows ? (
					<div className="carousel__controls">
						<button type="button" className="carousel__control" aria-label="Previous slide">
							<span aria-hidden="true">‹</span>
						</button>
						<button type="button" className="carousel__control" aria-label="Next slide">
							<span aria-hidden="true">›</span>
						</button>
					</div>
				) : null}
			</div>
			<div className="carousel__viewport">
				{accentIconSrc ? (
					<div className="carousel__accent">
						<img src={accentIconSrc} alt="" />
					</div>
				) : null}
				<div
					className={`carousel__layout${hasPinnedPane ? ' carousel__layout--pinned' : ''}`}
					style={{
						'--carousel-visible-slides': `${visibleScrollPanes}`,
						...(minHeight ? { '--carousel-min-height': minHeight } : {}),
						...(maxHeight ? { '--carousel-max-height': maxHeight } : {}),
						...(slideImageTextRatio
							? {
									'--carousel-slide-media-fr': `${slideImageTextRatio.image}`,
									'--carousel-slide-copy-fr': `${slideImageTextRatio.text}`,
								}
							: {}),
						...(stickySlideSizeRatio
							? {
									'--carousel-sticky-pane-width': `${stickySlideSizeRatio.sticky}fr`,
									'--carousel-scroll-pane-width': `${stickySlideSizeRatio.slide * visibleScrollPanes}fr`,
								}
							: {}),
					}}
				>
					{hasPinnedPane ? (
						<div className="carousel__pinned">
							<div className="carousel__pinned-stack">
								{pinnedSlides.map((slide, index) => (
									<SlideCard
										key={`${slide.title}-pinned-${index}`}
										slide={slide}
										index={index}
										cardClassName="carousel__slide--pinned"
									/>
								))}
							</div>
						</div>
					) : null}
					<div
						className={`carousel__scroller${
							spotlight ? ' carousel__scroller--spotlight' : ''
						}${hasPinnedPane ? ' carousel__scroller--rail' : ''}`}
					>
						{scrollSlides.map((slide, index) => (
							<SlideCard
								key={`${slide.title}-${index}`}
								slide={slide}
								index={index}
								cardClassName={[
									`carousel__slide--${variant}`,
									spotlight && index === 0 ? 'is-current' : '',
								]
									.filter(Boolean)
									.join(' ')}
							/>
						))}
					</div>
				</div>
			</div>
			{options.showDots && scrollSlides.length > 1 ? (
				<div className="carousel__dots" aria-label="Carousel pagination">
					{scrollSlides.map((slide, index) => (
						<button
							key={`${slide.title}-dot`}
							type="button"
							className="carousel__dot"
							data-active={index === 0 ? 'true' : 'false'}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};

export default CarouselSSR;
