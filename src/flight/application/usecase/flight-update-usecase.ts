import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightModel } from "../../../flight/domain/model/flight-model";
import { FlightUpdateUseCaseInterface } from "../port/flight-update-usecase.interface";
import { FlightRepositoryInterface } from "../../../flight/domain/repository/flight-repository.interface";
import { Constants } from "../../../common/constants";
import { FlightMapper } from "../mapper/flight-mapper";

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
        flightModel.id = id;
        const flightEntity = FlightMapper.modelToEntity(flightModel);
        await this.flightRepositoryInterface.update(flightEntity);
        return FlightMapper.entityToModel(flightEntity);
    }
}