import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ReservationModule } from './reservation/reservation.module';
import { CustomerModule } from './customer/customer.module';
import { FlightModule } from './flight/flight.module';
import { HotelModule } from './hotel/hotel.module';
import { ConfigModule } from '@nestjs/config';
import { Auth } from './auth/infrastructure/entity/auth';
import { Customer } from './customer/infrastructure/entity/customer';
import { Flight } from './flight/infrastructure/entity/flight';
import { Hotel } from './hotel/infrastructure/entity/hotel';
import { Reservation } from './reservation/infrastructure/entity/reservation';

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
