# 🩺 API de Reservas de Citas Médicas

Sistema backend para la gestión de citas médicas entre pacientes y doctores. Diseñado para demostrar habilidades como desarrollador backend senior, incluyendo modelado de datos, validaciones de reglas de negocio, estructura limpia, y documentación de API.

---

## 🚀 Funcionalidades

### 👨‍⚕️ Doctores
- CRUD completo
- Campos: `id`, `name`, `specialty`

### 🧑 Pacientes
- CRUD completo
- Campos: `id`, `name`, `email`

### 📆 Citas Médicas
- Crear, listar y cancelar citas
- Campos: `id`, `doctorId`, `patientId`, `startTime`, `endTime`, `notes`

---

## 📋 Reglas de Negocio

- ⛔ **No se permite solapamiento de citas para el mismo doctor**
- ⛔ **Un paciente no puede tener dos citas al mismo tiempo**
- ✅ `startTime` debe ser anterior a `endTime`
- ✅ Ver disponibilidad de un doctor por día o rango de fechas
- 🧠 Validaciones personalizadas con excepciones claras

---

## 🧠 Lógica de validación de conflicto

```ts
// Evita citas solapadas para el doctor
const conflict = await appointmentRepo.findOne({
  where: {
    doctor: { id: doctorId },
    startTime: LessThan(endTime),
    endTime: MoreThan(startTime),
  },
});

if (conflict) {
  throw new ConflictException('El doctor ya tiene una cita en ese horario.');
}
```

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
| Relaciones entre entidades | Manejo de `ManyToOne`, `OneToMany` |
| Validaciones de negocio | Manejo de solapamientos y rangos horarios |
| Arquitectura limpia     | Separación por módulos, uso de DTOs, servicios, controladores |
| Testing                 | Unit tests para la lógica de validación |
| Seguridad (opcional)   | Autenticación con JWT y control de roles |
| DevOps (opcional)      | Docker, Docker Compose, scripts de CI/CD |

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

## ✨ Bonus (opcional)

- 📩 Simulación de envío de notificación al reservar
- 📄 Exportar historial de citas como CSV o PDF
- ⏰ Soporte para zonas horarias
- 🔐 Control de roles: admin / doctor / paciente
