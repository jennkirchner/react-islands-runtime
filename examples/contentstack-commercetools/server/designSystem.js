import { defineTheme } from 'react-islands-runtime/ssr';

import { carouselStyles } from '../../_shared/components/CarouselBlock.styles.js';
import { productSearchStyles } from '../../_shared/runtime/src/islands/ProductSearch.styles.js';
import { createAppThemeFeatures, createDocumentStyles } from './foundation.js';

const theme = defineTheme({
	name: 'contentstack-commercetools',
	colorScheme: 'light',
	themeColor: '#edf7f2',
	tokens: {
		surface: {
			canvas: '#edf7f2',
			muted: '#d9efe4',
			panel: '#fbfffd',
			accent: '#80d4b2',
			shadow: '#215d48',
		},
		text: {
			primary: '#143126',
			muted: '#4d6f63',
		},
		border: {
			subtle: '#b8dccc',
		},
		interactive: {
			link: '#0e7a5e',
			linkHover: '#084d3c',
		},
		radius: {
			surface: '24px',
			image: '16px',
			pill: '999px',
		},
	},
	documentProps: {
		htmlAttrs: { 'data-app-theme': 'contentstack-commercetools' },
		styles: createDocumentStyles(carouselStyles, productSearchStyles),
	},
	modes: {
		dark: {
			colorScheme: 'dark',
			themeColor: '#101d18',
			tokens: {
				surface: {
					canvas: '#0d1512',
					muted: '#14221d',
					panel: 'rgba(20, 42, 34, 0.84)',
					accent: '#73d2ac',
					shadow: '#030706',
				},
				text: {
					primary: '#eafaf2',
					muted: '#a7cdbd',
				},
				border: {
					subtle: '#30574a',
				},
				interactive: {
					link: '#8fe6c1',
					linkHover: '#c4f7df',
				},
				radius: {
					surface: '24px',
					image: '16px',
					pill: '999px',
				},
			},
		},
	},
});

export const appFeatures = createAppThemeFeatures(theme);
