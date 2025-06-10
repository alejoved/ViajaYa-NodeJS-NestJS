import { Module } from '@nestjs/common';
import { ReservationController } from './controller/reservation.controller';
import { ReservationService } from './service/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { Customer } from '../customer/entity/customer.entity';
import { Flight } from '../flight/infrastructure/model/flight';
import { Hotel } from '../hotel/entity/hotel.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation]), TypeOrmModule.forFeature([Customer]), TypeOrmModule.forFeature([Flight]), TypeOrmModule.forFeature([Hotel])],
    controllers: [ReservationController],
    providers: [ReservationService],
})
export class ReservationModule {}