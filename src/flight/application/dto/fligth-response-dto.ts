import { ApiProperty } from "@nestjs/swagger";

export class FlightResponseDto{
    @ApiProperty({ description: "Flight ID" })
    id: string;
    @ApiProperty({ description: "Main airline for the flight" })
    airline: string;
    @ApiProperty({ description: "Origin city for the flight" })
    origin: string;
    @ApiProperty({ description: "destiny city for the flight" })
    destiny: string;
    @ApiProperty({ description: "Departure date for the flight" })
    departure: Date;
    @ApiProperty({ description: "Flight exists layovers" })
    layovers: boolean;
    @ApiProperty({ description: "Flight total price" })
    price: number;
}