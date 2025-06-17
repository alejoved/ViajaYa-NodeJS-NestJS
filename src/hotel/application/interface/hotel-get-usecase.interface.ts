import { HotelModel } from "../../domain/model/hotel-model";

export interface HotelGetUseCaseInterface {
  execute(): Promise<HotelModel[]>;
  executeById(id: string): Promise<HotelModel>;
  executeByCountryAndCity(country: string, city: string): Promise<HotelModel[]>;
}