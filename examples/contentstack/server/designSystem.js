import { defineTheme } from 'react-islands-runtime/ssr';

import { carouselStyles } from '../../_shared/components/CarouselBlock.styles.js';
import { productSearchStyles } from '../../_shared/runtime/src/islands/ProductSearch.styles.js';
import { createAppThemeFeatures, createDocumentStyles } from './foundation.js';

const theme = defineTheme({
	name: 'contentstack',
	colorScheme: 'light',
	themeColor: '#f7f2ea',
	tokens: {
		surface: {
			canvas: '#f7f2ea',
			muted: '#efe3d2',
			panel: '#fffdfa',
			accent: '#f0b56f',
			shadow: '#9e5f25',
		},
		text: {
			primary: '#332117',
			muted: '#7d614a',
		},
		border: {
			subtle: '#e1c5a3',
		},
		interactive: {
			link: '#9c4f10',
			linkHover: '#6d3305',
		},
		radius: {
			surface: '24px',
			image: '16px',
			pill: '999px',
		},
	},
	documentProps: {
		htmlAttrs: { 'data-app-theme': 'contentstack' },
		styles: createDocumentStyles(carouselStyles, productSearchStyles),
	},
	modes: {
		dark: {
			colorScheme: 'dark',
			themeColor: '#1f1712',
			tokens: {
				surface: {
					canvas: '#18110d',
					muted: '#241912',
					panel: 'rgba(49, 34, 24, 0.84)',
					accent: '#efb364',
					shadow: '#070403',
				},
				text: {
					primary: '#f8e8db',
					muted: '#caa88a',
				},
				border: {
					subtle: '#76543b',
				},
				interactive: {
					link: '#f3bf82',
					linkHover: '#ffe1ba',
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
