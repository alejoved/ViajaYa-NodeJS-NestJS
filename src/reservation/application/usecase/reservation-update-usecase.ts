import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Constants } from "../../../common/constants";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationUpdateUseCaseInterface } from "../port/reservation-update-usecase.interface";
import { ReservationUpdateDto } from "../../adapter/dto/reservation-update-dto";
import { ReservationResponseDto } from "../../adapter/dto/reservation-response-dto";
import { ReservationRestMapper } from "../../adapter/mapper/reservation-rest-mapper";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";

@Injectable()
export class ReservationUpdateUseCase implements ReservationUpdateUseCaseInterface {

    private readonly logger = new Logger("ReservationUpdateUseCase");

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

    async execute(reservationUpdateDto: ReservationUpdateDto, id: string): Promise<ReservationResponseDto>{
        const reservationExist = await this.reservationRepositoryInterface.getById(id);
        if (!reservationExist){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const customerExist = await this.customerRepositoryInterface.getById(reservationUpdateDto.customerId);
        if(!customerExist){
            throw new NotFoundException(Constants.customerNotFound)
        }
        const flightExist = await this.flightRepositoryInterface.getById(reservationUpdateDto.flightId);
        if(!flightExist){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const hotelExist = await this.hotelRepositoryInterface.getById(reservationUpdateDto.hotelId);
        if(!hotelExist){
            throw new NotFoundException(Constants.hotelNotFound)
        }
        const reservation = ReservationRestMapper.updateDtoToModel(reservationUpdateDto, id);
        reservation.customer = customerExist;
        reservation.flight = flightExist
        reservation.hotel = hotelExist;

        const response = await this.reservationRepositoryInterface.update(reservation);
        const reservationResponseDto = ReservationRestMapper.modelToDto(response);
        return reservationResponseDto;
    }
}