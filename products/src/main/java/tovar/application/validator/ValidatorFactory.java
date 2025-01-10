package tovar.application.validator;

import java.util.HashMap;
import java.util.Map;
import tovar.domain.model.product.Product;
import tovar.domain.model.validator.Validator;

public class ValidatorFactory {
  private static final Map<Class<?>, Validator<?>> validators = new HashMap<>();
  static {
    validators.put(Product.class, new ProductValidator());
    validators.put(Product.class, new ProductValidator());
  }

  @SuppressWarnings("unchecked")
  public static <T> Validator<T> getValidator(Class<T> clazz) {
    return (Validator<T>) validators.get(clazz);
  }
}
