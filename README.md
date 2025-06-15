# 🩺 API de Reservas de paquetes de turismo

Sistema backend para la gestión de citas médicas entre pacientes y doctores. Diseñado para demostrar habilidades como desarrollador backend senior, incluyendo modelado de datos, validaciones de reglas de negocio, estructura limpia, y documentación de API.

---

## 🚀 Funcionalidades

1. Reserva
id_reserva (PK)
fecha_reserva
estado (pendiente, confirmada, cancelada, etc.)
number_nights
cliente_id (FK, referencia al cliente)
vuelo_id (FK, referencia al vuelo)
hotel_id (FK, referencia al hotel)
monto_total

2. Vuelo
id_vuelo (PK)
aerolinea
origen
destino
escalas
fecha_salida
precio

3. Hotel
id_hotel (PK)
nombre
address
city
categoria (número de estrellas)
precio_por_noche

5. Cliente (opcional, si se maneja como entidad)
id_cliente (PK)
identificacion
nombre
email
password

🔗 Relaciones

Reserva - Vuelo
Una reserva solo incluye un vuelo
id_reserva (FK)
id_vuelo (FK)

Reserva - Hotel
Una reserva incluye un hotel
id_reserva (FK)
id_hotel (FK)

Reserva - Servicio Adicional
Una reserva puede incluir cero o más servicios adicionales
id_reserva (FK)
id_servicio (FK)

---

## 📋 Reglas de Negocio

- ⛔ **No se permite solapamiento de citas para el mismo doctor**
- ⛔ **Un paciente no puede tener dos citas al mismo tiempo**
- ✅ `startTime` debe ser anterior a `endTime`
- ✅ Ver disponibilidad de un doctor por día o rango de fechas
- 🧠 Validaciones personalizadas con excepciones claras

---

## 🧪 Tecnologías utilizadas

- **NestJS** - Framework backend (Node.js)
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **Swagger** - Documentación automática de la API
- **Jest** - Testing unitario
- **Docker** - Entorno de desarrollo reproducible

---

## 📁 Estructura del Proyecto

```
src/
├── doctors/
├── patients/
├── appointments/
├── common/
test/
```

---

## 🎯 Qué demuestra este proyecto

| Área                    | Habilidad |
|-------------------------|-----------|
| Relaciones entre entidades  | Manejo de `ManyToOne`, `OneToMany` |
| Validaciones de negocio     | Manejo de solapamientos y rangos horarios |
| Arquitectura limpia         | Separación por módulos, uso de DTOs, servicios, controladores |
| Testing                     | Unit tests para la lógica de validación |
| Seguridad                   | Autenticación con JWT y control de roles |
| DevOps                      | Docker, Docker Compose, scripts de CI/CD |

---

## 🧪 Scripts

```bash
# instalar dependencias
npm install

# correr la app
npm run start:dev

# correr tests
npm run test

# ver docs Swagger
GET /api (una vez corriendo el servidor)
```

---

## 📦 Docker

```bash
docker-compose up --build
```
---

## Arquitecturas populares

### Arquitectura Hexagonal
✅ ¿Por qué se usa?
Facilita la separación de la lógica de negocio del resto de la infraestructura (como bases de datos, controladores web, mensajería).
🧩 En un microservicio típico:
Dominio: núcleo del sistema (modelos y reglas).
Aplicación: casos de uso.
Adapters: REST controllers, repositorios, clientes externos.
Ports: interfaces para entrada (controladores) y salida (repositorios, clientes).

### Arquitectura en capas
🧩 Estructura típica:
Presentation Layer (controladores REST, UI)
Service Layer (lógica de negocio)
Repository/DAO Layer (acceso a datos)
Database (persistencia)
✅ Pros:
Fácil de entender y aplicar.
Muy común en aplicaciones web tradicionales.
Bien soportada por frameworks como Spring.
❌ Contras:
Alta dependencia entre capas.
Poca separación entre infraestructura y dominio.
Puede volverse monolítica si no se gestiona bien.

