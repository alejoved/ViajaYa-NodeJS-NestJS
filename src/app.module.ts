import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment/controller/appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhysicianModule } from './physician/physician.module';
import { Patient } from './patient/entity/patient.entity';
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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'vision',
      schema: 'doctoryanodejs',
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
