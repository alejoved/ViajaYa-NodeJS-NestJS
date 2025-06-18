import { ReservationModel } from "../model/reservation-model";

export interface ReservationRepositoryInterface{
    get(): Promise<ReservationModel[]>;
    getById(id: string): Promise<ReservationModel | null>;
    getByIdAndCustomerAndFlightAndHotel(customerEmail: string, flightId: string, hotelId: string): Promise<ReservationModel[]>;
    create(reservationModel: ReservationModel): Promise<ReservationModel>
    update(reservationModel: ReservationModel): Promise<ReservationModel>
    delete(id: string): Promise<void>
}