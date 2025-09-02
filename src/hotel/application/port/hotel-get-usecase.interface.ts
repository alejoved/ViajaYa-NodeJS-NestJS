import { Hotel } from "../../domain/model/hotel";

export interface HotelGetUseCaseInterface {
  execute(): Promise<Hotel[]>;
  executeById(id: string): Promise<Hotel>;
  executeByCountryAndCity(country: string, city: string): Promise<Hotel[]>;
}