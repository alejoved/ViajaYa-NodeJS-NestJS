import { Hotel } from "../../infrastructure/entity/hotel";

export interface HotelRepositoryInterface{
    get(): Promise<Hotel[]>;
    getById(id: string): Promise<Hotel | null>;
    getByCountryAndCity(country: string, city: string): Promise<Hotel[]>;
    create(hotel: Hotel): Promise<Hotel>
    update(hotel: Hotel): Promise<Hotel>
    delete(hotel: Hotel): Promise<void>
}