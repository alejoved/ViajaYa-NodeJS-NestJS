import { Module } from '@nestjs/common';
import { ReservationController } from './controller/reservation.controller';
import { ReservationService } from './service/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservartion.entity';
import { Customer } from 'src/customer/entity/customer.entity';
import { Flight } from 'src/flight/entity/flight.entity';
import { Hotel } from 'src/hotel/entity/hotel.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation]), TypeOrmModule.forFeature([Customer]), TypeOrmModule.forFeature([Flight]), TypeOrmModule.forFeature([Hotel])],
    controllers: [ReservationController],
    providers: [ReservationService],
})
export class ReservationModule {}