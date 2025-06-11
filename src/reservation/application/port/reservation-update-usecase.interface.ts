import { ReservationModel } from "../../../reservation/domain/model/reservation-model";
import { ReservationUpdateCommand } from "../command/reservation-update-command";

export interface ReservationUpdateUseCaseInterface {
  execute(command: ReservationUpdateCommand, id: string): Promise<ReservationModel>;
}