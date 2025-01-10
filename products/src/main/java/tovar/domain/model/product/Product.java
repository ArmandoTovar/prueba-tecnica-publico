package tovar.domain.model.product;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import tovar.domain.model.base.AuditableEntity;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Product extends AuditableEntity<UUID> {

  @JsonAlias(value = { "product_name", "name" })
  @JsonProperty("product_name")
  private String name;

  private String sku;

  @JsonAlias(value = { "total_price", "totalPrice" })
  @JsonProperty("total_price")
  private Double totalPrice;

  private ProductStatus status;

}
