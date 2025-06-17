import { ReservationModel } from "../../domain/model/reservation-model";

export interface ReservationGetUseCaseInterface {
  execute(): Promise<ReservationModel[]>;
  executeById(command: string): Promise<ReservationModel>;
}