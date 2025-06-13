import { Inject, Injectable, Logger } from "@nestjs/common";
import { FlightCreateUseCaseInterface } from "../port/flight-create-usecase.interface";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { FlightCreateCommand } from "../command/flight-create-command";
import { plainToInstance } from "class-transformer";
import { FlightModel } from "../../../flight/domain/model/flight-model";
import { Flight } from "../../../flight/infrastructure/model/flight";

@Injectable()
export class FlightCreateUseCase implements FlightCreateUseCaseInterface {

    private readonly logger = new Logger("FlightCreateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flightCreateCommand: FlightCreateCommand): Promise<FlightModel>{
        const flight = plainToInstance(Flight, flightCreateCommand);
        await this.flightRepositoryInterface.create(flight);
        const flightModel = plainToInstance(FlightModel, flight)
        return flightModel;
    }
}