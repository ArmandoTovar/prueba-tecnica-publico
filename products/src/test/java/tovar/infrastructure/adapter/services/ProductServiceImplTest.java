package tovar.infrastructure.adapter.services;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import io.smallrye.mutiny.Uni;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import tovar.domain.model.product.Product;
import tovar.infrastructure.persistent.repositories.ProductRepositoryImpl;

class ProductServiceImplTest {

  @Mock
  private ProductRepositoryImpl productRepository;

  @InjectMocks
  private ProductServiceImpl productService;

  private Product sampleProduct;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    sampleProduct = new Product();
    sampleProduct.setId(UUID.randomUUID());
    sampleProduct.setName("Sample Product");
    sampleProduct.setSku("SAMPLE123");
    sampleProduct.setTotalPrice(100.0);
  }

  @Test
  void shouldCreateProduct() {
    when(productRepository.save(sampleProduct)).thenReturn(Uni.createFrom().item(sampleProduct));

    Uni<Product> result = productService.create(sampleProduct);

    Product createdProduct = result.await().indefinitely();
    assertNotNull(createdProduct);
    assertEquals(sampleProduct.getId(), createdProduct.getId());
    assertEquals(sampleProduct.getName(), createdProduct.getName());

    verify(productRepository, times(1)).save(sampleProduct);
  }

  @Test
  void shouldDeleteProductById() {
    UUID productId = sampleProduct.getId();
    when(productRepository.remove(productId)).thenReturn(Uni.createFrom().voidItem());

    Uni<Void> result = productService.delete(productId);
    result.await().indefinitely();
    verify(productRepository, times(1)).remove(productId);
  }

  @Test
  void shouldGetProductById() {
    UUID productId = sampleProduct.getId();
    when(productRepository.getById(productId)).thenReturn(Uni.createFrom().item(Optional.of(sampleProduct)));

    Uni<Optional<Product>> result = productService.getById(productId);

    Optional<Product> fetchedProduct = result.await().indefinitely();
    assertTrue(fetchedProduct.isPresent());
    assertEquals(sampleProduct.getId(), fetchedProduct.get().getId());
    assertEquals(sampleProduct.getName(), fetchedProduct.get().getName());

    verify(productRepository, times(1)).getById(productId);
  }

  @Test
  void shouldUpdateProduct() {
    when(productRepository.update(sampleProduct)).thenReturn(Uni.createFrom().item(sampleProduct));

    Uni<Product> result = productService.update(sampleProduct);

    Product updatedProduct = result.await().indefinitely();
    assertNotNull(updatedProduct);
    assertEquals(sampleProduct.getId(), updatedProduct.getId());
    assertEquals(sampleProduct.getName(), updatedProduct.getName());

    verify(productRepository, times(1)).update(sampleProduct);
  }

  @Test
  void shouldGetAllProducts() {
    List<Product> productList = List.of(sampleProduct);
    when(productRepository.getAll()).thenReturn(Uni.createFrom().item(productList));

    Uni<List<Product>> result = productService.getAll();

    List<Product> fetchedProducts = result.await().indefinitely();
    assertNotNull(fetchedProducts);
    assertEquals(1, fetchedProducts.size());
    assertEquals(sampleProduct.getId(), fetchedProducts.get(0).getId());

    verify(productRepository, times(1)).getAll();
  }
}
