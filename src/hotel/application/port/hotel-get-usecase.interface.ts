import { HotelModel } from "../../../hotel/domain/model/hotel-model";

export interface HotelGetUseCaseInterface {
  execute(): Promise<HotelModel[]>;
  executeById(command: string): Promise<HotelModel>;
  executeByCountryAndCity(country: string, city: string): Promise<HotelModel[]>;
}