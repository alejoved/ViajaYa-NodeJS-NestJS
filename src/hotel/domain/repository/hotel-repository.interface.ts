import { Hotel } from "../model/hotel";

export interface HotelRepositoryInterface{
    get(): Promise<Hotel[]>;
    getById(id: string): Promise<Hotel>;
    getByCountryAndCity(country: string, city: string): Promise<Hotel[]>;
    create(hotel: Hotel): Promise<Hotel>
    update(hotel: Hotel): Promise<Hotel>
    delete(id: string): Promise<void>
}