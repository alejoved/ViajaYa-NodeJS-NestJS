import { ReservationEntity } from "../../infrastructure/entity/reservation-entity";

export interface ReservationRepositoryInterface{
    get(): Promise<ReservationEntity[]>;
    getById(id: string): Promise<ReservationEntity | null>;
    getByIdAndCustomerAndFlightAndHotel(customerEmail: string, flightId: string, hotelId: string): Promise<ReservationEntity[]>;
    create(reservation: ReservationEntity): Promise<ReservationEntity>
    update(reservation: ReservationEntity): Promise<ReservationEntity>
    delete(reservation: ReservationEntity): Promise<void>
}