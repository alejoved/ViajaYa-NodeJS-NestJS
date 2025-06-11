import { Hotel } from "src/hotel/infrastructure/model/hotel";

export interface HotelRepositoryInterface{
    get(): Promise<Hotel[]>;
    getById(id: string): Promise<Hotel | null>;
    getByCountryAndCity(country: string, city: string): Promise<Hotel[]>;
    create(flight: Hotel): Promise<Hotel>
    update(flight: Hotel): Promise<Hotel>
    delete(flight: Hotel): Promise<void>
}