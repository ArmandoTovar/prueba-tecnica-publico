
import React from 'react';
import { Product, ProductStatus } from '@/models';
import { TableRow, TableCell } from '@/components/ui/table.tsx';
import { Button } from '@/components/ui/button.tsx';

interface ProductRowProps {
  product: Product;
  onEdit: (productId: string) => void;
  onDelete: (product: Product) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.sku}</TableCell>
      <TableCell>{product.total_price}</TableCell>
      <TableCell>{ProductStatus[product.status]}</TableCell>
      <TableCell className="space-x-2">
        <Button variant="outline" onClick={() => onEdit(product.id)}>
          Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(product)}>
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
};
