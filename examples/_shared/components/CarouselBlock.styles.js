export const carouselStyles = `
	.carousel {
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
		border-radius: var(--radius-pill, 999px);
		background: color-mix(in srgb, var(--surface-panel) 76%, white);
		border: 1px solid var(--border-subtle);
		color: var(--text-primary);
		font: inherit;
		font-size: 1.3rem;
		font-weight: 700;
		line-height: 1;
		box-shadow:
			0 12px 26px color-mix(in srgb, var(--surface-shadow) 12%, transparent),
			inset 0 1px 0 color-mix(in srgb, white 58%, transparent);
		transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
	}

	.carousel__control:hover {
		transform: translateY(-1px);
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
			Use case: carousels should keep scroll affordance for mouse/trackpad users
			without turning the whole rail into a permanently heavy classic scrollbar.
		*/
		--carousel-scrollbar-size: 10px;
		--carousel-scrollbar-thumb: color-mix(in oklab, var(--surface-shadow) 22%, transparent);
		--carousel-scrollbar-thumb-hover: color-mix(in oklab, var(--surface-shadow) 34%, transparent);
		--carousel-scrollbar-track: color-mix(in oklab, var(--surface-muted) 55%, transparent);
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(min(84cqi, 22rem), 1fr);
		gap: 18px;
		padding: 0 0 10px;
		overflow-x: auto;
		overflow-y: visible;
		overscroll-behavior-inline: contain;
		scroll-snap-type: inline mandatory;
		scroll-padding-inline: 0;
		scroll-behavior: smooth;
		scrollbar-gutter: stable;
		align-items: start;
	}

	@supports (scrollbar-width: auto) {
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
			(100% - (var(--carousel-visible-slides, 1) - 1) * 18px) / var(--carousel-visible-slides, 1)
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
		border-radius: var(--radius-card, 24px);
		border: 1px solid var(--border-subtle);
		background:
			linear-gradient(180deg, color-mix(in srgb, white 20%, transparent), transparent 38%),
			color-mix(in srgb, var(--surface-panel) 78%, white);
		box-shadow: inset 0 1px 0 color-mix(in srgb, white 54%, transparent);
		min-height: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	.carousel__slide--pinned {
		min-block-size: 100%;
	}

	.carousel__media {
		overflow: clip;
		border-radius: calc(var(--radius-card, 24px) - 8px);
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
		background: color-mix(in srgb, var(--border-subtle) 90%, transparent);
		border: 1px solid color-mix(in srgb, var(--surface-panel) 65%, white);
		transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
	}

	.carousel__dot[data-active="true"] {
		transform: scale(1.18);
		background: var(--surface-accent);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--surface-accent) 18%, transparent);
	}

	.carousel--peek-strip .carousel__scroller {
		grid-auto-columns: minmax(280px, 1fr);
	}

	.carousel--pin-first-marquee .carousel__layout--pinned {
		align-items: stretch;
	}

	.carousel--pin-first-marquee .carousel__viewport {
		padding: 16px 16px 28px;
		border-radius: calc(var(--radius-card, 24px) + 8px);
		background:
			linear-gradient(180deg, color-mix(in oklab, white 22%, transparent), transparent 82%),
			color-mix(in oklab, var(--surface-panel) 72%, white);
		border: 1px solid color-mix(in oklab, var(--border-subtle) 88%, white);
		box-shadow: inset 0 1px 0 color-mix(in oklab, white 55%, transparent);
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
		box-shadow: inset 0 1px 0 color-mix(in oklab, white 54%, transparent);
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
		border-radius: 20px;
		background: color-mix(in oklab, var(--surface-panel) 70%, white);
		box-shadow:
			0 14px 28px color-mix(in oklab, var(--surface-shadow) 18%, transparent),
			inset 0 1px 0 color-mix(in oklab, white 54%, transparent);
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
