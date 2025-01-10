package tovar.infrastructure.persistent.repositories;

import java.util.UUID;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import tovar.domain.model.product.Product;
import tovar.infrastructure.persistent.entities.ProductEntity;

@ApplicationScoped
public class ProductRepositoryImpl extends BaseRepositoryImpl<Product, ProductEntity, UUID> {
  protected ProductRepositoryImpl() {
    super(ProductEntity.class);
  }

  @Override
  protected Product toDTO(ProductEntity entity) {
    return Product.builder().id(entity.getId()).name(entity.getName()).sku(entity.getSku())
        .status(entity.getStatus())
        .totalPrice(entity.getTotalPrice()).build();
  }

  @Override
  protected Uni<ProductEntity> toEntity(Product dto) {
    return findById(dto.getId()).onItem().ifNull().continueWith(ProductEntity.builder().build()).map(entity -> {
      entity.setId(dto.getId());
      entity.setName(dto.getName());
      entity.setSku(dto.getSku());
      entity.setStatus(dto.getStatus());
      entity.setTotalPrice(dto.getTotalPrice());
      return entity;
    });
  }

}
