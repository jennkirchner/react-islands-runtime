'use client';

import React, { useEffect, useRef, useState } from 'react';

const cx = (...values) => values.filter(Boolean).join(' ');
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

const getSlideElements = (scroller) => Array.from(scroller?.querySelectorAll('[data-carousel-slide]') || []);

const scrollToSlide = (scroller, nextIndex) => {
	const slides = getSlideElements(scroller);
	const target = slides[nextIndex];
	if (!target) return;

	scroller.scrollTo({
		left: target.offsetLeft - scroller.offsetLeft,
		behavior: 'smooth',
	});
};

const useCarouselState = ({ count, autoPlayMs, pauseOnHover, enabledDots, scrollerRef }) => {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		const scroller = scrollerRef.current;
		if (!scroller || count <= 1) return undefined;

		const slides = getSlideElements(scroller);
		if (!slides.length) return undefined;

		const observer = new IntersectionObserver(
			(entries) => {
				const current = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				if (!current) return;
				const nextIndex = Number(current.target.getAttribute('data-carousel-index'));
				if (Number.isFinite(nextIndex)) setIndex(nextIndex);
			},
			{
				root: scroller,
				threshold: [0.6, 0.9],
			},
		);

		slides.forEach((slide) => observer.observe(slide));
		return () => observer.disconnect();
	}, [count, scrollerRef]);

	useEffect(() => {
		if (!enabledDots || count <= 1 || autoPlayMs <= 0 || paused) return undefined;
		const timer = window.setInterval(() => {
			const nextIndex = (index + 1) % count;
			scrollToSlide(scrollerRef.current, nextIndex);
		}, autoPlayMs);

		return () => window.clearInterval(timer);
	}, [autoPlayMs, count, enabledDots, index, paused, scrollerRef]);

	return {
		index,
		paused,
		setPaused: pauseOnHover ? setPaused : () => {},
	};
};

const SlideCard = ({ slide, index, cardClassName }) => (
	<article
		className={cx('carousel__slide', cardClassName)}
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

const Carousel = ({
	title,
	slides = [],
	variant = 'peek-strip',
	options = {},
	accentIconSrc,
}) => {
	const {
		autoPlayMs = 3200,
		showDots = false,
		showArrows = true,
		pauseOnHover = true,
		stickyPaneCount = 0,
		visibleScrollPanes = 1,
	} = options;

	const spotlight = variant === 'spotlight-dots';
	const pinnedPaneCount = Math.max(0, Math.min(stickyPaneCount, slides.length));
	const hasPinnedPane = pinnedPaneCount > 0;
	const pinnedSlides = slides.slice(0, pinnedPaneCount);
	const scrollSlides = slides.slice(pinnedPaneCount);
	const minHeight = toCssSize(options.minHeight);
	const maxHeight = toCssSize(options.maxHeight);
	const slideImageTextRatio = parseSlideImageTextRatio(options.slideImageTextRatio);
	const stickySlideSizeRatio = parseStickySlideSizeRatio(options.stickySlideSizeRatio);
	const scrollerRef = useRef(null);
	const count = scrollSlides.length;
	const { index, paused, setPaused } = useCarouselState({
		count,
		autoPlayMs,
		pauseOnHover,
		enabledDots: spotlight,
		scrollerRef,
	});

	if (!slides.length) return null;

	const goPrev = () => {
		if (count <= 1) return;
		scrollToSlide(scrollerRef.current, (index - 1 + count) % count);
	};

	const goNext = () => {
		if (count <= 1) return;
		scrollToSlide(scrollerRef.current, (index + 1) % count);
	};

	return (
		<div
			className={cx('carousel', `carousel--${variant}`, paused && 'is-paused')}
			onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
			onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
		>
			<div className="carousel__header">
				<h2 className="carousel__title">{title}</h2>
				{showArrows && count > 0 ? (
					<div className="carousel__controls">
						<button type="button" className="carousel__control" onClick={goPrev} aria-label="Previous slide">
							<span aria-hidden="true">‹</span>
						</button>
						<button type="button" className="carousel__control" onClick={goNext} aria-label="Next slide">
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
					className={cx('carousel__layout', hasPinnedPane && 'carousel__layout--pinned')}
					style={{
						'--carousel-visible-slides': `${Math.max(1, visibleScrollPanes)}`,
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
									'--carousel-scroll-pane-width': `${stickySlideSizeRatio.slide * Math.max(1, visibleScrollPanes)}fr`,
								}
							: {}),
					}}
				>
					{hasPinnedPane ? (
						<div className="carousel__pinned">
							<div className="carousel__pinned-stack">
								{pinnedSlides.map((slide, pinnedIndex) => (
									<SlideCard
										key={`${slide.title}-pinned-${pinnedIndex}`}
										slide={slide}
										index={pinnedIndex}
										cardClassName="carousel__slide--pinned"
									/>
								))}
							</div>
						</div>
					) : null}

					<div
						ref={scrollerRef}
						className={cx(
							'carousel__scroller',
							spotlight && 'carousel__scroller--spotlight',
							hasPinnedPane && 'carousel__scroller--rail',
						)}
					>
						{scrollSlides.map((slide, slideIndex) => (
							<SlideCard
								key={`${slide.title}-${slideIndex}`}
								slide={slide}
								index={slideIndex}
								cardClassName={cx(
									`carousel__slide--${variant}`,
									spotlight && slideIndex === index && 'is-current',
								)}
							/>
						))}
					</div>
				</div>
			</div>
			{showDots && count > 1 ? (
				<div className="carousel__dots" aria-label="Carousel pagination">
					{scrollSlides.map((slide, slideIndex) => (
						<button
							key={`${slide.title}-dot`}
							type="button"
							className="carousel__dot"
							data-active={slideIndex === index ? 'true' : 'false'}
							aria-label={`Go to slide ${slideIndex + 1}`}
							onClick={() => scrollToSlide(scrollerRef.current, slideIndex)}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};

export default Carousel;
