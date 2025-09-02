import { Flight } from "../../domain/model/flight";

export interface FlightGetUseCaseInterface {
  execute(): Promise<Flight[]>;
  executeById(id: string): Promise<Flight>;
  executeByOriginAndDestiny(origin: string, destiny: string): Promise<Flight[]>;
}