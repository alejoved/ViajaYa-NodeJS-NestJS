import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianModule } from './physician/physician.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientModule } from './patient/patient.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.PORT!),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      schema: process.env.SCHEMA,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    AuthModule,
    AppointmentModule,
    PhysicianModule,
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
