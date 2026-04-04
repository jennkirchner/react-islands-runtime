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
