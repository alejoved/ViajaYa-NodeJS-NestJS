import { FlightModel } from "../../../flight/domain/model/flight-model";
import { FlightCreateCommand } from "../command/flight-create-command";

export interface FlightCreateUseCaseInterface {
  execute(command: FlightCreateCommand): Promise<FlightModel>;
}