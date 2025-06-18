import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ReservationModule } from './reservation/reservation.module';
import { CustomerModule } from './customer/customer.module';
import { FlightModule } from './flight/flight.module';
import { HotelModule } from './hotel/hotel.module';
import { ConfigModule } from '@nestjs/config';
import { AuthEntity } from './auth/infrastructure/entity/auth';
import { CustomerEntity } from './customer/infrastructure/entity/customer';
import { FlightEntity } from './flight/infrastructure/entity/flight';
import { HotelEntity } from './hotel/infrastructure/entity/hotel';
import { ReservationEntity } from './reservation/infrastructure/entity/reservation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: parseInt(process.env.PORT_DB!),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: [AuthEntity, CustomerEntity, FlightEntity, HotelEntity, ReservationEntity],
      synchronize: true
    }),
    AuthModule,
    ReservationModule,
    CustomerModule,
    FlightModule,
    HotelModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
