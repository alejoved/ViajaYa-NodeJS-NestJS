import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { Flight } from "../../domain/model/flight";
import { FlightGetUseCaseInterface } from "../port/flight-get-usecase.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class FlightGetUseCase implements FlightGetUseCaseInterface {

    private readonly logger = new Logger("FlightGetUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(): Promise<Flight[]>{
        const flight = await this.flightRepositoryInterface.get();
        return flight;
    }

    async executeById(id: string): Promise<Flight>{
        const flight = await this.flightRepositoryInterface.getById(id);
        if(!flight){
            throw new NotFoundException(Constants.flightNotFound);
        }
        return flight;
    }

    async executeByOriginAndDestiny(origin: string, destiny: string): Promise<Flight[]>{
        const flight = await this.flightRepositoryInterface.getByOriginAndDestiny(origin, destiny);
        return flight;
    }
}