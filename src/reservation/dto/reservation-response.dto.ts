import { Expose, Transform, Type } from "class-transformer";
import { format } from 'date-fns';
import { ApiProperty } from "@nestjs/swagger";
import { CustomerResponseDTO } from "../../customer/dto/customer-response.dto";
import { FlightResponseDTO } from "../../flight/dto/fligth-response.dto";
import { HotelResponseDTO } from "../../hotel/dto/hotel-response.dto";
import { Status } from "../../common/status";

export class ReservationResponseDTO{
    @ApiProperty({ description: "Reservation ID" })
    @Expose()
    id: string;
    @ApiProperty({ description: "Date when the customer did the reservation", example: "2025-05-10 14:00:00" })
    @Expose()
    @Transform(({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss'))
    reservationDate: Date;
    @ApiProperty({ description: "Status of the reservation"})
    @Expose()
    status: Status;
    @ApiProperty({ description: "total price per the flight and hotel"})
    @Expose()
    total: number;
    @ApiProperty({ description: "Main data about the customer" })
    @Expose()
    @Type(() => CustomerResponseDTO)
    customer: CustomerResponseDTO;
    @ApiProperty({ description: "Main data about the flight" })
    @Expose()
    @Type(() => FlightResponseDTO)
    flight: FlightResponseDTO;
    @ApiProperty({ description: "Main data about the hotel" })
    @Expose()
    @Type(() => HotelResponseDTO)
    hotel: HotelResponseDTO;
}