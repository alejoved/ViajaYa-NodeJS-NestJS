import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CustomerDTO{
    @ApiProperty({ description: "Customer identification" })
    @IsNotEmpty()
    @IsString()
    identification: string;
    @ApiProperty({ description: "Customer full name" })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ description: "Customer email" })    
    @IsNotEmpty()
    email: string;
    @ApiProperty({ description: "Customer password" })    
    @IsNotEmpty()
    password: string;
}