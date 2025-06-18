import { HotelModel } from "../model/hotel-model";

export interface HotelRepositoryInterface{
    get(): Promise<HotelModel[]>;
    getById(id: string): Promise<HotelModel>;
    getByCountryAndCity(country: string, city: string): Promise<HotelModel[]>;
    create(hotel: HotelModel): Promise<HotelModel>
    update(hotel: HotelModel): Promise<HotelModel>
    delete(id: string): Promise<void>
}