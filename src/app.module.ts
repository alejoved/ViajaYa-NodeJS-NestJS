import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ReservationModule } from './reservation/reservation.module';
import { CustomerModule } from './customer/customer.module';
import { FlightModule } from './flight/flight.module';
import { HotelModule } from './hotel/hotel.module';
import { ConfigModule } from '@nestjs/config';
import { Auth } from './auth/infrastructure/model/auth';
import { Customer } from './customer/infrastructure/model/customer';
import { Flight } from './flight/infrastructure/model/flight';
import { Hotel } from './hotel/infrastructure/model/hotel';
import { Reservation } from './reservation/infrastructure/model/reservation';

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
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      entities: [Auth, Customer, Flight, Hotel, Reservation],
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
