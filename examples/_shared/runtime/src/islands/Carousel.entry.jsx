'use client';

import React, { useEffect, useMemo, useState } from 'react';

const cx = (...values) => values.filter(Boolean).join(' ');

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
		freezeFirstFrame = false,
	} = options;
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const count = slides.length;
	const spotlight = variant === 'spotlight-dots';
	const marquee = variant === 'pin-first-marquee';

	const rotatingSlides = useMemo(() => {
		if (!marquee) return slides;
		return freezeFirstFrame ? slides.slice(1) : slides;
	}, [slides, marquee, freezeFirstFrame]);

	useEffect(() => {
		if (!spotlight || count <= 1 || autoPlayMs <= 0 || paused) return undefined;
		const timer = window.setInterval(() => {
			setIndex((current) => (current + 1) % count);
		}, autoPlayMs);
		return () => window.clearInterval(timer);
	}, [autoPlayMs, count, paused, spotlight]);

	const goPrev = () => setIndex((current) => (current - 1 + count) % count);
	const goNext = () => setIndex((current) => (current + 1) % count);

	if (!count) return null;

	if (marquee) {
		const pinned = freezeFirstFrame ? slides[0] : null;
		const moving = rotatingSlides.length ? [...rotatingSlides, ...rotatingSlides] : [];

		return (
			<div
				className={cx('demo-carousel', `demo-carousel--${variant}`)}
				onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
				onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
			>
				<div className="demo-carousel__header">
					<h2 className="demo-carousel__title">{title}</h2>
				</div>
				<div className="demo-carousel__viewport">
					{accentIconSrc ? (
						<div className="demo-carousel__accent">
							<img src={accentIconSrc} alt="" />
						</div>
					) : null}
					<div className="demo-carousel__pinned-wrap">
						{pinned ? (
							<article className="demo-carousel__slide demo-carousel__slide--pinned">
								<div className="demo-carousel__media">
									<img src={pinned.image} alt={pinned.title} />
								</div>
								<div className="demo-carousel__copy">
									{pinned.eyebrow ? <span className="demo-carousel__eyebrow">{pinned.eyebrow}</span> : null}
									<h3 className="demo-carousel__slide-title">{pinned.title}</h3>
									<p className="demo-carousel__slide-body">{pinned.body}</p>
								</div>
							</article>
						) : null}
						<div className={cx('demo-carousel__marquee', paused && 'is-paused')}>
							<div className="demo-carousel__marquee-track">
								{moving.map((slide, slideIndex) => (
									<article key={`${slide.title}-${slideIndex}`} className="demo-carousel__slide demo-carousel__slide--marquee">
										<div className="demo-carousel__media">
											<img src={slide.image} alt={slide.title} />
										</div>
										<div className="demo-carousel__copy">
											{slide.eyebrow ? <span className="demo-carousel__eyebrow">{slide.eyebrow}</span> : null}
											<h3 className="demo-carousel__slide-title">{slide.title}</h3>
											<p className="demo-carousel__slide-body">{slide.body}</p>
										</div>
									</article>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={cx('demo-carousel', `demo-carousel--${variant}`)}
			onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
			onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
		>
			<div className="demo-carousel__header">
				<h2 className="demo-carousel__title">{title}</h2>
				{showArrows && count > 1 ? (
					<div className="demo-carousel__controls">
						<button type="button" className="demo-carousel__control" onClick={goPrev} aria-label="Previous slide">
							Prev
						</button>
						<button type="button" className="demo-carousel__control" onClick={goNext} aria-label="Next slide">
							Next
						</button>
					</div>
				) : null}
			</div>
			<div className="demo-carousel__viewport">
				<div
					className={cx('demo-carousel__track', spotlight && 'demo-carousel__track--spotlight')}
					style={
						spotlight
							? { transform: `translateX(-${index * 100}%)` }
							: undefined
					}
				>
					{slides.map((slide, slideIndex) => (
						<article
							key={`${slide.title}-${slideIndex}`}
							className={cx(
								'demo-carousel__slide',
								slideIndex === index && 'is-current',
								`demo-carousel__slide--${variant}`,
							)}
						>
							<div className="demo-carousel__media">
								<img src={slide.image} alt={slide.title} />
							</div>
							<div className="demo-carousel__copy">
								{slide.eyebrow ? <span className="demo-carousel__eyebrow">{slide.eyebrow}</span> : null}
								<h3 className="demo-carousel__slide-title">{slide.title}</h3>
								<p className="demo-carousel__slide-body">{slide.body}</p>
							</div>
						</article>
					))}
				</div>
			</div>
			{showDots && count > 1 ? (
				<div className="demo-carousel__dots" aria-label="Carousel pagination">
					{slides.map((slide, slideIndex) => (
						<button
							key={`${slide.title}-dot`}
							type="button"
							className="demo-carousel__dot"
							data-active={slideIndex === index ? 'true' : 'false'}
							aria-label={`Go to slide ${slideIndex + 1}`}
							onClick={() => setIndex(slideIndex)}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};

export default Carousel;
