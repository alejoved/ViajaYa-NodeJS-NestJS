import { ReservationModel } from "../../domain/model/reservation-model";
import { Reservation} from "../../infrastructure/entity/reservation";

export class ReservationMapper{

    static modelToEntity(reservationModel: ReservationModel): Reservation {
        return {
            numberNights: reservationModel.numberNights,
            reservationDate: reservationModel.reservationDate!,
            status: reservationModel.status!,
            total: reservationModel.total!,
            customer: {
                id: reservationModel.customerModel?.id,
                identification: reservationModel.customerModel?.identification!,
                name: reservationModel.customerModel?.name!,
                auth: {
                    email: reservationModel.customerModel?.authModel.email!,
                }
            }, 
            flight: {
                airline: reservationModel.flightModel!.airline,
                origin: reservationModel.flightModel!.origin,
                destiny:  reservationModel.flightModel!.destiny,
                departure: reservationModel.flightModel!.departure,
                layovers: reservationModel.flightModel!.layovers,
                price: reservationModel.flightModel!.price
            },
            hotel: {
                name: reservationModel.hotelModel!.name,
                country: reservationModel.hotelModel!.country,
                city: reservationModel.hotelModel!.city,
                category: reservationModel.hotelModel!.category,
                pricePerNight: reservationModel.hotelModel!.pricePerNight
            }
        };
    }

    static entityToModel(reservation: Reservation): ReservationModel {
        return {
            id: reservation.id,
            numberNights: reservation.numberNights,
            reservationDate: reservation.reservationDate!,
            status: reservation.status!,
            total: reservation.total!,
            customerModel: {
                identification: reservation.customer.identification!,
                name: reservation.customer.name,
                authModel: {
                    email: reservation.customer.auth.email,
                }
            }, 
            flightModel: {
                airline: reservation.flight.airline,
                origin: reservation.flight.origin,
                destiny:  reservation.flight.destiny,
                departure: reservation.flight.departure,
                layovers: reservation.flight.layovers,
                price: reservation.flight.price
            },
            hotelModel: {
                name: reservation.hotel.name,
                country: reservation.hotel.country,
                city: reservation.hotel.city,
                category: reservation.hotel.category,
                pricePerNight: reservation.hotel.pricePerNight
            }
        };
    }
}