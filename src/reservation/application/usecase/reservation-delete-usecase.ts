import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Constants } from "../../../common/constants";
import { ReservationDeleteUseCaseInterface } from "../interface/reservation-delete-usecase.interface";
import { ReservationRepositoryInterface } from "../../domain/repository/reservation-repository.interface";

@Injectable()
export class ReservationDeleteUseCase implements ReservationDeleteUseCaseInterface {

    private readonly logger = new Logger("ReservationtDeleteUseCase");

    constructor(
        @Inject('ReservationRepositoryInterface')
        private readonly reservationRepositoryInterface: ReservationRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        await this.reservationRepositoryInterface.delete(id);
    }
}