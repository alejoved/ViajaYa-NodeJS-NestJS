import { ReservationCreateDto } from "src/reservation/adapter/dto/reservation-create-dto";
import { ReservationResponseDto } from "src/reservation/adapter/dto/reservation-response-dto";

export interface ReservationCreateUseCaseInterface {
  execute(reservationCreateDto: ReservationCreateDto): Promise<ReservationResponseDto>;
}