const islandModules = {
	cart: '/src/islands/Cart.entry.jsx',
	product_search: '/src/islands/ProductSearch.entry.jsx',
};

export const resolveIslandModule = (islandKey) => islandModules[islandKey] || null;

export const getAllIslandModuleSpecifiers = () => Object.values(islandModules);
