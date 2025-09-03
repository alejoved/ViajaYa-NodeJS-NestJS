import { FlightCreateDto } from "src/flight/application/dto/fligth-create-dto";
import { FlightResponseDto } from "src/flight/application/dto/fligth-response-dto";

export interface FlightCreateUseCaseInterface {
  execute(flightCreateDto: FlightCreateDto): Promise<FlightResponseDto>;
}