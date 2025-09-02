import { ReservationResponseDTO } from "../../adapter/dto/reservation-response.dto";
import { Reservation } from "../../domain/model/reservation";
import { ReservationEntity } from "../../infrastructure/entity/reservation-entity";
import { ReservationDTO } from "../../adapter/dto/reservation.dto";

export class ReservationMapper{
    static dtoToModel(reservationDTO: ReservationDTO): Reservation {
        return {
            numberNights: reservationDTO.numberNights,
            customerId: reservationDTO.customerId,
            flightId: reservationDTO.flightId,
            hotelId: reservationDTO.hotelId
        };
    }

    static modelToEntity(reservation: Reservation): ReservationEntity {
        return {
            numberNights: reservation.numberNights,
            reservationDate: reservation.reservationDate!,
            status: reservation.status!,
            total: reservation.total!,

        };
    }

    static entityToModel(reservation: ReservationEntity): Reservation {
        return {
            id: reservation.id,
            numberNights: reservation.numberNights,
            reservationDate: reservation.reservationDate!,
            status: reservation.status!,
            total: reservation.total!,
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