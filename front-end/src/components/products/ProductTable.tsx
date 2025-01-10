
import React from 'react';
import { Product  } from '@/models';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table.tsx';
import { ProductRow } from './ProductRow';

interface ProductTableProps {
  products: Product[];
  onEdit: (productId: string) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable ({ products, onEdit, onDelete }) : React.ReactElement  {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};
