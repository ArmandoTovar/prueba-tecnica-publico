package tovar.infrastructure.adapter.services;

import java.util.UUID;

import io.quarkus.hibernate.reactive.panache.common.WithSession;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import tovar.application.service.ProductCrudService;
import tovar.domain.model.product.Product;
import tovar.infrastructure.persistent.entities.ProductEntity;
import tovar.infrastructure.persistent.repositories.BaseRepositoryImpl;
import tovar.infrastructure.persistent.repositories.ProductRepositoryImpl;

@ApplicationScoped
@WithSession
public class ProductServiceImpl extends ProductCrudService {

  @Inject
  private ProductRepositoryImpl productRepository;

  @Override
  protected BaseRepositoryImpl<Product, ProductEntity, UUID> getRepository() {
    return productRepository;
  }

}
