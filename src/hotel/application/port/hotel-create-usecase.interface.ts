import { HotelModel } from "src/hotel/domain/model/hotel-model";
import { HotelCreateCommand } from "../command/hotel-create-command";

export interface HotelCreateUseCaseInterface {
  execute(command: HotelCreateCommand): Promise<HotelModel>;
}