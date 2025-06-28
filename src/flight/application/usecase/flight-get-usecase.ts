import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightModel } from "../../domain/model/flight-model";
import { FlightGetUseCaseInterface } from "../port/flight-get-usecase.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class FlightGetUseCase implements FlightGetUseCaseInterface {

    private readonly logger = new Logger("FlightGetUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(): Promise<FlightModel[]>{
        const flightModel = await this.flightRepositoryInterface.get();
        return flightModel;
    }

    async executeById(id: string): Promise<FlightModel>{
        const flightModel = await this.flightRepositoryInterface.getById(id);
        if(!flightModel){
            throw new NotFoundException(Constants.flightNotFound);
        }
        return flightModel;
    }

    async executeByOriginAndDestiny(origin: string, destiny: string): Promise<FlightModel[]>{
        const flightModel = await this.flightRepositoryInterface.getByOriginAndDestiny(origin, destiny);
        return flightModel;
    }
}