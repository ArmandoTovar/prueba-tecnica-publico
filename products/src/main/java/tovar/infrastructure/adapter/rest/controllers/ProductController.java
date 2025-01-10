package tovar.infrastructure.adapter.rest.controllers;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import tovar.domain.model.product.Product;
import tovar.domain.service.IGenericCrudService;
import tovar.infrastructure.adapter.rest.ValidateModel;
import tovar.infrastructure.adapter.services.ProductServiceImpl;

import java.util.UUID;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@ValidateModel
@ApplicationScoped
public class ProductController extends BaseController<Product, UUID> {

  @Inject
  private ProductServiceImpl productService;

  @Override
  protected IGenericCrudService<Product, UUID> getService() {
    return productService;
  }

}
