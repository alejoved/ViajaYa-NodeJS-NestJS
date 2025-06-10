import { FlightModel } from "../../../flight/domain/model/flight-model";
import { FlightUpdateCommand } from "../command/flight-update-command";

export interface FlightUpdateUseCaseInterface {
  execute(command: FlightUpdateCommand, id: string): Promise<FlightModel>;
}