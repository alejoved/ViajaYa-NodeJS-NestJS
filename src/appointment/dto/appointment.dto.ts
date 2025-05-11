import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AppointmentDTO{
    @IsNotEmpty()
    @IsDate()
    startDate: Date;
    @IsNotEmpty()
    @IsNumber()
    duration: number;
    @IsNotEmpty()
    @IsString()
    reason: string;
    @IsNotEmpty()
    @IsString()
    patientIdentification: string;
    @IsNotEmpty()
    @IsString()
    physicianIdentification: string;
}