package tovar.domain.repository;

import java.util.UUID;

import tovar.domain.model.product.Product;

public interface ProductRepository extends IGenericRepository<Product, UUID> {
}
