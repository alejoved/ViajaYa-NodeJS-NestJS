import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PhysicianDTO{
    @ApiProperty({ description: "Primary identification for the physician" })    
    @IsNotEmpty()
    @IsString()
    identification: string;
    @ApiProperty({ description: "Password for the login" })
    @IsNotEmpty()
    @IsString()
    password: string;
    @ApiProperty({ description: "Physician full name" })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ description: "General medical code" })
    @IsNotEmpty()
    @IsString()
    code: string;
    @ApiProperty({ description: "Speciality field of the physician" })
    @IsNotEmpty()
    @IsString()
    speciality: string;
}