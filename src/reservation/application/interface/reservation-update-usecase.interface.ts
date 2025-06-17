import { ReservationModel } from "../../domain/model/reservation-model";

export interface ReservationUpdateUseCaseInterface {
  execute(reservationModel: ReservationModel, id: string): Promise<ReservationModel>;
}