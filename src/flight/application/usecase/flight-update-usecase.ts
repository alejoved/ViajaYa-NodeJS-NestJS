import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Flight } from "../../../flight/infrastructure/model/flight";
import { FlightModel } from "../../../flight/domain/model/flight-model";
import { FlightUpdateUseCaseInterface } from "../port/flight-update-usecase.interface";
import { FlightUpdateCommand } from "../command/flight-update-command";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class FlightUpdateUseCase implements FlightUpdateUseCaseInterface {

    private readonly logger = new Logger("FlightUpdateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flightUpdateCommand: FlightUpdateCommand, id: string): Promise<FlightModel>{
        const flightExists = await this.flightRepositoryInterface.getById(id);
        if (!flightExists){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const flight = plainToInstance(Flight, flightUpdateCommand, { excludeExtraneousValues: true });
        flight.id = id;
        await this.flightRepositoryInterface.update(flight);
        const flightModel = plainToInstance(FlightModel, flight, { excludeExtraneousValues: true })
        return flightModel;
    }
}