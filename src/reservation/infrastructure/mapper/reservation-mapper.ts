import { CustomerMapper } from "src/customer/infrastructure/mapper/customer-mapper";
import { Reservation } from "../../domain/model/reservation";
import { ReservationEntity } from "../entity/reservation-entity";
import { FlightMapper } from "../../../flight/infrastructure/mapper/flight-mapper";
import { HotelMapper } from "../../../hotel/infrastructure/mapper/hotel-mapper";

export class ReservationMapper{

    static modelToEntity(reservation: Reservation): ReservationEntity {
        return {
            id: reservation.id,
            numberNights: reservation.numberNights,
            reservationDate: reservation.reservationDate!,
            status: reservation.status!,
            total: reservation.total!,
            customerEntity: CustomerMapper.modelToEntity(reservation.customer!),
            flightEntity: FlightMapper.modelToEntity(reservation.flight!),
            hotelEntity: HotelMapper.modelToEntity(reservation.hotel!)

        };
    }

    static entityToModel(reservationEntity: ReservationEntity): Reservation {
        return {
            id: reservationEntity.id,
            numberNights: reservationEntity.numberNights,
            reservationDate: reservationEntity.reservationDate,
            status: reservationEntity.status,
            total: reservationEntity.total,
            customer: CustomerMapper.entityToModel(reservationEntity.customerEntity),
            flight: FlightMapper.entityToModel(reservationEntity.flightEntity),
            hotel: HotelMapper.entityToModel(reservationEntity.hotelEntity)
        };
    }
}