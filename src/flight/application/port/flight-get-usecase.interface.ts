import { FlightModel } from "../../../flight/domain/model/flight-model";

export interface FlightGetUseCaseInterface {
  execute(): Promise<FlightModel[]>;
  executeById(command: string): Promise<FlightModel>;
  executeByOriginAndDestiny(origin: string, destiny: string): Promise<FlightModel[]>;
}