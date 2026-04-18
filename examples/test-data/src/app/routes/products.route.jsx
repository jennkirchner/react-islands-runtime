import React from 'react';
import { PlpProductsBlock } from 'react-islands';
import { createPlpProductsBlock } from '../../../../_shared/productGridBlock.js';
import { listProducts } from '../../../models/product.model.js';

export const loader = async () => {
	const result = await listProducts({ limit: 20 });
	return { products: result?.products || [] };
};

export const head = () => ({ title: 'Products' });

export const Page = ({ products }) => {
	const block = createPlpProductsBlock({ title: 'Products', products });

	return (
		<main>
			<h1 style={{ marginTop: 0 }}>Products</h1>
			<PlpProductsBlock block={block} />
		</main>
	);
};
