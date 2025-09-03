import { FlightResponseDto } from "src/flight/application/dto/fligth-response-dto";
import { Flight } from "../../domain/model/flight";

export interface FlightGetUseCaseInterface {
  execute(): Promise<FlightResponseDto[]>;
  executeById(id: string): Promise<FlightResponseDto>;
  executeByOriginAndDestiny(origin: string, destiny: string): Promise<FlightResponseDto[]>;
}