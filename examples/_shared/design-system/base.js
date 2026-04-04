import { createDomainThemeFeature, createThemeModeFeature } from 'react-islands-runtime/ssr';

export const sharedDocumentStyles = `
	body {
		margin: 0;
		background:
			radial-gradient(circle at top, color-mix(in srgb, var(--surface-accent) 18%, transparent), transparent 42%),
			linear-gradient(180deg, var(--surface-canvas), var(--surface-muted));
		color: var(--text-primary);
		font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
	}

	a {
		color: var(--interactive-link);
	}

	a:hover {
		color: var(--interactive-link-hover);
	}

	::selection {
		background: color-mix(in srgb, var(--surface-accent) 45%, white);
		color: var(--text-primary);
	}

	#app {
		min-height: 100vh;
	}
`;

export const sharedShellStyles = `
	.demo-shell {
		max-width: 1040px;
		margin: 0 auto;
		padding: 32px 20px 56px;
	}

	.demo-shell__header {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 28px;
		padding: 18px 22px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-shell, 24px);
		background: color-mix(in srgb, var(--surface-panel) 88%, white);
		box-shadow: 0 16px 40px color-mix(in srgb, var(--surface-shadow) 16%, transparent);
		backdrop-filter: blur(14px);
	}

	.demo-shell__brand {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.demo-shell__eyebrow {
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.demo-shell__name {
		font-size: 1.2rem;
		font-weight: 700;
	}

	.demo-shell__nav {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.demo-shell__actions {
		display: flex;
		align-items: center;
		margin-left: auto;
	}

	.demo-shell__nav a {
		padding: 10px 14px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-pill, 999px);
		background: color-mix(in srgb, var(--surface-canvas) 72%, white);
		text-decoration: none;
		font-size: 0.95rem;
		transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
	}

	.demo-shell__nav a:hover {
		transform: translateY(-1px);
	}

	.demo-shell__main {
		display: grid;
		gap: 20px;
	}

	.demo-shell section {
		padding: 22px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-card, 22px);
		background: color-mix(in srgb, var(--surface-panel) 92%, white);
		box-shadow: 0 10px 30px color-mix(in srgb, var(--surface-shadow) 10%, transparent);
	}

	.demo-shell h1,
	.demo-shell h2 {
		font-family: "Avenir Next", "Segoe UI", sans-serif;
		letter-spacing: -0.03em;
	}

	.demo-shell__footer {
		margin-top: 28px;
		padding: 16px 4px 0;
		color: var(--text-muted);
		font-size: 0.92rem;
	}

	.demo-theme-switch {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px 8px 14px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-pill, 999px);
		background: color-mix(in srgb, var(--surface-panel) 78%, white);
		box-shadow:
			0 10px 24px color-mix(in srgb, var(--surface-shadow) 10%, transparent),
			inset 0 1px 0 color-mix(in srgb, white 54%, transparent);
		backdrop-filter: blur(14px) saturate(1.06);
	}

	.demo-theme-switch__label {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.demo-theme-switch__options {
		display: inline-flex;
		gap: 6px;
		padding: 4px;
		border-radius: var(--radius-pill, 999px);
		background: color-mix(in srgb, var(--surface-canvas) 62%, white);
	}

	.demo-theme-switch__button {
		appearance: none;
		border: 0;
		padding: 9px 13px;
		border-radius: var(--radius-pill, 999px);
		background: transparent;
		color: var(--text-muted);
		font: inherit;
		font-size: 0.86rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		cursor: pointer;
		transition:
			transform 180ms ease,
			background 180ms ease,
			color 180ms ease,
			box-shadow 180ms ease;
	}

	.demo-theme-switch__button:hover {
		transform: translateY(-1px);
		color: var(--text-primary);
	}

	.demo-theme-switch__button[data-active="true"],
	.demo-theme-switch__button[aria-pressed="true"] {
		background:
			linear-gradient(180deg, color-mix(in srgb, white 36%, transparent), transparent 75%),
			color-mix(in srgb, var(--surface-accent) 26%, var(--surface-panel));
		color: var(--text-primary);
		box-shadow:
			0 8px 16px color-mix(in srgb, var(--surface-shadow) 12%, transparent),
			inset 0 1px 0 color-mix(in srgb, white 58%, transparent);
	}

	html[data-theme-mode="dark"] .demo-theme-switch__button[data-active="true"],
	html[data-theme-mode="dark"] .demo-theme-switch__button[aria-pressed="true"] {
		background:
			linear-gradient(180deg, color-mix(in srgb, white 10%, transparent), transparent 80%),
			color-mix(in srgb, var(--surface-accent) 20%, var(--surface-panel));
	}

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
		scrollbar-width: none;
		scrollbar-gutter: stable;
		align-items: start;
	}

	.carousel__scroller::-webkit-scrollbar {
		display: none;
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

export const createSharedStyles = (...styles) => [
	{ id: 'demo-base', cssText: sharedDocumentStyles },
	{ id: 'demo-shell', cssText: sharedShellStyles },
	...styles.map((cssText, index) => ({
		id: `demo-extra-${index + 1}`,
		cssText,
	})),
];

export const createAppThemeFeature = (theme) =>
	createDomainThemeFeature({
		resolveTheme() {
			return theme;
		},
	});

export const createAppThemeModeFeature = (theme, { allowAuto = false } = {}) =>
	createThemeModeFeature({
		allowedModes: ['light', 'dark'],
		allowAuto,
		defaultPreference: allowAuto ? 'auto' : 'light',
		fallbackMode: 'light',
		themeColors: {
			light: theme?.themeColor,
			dark: theme?.modes?.dark?.themeColor,
		},
	});
