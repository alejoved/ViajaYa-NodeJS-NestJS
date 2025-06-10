import { FlightCreateCommand } from "../command/flight-create-command";

export interface FlightCreateUseCaseInterface {
  execute(command: FlightCreateCommand): Promise<FlightModel>;
}