import { HotelCreateDto } from "../dto/hotel-create-dto";
import { HotelResponseDto } from "../dto/hotel-response-dto";

export interface HotelCreateUseCaseInterface {
  execute(hotelCreateDto: HotelCreateDto): Promise<HotelResponseDto>;
}