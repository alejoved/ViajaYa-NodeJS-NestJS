import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReservationModel } from "../../domain/model/reservation-model";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationGetUseCaseInterface } from "../interface/reservation-get-usecase.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class ReservationGetUseCase implements ReservationGetUseCaseInterface {

    private readonly logger = new Logger("ReservationGetUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(): Promise<ReservationModel[]> {
        const reservationModel = await this.reservationRepositoryInterface.get();
        return reservationModel;
    }

    async executeById(id: string): Promise<ReservationModel> {
        const reservationModel = await this.reservationRepositoryInterface.getById(id);
        if(!reservationModel){
            throw new NotFoundException(Constants.reservationNotFound);            
        }
        return reservationModel;
    }
}