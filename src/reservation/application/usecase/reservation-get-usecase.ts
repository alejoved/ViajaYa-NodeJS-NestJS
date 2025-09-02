import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Reservation } from "../../domain/model/reservation";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { ReservationGetUseCaseInterface } from "../port/reservation-get-usecase.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class ReservationGetUseCase implements ReservationGetUseCaseInterface {

    private readonly logger = new Logger("ReservationGetUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(): Promise<Reservation[]> {
        const reservationModel = await this.reservationRepositoryInterface.get();
        return reservationModel;
    }

    async executeById(id: string): Promise<Reservation> {
        const reservation = await this.reservationRepositoryInterface.getById(id);
        if(!reservation){
            throw new NotFoundException(Constants.reservationNotFound);            
        }
        return reservation;
    }
}