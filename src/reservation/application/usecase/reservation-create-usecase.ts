import { ConflictException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReservationModel } from "../../domain/model/reservation-model";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationCreateUseCaseInterface } from "../interface/reservation-create-usecase.interface";
import { Constants } from "../../../common/constants";
import { CustomerRepositoryInterface } from "../../../customer/domain/repository/customer-repository.interface";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { Status } from "../../../common/status";
import { CustomerMapper } from "../../../customer/adapter/mapper/customer-mapper";
import { FlightMapper } from "../../../flight/adapter/mapper/flight-mapper";
import { HotelMapper } from "../../../hotel/adapter/mapper/hotel-mapper";
import { ReservationMapper } from "../../adapter/mapper/reservation-mapper";

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

    async execute(reservationModel: ReservationModel): Promise<ReservationModel>{
        const customerExists = await this.customerRepositoryInterface.getByEmail(reservationModel.customerEmail!);
        if(!customerExists){
            throw new NotFoundException(Constants.customerNotFound)
        }
        const flightExists = await this.flightRepositoryInterface.getById(reservationModel.flightId!);
        if(!flightExists){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const hotelExists = await this.hotelRepositoryInterface.getById(reservationModel.hotelId!);
        if(!hotelExists){
            throw new NotFoundException(Constants.hotelNotFound)
        }
        const reservationExists = await this.reservationRepositoryInterface.getByIdAndCustomerAndFlightAndHotel(reservationModel.customerEmail!, reservationModel.flightId!, reservationModel.hotelId!);
        if(reservationExists.length > 0){
            throw new ConflictException(Constants.reservationExists);
        }
        const total = hotelExists.pricePerNight * reservationModel.numberNights + flightExists.price;
        reservationModel.reservationDate = new Date();
        reservationModel.status = Status.PENDING;
        reservationModel.total = total;
        reservationModel.customerModel = CustomerMapper.entityToModel(customerExists);
        reservationModel.flightModel = FlightMapper.entityToModel(flightExists);
        reservationModel.hotelModel = HotelMapper.entityToModel(hotelExists);
        const reservationEntity = ReservationMapper.modelToEntity(reservationModel);
        const response = await this.reservationRepositoryInterface.create(reservationEntity);
        return ReservationMapper.entityToModel(response);
    }
}