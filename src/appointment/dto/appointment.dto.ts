import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AppointmentDTO{
    @ApiProperty({ description: "Initial date of the appointment" })
    @IsNotEmpty()
    @IsDate()
    startDate: Date;
    @ApiProperty({ description: "Appointment duration in minutes" })
    @IsNotEmpty()
    @IsNumber()
    duration: number;
    @ApiProperty({ description: "Description about the appointment" })
    @IsNotEmpty()
    @IsString()
    reason: string;
    @ApiProperty({ description: "Primary identification about the patient" })
    @IsNotEmpty()
    @IsString()
    patientIdentification: string;
    @ApiProperty({ description: "Primary identification about the physician" })
    @IsNotEmpty()
    @IsString()
    physicianIdentification: string;
}