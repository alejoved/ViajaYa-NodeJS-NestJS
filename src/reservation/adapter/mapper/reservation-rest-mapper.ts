import { ReservationResponseDto } from "../dto/reservation-response-dto";
import { Reservation } from "../../domain/model/reservation";
import { ReservationCreateDto } from "../dto/reservation-create-dto";
import { ReservationUpdateDto } from "../dto/reservation-update-dto";

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