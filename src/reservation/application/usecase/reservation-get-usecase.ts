import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReservationModel } from "../../domain/model/reservation-model";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";
import { ReservationGetUseCaseInterface } from "../port/reservation-get-usecase.interface";
import { ReservationMapper } from "../mapper/reservation-mapper";
import { Constants } from "../../../common/constants";

@Injectable()
export class ReservationGetUseCase implements ReservationGetUseCaseInterface {

    private readonly logger = new Logger("ReservationGetUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(): Promise<ReservationModel[]> {
        const reservationEntity = await this.reservationRepositoryInterface.get();
        const reservationModel = reservationEntity.map(ReservationMapper.entityToModel);
        return reservationModel;
    }

    async executeById(id: string): Promise<ReservationModel> {
        const reservationEntity = await this.reservationRepositoryInterface.getById(id);
        if(!reservationEntity){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        const reservationModel = ReservationMapper.entityToModel(reservationEntity);
        return reservationModel;
    }
}