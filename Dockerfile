# Etapa 1: Compilar el proyecto
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias y archivos necesarios para instalar
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Compilar el proyecto NestJS (assume que usa TypeScript)
RUN npm run build


# Etapa 2: Crear imagen liviana para producción
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar solo las dependencias de producción
COPY package*.json ./
RUN npm install --only=production

# Copiar la app compilada desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Copiar cualquier otro archivo necesario para producción (por ejemplo, configuración)
COPY --from=builder /app/.env ./

# Exponer el puerto
EXPOSE 8080

# Comando para ejecutar la app
CMD ["node", "dist/main"]