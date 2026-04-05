// Local product data (surf shop)
import { listSurfProducts, getSurfProductBySku } from '../../_shared/app-data/surf-shop.js';

export const getProducts = async () => listSurfProducts().products;

export const getProductBySku = async (sku) => getSurfProductBySku(sku);
