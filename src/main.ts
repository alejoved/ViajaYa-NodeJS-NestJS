import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle("Medical Appointment Booking API")
    .setDescription("Medical Appointment Booking API Technical Documentation")
    .setVersion("1.0.0")
    .addTag("Authentication", "Authentication related operations")
    .addTag("Appointments", "Appointment related operations")
    .addTag("Patients", "Patient related operations")
    .addTag("Physicians", "Physician related operations")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
