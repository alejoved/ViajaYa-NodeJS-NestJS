import { FlightModel } from "../../domain/model/flight-model";

export interface FlightGetUseCaseInterface {
  execute(): Promise<FlightModel[]>;
  executeById(id: string): Promise<FlightModel>;
  executeByOriginAndDestiny(origin: string, destiny: string): Promise<FlightModel[]>;
}