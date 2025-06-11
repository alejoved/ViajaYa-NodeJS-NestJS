import { Inject, Injectable, Logger } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ReservationModel } from "../../../reservation/domain/model/reservation-model";
import { Reservation } from "../../../reservation/infrastructure/model/reservation";
import { ReservationCreateCommand } from "../command/reservation-create-command";
import { ReservationRepositoryInterface } from "../../../reservation/domain/repository/reservation-repository.interface";
import { ReservationCreateUseCaseInterface } from "../port/reservation-create-usecase.interface";

@Injectable()
export class ReservationCreateUseCase implements ReservationCreateUseCaseInterface {

    private readonly logger = new Logger("HotelCreateUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(reservationCreateCommand: ReservationCreateCommand): Promise<ReservationModel>{
        const reservation = plainToInstance(Reservation, reservationCreateCommand, { excludeExtraneousValues: true });
        await this.reservationRepositoryInterface.create(reservation);
        const reservationModel = plainToInstance(ReservationModel, reservation, { excludeExtraneousValues: true })
        return reservationModel;
    }
}