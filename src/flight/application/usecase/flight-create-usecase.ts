import { Inject, Injectable, Logger } from "@nestjs/common";
import { FlightCreateUseCaseInterface } from "../interface/flight-create-usecase.interface";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightModel } from "../../domain/model/flight-model";
import { FlightMapper } from "../../adapter/mapper/flight-mapper";

@Injectable()
export class FlightCreateUseCase implements FlightCreateUseCaseInterface {

    private readonly logger = new Logger("FlightCreateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flightModel: FlightModel): Promise<FlightModel>{
        const flightEntity = FlightMapper.modelToEntity(flightModel);
        const response = await this.flightRepositoryInterface.create(flightEntity);
        const flighModel = FlightMapper.entityToModel(response);
        return flighModel;
    }
}