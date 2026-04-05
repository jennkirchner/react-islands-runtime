import React from 'react';
import { ThemeModeSwitch } from '../../../../_shared/components/ThemeModeSwitch.jsx';

export const loader = async () => ({ siteName: 'contentstack+commercetools' });

export const head = (props) => ({ title: props.siteName });

export const Layout = ({ children, siteName }) => {
	return (
		<div className="app-shell">
			<header className="app-shell__header">
				<div className="app-shell__brand">
					<span className="app-shell__eyebrow">Integrated Design System</span>
					<strong className="app-shell__name">{siteName}</strong>
				</div>
				<nav className="app-shell__nav">
					<a href="/">
						Home
					</a>
					<a href="/products">Products</a>
				</nav>
				<div className="app-shell__actions">
					<ThemeModeSwitch />
				</div>
			</header>

			<div className="app-shell__main">{children}</div>

			<footer className="app-shell__footer">
				© {new Date().getFullYear()}
			</footer>
		</div>
	);
};
