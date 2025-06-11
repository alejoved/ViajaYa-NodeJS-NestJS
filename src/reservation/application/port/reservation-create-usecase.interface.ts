import { ReservationModel } from "../../../reservation/domain/model/reservation-model";
import { ReservationCreateCommand } from "../command/reservation-create-command";

export interface ReservationCreateUseCaseInterface {
  execute(command: ReservationCreateCommand): Promise<ReservationModel>;
}