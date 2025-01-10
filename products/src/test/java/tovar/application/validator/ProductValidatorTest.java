package tovar.application.validator;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import tovar.domain.model.product.Product;

class ProductValidatorTest {

  private ProductValidator productValidator;

  @BeforeEach
  void setUp() {
    productValidator = new ProductValidator();
  }

  @Test
  void shouldReturnErrorWhenProductNameIsEmpty() {
    Product product = new Product();
    product.setName(" ");
    product.setSku("VALIDSKU");
    product.setTotalPrice(100.0);

    List<String> errors = productValidator.validate(product);

    assertEquals(1, errors.size());
    assertEquals("Product name cannot be empty.", errors.get(0));
  }

  @Test
  void shouldReturnErrorWhenSkuIsTooShort() {
    Product product = new Product();
    product.setName("Valid Product");
    product.setSku("12");
    product.setTotalPrice(100.0);

    List<String> errors = productValidator.validate(product);

    assertEquals(1, errors.size());
    assertEquals("sku cannot have less than 8 character", errors.get(0));
  }

  @Test
  void shouldReturnErrorWhenTotalPriceIsNegative() {
    Product product = new Product();
    product.setName("Valid Product");
    product.setSku("VALIDSKU");
    product.setTotalPrice(-10.0);

    List<String> errors = productValidator.validate(product);

    assertEquals(1, errors.size());
    assertEquals("Total price cannot be less than 0", errors.get(0));
  }

  @Test
  void shouldReturnMultipleErrorsForInvalidProduct() {
    Product product = new Product();
    product.setName("");
    product.setSku("12");
    product.setTotalPrice(-10.0);

    List<String> errors = productValidator.validate(product);

    assertEquals(3, errors.size());
    assertEquals("Product name cannot be empty.", errors.get(0));
    assertEquals("sku cannot have less than 8 character", errors.get(1));
    assertEquals("Total price cannot be less than 0", errors.get(2));
  }

  @Test
  void shouldReturnNoErrorsForValidProduct() {
    Product product = new Product();
    product.setName("Valid Product");
    product.setSku("VALIDSKU");
    product.setTotalPrice(100.0);

    List<String> errors = productValidator.validate(product);

    assertEquals(0, errors.size());
  }
}
