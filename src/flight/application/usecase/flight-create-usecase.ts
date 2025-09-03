import { Inject, Injectable, Logger } from "@nestjs/common";
import { FlightCreateUseCaseInterface } from "../port/flight-create-usecase.interface";
import { FlightRepositoryInterface } from "../../domain/repository/flight-repository.interface";
import { FlightCreateDto } from "../dto/fligth-create-dto";
import { FlightResponseDto } from "../dto/fligth-response-dto";
import { FlightRestMapper } from "../mapper/flight-rest-mapper";

@Injectable()
export class FlightCreateUseCase implements FlightCreateUseCaseInterface {

    private readonly logger = new Logger("FlightCreateUseCase");

    constructor(
        @Inject('FlightRepositoryInterface')
        private readonly flightRepositoryInterface: FlightRepositoryInterface
      ) {}

    async execute(flightCreateDto: FlightCreateDto): Promise<FlightResponseDto>{
        const flight = FlightRestMapper.createDtoToModel(flightCreateDto);
        const response = await this.flightRepositoryInterface.create(flight);
        const flightResponseDto = FlightRestMapper.modelToDto(response);
        return flightResponseDto;
    }
}