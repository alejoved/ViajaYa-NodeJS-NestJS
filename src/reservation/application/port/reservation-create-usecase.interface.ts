import { ReservationModel } from "../../../reservation/domain/model/reservation-model";

export interface ReservationCreateUseCaseInterface {
  execute(reservationModel: ReservationModel): Promise<ReservationModel>;
}