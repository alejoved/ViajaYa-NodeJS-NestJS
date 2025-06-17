import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { format } from "date-fns";

export class FlightDTO{
    @ApiProperty({ description: "Main airline for the flight" })
    @IsNotEmpty()
    @IsString()
    airline: string;
    @ApiProperty({ description: "Origin city for the flight" })
    @IsNotEmpty()
    @IsString()
    origin: string;
    @ApiProperty({ description: "destiny city for the flight" })
    @IsNotEmpty()
    @IsString()
    destiny: string;
    @ApiProperty({ description: "Departure date for the flight" })
    @Transform(({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss'))
    @IsNotEmpty()
    @IsString()
    departure: Date;
    @ApiProperty({ description: "Flight layovers" })
    @IsNotEmpty()
    @IsBoolean()
    layovers: boolean;
    @ApiProperty({ description: "Flight total price" })
    @IsNotEmpty()
    @IsNumber()
    price: number;
}