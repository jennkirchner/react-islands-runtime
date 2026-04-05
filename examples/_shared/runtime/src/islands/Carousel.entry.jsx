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

const getPageStartIndexes = (maxIndex, pageStep) => {
	const safeMaxIndex = Math.max(0, maxIndex);
	const safePageStep = Math.max(1, pageStep);
	const indexes = [];

	for (let nextIndex = 0; nextIndex <= safeMaxIndex; nextIndex += safePageStep) {
		indexes.push(nextIndex);
	}

	if (indexes[indexes.length - 1] !== safeMaxIndex) {
		indexes.push(safeMaxIndex);
	}

	return indexes;
};

const getScrollLeftForIndex = (scroller, targetIndex, maxIndex) => {
	const slides = getSlideElements(scroller);
	if (!slides.length) return 0;

	const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
	if (targetIndex <= 0) return 0;
	if (targetIndex >= maxIndex) return maxScrollLeft;

	const target = slides[targetIndex];
	if (!target) return maxScrollLeft;

	const scrollerRect = scroller.getBoundingClientRect();
	const targetRect = target.getBoundingClientRect();
	return Math.min(maxScrollLeft, targetRect.left - scrollerRect.left + scroller.scrollLeft);
};

const getNearestCarouselIndex = (scroller, maxIndex, pageStep) => {
	if (maxIndex <= 0) return 0;

	return getPageStartIndexes(maxIndex, pageStep).reduce(
		(best, candidateIndex) => {
			const distance = Math.abs(getScrollLeftForIndex(scroller, candidateIndex, maxIndex) - scroller.scrollLeft);
			return distance < best.distance ? { index: candidateIndex, distance } : best;
		},
		{ index: 0, distance: Number.POSITIVE_INFINITY },
	).index;
};

const getScrollNavigationState = (scroller, maxIndex, pageStep) => {
	const pageIndexes = getPageStartIndexes(maxIndex, pageStep);
	const index = getNearestCarouselIndex(scroller, maxIndex, pageStep);
	const pagePosition = pageIndexes.indexOf(index);

	return {
		index,
		canGoPrev: pagePosition > 0,
		canGoNext: pagePosition < pageIndexes.length - 1,
		pageIndexes,
		pagePosition,
	};
};

const scrollToPosition = (scroller, left) => {
	if (!scroller) return false;
	scroller.scrollTo({
		left,
		behavior: 'smooth',
	});
	return true;
};

const useCarouselState = ({ count, maxIndex, pageStep, autoPlayMs, pauseOnHover, enabledDots, scrollerRef }) => {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const scrollSettledTimerRef = useRef(null);

	useEffect(() => {
		const scroller = scrollerRef.current;
		if (!scroller || count <= 1) return undefined;

		const syncIndexFromScroll = () => {
			const nextState = getScrollNavigationState(scroller, maxIndex, pageStep);
			setIndex(nextState.index);
		};

		const updateIndexFromScroll = () => {
			window.clearTimeout(scrollSettledTimerRef.current);
			scrollSettledTimerRef.current = window.setTimeout(() => {
				syncIndexFromScroll();
			}, 120);
		};

		syncIndexFromScroll();
		scroller.addEventListener('scroll', updateIndexFromScroll, { passive: true });
		if ('onscrollend' in window) {
			scroller.addEventListener('scrollend', syncIndexFromScroll);
		}
		return () => {
			window.clearTimeout(scrollSettledTimerRef.current);
			scroller.removeEventListener('scroll', updateIndexFromScroll);
			if ('onscrollend' in window) {
				scroller.removeEventListener('scrollend', syncIndexFromScroll);
			}
		};
	}, [count, maxIndex, pageStep, scrollerRef]);

	useEffect(() => {
		if (count <= 1) {
			setIndex(0);
		}
	}, [count]);

	useEffect(() => {
		if (!enabledDots || count <= 1 || autoPlayMs <= 0 || paused) return undefined;
		const timer = window.setInterval(() => {
			const scroller = scrollerRef.current;
			const pageIndexes = getPageStartIndexes(maxIndex, pageStep);
			const pagePosition = pageIndexes.indexOf(index);
			const nextIndex = pagePosition >= pageIndexes.length - 1 ? 0 : pageIndexes[pagePosition + 1];
			scrollToPosition(scroller, getScrollLeftForIndex(scroller, nextIndex, maxIndex));
			setIndex(nextIndex);
		}, autoPlayMs);

		return () => window.clearInterval(timer);
	}, [autoPlayMs, count, enabledDots, index, maxIndex, pageStep, paused, scrollerRef]);

	return {
		index,
		paused,
		setIndex,
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
		loopNavButtons = false,
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
	const maxVisiblePanes = spotlight ? 1 : Math.max(1, visibleScrollPanes);
	const pageStep = maxVisiblePanes;
	const maxIndex = Math.max(0, count - maxVisiblePanes);
	const { index, paused, setIndex, setPaused } = useCarouselState({
		count,
		maxIndex,
		pageStep,
		autoPlayMs,
		pauseOnHover,
		enabledDots: spotlight,
		scrollerRef,
	});

	if (!slides.length) return null;

	const pageIndexes = getPageStartIndexes(maxIndex, pageStep);
	const pagePosition = pageIndexes.indexOf(index);
	const canGoPrev = loopNavButtons ? count > 1 : pagePosition > 0;
	const canGoNext = loopNavButtons ? count > 1 : pagePosition < pageIndexes.length - 1;

	const goPrev = () => {
		const scroller = scrollerRef.current;
		if (!scroller) return;

		if (!canGoPrev) return;
		const nextIndex = loopNavButtons
			? pageIndexes[(pagePosition - 1 + pageIndexes.length) % pageIndexes.length]
			: pageIndexes[Math.max(0, pagePosition - 1)];
		if (scrollToPosition(scroller, getScrollLeftForIndex(scroller, nextIndex, maxIndex))) {
			setIndex(nextIndex);
		}
	};

	const goNext = () => {
		const scroller = scrollerRef.current;
		if (!scroller) return;

		if (!canGoNext) return;
		const nextIndex = loopNavButtons
			? pageIndexes[(pagePosition + 1) % pageIndexes.length]
			: pageIndexes[Math.min(pageIndexes.length - 1, pagePosition + 1)];
		if (scrollToPosition(scroller, getScrollLeftForIndex(scroller, nextIndex, maxIndex))) {
			setIndex(nextIndex);
		}
	};

	const prevDisabled = loopNavButtons ? count <= 1 : !canGoPrev;
	const nextDisabled = loopNavButtons ? count <= 1 : !canGoNext;

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
						<button
							type="button"
							className="carousel__control"
							onClick={goPrev}
							aria-label="Previous slide"
							disabled={prevDisabled}
						>
							<span aria-hidden="true">‹</span>
						</button>
						<button
							type="button"
							className="carousel__control"
							onClick={goNext}
							aria-label="Next slide"
							disabled={nextDisabled}
						>
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
						tabIndex={0}
						role="region"
						aria-label={`${title} carousel`}
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
							onClick={() => {
								const scroller = scrollerRef.current;
								if (scrollToPosition(scroller, getScrollLeftForIndex(scroller, slideIndex, maxIndex))) {
									setIndex(slideIndex);
								}
							}}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};

export default Carousel;
