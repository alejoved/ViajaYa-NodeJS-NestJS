import { FlightModel } from "../../../flight/domain/model/flight-model";

export interface FlightUpdateUseCaseInterface {
  execute(flightModel: FlightModel, id: string): Promise<FlightModel>;
}