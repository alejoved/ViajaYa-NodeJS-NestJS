
import { HotelModel } from "../../domain/model/hotel-model";

export interface HotelUpdateUseCaseInterface {
  execute(hotelModel: HotelModel, id: string): Promise<HotelModel>;
}