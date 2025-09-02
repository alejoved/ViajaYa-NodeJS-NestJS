import { Flight } from "../../domain/model/flight";

export interface FlightUpdateUseCaseInterface {
  execute(flight: Flight, id: string): Promise<Flight>;
}