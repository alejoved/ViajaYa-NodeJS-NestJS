import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
    @IsNotEmpty()
    @IsString()
    departure: Date;
    @ApiProperty({ description: "Flight layovers number" })
    @IsNotEmpty()
    @IsString()
    layovers: number;

}