import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PatientDTO{
    @ApiProperty({ description: "Primary identification for the patient" })
    @IsNotEmpty()
    @IsString()
    identification: string;
    @ApiProperty({ description: "Password for the login" })
    @IsNotEmpty()
    @IsString()
    password: string;
    @ApiProperty({ description: "Patient full name" })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({ description: "Name of the health insurance" })
    @IsNotEmpty()
    @IsString()
    insurance: string;
}