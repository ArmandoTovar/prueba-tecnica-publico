export interface Product {
  id: string;
  name: string;
  sku: string;
  total_price: number;
  status: keyof typeof ProductStatus; 
}
export const ProductStatus= {
	AVAILABLE:"Disponible",
  OUT_OF_STOCK:"Agotado"
} as const;

export interface ApiProduct {
  id: string;
  product_name: string;
  sku: string;
  total_price: number;
  status: keyof typeof ProductStatus; 
}
