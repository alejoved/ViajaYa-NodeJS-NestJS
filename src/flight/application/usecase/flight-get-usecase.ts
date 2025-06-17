import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { FlightModel } from "../../../flight/domain/model/flight-model";
import { FlightGetUseCaseInterface } from "../port/flight-get-usecase.interface";
import { FlightMapper } from "../mapper/flight-mapper";
import { Constants } from "src/common/constants";

@Injectable()
export class FlightGetUseCase implements FlightGetUseCaseInterface {

    private readonly logger = new Logger("FlightGetUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(): Promise<FlightModel[]>{
        const flightEntity = await this.flightRepositoryInterface.get();
        const flightModel = flightEntity.map(FlightMapper.entityToModel);
        return flightModel;
    }

    async executeById(id: string): Promise<FlightModel>{
        const flightEntity = await this.flightRepositoryInterface.getById(id);
        if(!flightEntity){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const flightModel = FlightMapper.entityToModel(flightEntity);
        return flightModel;
    }

    async executeByOriginAndDestiny(origin: string, destiny: string): Promise<FlightModel[]>{
        const flightEntity = await this.flightRepositoryInterface.getByOriginAndDestiny(origin, destiny);
        const flightModel = flightEntity.map(FlightMapper.entityToModel);
        return flightModel;
    }
}