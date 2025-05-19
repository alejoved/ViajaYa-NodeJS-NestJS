import { ICRUD } from "src/common/ICRUD";
import { ReservationResponseDTO } from "../dto/reservation-response.dto";
import { ReservationDTO } from "../dto/reservation.dto";

export interface ReservationInterface extends ICRUD<ReservationDTO,  ReservationResponseDTO>{
    
}