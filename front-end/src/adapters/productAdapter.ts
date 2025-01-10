import {Product,ApiProduct} from '@/models'
export const productAdapter = (product: ApiProduct): Product => ({
  id: product.id,
  name: product.product_name,
  sku: product.sku,
  total_price: product.total_price,
  status: product.status,
});

