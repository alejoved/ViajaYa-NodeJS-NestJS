import { Inject, Injectable, Logger } from "@nestjs/common";
import { FlightCreateUseCaseInterface } from "../port/flight-create-usecase.interface";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { Flight } from "../../domain/model/flight";

@Injectable()
export class FlightCreateUseCase implements FlightCreateUseCaseInterface {

    private readonly logger = new Logger("FlightCreateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flight: Flight): Promise<Flight>{
        const response = await this.flightRepositoryInterface.create(flight);
        return response;
    }
}