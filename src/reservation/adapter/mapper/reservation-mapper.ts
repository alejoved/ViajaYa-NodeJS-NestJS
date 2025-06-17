import { ReservationResponseDTO } from "../../adapter/dto/reservation-response.dto";
import { ReservationModel } from "../../domain/model/reservation-model";
import { ReservationEntity } from "../../infrastructure/entity/reservation-entity";
import { ReservationDTO } from "../../adapter/dto/reservation.dto";

export class ReservationMapper{
    static dtoToModel(reservationDTO: ReservationDTO): ReservationModel {
        return {
            numberNights: reservationDTO.numberNights,
            customerEmail: reservationDTO.customerEmail,
            flightId: reservationDTO.flightId,
            hotelId: reservationDTO.hotelId
        };
    }

    static modelToEntity(reservationModel: ReservationModel): ReservationEntity {
        return {
            numberNights: reservationModel.numberNights,
            reservationDate: reservationModel.reservationDate!,
            status: reservationModel.status!,
            total: reservationModel.total!,
            customerEntity: {
                id: reservationModel.customerModel?.id,
                identification: reservationModel.customerModel?.identification!,
                name: reservationModel.customerModel?.name!,
                authEntity: {
                    email: reservationModel.customerModel?.authModel.email!,
                }
            }, 
            flightEntity: {
                airline: reservationModel.flightModel!.airline,
                origin: reservationModel.flightModel!.origin,
                destiny:  reservationModel.flightModel!.destiny,
                departure: reservationModel.flightModel!.departure,
                layovers: reservationModel.flightModel!.layovers,
                price: reservationModel.flightModel!.price
            },
            hotelEntity: {
                name: reservationModel.hotelModel!.name,
                country: reservationModel.hotelModel!.country,
                city: reservationModel.hotelModel!.city,
                category: reservationModel.hotelModel!.category,
                pricePerNight: reservationModel.hotelModel!.pricePerNight
            }
        };
    }

    static entityToModel(reservationEntity: ReservationEntity): ReservationModel {
        return {
            id: reservationEntity.id,
            numberNights: reservationEntity.numberNights,
            reservationDate: reservationEntity.reservationDate!,
            status: reservationEntity.status!,
            total: reservationEntity.total!,
            customerModel: {
                identification: reservationEntity.customerEntity.identification!,
                name: reservationEntity.customerEntity.name,
                authModel: {
                    email: reservationEntity.customerEntity.authEntity.email,
                }
            }, 
            flightModel: {
                airline: reservationEntity.flightEntity.airline,
                origin: reservationEntity.flightEntity.origin,
                destiny:  reservationEntity.flightEntity.destiny,
                departure: reservationEntity.flightEntity.departure,
                layovers: reservationEntity.flightEntity.layovers,
                price: reservationEntity.flightEntity.price
            },
            hotelModel: {
                name: reservationEntity.hotelEntity.name,
                country: reservationEntity.hotelEntity.country,
                city: reservationEntity.hotelEntity.city,
                category: reservationEntity.hotelEntity.category,
                pricePerNight: reservationEntity.hotelEntity.pricePerNight
            }
        };
    }
    static modelToDto(reservationModel: ReservationModel): ReservationResponseDTO {
        return {
            id: reservationModel.id!,
            numberNights: reservationModel.numberNights,
            reservationDate: reservationModel.reservationDate!,
            status: reservationModel.status!,
            total: reservationModel.total!,
            customer: {
                id: reservationModel.customerModel!.id!,
                identification: reservationModel.customerModel!.identification,
                name: reservationModel.customerModel!.name,
                email: reservationModel.customerModel!.authModel.email,
            }, 
            flight: {
                id: reservationModel.flightModel!.id!,
                airline: reservationModel.flightModel!.airline,
                origin: reservationModel.flightModel!.origin,
                destiny:  reservationModel.flightModel!.destiny,
                departure: reservationModel.flightModel!.departure,
                layovers: reservationModel.flightModel!.layovers,
                price: reservationModel.flightModel!.price
            },
            hotel: {
                id: reservationModel.hotelModel!.id!,
                name: reservationModel.hotelModel!.name,
                country: reservationModel.hotelModel!.country,
                city: reservationModel.hotelModel!.city,
                category: reservationModel.hotelModel!.category,
                pricePerNight: reservationModel.hotelModel!.pricePerNight
            }
        };
    }
}