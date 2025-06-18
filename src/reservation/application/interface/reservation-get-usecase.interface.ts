import { ReservationModel } from "../../domain/model/reservation-model";

export interface ReservationGetUseCaseInterface {
  execute(): Promise<ReservationModel[]>;
  executeById(id: string): Promise<ReservationModel>;
}