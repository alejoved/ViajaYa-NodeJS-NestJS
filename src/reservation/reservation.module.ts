import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from '../flight/infrastructure/entity/flight';
import { Hotel } from '../hotel/infrastructure/entity/hotel';
import { Reservation } from './infrastructure/entity/reservation';
import { Customer } from '../customer/infrastructure/entity/customer';
import { ReservationController } from './adapter/controller/reservation.controller';
import { ReservationGetUseCase } from './application/usecase/reservation-get-usecase';
import { ReservationCreateUseCase } from './application/usecase/reservation-create-usecase';
import { ReservationUpdateUseCase } from './application/usecase/reservation-update-usecase';
import { ReservationDeleteUseCase } from './application/usecase/reservation-delete-usecase';
import { ReservationConfirmUseCase } from './application/usecase/reservation-confirm-usecase';
import { ReservationCancelUseCase } from './application/usecase/reservation-cancel-usecase';
import { ReservationRepository } from './infrastructure/repository/reservation-repository';
import { CustomerRepository } from '../customer/infrastructure/repository/customer-repository';
import { FlightRepository } from '../flight/infrastructure/repository/flight-repository';
import { HotelRepository } from '../hotel/infrastructure/repository/hotel-repository';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation]), TypeOrmModule.forFeature([Customer]), TypeOrmModule.forFeature([Flight]), TypeOrmModule.forFeature([Hotel])],
    controllers: [ReservationController],
    providers: [{provide: "ReservationGetUseCaseInterface", useClass: ReservationGetUseCase}, 
                {provide: "ReservationCreateUseCaseInterface", useClass: ReservationCreateUseCase},
                {provide: "ReservationUpdateUseCaseInterface", useClass: ReservationUpdateUseCase},
                {provide: "ReservationDeleteUseCaseInterface", useClass: ReservationDeleteUseCase},
                {provide: "ReservationConfirmUseCaseInterface", useClass: ReservationConfirmUseCase},
                {provide: "ReservationCancelUseCaseInterface", useClass: ReservationCancelUseCase},
                {provide: "ReservationRepositoryInterface", useClass: ReservationRepository},
                {provide: "CustomerRepositoryInterface", useClass: CustomerRepository},
                {provide: "FlightRepositoryInterface", useClass: FlightRepository},
                {provide: "HotelRepositoryInterface", useClass: HotelRepository}],
})
export class ReservationModule {}