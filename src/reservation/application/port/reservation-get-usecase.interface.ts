import { Reservation } from "../../domain/model/reservation";

export interface ReservationGetUseCaseInterface {
  execute(): Promise<Reservation[]>;
  executeById(id: string): Promise<Reservation>;
}