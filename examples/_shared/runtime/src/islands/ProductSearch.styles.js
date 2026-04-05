export const productSearchStyles = `
	.search-island__root {
		position: relative;
		width: 100%;
	}

	.search-island__input-wrapper {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px;
		background: #fff;
		border: 1px solid #dee2e6;
		border-radius: var(--radius-surface, 24px);
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.search-island__input-wrapper:focus-within {
		border-color: #2d6a4f;
		box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.15);
	}

	.search-island__input {
		flex: 1;
		padding: 10px 16px;
		border: none;
		background: transparent;
		font-size: 1rem;
		outline: none;
	}

	.search-island__spinner {
		width: 18px;
		height: 18px;
		margin-right: 8px;
		border: 2px solid #dee2e6;
		border-top-color: #2d6a4f;
		border-radius: 50%;
		animation: search-island-spin 0.8s linear infinite;
	}

	@keyframes search-island-spin {
		to {
			transform: rotate(360deg);
		}
	}

	.search-island__btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 10px 14px;
		background: #2d6a4f;
		color: white;
		border: 1px solid #0b5;
		border-radius: var(--radius-surface, 24px);
		cursor: pointer;
	}

	.search-island__btn svg {
		width: 22px;
		height: 22px;
	}

	.search-island__btn:hover {
		background: #1b4332;
	}

	.search-island__dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		max-height: 420px;
		overflow-y: auto;
		z-index: 1000;
		background: white;
		border: 1px solid #dee2e6;
		border-radius: var(--radius-surface, 24px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.search-island__tabs {
		display: flex;
		border-bottom: 1px solid #dee2e6;
	}

	.search-island__tab {
		flex: 1;
		padding: 10px;
		background: none;
		border: none;
		font-size: 0.875rem;
		color: #6c757d;
		cursor: pointer;
	}

	.search-island__tab:hover {
		background: #f8f9fa;
	}

	.search-island__tab--active {
		color: #2d6a4f;
		font-weight: 600;
		box-shadow: inset 0 -2px 0 #2d6a4f;
	}

	.search-island__list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.search-island__item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		cursor: pointer;
	}

	.search-island__item:hover,
	.search-island__item--selected {
		background: #f8f9fa;
	}

	.search-island__item-img {
		width: 44px;
		height: 44px;
		object-fit: cover;
		background: #f8f9fa;
		border-radius: var(--radius-image, 16px);
	}

	.search-island__item-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.search-island__item-text {
		font-weight: 500;
	}

	.search-island__item-badge {
		display: inline-block;
		width: fit-content;
		margin-top: 2px;
		padding: 2px 6px;
		font-size: 0.7rem;
		font-weight: 600;
		color: #6c757d;
		background: #e9ecef;
		border-radius: 4px;
	}

	.search-island__item-price {
		margin-top: 2px;
		font-size: 0.875rem;
		font-weight: 600;
		color: #2d6a4f;
	}

	.search-island__item-icon {
		color: #6c757d;
		flex-shrink: 0;
	}

	.search-island__recent-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 16px;
		font-size: 0.75rem;
		font-weight: 600;
		color: #6c757d;
		text-transform: uppercase;
		border-bottom: 1px solid #f1f3f4;
	}

	.search-island__clear-btn {
		background: none;
		border: none;
		font-size: 0.75rem;
		color: #dc3545;
		cursor: pointer;
		text-transform: none;
	}

	.search-island__clear-btn:hover {
		text-decoration: underline;
	}

	.search-island__empty {
		padding: 24px 16px;
		text-align: center;
		color: #6c757d;
	}

	.search-highlight {
		padding: 0 1px;
		background: #fff3cd;
		border-radius: 2px;
	}
`;
