import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightGetUseCaseInterface } from "../port/flight-get-usecase.interface";
import { Constants } from "../../../common/constants";
import { FlightResponseDto } from "../dto/fligth-response-dto";
import { FlightRestMapper } from "../mapper/flight-rest-mapper";

@Injectable()
export class FlightGetUseCase implements FlightGetUseCaseInterface {

    private readonly logger = new Logger("FlightGetUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(): Promise<FlightResponseDto[]>{
        const flights = await this.flightRepositoryInterface.get();
        const flightResponseDto = flights.map(FlightRestMapper.modelToDto);
        return flightResponseDto;
    }

    async executeById(id: string): Promise<FlightResponseDto>{
        const flight = await this.flightRepositoryInterface.getById(id);
        if(!flight){
            throw new NotFoundException(Constants.flightNotFound);
        }
        const flightResponseDto = FlightRestMapper.modelToDto(flight);
        return flightResponseDto;
    }

    async executeByOriginAndDestiny(origin: string, destiny: string): Promise<FlightResponseDto[]>{
        const flights = await this.flightRepositoryInterface.getByOriginAndDestiny(origin, destiny);
        const flightResponseDto = flights.map(FlightRestMapper.modelToDto);
        return flightResponseDto;
    }
}