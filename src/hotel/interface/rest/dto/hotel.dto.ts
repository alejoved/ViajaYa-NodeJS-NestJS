import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class HotelDTO{
    @ApiProperty({ description: "Hotel full name" })    
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ description: "Hotel's country" })
    @IsNotEmpty()
    @IsString()
    country: string;
    @ApiProperty({ description: "Hotel's city" })
    @IsNotEmpty()
    @IsString()
    city: string;
    @ApiProperty({ description: "Hotel category (1,2,3,4,5)" })
    @IsNotEmpty()
    @IsString()
    category: string;
    @ApiProperty({ description: "Price per night in the hotel" })
    @IsNotEmpty()
    @IsNumber()
    pricePerNight: number;
}