import { Flight } from "../../domain/model/flight";

export interface FlightCreateUseCaseInterface {
  execute(flight: Flight): Promise<Flight>;
}