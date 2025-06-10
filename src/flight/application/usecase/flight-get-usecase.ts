import { Inject, Injectable, Logger } from "@nestjs/common";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { plainToInstance } from "class-transformer";
import { FlightModel } from "../../../flight/domain/model/flight-model";
import { FlightGetUseCaseInterface } from "../port/flight-get-usecase.interface";

@Injectable()
export class FlightGetUseCase implements FlightGetUseCaseInterface {

    private readonly logger = new Logger("FlightGetUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(): Promise<FlightModel[]>{
        const flight = await this.flightRepositoryInterface.get();
        const flightModel = plainToInstance(FlightModel, flight, { excludeExtraneousValues: true });
        return flightModel;
    }

    async executeById(id: string): Promise<FlightModel>{
        const flight = await this.flightRepositoryInterface.getById(id);
        const flightModel = plainToInstance(FlightModel, flight, { excludeExtraneousValues: true });
        return flightModel;
    }

    async executeByOriginAndDestiny(origin: string, destiny: string): Promise<FlightModel[]>{
        const flight = await this.flightRepositoryInterface.getByOriginAndDestiny(origin, destiny);
        const flightModel = plainToInstance(FlightModel, flight, { excludeExtraneousValues: true });
        return flightModel;
    }
}