import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllProducts, deleteProduct } from '@/services/product';
import { Product } from '@/models';

import { BaseLayout } from '@/components/layout';
import { ProductTable,DeleteProductDialog } from '@/components/products';
import { Button } from '@/components/ui/button.tsx';
import { Skeleton } from '@/components/ui/skeleton'; 

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleOpenModal(product: Product) {
    setProductToDelete(product);
    setModalOpen(true);
  }

  async function handleConfirmDelete() {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id);
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        setProductToDelete(null);
        setModalOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <BaseLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lista de Productos</h2>
        <Button onClick={() => navigate('/products/new')}>Nuevo Producto</Button>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <ProductTable
          products={products}
          onEdit={(id) => navigate(`/products/${id}`)}
          onDelete={handleOpenModal}
        />
      )}
      <DeleteProductDialog
        isOpen={isModalOpen}
        product={productToDelete}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </BaseLayout>
  );
};

export default ProductListPage;
