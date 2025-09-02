import { Reservation } from "../../domain/model/reservation";

export interface ReservationUpdateUseCaseInterface {
  execute(reservationModel: Reservation, id: string): Promise<Reservation>;
}