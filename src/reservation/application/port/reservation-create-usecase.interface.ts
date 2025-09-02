import { Reservation } from "../../domain/model/reservation";

export interface ReservationCreateUseCaseInterface {
  execute(reservation: Reservation): Promise<Reservation>;
}