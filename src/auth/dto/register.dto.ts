import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDTO{
    @ApiProperty({ description: "Primary identification for the sign up" })
    @IsNotEmpty()
    @IsString()
    identification: string;
    @ApiProperty({ description: "Password for the sign up" })
    @IsNotEmpty()
    @IsString()
    password: string;
}