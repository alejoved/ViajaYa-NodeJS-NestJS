import { ConflictException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ReservationModel } from "../../../reservation/domain/model/reservation-model";
import { Reservation } from "../../../reservation/infrastructure/model/reservation";
import { ReservationCreateCommand } from "../command/reservation-create-command";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";
import { ReservationCreateUseCaseInterface } from "../port/reservation-create-usecase.interface";
import { Constants } from "../../../common/constants";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { Status } from "../../../common/status";

@Injectable()
export class ReservationCreateUseCase implements ReservationCreateUseCaseInterface {

    private readonly logger = new Logger("HotelCreateUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface,
        @Inject('CustomerRepositoryInterface')
        private readonly customerRepositoryInterface: CustomerRepositoryInterface,
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface,
        @Inject('HotelRepositoryInterface')
        private readonly hotelRepositoryInterface: HotelRepositoryInterface
      ) {}

    async execute(reservationCreateCommand: ReservationCreateCommand): Promise<ReservationModel>{
        const customerExists = await this.customerRepositoryInterface.getByEmail(reservationCreateCommand.customerEmail);
        if(!customerExists){
            throw new NotFoundException(Constants.customerNotFound)
        }
        const flightExists = await this.flightRepositoryInterface.getById(reservationCreateCommand.flightId);
        if(!flightExists){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const hotelExists = await this.hotelRepositoryInterface.getById(reservationCreateCommand.hotelId);
        if(!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound)
        }
        const reservationExists = await this.reservationRepositoryInterface.getByIdAndCustomerAndFlightAndHotel(reservationCreateCommand.customerEmail, reservationCreateCommand.flightId, reservationCreateCommand.hotelId);
        if(reservationExists.length > 0){
            throw new ConflictException(Constants.reservationExists);
        }
        const total = hotelExists.pricePerNight * reservationCreateCommand.numberNights + flightExists.price;
        const reservation = plainToInstance(Reservation, reservationCreateCommand);
        reservation.reservationDate = new Date();
        reservation.status = Status.PENDING;
        reservation.total = total;
        reservation.customer = customerExists;
        reservation.flight = flightExists;
        reservation.hotel = hotelExists;
        await this.reservationRepositoryInterface.create(reservation);
        const reservationModel = plainToInstance(ReservationModel, reservation)
        return reservationModel;
    }
}