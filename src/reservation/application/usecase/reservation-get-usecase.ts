import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationGetUseCaseInterface } from "../port/reservation-get-usecase.interface";
import { Constants } from "../../../common/constants";
import { ReservationRestMapper } from "src/reservation/adapter/mapper/reservation-rest-mapper";
import { ReservationResponseDto } from "src/reservation/adapter/dto/reservation-response-dto";

@Injectable()
export class ReservationGetUseCase implements ReservationGetUseCaseInterface {

    private readonly logger = new Logger("ReservationGetUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(): Promise<ReservationResponseDto[]> {
        const reservations = await this.reservationRepositoryInterface.get();
        const reservationResponseDto = reservations.map(ReservationRestMapper.modelToDto)
        return reservationResponseDto;
    }

    async executeById(id: string): Promise<ReservationResponseDto> {
        const reservation = await this.reservationRepositoryInterface.getById(id);
        if(!reservation){
            throw new NotFoundException(Constants.reservationNotFound);            
        }
        const reservationResponseDto = ReservationRestMapper.modelToDto(reservation);
        return reservationResponseDto;
    }
}