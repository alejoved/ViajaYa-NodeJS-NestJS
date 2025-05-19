import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CustomerDTO{
    @ApiProperty({ description: "Primary identification for the customer" })    
    @IsNotEmpty()
    @IsString()
    identification: string;
    @ApiProperty({ description: "Physician full name" })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ description: "Primary email for the customer" })    
    @IsNotEmpty()
    @IsString()
    email: string;
    @ApiProperty({ description: "Password for the login" })
    @IsNotEmpty()
    @IsString()
    password: string;
}