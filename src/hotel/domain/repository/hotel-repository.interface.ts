import { HotelEntity } from "../../infrastructure/entity/hotel-entity";

export interface HotelRepositoryInterface{
    get(): Promise<HotelEntity[]>;
    getById(id: string): Promise<HotelEntity | null>;
    getByCountryAndCity(country: string, city: string): Promise<HotelEntity[]>;
    create(hotelEntity: HotelEntity): Promise<HotelEntity>
    update(hotelEntity: HotelEntity): Promise<HotelEntity>
    delete(hotelEntity: HotelEntity): Promise<void>
}