
# 🌍 ViajaYa — API de Reservas de Paquetes Turísticos (Node.js · NestJS)

[![Build Status](https://github.com/alejoved/ViajaYa-NodeJS-NestJS/actions/workflows/ci.yml/badge.svg)](https://github.com/alejoved/ViajaYa-NodeJS-NestJS/actions)
[![License](https://img.shields.io/github/license/alejoved/ViajaYa-NodeJS-NestJS)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/alejoved/ViajaYa-NodeJS-NestJS)](https://github.com/alejoved/ViajaYa-NodeJS-NestJS)
[![Node.js Version](https://img.shields.io/badge/node-%3E=18.x-green)](https://nodejs.org/)
[![Dockerized](https://img.shields.io/badge/docker-ready-blue)](#docker)

---

Backend REST para gestionar reservas de paquetes turísticos, que incluyen vuelos, hoteles, clientes y servicios adicionales. Desarrollado para mostrar competencias de un backend senior: arquitectura, reglas de negocio, testing, contenedores y documentación.  
Basado en el repositorio oficial ➡️ `ViajaYa-NodeJS-NestJS` de alejoved

---

## 🚀 Funcionalidades

- **Reservas**: CRUD completo con atributos: `id_reserva`, `fecha_reserva`, `estado`, `number_nights`, `cliente_id`, `vuelo_id`, `hotel_id`, `monto_total`  
- **Vuelos**: `id_vuelo`, `aerolinea`, `origen`, `destino`, `escalas`, `fecha_salida`, `precio`  
- **Hoteles**: `id_hotel`, `nombre`, `address`, `city`, `categoria`, `precio_por_noche`  
- (Opcional) **Clientes**: `id_cliente`, `identificacion`, `nombre`, `email`, `password`

---

## 🧩 Reglas de Negocio

- ✅ Cada reserva puede incluir un vuelo, un hotel y varios servicios adicionales  
- ✅ Control de integridad: vuelo y hotel deben existir antes de crear una reserva  
- ❌ No se permiten reservas duplicadas para el mismo cliente y fecha  
- 🚫 Validaciones de estado: no permitir sobreescritura si la reserva está cancelada  
- 📅 Validación de fechas: `fecha_reserva` no puede ser anterior a la fecha actual

---

## ⚙️ Tecnologías y Herramientas

| Área               | Herramienta                         |
|--------------------|------------------------------------|
| Framework          | NestJS (Node.js + TypeScript)      |
| ORM                | TypeORM + PostgreSQL              |
| Documentación API  | Swagger (OpenAPI)                 |
| Testing            | Jest                              |
| Contenedores       | Docker + Docker Compose           |
| CI/CD              | GitHub Actions (workflow incluido)|
| Linter/Formatter   | ESLint + Prettier                 |

---

## 📁 Estructura del Proyecto

```
src/
├── reservations/       # Módulo principal: controladores, servicios, DTOs
├── flights/            # Entidad Vuelo
├── hotels/             # Entidad Hotel
├── customers/          # Entidad Cliente (opcional)
├── common/             # Utilidades, excepciones, guards, pipes
├── config/             # Configuración global y por entorno
└── main.ts             # Configuración inicial de Nest y Swagger
test/                   # Pruebas unitarias con Jest
k8s/                    # Manifiestos Kubernetes
```

✔️ Modularidad por dominios  
✔️ Separación de lógica y adaptadores  
✔️ Documentación centralizada de DTOs y errores

---

## 🧪 Instalación y Ejecución Local

```bash
# Instalar dependencias
npm install

# Levantar en modo desarrollo
npm run start:dev

# Ejecutar pruebas
npm run test

# Acceder a Swagger
http://localhost:3000/api
```

---

## 📦 Docker

```bash
# Construir imagen
docker-compose build

# Levantar servicio
docker-compose up
```

---

## ☸️ Kubernetes (Minikube)

```bash
minikube start
minikube addons enable metrics-server

# Construir y guardar imagen
docker build -t viajaya-app:latest .
docker save viajaya-app:latest | (eval $(minikube -p minikube docker-env) && docker load)

# Desplegar
kubectl apply -f k8s/

# Ver logs o acceder al servicio
kubectl logs <pod-name>
minikube service viajaya-service
```

---

## 🧠 Buenas Prácticas Aplicadas

- ✅ Arquitectura limpia y modular (Hexagonal / Clean)  
- ✅ Validaciones robustas: DTOs, Pipes, Exceptions  
- ✅ Testing con Jest en lógica crítica  
- ✅ Docker y CI para despliegue reproducible  
- ✅ Documentación dinámica con Swagger

---

## 📌 Qué demuestra este proyecto

| Habilidad                   | Evidencia                                      |
|----------------------------|------------------------------------------------|
| Diseño de entidades        | Vuelos, Hoteles, Reservas, Clientes           |
| Relación entre módulos     | Múltiples servicios integrados en reservas     |
| Reglas de negocio          | Validaciones de estado, integridad y fechas   |
| Arquitectura escalable     | Módulos independientes y fáciles de mantener  |
| Testing profesional        | Cobertura Jest de servicios y validadores     |
| Infraestructura moderna    | Docker, Compose, Kubernetes, GitHub Actions   |

---

## 👤 Autor

Alejandro J. (`alejoved`)  
[GitHub](https://github.com/alejoved) • Backend Engineer

---

## 📄 Licencia

Distribuido bajo la licencia **Apache‑2.0**.
