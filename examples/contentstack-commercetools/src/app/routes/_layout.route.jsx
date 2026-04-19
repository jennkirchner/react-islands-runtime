import React from 'react';
import { ProductSearchSSR, ThemeModeSwitch } from 'react-islands';
import { demoComponentDesignSystem } from '../../../server/designSystem.js';

export const loader = async () => ({ siteName: 'contentstack+commercetools' });

export const head = (props) => ({ title: props.siteName });

export const Layout = ({ children, siteName }) => {
	const primaryLinks = ['Shop', 'Weekly Ad', 'Savings', 'Meal Solutions', 'Entertaining', 'Pharmacy'];
	const promoLinks = [
		'Products',
		'Promotions',
		'Coupons',
		'Valentine Sale',
		'New Arrivals',
		'Loyalty Rewards',
		'Holiday Specials',
		'Buy One Get One Free',
		'National Brands',
	];

	return (
		<div className="shell">
			<header className="shell__header">
				<div className="dw-header__utility">
					<a className="dw-header__pickup" href="/products">
						<span className="dw-header__pickup-icon" aria-hidden="true">
							+
						</span>
						<span>Pick Up at D&amp;W Fresh Market Downtown</span>
					</a>
					<div className="dw-header__search">
						<ProductSearchSSR
							placeholder="Search or ask a question"
							searchPageUrl="/products"
							autoFocus={false}
							designSystem={demoComponentDesignSystem}
						/>
					</div>
					<a className="dw-header__account" href="/products">
						Sign Up Or Log In
					</a>
				</div>

				<div className="dw-header__main">
					<a className="dw-header__logo" href="/" aria-label={siteName}>
						<span className="dw-header__logo-mark">
							D<span>&amp;</span>W
						</span>
						<span className="dw-header__logo-copy">Fresh Market</span>
					</a>

					<nav className="dw-header__nav" aria-label="Primary">
						{primaryLinks.map((label) => (
							<a key={label} href="/products">
								{label}
							</a>
						))}
					</nav>

					<div className="dw-header__actions">
						<a className="dw-header__cart" href="/products">
							<span>Cart</span>
							<strong>3</strong>
						</a>
						<div className="dw-header__theme">
							<ThemeModeSwitch designSystem={demoComponentDesignSystem} />
						</div>
					</div>
				</div>

				<nav className="dw-header__subnav" aria-label="Promotions">
					{promoLinks.map((label) => (
						<a key={label} href="/products">
							{label}
						</a>
					))}
				</nav>
			</header>

			<div className="shell__main">{children}</div>

			<footer className="shell__footer">© {new Date().getFullYear()}</footer>
		</div>
	);
};
