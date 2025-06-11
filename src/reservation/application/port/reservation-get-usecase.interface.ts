import { ReservationModel } from "../../../reservation/domain/model/reservation-model";

export interface ReservationGetUseCaseInterface {
  execute(): Promise<ReservationModel[]>;
  executeById(command: string): Promise<ReservationModel>;
}