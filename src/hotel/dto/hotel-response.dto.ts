import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class HotelResponseDTO {
    @ApiProperty({ description: "Hotel ID" })
    @Expose()
    id: string;
    @ApiProperty({ description: "Hotel full name" })
    @Expose()
    name: string;
    @ApiProperty({ description: "Hotel address" })
    @Expose()
    addres: string;
    @ApiProperty({ description: "Hotel city" })
    @Expose()
    city: string;
    @ApiProperty({ description: "Hotel Category (1,2,3,4,5)" })
    @Expose()
    category: string;
    @ApiProperty({ description: "Price per night in the hotel" })
    @Expose()
    pricePerNight: number;
}