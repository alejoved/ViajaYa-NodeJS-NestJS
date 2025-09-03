import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightUpdateUseCaseInterface } from "../port/flight-update-usecase.interface";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { Constants } from "../../../common/constants";
import { FlightUpdateDto } from "../dto/fligth-update-dto";
import { FlightResponseDto } from "../dto/fligth-response-dto";
import { FlightRestMapper } from "../mapper/flight-rest-mapper";

@Injectable()
export class FlightUpdateUseCase implements FlightUpdateUseCaseInterface {

    private readonly logger = new Logger("FlightUpdateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flightUpdateDto: FlightUpdateDto, id: string): Promise<FlightResponseDto>{
        const flightExist = await this.flightRepositoryInterface.getById(id);
        if(!flightExist){
            throw new NotFoundException(Constants.customerNotFound);
        }
        const flight = FlightRestMapper.updateDtoToModel(flightUpdateDto);
        Object.assign(flightExist, flight);
        const response = await this.flightRepositoryInterface.update(flightExist);
        const flightResponseDto = FlightRestMapper.modelToDto(response);
        return flightResponseDto;
    }
}