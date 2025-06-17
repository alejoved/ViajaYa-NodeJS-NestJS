import { HotelModel } from "../../domain/model/hotel-model";

export interface HotelCreateUseCaseInterface {
  execute(hotelModel: HotelModel): Promise<HotelModel>;
}