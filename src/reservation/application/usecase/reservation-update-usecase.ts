import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Constants } from "../../../common/constants";
import { ReservationEntity } from "../../infrastructure/entity/reservation-entity";
import { ReservationModel } from "../../../reservation/domain/model/reservation-model";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";
import { ReservationUpdateUseCaseInterface } from "../port/reservation-update-usecase.interface";
import { ApiPermanentRedirectResponse } from "@nestjs/swagger";
import { ReservationMapper } from "../mapper/reservation-mapper";

@Injectable()
export class ReservationUpdateUseCase implements ReservationUpdateUseCaseInterface {

    private readonly logger = new Logger("ReservationUpdateUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(reservationModel: ReservationModel, id: string): Promise<ReservationModel>{
        const reservationExists = await this.reservationRepositoryInterface.getById(id);
        if (!reservationExists){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const reservationEntity = ReservationMapper.modelToEntity(reservationModel);
        reservationEntity.id = id;
        const response = await this.reservationRepositoryInterface.update(reservationEntity);
        return ReservationMapper.entityToModel(response);
    }
}