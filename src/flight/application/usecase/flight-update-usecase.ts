import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightModel } from "../../domain/model/flight-model";
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

    async execute(flightModel: FlightModel, id: string): Promise<FlightModel>{
        const flightExist = await this.flightRepositoryInterface.getById(id);
        if(!flightExist){
            throw new NotFoundException(Constants.customerNotFound);
        }
        Object.assign(flightExist, flightModel);
        return await this.flightRepositoryInterface.update(flightModel);
    }
}