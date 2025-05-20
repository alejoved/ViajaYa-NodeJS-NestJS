import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}))
  const config = new DocumentBuilder()
    .setTitle("Touristic flights booking API")
    .setDescription("Touristic flights booking API Technical Documentation")
    .setVersion("1.0.0")
    .addTag("Authentication", "Authentication related operations")
    .addTag("Reservation", "Reservation related operations")
    .addTag("Flight", "Flight related operations")
    .addTag("Hotel", "Hotel related operations")
    .addTag("Customer", "Customer related operations")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
