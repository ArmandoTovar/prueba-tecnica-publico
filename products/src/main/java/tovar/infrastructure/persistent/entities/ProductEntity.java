package tovar.infrastructure.persistent.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tovar.domain.model.product.ProductStatus;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "products")
public class ProductEntity extends AuditableEntity {
  @Id
  @GeneratedValue
  private UUID id;

  @Column(length = 50)
  private String name;

  @Column(length = 12)
  private String sku;

  @Column(name = "total_price", precision = 10, nullable = false)
  private Double totalPrice;

  @Enumerated(EnumType.STRING)
  private ProductStatus status;

}
