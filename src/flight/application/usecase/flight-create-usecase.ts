import { Inject, Injectable, Logger } from "@nestjs/common";
import { FlightCreateUseCaseInterface } from "../port/flight-create-usecase.interface";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightModel } from "../../domain/model/flight-model";

@Injectable()
export class FlightCreateUseCase implements FlightCreateUseCaseInterface {

    private readonly logger = new Logger("FlightCreateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flightModel: FlightModel): Promise<FlightModel>{
        const response = await this.flightRepositoryInterface.create(flightModel);
        return response;
    }
}