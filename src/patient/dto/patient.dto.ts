import { IsString } from "class-validator";

export class PatientDTO{
    @IsString()
    identification: string;
    @IsString()
    password: string;
    @IsString()
    name: string;
    @IsString()
    insurance: string;
}