import React from 'react';
import { resolveComponentDesignSystem } from '../designSystem/resolveComponentDesignSystem.js';

export const ThemeModeSwitch = ({ includeAuto = false, label = 'Theme', designSystem, className = '', style }) => {
	const options = includeAuto
		? [
				{ value: 'light', label: 'Light' },
				{ value: 'dark', label: 'Dark' },
				{ value: 'auto', label: 'Auto' },
			]
		: [
				{ value: 'light', label: 'Light' },
				{ value: 'dark', label: 'Dark' },
			];

	const rootDesign = resolveComponentDesignSystem({
		componentName: 'themeModeSwitch',
		designSystem,
		className,
		style,
		defaultClassName: 'demo-theme-switch',
	});

	return (
		<div className={rootDesign.className} style={rootDesign.style} role="group" aria-label={label} {...rootDesign.attrs}>
			<span className="demo-theme-switch__label">{label}</span>
			<div className="demo-theme-switch__options">
				{options.map((option) => (
					<button
						key={option.value}
						type="button"
						className="demo-theme-switch__button"
						data-theme-mode-value={option.value}
						aria-pressed="false"
					>
						{option.label}
					</button>
				))}
			</div>
		</div>
	);
};
