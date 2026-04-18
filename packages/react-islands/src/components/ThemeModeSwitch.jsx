import React from 'react';

export const ThemeModeSwitch = ({ includeAuto = false, label = 'Theme' }) => {
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

	return (
		<div className="demo-theme-switch" role="group" aria-label={label}>
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