### Clean Architecture
🧩 Estructura:
Entidades (Entities): lógica del dominio.
Casos de uso (Use Cases): reglas específicas de la aplicación.
Interfaces (Gateways): definiciones de comunicación.
Frameworks/Drivers: controladores, DB, red.
✅ Pros:
Aislamiento total del dominio frente a tecnologías externas.
Altamente testeable y mantenible.
❌ Contras:
Mayor complejidad inicial.
Puede sentirse “overkill” para proyectos pequeños.

### Arquitectura orientada a dominio
🧩 Estructura:
Bounded Contexts, Agregados, Entidades, Repositorios, Servicios de Dominio.
Compatible con hexagonal, onion, clean, etc.
✅ Pros:
Fuerte alineación entre modelo de negocio y código.
Útil en sistemas complejos y con lógica rica.
❌ Contras:
Requiere conocimiento profundo de DDD.
Innecesario para proyectos simples o CRUD.

🧠 Clean Architecture: Visión general
Clean Architecture separa las responsabilidades en capas concéntricas, priorizando la independencia del negocio frente a frameworks, bases de datos o protocolos externos.

🗂️ Estructura de carpetas típica
src/
├── domain/
│   ├── model/
│   └── repository/
├── application/
│   ├── usecase/
│   ├── command/ (o dto/)
│   ├── port/
│   └── model/ (opcional para respuestas)
├── adapter/
│   ├── controller/
│   ├── dto/
│   └── mapper/
├── infrastructure/
│   ├── repository/
│   └── config/
└── main.ts / app.module.ts

1. 📦 domain/ (Nivel más interno)
Responsabilidad: Define las reglas de negocio puras. Esta capa no depende de nada externo.
model/: Entidades del dominio con lógica de negocio. Ej: User, Order, Auth, etc.
repository/: Interfaces para acceder a datos desde el dominio (ej: UserRepositoryInterface).
✅ Nunca debe importar cosas de NestJS, TypeORM, Axios, etc.

2. ⚙️ application/
Responsabilidad: Casos de uso. Aquí se orquesta la lógica de negocio con inputs del mundo exterior.
usecase/: Casos de uso como RegisterUserUseCase, LoginUseCase, CreateReservationUseCase, etc.
command/: Objetos que representan la intención del usuario (input del caso de uso).
port/: Interfaces de entrada (RegisterUseCaseInterface) y salida (EmailService, AuthRepositoryInterface).
model/: (Opcional) modelos que representan salidas (puedes usarlos en vez de devolver directamente DTOs).
✅ Puede depender de domain/, pero no de adapter/ ni infrastructure/.

3. 🌐 adapter/
Responsabilidad: Adapta la comunicación externa al sistema.
controller/: Controladores HTTP (o GraphQL, gRPC, etc.). Aquí llega el request.
dto/: Objetos que representan datos del request/response HTTP. Solo usados aquí.
mapper/: Opcional, traduce entre DTO ↔ Command, o ResponseModel ↔ DTO.
✅ Depende de application/, nunca al revés.

4. 🧱 infrastructure/
Responsabilidad: Implementación concreta de tecnologías externas.
repository/: Implementación concreta de las interfaces del dominio usando TypeORM, Sequelize, etc.
config/: Configuración de seguridad, JWT, guards, strategies, etc.
También puedes tener: services/ (para enviar emails, logs, etc.)
✅ Implementa interfaces del domain o application pero no las define.

5. 🚀 main.ts y app.module.ts
Se usa para bootstrapping y registrar dependencias.
Aquí haces el binding: provide: 'AuthRepositoryInterface', useClass: AuthRepository.


| Objeto       | Se mapea a...               | Capa                        |
| ------------ | --------------------------- | --------------------------- |
| `RequestDTO` | → `Entidad de dominio`      | `interface → domain`        |
| `Dominio`    | → `Entidad de persistencia` | `domain → infrastructure`   |
| `Entity`     | → `Dominio`                 | `infraestructura → dominio` |
| `Dominio`    | → `ResponseDTO`             | `domain → interface`        |
