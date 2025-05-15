import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO{
    @ApiProperty({ description: "Identification for the login" })
    @IsNotEmpty()
    @IsString()
    identification: string;
    @ApiProperty({ description: "Password for the login minimum 4 characters" })
    @IsNotEmpty()
    @IsString()
    password: string;
}