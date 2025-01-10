package tovar.gateway.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(info = @Info(title = "API Gateway", description = "Global APIs documentation", version = "1.0", contact = @Contact(name = "Armando Tovar", email = "ing.tovararmando@gmail.com")), servers = {
    @Server(url = "http://localhost:${server.port}", description = "Local"),
    @Server(url = "http://api-gateway:${server.port}", description = "Docker"),
    @Server(url = "https://gateway.prueba-tecnica-dev.site", description = "Dev"),
})

public class OpenApiConfiguration {
}
