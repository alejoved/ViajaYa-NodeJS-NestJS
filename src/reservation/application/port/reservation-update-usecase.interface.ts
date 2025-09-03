import { ReservationResponseDto } from "../../adapter/dto/reservation-response-dto";
import { ReservationUpdateDto } from "../../adapter/dto/reservation-update-dto";

export interface ReservationUpdateUseCaseInterface {
  execute(reservationUpdateDto: ReservationUpdateDto, id: string): Promise<ReservationResponseDto>;
}