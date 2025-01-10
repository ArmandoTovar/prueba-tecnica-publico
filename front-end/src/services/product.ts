

import { Product,ApiProduct } from '@/models';
import { productAdapter } from '@/adapters'

const API_URL ='http://api-gateway.local/api/products';

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const productsResponse = await response.json() as ApiProduct[]
  return productsResponse.map((p) => productAdapter(p));
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Error fetching product');
  }
  
  const productResponse = await response.json() as ApiProduct
  return productAdapter(productResponse);
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Error creating product');
  }
  const productResponse = await response.json() as ApiProduct
  return productAdapter(productResponse);
}

export async function updateProduct(id: string, product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Error updating product');
  }
  const productResponse = await response.json() as ApiProduct
  return productAdapter(productResponse);
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting product');
  }
}
