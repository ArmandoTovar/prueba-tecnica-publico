# Documentación del Proyecto: CRUD de Productos

## Resumen del Proyecto
Este proyecto es un sistema CRUD de productos implementado con una arquitectura moderna y escalable que incluye:

- **Gateway**: Desarrollado con Spring Boot, actúa como punto de entrada para las peticiones hacia los servicios internos.
- **Servicio de Negocio**: Implementado con Quarkus y Reactive Panache, sigue principios de arquitectura limpia para la gestión de productos.
- **Frontend**: Construido con React y Vite, también con arquitectura limpia para asegurar mantenibilidad y escalabilidad.
- **Base de Datos**: PostgreSQL para almacenamiento de datos.
- **Infraestructura**: Manifiesto de Kubernetes que despliega todos los componentes.

Cada módulo tiene una imagen Docker optimizada para producción.

---

## Estructura del Proyecto

### Directorios Principales

- `/gateway`: Contiene el código fuente del Gateway.
- `/products`: Código fuente del servicio de negocio (Quarkus).
- `/frontend`: Aplicación frontend con Vite y React.
- `/k8s-manifests`: Manifiestos de Kubernetes para desplegar el proyecto completo.

---

## Instrucciones de Uso

### 1. Requisitos Previos

- Docker y Docker Compose instalados.
- Un clúster de Kubernetes en funcionamiento (docker-desktop ,Minikube, Kind, EKS, etc.).
- `kubectl` configurado para comunicarse con el clúster.
- Ingress Controller instalado en Kubernetes.

### 2. Construcción de Imágenes Docker

Desde la raíz del proyecto, ejecuta:

```bash
# Construir imagen del Gateway
cd gateway
./mvnw package -DskipTests
docker build -t docker.io/<usuario>/blautech-gateway:latest -f "./DevOps/dockerfile"  .
# Construir imagen del Servicio de Negocio
cd ../products
./mvnw compile quarkus:build
docker build -f src/main/docker/Dockerfile.jvm -t docker.io/<usuario>/blautech-products:latest .

# Construir imagen del Frontend
cd ../frontend
docker build -t docker.io/<usuario>/blautech-front:latest -f "./DevOps/dockerfile" .
```

Sube las imágenes a un registro (Docker Hub, Amazon ECR, etc.):

```bash
docker push docker.io/<usuario>/blautech-gateway:latest
docker push docker.io/<usuario>/blautech-products:latest
docker push docker.io/<usuario>/blautech-front:latest
```

### 3. Despliegue en Kubernetes

1. Aplica los manifiestos:

```bash
kubectl apply -f manifest.yaml
```

2. Verifica que todos los pods estén en ejecución:

```bash
kubectl get pods
kubectl get svc
```

3. Configura el archivo `/etc/hosts` para mapear los hosts locales:

```bash
127.0.0.1 frontend.local
127.0.0.1 api-gateway.local
```

### 4. Acceso a la Aplicación

- **Frontend**: [http://frontend.local](http://frontend.local)
- **API Gateway**: [http://api-gateway.local](http://api-gateway.local)

---

## Detalles de los Componentes

### 1. **Frontend**

- Framework: React + Vite.
- Arquitectura limpia para separación de responsabilidades.
- Despliegue como contenedor Docker.
- Configurado para usar el API Gateway como backend.

### 2. **Gateway**

- Framework: Spring Boot.
- Gestor de rutas hacia el servicio de negocio.
- Configuración de variables de entorno:
  - `URL_PRODUCT`: URL del servicio de negocio.
  - `ORIGINS`: Orígenes permitidos para CORS.
- Endpoints disponibles:
  - `/products`: CRUD de productos.

### 3. **Servicio de Negocio**

- Framework: Quarkus con Reactive Panache.
- Arquitectura limpia y enfoque reactivo.
- Base de datos: PostgreSQL.
- Variables de entorno:
  - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.
- Endpoints:
  - `GET /products`: Obtener lista de productos.
  - `POST /products`: Crear un producto.
  - `PUT /products/{id}`: Actualizar producto.
  - `DELETE /products/{id}`: Eliminar producto.

### 4. **Base de Datos**

- Motor: PostgreSQL.
- Configurado para usarse en el clúster con un Secret para las credenciales.
- Secret (`postgres-secret`):
  - `username`: `postgres`.
  - `password`: `securepass`.

---

## Conexión a la Base de Datos

### Desde un Pod en Kubernetes
Puedes conectarte a la base de datos PostgreSQL desde cualquier Pod en el clúster utilizando el siguiente comando:

```bash
kubectl exec -it <nombre-del-pod> -- psql -h postgres -U postgres -d productdb
```

Cuando se te pida la contraseña, usa el valor decodificado del Secret `postgres-secret`.

### Desde tu Máquina Local
1. Realiza un port-forward al servicio de PostgreSQL:

```bash
kubectl port-forward svc/postgres 5432:5432
```

2. Conéctate a la base de datos usando un cliente como `psql`:

```bash
psql -h localhost -U postgres -d productdb
```

3. Ingresa la contraseña cuando se solicite.

### Decodificar Credenciales del Secret
Si necesitas las credenciales en texto plano:

```bash
kubectl get secret postgres-secret -o jsonpath="{.data.username}" | base64 --decode
kubectl get secret postgres-secret -o jsonpath="{.data.password}" | base64 --decode
```

### Herramientas GUI
Puedes usar herramientas como DBeaver, pgAdmin o DataGrip para conectarte a la base de datos. Configura las opciones de conexión de la siguiente manera:

- **Host**: `localhost` (o `postgres` si está dentro del clúster).
- **Puerto**: `5432`.
- **Usuario**: `postgres`.
- **Base de datos**: `productdb`.
- **Contraseña**: La obtenida del Secret.

## Escalabilidad y Optimizaciones

- **Frontend**:
  - Imágenes Docker optimizadas con multi-stage builds.
  - Recursos Kubernetes configurados (límites y solicitudes).
- **Gateway y Servicio**:
  - Configuración reactiva para manejar altas cargas de peticiones.
  - Replicas configuradas para garantizar disponibilidad.
- **Base de Datos**:
  - Escalable mediante StatefulSets (opcional).

---

## Troubleshooting

1. Verifica logs de los pods:

```bash
kubectl logs <pod-name>
```

2. Revisa eventos en el clúster:

```bash
kubectl get events
```

3. Verifica conectividad entre servicios:

```bash
kubectl exec -it <pod-name> -- curl http://<service-name>
```

---

## Futuras Mejoras

1. Implementar monitorización con Prometheus y Grafana.
2. Configurar CI/CD para automatizar despliegues.
3. Agregar autenticación y autorización en el API Gateway, puede ser mediante auth2 con keycloack o google aouth2.
4. Añadir pruebas unitarias , de integración y E2E.
5. Agregar Paginacion y Cache con políticas de retenciones, se puede usar caché en memoria o redis aprovechando el API de quarkus.
6. Retornar objeto en lugar de array para extensibilidad y versionamiento de API.
7. Documentación del API con openapi, ya estan las dependencias instaladas.

---

¡El sistema está listo para ser desplegado y utilizado! Si tienes alguna pregunta o necesitas soporte adicional, no dudes en contactarme.


