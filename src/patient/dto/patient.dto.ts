import { IsNotEmpty, IsString } from "class-validator";

export class PatientDTO{
    @IsNotEmpty()
    @IsString()
    identification: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    insurance: string;
}