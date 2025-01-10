package tovar.infrastructure.adapter.rest.controllers;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import tovar.domain.model.base.BaseEntity;
import tovar.domain.service.IGenericCrudService;
import tovar.infrastructure.adapter.rest.ValidateModel;

import java.util.List;
import java.util.Optional;

import io.smallrye.mutiny.Uni;

@ApplicationScoped
@ValidateModel
public abstract class BaseController<D extends BaseEntity<K>, K> {

  protected abstract IGenericCrudService<D, K> getService();

  @GET
  @Path("/{id}")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<Optional<D>> getById(@PathParam("id") K id) {
    return getService().getById(id);
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<List<D>> getAll() {
    return getService().getAll();
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<D> save(D dto) {
    return getService().create(dto);
  }

  @PUT
  @Path("/{id}")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<D> update(@PathParam("id") K id, D dto) {
    dto.setId(id);
    return getService().update(dto);
  }

  @DELETE
  @Path("/{id}")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<Void> delete(@PathParam("id") K id) {
    return getService().delete(id);
  }
}
