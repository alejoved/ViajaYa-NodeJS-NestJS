import { HotelResponseDto } from "src/hotel/application/dto/hotel-response-dto";

export interface HotelGetUseCaseInterface {
  execute(): Promise<HotelResponseDto[]>;
  executeById(id: string): Promise<HotelResponseDto>;
  executeByCountryAndCity(country: string, city: string): Promise<HotelResponseDto[]>;
}