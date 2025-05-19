import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class HotelDTO{
    @ApiProperty({ description: "Hotel full name" })    
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ description: "Hotel address" })
    @IsNotEmpty()
    @IsString()
    addres: string;
    @ApiProperty({ description: "Hotel city" })
    @IsNotEmpty()
    @IsString()
    city: string;
    @ApiProperty({ description: "Hotel category (1,2,3,4,5)" })
    @IsNotEmpty()
    @IsString()
    category: string;
    @ApiProperty({ description: "Price per night in the hotel" })
    @IsNotEmpty()
    @IsString()
    pricePerNight: string;
}