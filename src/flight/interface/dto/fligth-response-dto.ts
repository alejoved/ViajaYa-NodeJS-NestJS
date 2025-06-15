import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class FlightResponseDTO{
    @ApiProperty({ description: "Flight ID" })
    @Expose()
    id?: string;
    @ApiProperty({ description: "Main airline for the flight" })
    @Expose()
    airline: string;
    @ApiProperty({ description: "Origin city for the flight" })
    @Expose()
    origin: string;
    @ApiProperty({ description: "destiny city for the flight" })
    @Expose()
    destiny: string;
    @ApiProperty({ description: "Departure date for the flight" })
    @Expose()
    departure: Date;
    @ApiProperty({ description: "Flight exists layovers" })
    @Expose()
    layovers: boolean;
    @ApiProperty({ description: "Flight total price" })
    @Expose()
    price: number;
}