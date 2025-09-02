import { Reservation } from "../../domain/model/reservation";
import { ReservationEntity } from "../../infrastructure/entity/reservation-entity";

export class ReservationMapper{

    static modelToEntity(reservation: Reservation): ReservationEntity {
        return {
            id: reservation.id,
            numberNights: reservation.numberNights,
            reservationDate: reservation.reservationDate!,
            status: reservation.status!,
            total: reservation.total!,
            customerEntity: {
                id: reservation.customer?.id,
                identification: reservation.customer?.identification!,
                name: reservation.customer?.name!,
                auth: {
                    email: reservation.customer?.auth.email!,
                }
            }, 
            flight: {
                airline: reservation.flight!.airline,
                origin: reservation.flight!.origin,
                destiny:  reservation.flight!.destiny,
                departure: reservation.flight!.departure,
                layovers: reservation.flight!.layovers,
                price: reservation.flight!.price
            },
            hotel: {
                name: reservation.hotel!.name,
                country: reservation.hotel!.country,
                city: reservation.hotel!.city,
                category: reservation.hotel!.category,
                pricePerNight: reservation.hotel!.pricePerNight
            }
        };
    }

    static entityToModel(reservationEntity: ReservationEntity): Reservation {
        return {
            id: reservationEntity.id,
            numberNights: reservationEntity.numberNights,
            reservationDate: reservationEntity.reservationDate!,
            status: reservationEntity.status!,
            total: reservationEntity.total!,
            customer: {
                identification: reservationEntity.customer.identification!,
                name: reservationEntity.customer.name,
                auth: {
                    id: reservationEntity.customer.id,
                    email: reservationEntity.customer.auth.email,
                }
            }, 
            flight: {
                airline: reservationEntity.flight.airline,
                origin: reservationEntity.flight.origin,
                destiny:  reservationEntity.flight.destiny,
                departure: reservationEntity.flight.departure,
                layovers: reservationEntity.flight.layovers,
                price: reservationEntity.flight.price
            },
            hotel: {
                name: reservationEntity.hotel.name,
                country: reservationEntity.hotel.country,
                city: reservationEntity.hotel.city,
                category: reservationEntity.hotel.category,
                pricePerNight: reservationEntity.hotel.pricePerNight
            }
        };
    }
}