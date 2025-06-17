import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDTO{
    @ApiProperty({ description: "Primary email for the sign up" })
    @IsNotEmpty()
    @IsString()
    email: string;
    @ApiProperty({ description: "Password for the sign up" })
    @IsNotEmpty()
    @IsString()
    password: string;
}