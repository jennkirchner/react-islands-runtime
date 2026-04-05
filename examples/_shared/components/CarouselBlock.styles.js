export const carouselStyles = `
	.carousel {
		--carousel-gap: 18px;
		--carousel-scrollbar-size: 10px;
		--carousel-scrollbar-thumb: color-mix(in oklab, var(--surface-shadow) 22%, transparent);
		--carousel-scrollbar-thumb-hover: color-mix(in oklab, var(--surface-shadow) 34%, transparent);
		--carousel-scrollbar-track: color-mix(in oklab, var(--surface-muted) 55%, transparent);
		--carousel-control-bg: var(--surface-panel);
		--carousel-control-border: var(--border-subtle);
		--carousel-control-shadow: color-mix(in oklab, var(--surface-shadow) 12%, transparent);
		--carousel-control-shadow-disabled: color-mix(in oklab, var(--surface-shadow) 6%, transparent);
		--carousel-card-bg: var(--surface-panel);
		--carousel-card-border: var(--border-subtle);
		--carousel-card-shadow: color-mix(in oklab, var(--surface-shadow) 10%, transparent);
		--carousel-dot-bg: color-mix(in oklab, var(--border-subtle) 90%, transparent);
		--carousel-dot-border: var(--surface-panel);
		--carousel-dot-active-ring: color-mix(in oklab, var(--surface-accent) 18%, transparent);
		--carousel-focus-ring: var(--surface-accent);
		--carousel-viewport-bg: var(--surface-panel);
		--carousel-viewport-border: var(--border-subtle);
		--carousel-accent-bg: var(--surface-panel);
		--carousel-accent-shadow: color-mix(in oklab, var(--surface-shadow) 18%, transparent);
		display: grid;
		gap: 16px;
		container-type: inline-size;
	}

	.carousel__header {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
	}

	.carousel__title {
		margin: 0;
		font-size: 1.3rem;
	}

	.carousel__controls,
	.carousel__dots {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.carousel__control,
	.carousel__dot {
		appearance: none;
		border: 0;
		cursor: pointer;
	}

	.carousel__control {
		inline-size: 2.75rem;
		block-size: 2.75rem;
		display: inline-grid;
		place-items: center;
		border-radius: var(--radius-surface, 24px);
		background: var(--carousel-control-bg);
		border: 1px solid var(--carousel-control-border);
		color: var(--text-primary);
		font: inherit;
		font-size: 1.3rem;
		font-weight: 700;
		line-height: 1;
		box-shadow: 0 12px 26px var(--carousel-control-shadow);
		transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
	}

	.carousel__control:hover {
		transform: translateY(-1px);
	}

	.carousel__control:focus-visible,
	.carousel__scroller:focus-visible,
	.carousel__dot:focus-visible {
		outline: 2px solid var(--carousel-focus-ring);
		outline-offset: 2px;
	}

	.carousel__control:disabled {
		cursor: not-allowed;
		opacity: 0.45;
		transform: none;
		box-shadow: 0 6px 14px var(--carousel-control-shadow-disabled);
	}

	.carousel__viewport {
		position: relative;
		overflow: clip;
		padding: 0 0 28px;
	}

	.carousel__layout {
		display: grid;
		gap: 18px;
		min-block-size: var(--carousel-min-height, auto);
		max-block-size: var(--carousel-max-height, none);
	}

	.carousel__layout--pinned {
		grid-template-columns:
			minmax(280px, var(--carousel-sticky-pane-width, 1fr))
			minmax(0, var(--carousel-scroll-pane-width, 0.92fr));
	}

	.carousel__pinned {
		position: sticky;
		inset-block-start: 0;
		align-self: start;
	}

	.carousel__pinned-stack {
		display: grid;
		gap: 18px;
	}

	.carousel__scroller {
		/*
			Media-scroller baseline: CSS owns the rail behavior, JS only drives
			arrow fallback state and scroll commands.
		*/
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min(84cqi, 22rem), 1fr);
		gap: var(--carousel-gap);
		padding: 0 0 10px;
		overflow-x: auto;
		overflow-y: visible;
		-webkit-overflow-scrolling: touch;
		touch-action: pan-x pinch-zoom;
		overscroll-behavior-x: contain;
		overscroll-behavior-inline: contain;
		scroll-snap-type: inline mandatory;
		scroll-padding-inline: 0;
		scroll-behavior: smooth;
		scrollbar-gutter: stable both-edges;
		align-items: start;
	}

	@supports (scrollbar-width: thin) {
		.carousel__scroller {
			scrollbar-width: thin;
			scrollbar-color: transparent transparent;
		}

		.carousel__scroller:hover,
		.carousel__scroller:focus-visible,
		.carousel__scroller:focus-within {
			scrollbar-color: var(--carousel-scrollbar-thumb) var(--carousel-scrollbar-track);
		}
	}

	@supports selector(::-webkit-scrollbar) {
		.carousel__scroller::-webkit-scrollbar {
			max-inline-size: var(--carousel-scrollbar-size);
			max-block-size: var(--carousel-scrollbar-size);
		}

		.carousel__scroller::-webkit-scrollbar-track {
			background: transparent;
			border-radius: 999px;
		}

		.carousel__scroller::-webkit-scrollbar-thumb {
			background: transparent;
			border: 2px solid transparent;
			border-radius: 999px;
			background-clip: padding-box;
		}

		.carousel__scroller:hover::-webkit-scrollbar-track,
		.carousel__scroller:focus-visible::-webkit-scrollbar-track,
		.carousel__scroller:focus-within::-webkit-scrollbar-track {
			background: var(--carousel-scrollbar-track);
		}

		.carousel__scroller:hover::-webkit-scrollbar-thumb,
		.carousel__scroller:focus-visible::-webkit-scrollbar-thumb,
		.carousel__scroller:focus-within::-webkit-scrollbar-thumb {
			background: var(--carousel-scrollbar-thumb);
		}

		.carousel__scroller:hover::-webkit-scrollbar-thumb:hover,
		.carousel__scroller:focus-visible::-webkit-scrollbar-thumb:hover,
		.carousel__scroller:focus-within::-webkit-scrollbar-thumb:hover {
			background: var(--carousel-scrollbar-thumb-hover);
		}

		.carousel__scroller:hover,
		.carousel__scroller:focus-visible,
		.carousel__scroller:focus-within {
			--carousel-scrollbar-repaint-fix: ;
		}
	}

	.carousel__scroller--spotlight {
		grid-auto-columns: 100%;
	}

	.carousel__scroller--rail {
		grid-auto-columns: calc(
			(100% - (var(--carousel-visible-slides, 1) - 1) * var(--carousel-gap)) / var(--carousel-visible-slides, 1)
		);
		align-items: stretch;
	}

	.carousel__slide {
		position: relative;
		overflow: clip;
		box-sizing: border-box;
		display: grid;
		container-type: inline-size;
		gap: 16px;
		padding: 16px;
		border-radius: var(--radius-surface, 24px);
		border: 1px solid var(--carousel-card-border);
		background: var(--carousel-card-bg);
		box-shadow: 0 10px 24px var(--carousel-card-shadow);
		min-height: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	.carousel__slide--pinned {
		min-block-size: 100%;
	}

	.carousel__media {
		overflow: clip;
		border-radius: var(--radius-image, 16px);
		aspect-ratio: 16 / 10;
		isolation: isolate;
		min-block-size: 0;
	}

	.carousel__media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.carousel__copy {
		display: grid;
		gap: 8px;
		min-block-size: 0;
	}

	.carousel__eyebrow {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.carousel__slide-title {
		margin: 0;
		font-size: 1.12rem;
	}

	.carousel__slide-body {
		margin: 0;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.carousel__dot {
		width: 11px;
		height: 11px;
		border-radius: 999px;
		background: var(--carousel-dot-bg);
		border: 1px solid var(--carousel-dot-border);
		transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
	}

	.carousel__dot[data-active="true"] {
		transform: scale(1.18);
		background: var(--surface-accent);
		box-shadow: 0 0 0 4px var(--carousel-dot-active-ring);
	}

	.carousel--peek-strip .carousel__scroller {
		grid-auto-columns: minmax(280px, 1fr);
	}

	.carousel--pin-first-marquee .carousel__layout--pinned {
		align-items: stretch;
	}

	.carousel--pin-first-marquee .carousel__viewport {
		padding: 16px 16px 28px;
		border-radius: calc(var(--radius-surface, 24px) + 8px);
		background: var(--carousel-viewport-bg);
		border: 1px solid var(--carousel-viewport-border);
	}

	.carousel--pin-first-marquee .carousel__accent {
		inset-inline-end: 34px;
		inset-block-start: 34px;
	}

	.carousel--pin-first-marquee .carousel__pinned,
	.carousel--pin-first-marquee .carousel__pinned-stack,
	.carousel--pin-first-marquee .carousel__scroller--rail {
		block-size: 100%;
		min-block-size: 0;
	}

	.carousel--pin-first-marquee .carousel__scroller--rail {
		align-items: stretch;
	}

	.carousel--pin-first-marquee .carousel__slide {
		display: flex;
		flex-direction: column;
		block-size: 100%;
		min-block-size: 0;
	}

	.carousel--pin-first-marquee .carousel__media {
		flex: var(--carousel-slide-media-fr, 3) 1 0;
		aspect-ratio: auto;
		align-self: stretch;
	}

	.carousel--pin-first-marquee .carousel__copy {
		display: flex;
		flex-direction: column;
		gap: clamp(0.35rem, 1.2cqi, 0.7rem);
		flex: var(--carousel-slide-copy-fr, 2) 1 0;
		justify-content: flex-start;
		overflow: hidden;
	}

	.carousel--pin-first-marquee .carousel__eyebrow {
		font-size: clamp(0.58rem, 0.95cqi, 0.72rem);
		letter-spacing: clamp(0.08em, 0.22cqi, 0.14em);
	}

	.carousel--pin-first-marquee .carousel__slide-title {
		font-size: clamp(0.95rem, 2.5cqi, 1.45rem);
		line-height: 1.08;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-wrap: balance;
	}

	.carousel--pin-first-marquee .carousel__slide-body {
		font-size: clamp(0.78rem, 1.65cqi, 1rem);
		line-height: 1.42;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		overflow: hidden;
		text-wrap: pretty;
	}

	.carousel--editorial-stack .carousel__slide {
		grid-template-columns: minmax(220px, 0.95fr) minmax(0, 1.05fr);
		align-items: center;
	}

	.carousel--floating-cards .carousel__scroller {
		grid-auto-columns: minmax(260px, 1fr);
		align-items: stretch;
	}

	.carousel--floating-cards .carousel__slide:nth-child(2n) {
		transform: translateY(10px);
	}

	.carousel--spotlight-dots .carousel__slide {
		grid-template-columns: minmax(220px, 0.9fr) minmax(0, 1.1fr);
		align-items: center;
		min-height: 320px;
	}

	.carousel--spotlight-dots .carousel__dots {
		justify-content: center;
	}

	.carousel__accent {
		position: absolute;
		inset-inline-end: 18px;
		inset-block-start: 18px;
		z-index: 2;
		width: 56px;
		height: 56px;
		padding: 6px;
		border-radius: var(--radius-image, 16px);
		background: var(--carousel-accent-bg);
		box-shadow: 0 14px 28px var(--carousel-accent-shadow);
		backdrop-filter: blur(14px) saturate(1.12);
	}

	.carousel__accent img {
		width: 100%;
		height: 100%;
		display: block;
	}

	@media (max-width: 720px) {
		.carousel__layout--pinned,
		.carousel--editorial-stack .carousel__slide,
		.carousel--spotlight-dots .carousel__slide {
			grid-template-columns: 1fr;
		}

		.carousel__pinned {
			position: static;
		}

		.carousel__scroller,
		.carousel__scroller--rail,
		.carousel--peek-strip .carousel__scroller,
		.carousel--floating-cards .carousel__scroller {
			grid-auto-columns: minmax(84cqi, 1fr);
		}
	}
`;
