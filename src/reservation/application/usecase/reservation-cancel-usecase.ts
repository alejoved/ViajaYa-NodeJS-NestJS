import { ConflictException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";
import { Status } from "../../../common/status";
import { Constants } from "../../../common/constants";
import { ReservationCancelUseCaseInterface } from "../port/reservation-cancel-usecase.interface";

@Injectable()
export class ReservationCancelUseCase implements ReservationCancelUseCaseInterface {

    private readonly logger = new Logger("ReservationCancelUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        const reservationExists = await this.reservationRepositoryInterface.getById(id);
        if (!reservationExists){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        if (reservationExists.status == Status.CONFIRMED){
            throw new ConflictException(Constants.reservationConfirmed);
        }
        reservationExists.status = Status.CANCELED;
        await this.reservationRepositoryInterface.update(reservationExists);
    }
}