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
import { Hotel } from "src/hotel/domain/model/hotel";

@Injectable()
export class ReservationCreateUseCase implements ReservationCreateUseCaseInterface {

    private readonly logger = new Logger("ReservationCreateUseCase");

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
        const customerExist = await this.customerRepositoryInterface.getById(reservationCreateDto.customerId);
        if(!customerExist){
            throw new NotFoundException(Constants.customerNotFound)
        }
        const flightExist = await this.flightRepositoryInterface.getById(reservationCreateDto.flightId);
        if(!flightExist){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const hotelExist = await this.hotelRepositoryInterface.getById(reservationCreateDto.hotelId);
        if(!hotelExist){
            throw new NotFoundException(Constants.hotelNotFound)
        }
        const reservation = ReservationRestMapper.createDtoToModel(reservationCreateDto);
        reservation.customer = customerExist;
        reservation.flight = flightExist
        reservation.hotel = hotelExist;
        const reservationExists = await this.reservationRepositoryInterface.getByIdAndCustomerAndFlightAndHotel(reservation.customer.id!, reservation.flight.id!, reservation.hotel.id!);
        if(reservationExists.length > 0){
            throw new ConflictException(Constants.reservationExists);
        }
        const total = hotelExist.pricePerNight * reservation.numberNights + flightExist.price;
        reservation.reservationDate = new Date();
        reservation.status = Status.PENDING;
        reservation.total = total;
        const response = await this.reservationRepositoryInterface.create(reservation);
        const reservationResponseDto = ReservationRestMapper.modelToDto(response);
        return reservationResponseDto;
    }
}