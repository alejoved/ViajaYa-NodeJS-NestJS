import { ReservationModel } from "../../domain/model/reservation-model";

export interface ReservationCreateUseCaseInterface {
  execute(reservationModel: ReservationModel): Promise<ReservationModel>;
}