package tovar.gateway.config.security;

import tovar.gateway.config.properties.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final SecurityProperties securityProperties;

  @Bean
  public SecurityWebFilterChain securityFilterChain(@NonNull ServerHttpSecurity httpSecurity) {
    return httpSecurity
        .csrf(ServerHttpSecurity.CsrfSpec::disable)
        .authorizeExchange(exchangeSpec -> exchangeSpec
            .pathMatchers(securityProperties.getWhiteListArray())
            .permitAll()
            .anyExchange().authenticated())
        .cors(corsSpec -> corsSpec.configurationSource(exchange -> {
          var config = new org.springframework.web.cors.CorsConfiguration();
          config.setAllowedOrigins(java.util.List.of("*"));
          config.setAllowedMethods(java.util.List.of("*"));
          config.setAllowedHeaders(java.util.List.of("*"));
          return config;
        }))
        .build();
  }
}
