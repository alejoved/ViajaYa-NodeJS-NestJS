import { ApiProperty } from "@nestjs/swagger";

export class HotelResponseDTO {
    @ApiProperty({ description: "Hotel ID" })
    id: string;
    @ApiProperty({ description: "Hotel full name" })
    name: string;
    @ApiProperty({ description: "Hotel country" })
    country: string;
    @ApiProperty({ description: "Hotel city" })
    city: string;
    @ApiProperty({ description: "Hotel Category (1,2,3,4,5)" })
    category: string;
    @ApiProperty({ description: "Price per night in the hotel" })
    pricePerNight: number;
}