import { AnyObjectSchema, ValidationError } from 'yup';
import { useCallback } from 'react';

interface ValidationResolverOutput<T> {
  values: T;
  errors: Record<
    keyof T,
    {
      type: string;
      message: string;
    }
  >;
}

export const useYupValidationResolver = <T>(validationSchema: AnyObjectSchema) =>
  useCallback(
    async (data: T): Promise<ValidationResolverOutput<T>> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {} as ValidationResolverOutput<T>['errors'],
        };
      } catch (error) {
        const yupError = error as ValidationError;

        return {
          values: {} as T,
          errors: yupError.inner.reduce<Record<keyof T, { type: string; message: string }>>(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path as keyof T]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {} as Record<keyof T, { type: string; message: string }>
          ),
        };
      }
    },
    [validationSchema]
  );
