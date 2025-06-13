import { Inject, Injectable, Logger } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ReservationModel } from "../../../reservation/domain/model/reservation-model";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";
import { ReservationGetUseCaseInterface } from "../port/reservation-get-usecase.interface";

@Injectable()
export class ReservationGetUseCase implements ReservationGetUseCaseInterface {

    private readonly logger = new Logger("ReservationGetUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(): Promise<ReservationModel[]> {
        const reservation = await this.reservationRepositoryInterface.get();
        const reservationModel = plainToInstance(ReservationModel, reservation);
        return reservationModel;
    }

    async executeById(id: string): Promise<ReservationModel> {
        const reservation = await this.reservationRepositoryInterface.getById(id);
        const reservationModel = plainToInstance(ReservationModel, reservation);
        return reservationModel;
    }
}