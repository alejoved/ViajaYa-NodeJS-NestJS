import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReservationDTO{
    @ApiProperty({ description: "Customer's email" })
    @IsNotEmpty()
    @IsString()
    customerEmail: string;
    @ApiProperty({ description: "Flight primary ID" })
    @IsNotEmpty()
    @IsString()
    flightId?: string;
    @ApiProperty({ description: "Hotel primarty ID" })
    @IsNotEmpty()
    @IsString()
    hotelId?: string;
    @ApiProperty({ description: "Number of nigths in the hotel" })
    @IsNotEmpty()
    @IsNumber()
    numberNights: number;
}