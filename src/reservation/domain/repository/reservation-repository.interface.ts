import { Reservation } from "../model/reservation";

export interface ReservationRepositoryInterface{
    get(): Promise<Reservation[]>;
    getById(id: string): Promise<Reservation | null>;
    getByIdAndCustomerAndFlightAndHotel(customerEmail: string, flightId: string, hotelId: string): Promise<Reservation[]>;
    create(reservation: Reservation): Promise<Reservation>
    update(reservation: Reservation): Promise<Reservation>
    delete(id: string): Promise<void>
}