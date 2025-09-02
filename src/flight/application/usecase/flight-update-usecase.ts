import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Flight } from "../../domain/model/flight";
import { FlightUpdateUseCaseInterface } from "../port/flight-update-usecase.interface";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { Constants } from "../../../common/constants";

@Injectable()
export class FlightUpdateUseCase implements FlightUpdateUseCaseInterface {

    private readonly logger = new Logger("FlightUpdateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flight: Flight, id: string): Promise<Flight>{
        const flightExist = await this.flightRepositoryInterface.getById(id);
        if(!flightExist){
            throw new NotFoundException(Constants.customerNotFound);
        }
        Object.assign(flightExist, flight);
        return await this.flightRepositoryInterface.update(flight);
    }
}