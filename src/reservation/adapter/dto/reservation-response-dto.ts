import { Expose, Transform, Type } from "class-transformer";
import { format } from 'date-fns';
import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/common/status";
import { CustomerResponseDto } from "../../../customer/application/dto/customer-response-dto";
import { FlightResponseDto } from "src/flight/application/dto/fligth-response-dto";
import { HotelResponseDto } from "src/hotel/application/dto/hotel-response-dto";

export class ReservationResponseDto {
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
    @ApiProperty({ description: "total number of nights in the hotel"})
    @Expose()
    numberNights: number;
    @ApiProperty({ description: "total price per the flight and hotel"})
    @Expose()
    total: number;
    @ApiProperty({ description: "Object description about customer"})
    @Expose()
    customer: CustomerResponseDto;
    @ApiProperty({ description: "Object description about flight"})
    @Expose()
    flight: FlightResponseDto;
    @ApiProperty({ description: "Object description about hotel"})
    @Expose()
    hotel: HotelResponseDto;

}