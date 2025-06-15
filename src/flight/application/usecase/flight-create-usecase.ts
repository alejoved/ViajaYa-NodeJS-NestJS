import { Inject, Injectable, Logger } from "@nestjs/common";
import { FlightCreateUseCaseInterface } from "../port/flight-create-usecase.interface";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { FlightModel } from "../../../flight/domain/model/flight-model";
import { FlightMapper } from "../mapper/flight-mapper";

@Injectable()
export class FlightCreateUseCase implements FlightCreateUseCaseInterface {

    private readonly logger = new Logger("FlightCreateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flightModel: FlightModel): Promise<FlightModel>{
        const flightEntity = FlightMapper.modelToEntity(flightModel);
        await this.flightRepositoryInterface.create(flightEntity);
        return FlightMapper.entityToModel(flightEntity);
    }
}