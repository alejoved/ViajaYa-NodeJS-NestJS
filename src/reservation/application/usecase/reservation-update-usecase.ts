import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Constants } from "../../../common/constants";
import { Reservation } from "../../../reservation/infrastructure/model/reservation";
import { ReservationUpdateCommand } from "../command/reservation-update-command";
import { ReservationModel } from "../../../reservation/domain/model/reservation-model";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";
import { ReservationUpdateUseCaseInterface } from "../port/reservation-update-usecase.interface";

@Injectable()
export class ReservationUpdateUseCase implements ReservationUpdateUseCaseInterface {

    private readonly logger = new Logger("ReservationUpdateUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(reservationUpdateCommand: ReservationUpdateCommand, id: string): Promise<ReservationModel>{
        const reservationExists = await this.reservationRepositoryInterface.getById(id);
        if (!reservationExists){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        const reservation = plainToInstance(Reservation, reservationUpdateCommand, { excludeExtraneousValues: true });
        reservation.id = id;
        await this.reservationRepositoryInterface.update(reservation);
        const hotelModel = plainToInstance(ReservationModel, reservation, { excludeExtraneousValues: true })
        return hotelModel;
    }
}