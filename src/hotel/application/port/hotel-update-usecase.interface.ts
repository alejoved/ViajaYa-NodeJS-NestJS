
import { Hotel } from "../../domain/model/hotel";

export interface HotelUpdateUseCaseInterface {
  execute(hotel: Hotel, id: string): Promise<Hotel>;
}