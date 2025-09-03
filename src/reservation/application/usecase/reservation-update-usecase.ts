import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Constants } from "../../../common/constants";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationUpdateUseCaseInterface } from "../port/reservation-update-usecase.interface";
import { ReservationUpdateDto } from "src/reservation/adapter/dto/reservation-update-dto";
import { ReservationResponseDto } from "src/reservation/adapter/dto/reservation-response-dto";
import { ReservationRestMapper } from "src/reservation/adapter/mapper/reservation-rest-mapper";

@Injectable()
export class ReservationUpdateUseCase implements ReservationUpdateUseCaseInterface {

    private readonly logger = new Logger("ReservationUpdateUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(reservationUpdateDto: ReservationUpdateDto, id: string): Promise<ReservationResponseDto>{
        const reservationExist = await this.reservationRepositoryInterface.getById(id);
        if (!reservationExist){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const reservation = ReservationRestMapper.updateDtoToModel(reservationUpdateDto);
        Object.assign(reservationExist, reservation);
        const response = await this.reservationRepositoryInterface.update(reservationExist);
        const reservationResponseDto = ReservationRestMapper.modelToDto(response);
        return reservationResponseDto;
    }
}