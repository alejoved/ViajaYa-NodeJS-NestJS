import { FlightResponseDto } from "../dto/fligth-response-dto";
import { FlightUpdateDto } from "../dto/fligth-update-dto";

export interface FlightUpdateUseCaseInterface {
  execute(flightUpdateDto: FlightUpdateDto, id: string): Promise<FlightResponseDto>;
}