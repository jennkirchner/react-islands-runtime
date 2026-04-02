import React from 'react';

const renderSlide = (slide, index) => (
	<article key={index} className="demo-carousel__slide demo-carousel__slide--ssr">
		<div className="demo-carousel__media">
			<img src={slide.image} alt={slide.title} />
		</div>
		<div className="demo-carousel__copy">
			{slide.eyebrow ? <span className="demo-carousel__eyebrow">{slide.eyebrow}</span> : null}
			<h3 className="demo-carousel__slide-title">{slide.title}</h3>
			<p className="demo-carousel__slide-body">{slide.body}</p>
		</div>
	</article>
);

const CarouselSSR = ({ title, slides = [], variant = 'peek-strip', accentIconSrc }) => {
	const ssrSlides = variant === 'pin-first-marquee' ? slides.slice(0, 3) : slides.slice(0, 1);
	return (
		<div className={`demo-carousel demo-carousel--${variant}`}>
			<div className="demo-carousel__header">
				<h2 className="demo-carousel__title">{title}</h2>
			</div>
			<div className="demo-carousel__viewport">
				{accentIconSrc ? (
					<div className="demo-carousel__accent">
						<img src={accentIconSrc} alt="" />
					</div>
				) : null}
				<div className="demo-carousel__track demo-carousel__track--ssr">{ssrSlides.map(renderSlide)}</div>
			</div>
		</div>
	);
};

export default CarouselSSR;
