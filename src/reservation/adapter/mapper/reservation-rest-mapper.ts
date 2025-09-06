import { ReservationResponseDto } from "../dto/reservation-response-dto";
import { Reservation } from "../../domain/model/reservation";
import { ReservationCreateDto } from "../dto/reservation-create-dto";
import { ReservationUpdateDto } from "../dto/reservation-update-dto";
import { CustomerRestMapper } from "../../../customer/application/mapper/customer-rest-mapper";
import { FlightRestMapper } from "../../../flight/application/mapper/flight-rest-mapper";
import { HotelRestMapper } from "../../../hotel/application/mapper/hotel-rest-mapper";

export class ReservationRestMapper{
    static createDtoToModel(reservationCreateDto: ReservationCreateDto): Reservation {
        return {
            numberNights: reservationCreateDto.numberNights
        };
    }

    static updateDtoToModel(reservationUpdateDto: ReservationUpdateDto, id: string): Reservation {
        return {
            id: id,
            numberNights: reservationUpdateDto.numberNights
        };
    }

    static modelToDto(reservation: Reservation): ReservationResponseDto {
        return {
            id: reservation.id!,
            numberNights: reservation.numberNights,
            reservationDate: reservation.reservationDate!,
            status: reservation.status!,
            total: reservation.total!,
            customer : CustomerRestMapper.modelToDto(reservation.customer!),
            flight : FlightRestMapper.modelToDto(reservation.flight!),
            hotel : HotelRestMapper.modelToDto(reservation.hotel!)
        };
    }
}