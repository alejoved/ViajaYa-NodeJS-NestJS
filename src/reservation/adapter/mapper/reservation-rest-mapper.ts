import { ReservationResponseDto } from "../dto/reservation-response-dto";
import { Reservation } from "../../domain/model/reservation";
import { ReservationCreateDto } from "../dto/reservation-create-dto";
import { ReservationUpdateDto } from "../dto/reservation-update-dto";

export class ReservationRestMapper{
    static createDtoToModel(reservationCreateDto: ReservationCreateDto): Reservation {
        return {
            numberNights: reservationCreateDto.numberNights,
            customerId: reservationCreateDto.customerId,
            flightId: reservationCreateDto.flightId,
            hotelId: reservationCreateDto.hotelId
        };
    }

    static updateDtoToModel(reservationUpdateDto: ReservationUpdateDto): Reservation {
        return {
            numberNights: reservationUpdateDto.numberNights,
            customerId: reservationUpdateDto.customerId,
            flightId: reservationUpdateDto.flightId,
            hotelId: reservationUpdateDto.hotelId
        };
    }

    static modelToDto(reservationModel: Reservation): ReservationResponseDto {
        return {
            id: reservationModel.id!,
            numberNights: reservationModel.numberNights,
            reservationDate: reservationModel.reservationDate!,
            status: reservationModel.status!,
            total: reservationModel.total!
        };
    }
}