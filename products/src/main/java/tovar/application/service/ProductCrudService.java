package tovar.application.service;

import java.util.UUID;

import lombok.AllArgsConstructor;
import tovar.domain.model.product.Product;

@AllArgsConstructor
public abstract class ProductCrudService extends GenericCrudService<Product, UUID> {

}
