import { HotelResponseDto } from "../dto/hotel-response-dto";
import { HotelUpdateDto } from "../dto/hotel-update-dto";

export interface HotelUpdateUseCaseInterface {
  execute(hotelUpdate: HotelUpdateDto, id: string): Promise<HotelResponseDto>;
}