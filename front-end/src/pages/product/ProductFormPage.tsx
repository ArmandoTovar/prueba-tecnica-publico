import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseLayout } from '@/components/layout';
import { ProductForm,ConfirmationModal } from '@/components/products';
import { getProductById, createProduct, updateProduct } from '@/services/product';
import { Product, ProductStatus } from '@/models';

const ProductFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    sku: '',
    total_price: 0,
    status: Object.keys(ProductStatus)[0],
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      getProductById(id).then(setProduct).catch(console.error);
    }
  }, [id, isEditMode]);

  const handleSubmit = async (values: Product) => {
    try {
      if (JSON.stringify(values) === JSON.stringify(product)) {
        setModalMessage('No se han realizado cambios.');
        setModalOpen(true);
        return;
      }
      if (isEditMode) {
        await updateProduct(id!, values);
        setModalMessage('Producto actualizado exitosamente.');
      } else {
        await createProduct(values);
        setModalMessage('Producto creado exitosamente.');
      }
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BaseLayout>
      <ProductForm
        defaultValues={product}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => {
          setModalOpen(false);
          navigate('/');
        }}
      />
    </BaseLayout>
  );
};

export default ProductFormPage;
