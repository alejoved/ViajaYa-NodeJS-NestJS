import { FlightModel } from "../../../flight/domain/model/flight-model";

export interface FlightCreateUseCaseInterface {
  execute(flightModel: FlightModel): Promise<FlightModel>;
}