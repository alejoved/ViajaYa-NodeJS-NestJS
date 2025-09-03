import { ConflictException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationCreateUseCaseInterface } from "../port/reservation-create-usecase.interface";
import { Constants } from "../../../common/constants";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { Status } from "../../../common/status";
import { ReservationCreateDto } from "../../adapter/dto/reservation-create-dto";
import { ReservationResponseDto } from "../../adapter/dto/reservation-response-dto";
import { ReservationRestMapper } from "../../adapter/mapper/reservation-rest-mapper";

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

    async execute(reservationCreateDto: ReservationCreateDto): Promise<ReservationResponseDto>{
        const reservation = ReservationRestMapper.createDtoToModel(reservationCreateDto);
        const customerExists = await this.customerRepositoryInterface.getById(reservation.customerId!);
        if(!customerExists){
            throw new NotFoundException(Constants.customerNotFound)
        }
        const flightExists = await this.flightRepositoryInterface.getById(reservation.flightId!);
        if(!flightExists){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const hotelExists = await this.hotelRepositoryInterface.getById(reservation.hotelId!);
        if(!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound)
        }
        const reservationExists = await this.reservationRepositoryInterface.getByIdAndCustomerAndFlightAndHotel(reservation.customerId!, reservation.flightId!, reservation.hotelId!);
        if(reservationExists.length > 0){
            throw new ConflictException(Constants.reservationExists);
        }
        const total = hotelExists.pricePerNight * reservation.numberNights + flightExists.price;
        reservation.reservationDate = new Date();
        reservation.status = Status.PENDING;
        reservation.total = total;
        const response = await this.reservationRepositoryInterface.create(reservation);
        const reservationResponseDto = ReservationRestMapper.modelToDto();
    }
}