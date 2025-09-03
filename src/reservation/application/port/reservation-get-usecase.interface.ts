import { ReservationResponseDto } from "../../adapter/dto/reservation-response-dto";

export interface ReservationGetUseCaseInterface {
  execute(): Promise<ReservationResponseDto[]>;
  executeById(id: string): Promise<ReservationResponseDto>;
}