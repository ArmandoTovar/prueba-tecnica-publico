
import React , {useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Product, ProductStatus } from '@/models';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useYupValidationResolver } from '@/hooks';
import * as Yup from 'yup';

const productValidationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  sku: Yup.string().max(12, 'Máximo 12 caracteres').required('SKU es requerido'),
  total_price: Yup.number().required('Precio es requerido').positive('Debe ser positivo'),
  status: Yup.string().required('Estado es requerido'),
});

interface ProductFormProps {
  defaultValues: Product;
  onSubmit: (values: Product) => void;
  isEditMode: boolean;
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  isEditMode,
}: ProductFormProps): React.ReactElement {
  const resolver = useYupValidationResolver(productValidationSchema);
  const navigate = useNavigate();
  const { control, handleSubmit, formState,reset } = useForm<Product>({
    defaultValues,
    resolver,
  });
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input id="name" placeholder="Ej: Laptop Pro" className="mt-1" {...field} />
          )}
        />
        {formState.errors.name && (
          <p className="text-sm text-red-500">{formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="sku">SKU</Label>
        <Controller
          name="sku"
          control={control}
          render={({ field }) => (
            <Input id="sku" placeholder="Máximo 12 caracteres" className="mt-1" {...field} />
          )}
        />
        {formState.errors.sku && (
          <p className="text-sm text-red-500">{formState.errors.sku.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="total_price">Precio</Label>
        <Controller
          name="total_price"
          control={control}
          render={({ field }) => (
            <Input
              id="total_price"
              type="number"
              placeholder="Ej: 1499.99"
              className="mt-1"
              {...field}
            />
          )}
        />
        {formState.errors.total_price && (
          <p className="text-sm text-red-500">{formState.errors.total_price.message}</p>
        )}
      </div>

      <div>
        <Label>Estado</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => field.onChange(val)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ProductStatus).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {formState.errors.status && (
          <p className="text-sm text-red-500">{formState.errors.status.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit">{isEditMode ? 'Actualizar' : 'Crear'}</Button>
        <Button variant="outline" onClick={() => navigate('/')} type="button">
          Cancelar
        </Button>
      </div>
    </form>
  );
};
