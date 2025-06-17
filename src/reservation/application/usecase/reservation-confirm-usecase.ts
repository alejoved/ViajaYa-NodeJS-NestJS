import { ConflictException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";
import { Status } from "../../../common/status";
import { Constants } from "../../../common/constants";
import { ReservationConfirmUseCaseInterface } from "../port/reservation-confirm-usecase.interface";

@Injectable()
export class ReservationConfirmUseCase implements ReservationConfirmUseCaseInterface {

    private readonly logger = new Logger("ReservationConfirmUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        const reservationExists = await this.reservationRepositoryInterface.getById(id);
        if (!reservationExists){
            throw new NotFoundException(Constants.reservationNotFound);
        }
        if (reservationExists.status == Status.CANCELED){
            throw new ConflictException(Constants.reservationCanceled);
        }
        reservationExists.status = Status.CONFIRMED;
        await this.reservationRepositoryInterface.update(reservationExists);
    }
}