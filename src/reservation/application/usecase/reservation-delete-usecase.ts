import { Inject, Injectable, Logger } from "@nestjs/common";
import { ReservationDeleteUseCaseInterface } from "../port/reservation-delete-usecase.interface";
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