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
		<div className="theme-mode-switch" role="group" aria-label={label}>
			<span className="theme-mode-switch__label">{label}</span>
			<div className="theme-mode-switch__options">
				{options.map((option) => (
					<button
						key={option.value}
						type="button"
						className="theme-mode-switch__button"
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
