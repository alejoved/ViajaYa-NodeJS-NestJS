
import { HotelModel } from "../../../hotel/domain/model/hotel-model";
import { HotelUpdateCommand } from "../command/hotel-update-command";

export interface HotelUpdateUseCaseInterface {
  execute(command: HotelUpdateCommand, id: string): Promise<HotelModel>;
}