import { Hotel } from "../../domain/model/hotel";

export interface HotelCreateUseCaseInterface {
  execute(hotelModel: Hotel): Promise<Hotel>;
}