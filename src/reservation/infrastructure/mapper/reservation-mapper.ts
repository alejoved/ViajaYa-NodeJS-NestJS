import { Reservation } from "../../domain/model/reservation";
import { ReservationEntity } from "../entity/reservation-entity";

export class ReservationMapper{

    static modelToEntity(reservation: Reservation): ReservationEntity {
        return {
            id: reservation.id,
            numberNights: reservation.numberNights,
            reservationDate: reservation.reservationDate!,
            status: reservation.status!,
            total: reservation.total!
        };
    }

    static entityToModel(reservationEntity: ReservationEntity): Reservation {
        return {
            id: reservationEntity.id,
            numberNights: reservationEntity.numberNights,
            reservationDate: reservationEntity.reservationDate,
            status: reservationEntity.status,
            total: reservationEntity.total,
        };
    }
}