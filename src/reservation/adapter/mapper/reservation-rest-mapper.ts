import { ReservationResponseDTO } from "../dto/reservation-response.dto";
import { Reservation } from "../../domain/model/reservation";
import { ReservationDTO } from "../dto/reservation.dto";

export class ReservationRestMapper{
    static dtoToModel(reservationDTO: ReservationDTO): Reservation {
        return {
            numberNights: reservationDTO.numberNights,
            customerId: reservationDTO.customerId,
            flightId: reservationDTO.flightId,
            hotelId: reservationDTO.hotelId
        };
    }

    static modelToDto(reservationModel: Reservation): ReservationResponseDTO {
        return {
            id: reservationModel.id!,
            numberNights: reservationModel.numberNights,
            reservationDate: reservationModel.reservationDate!,
            status: reservationModel.status!,
            total: reservationModel.total!
        };
    }
}