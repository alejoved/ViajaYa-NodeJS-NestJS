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
