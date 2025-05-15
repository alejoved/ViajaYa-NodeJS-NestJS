import { Expose, Transform, Type } from "class-transformer";
import { PatientResponseDTO } from "src/patient/dto/patient-response.dto";
import { PhysicianResponseDTO } from "src/physician/dto/physician-response.dto";
import { format } from 'date-fns';
import { ApiProperty } from "@nestjs/swagger";

export class AppointmentResponseDTO{
    @ApiProperty({ description: "Appointment ID" })
    @Expose()
    id: string;
    @ApiProperty({ description: "Date for to start medical appointment", example: "2025-05-10 14:00:00" })
    @Expose()
    @Transform(({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss'))
    startDate: Date;
    @ApiProperty({ description: "Date for to end medical appointment", example: "2025-05-10 14:20:00" })
    @Expose()
    @Transform(({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss'))
    endDate: Date;
    @ApiProperty({ description: "Description about the appointment" })
    @Expose()
    reason: string;
    @ApiProperty({ description: "Main data about the patient" })
    @Expose()
    @Type(() => PatientResponseDTO)
    patient: PatientResponseDTO;
    @ApiProperty({ description: "Main data about the physician" })
    @Expose()
    @Type(() => PhysicianResponseDTO)
    physician: PhysicianResponseDTO;
}