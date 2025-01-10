package tovar.application.validator;

import java.util.ArrayList;
import java.util.List;
import tovar.domain.model.product.Product;
import tovar.domain.model.validator.Validator;

// private ProductStatus status;
public class ProductValidator implements Validator<Product> {
  @Override
  public List<String> validate(Product entity) {
    List<String> errors = new ArrayList<>();
    if (entity.getName() == null || entity.getName().trim().isBlank())
      errors.add("Product name cannot be empty.");
    if (entity.getSku().length() < 3)
      errors.add("sku cannot have less than 8 character");
    if (entity.getTotalPrice() != null && entity.getTotalPrice() < 0)
      errors.add("Total price cannot be less than 0");
    return errors;
  }

}
