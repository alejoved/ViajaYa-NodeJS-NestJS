import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightDeleteUseCaseInterface } from "../port/flight-delete-usecase.interface";

@Injectable()
export class FlightDeleteUseCase implements FlightDeleteUseCaseInterface {

    private readonly logger = new Logger("FlightDeleteUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(id: string): Promise<void>{
        await this.flightRepositoryInterface.delete(id);
    }
}