import { Reservation } from "../../../reservation/infrastructure/model/reservation";

export interface ReservationRepositoryInterface{
    get(): Promise<Reservation[]>;
    getById(id: string): Promise<Reservation | null>;
    create(flight: Reservation): Promise<Reservation>
    update(flight: Reservation): Promise<Reservation>
    delete(flight: Reservation): Promise<void>
}