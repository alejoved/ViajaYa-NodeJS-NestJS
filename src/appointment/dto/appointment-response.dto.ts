import { Expose, Transform, Type } from "class-transformer";
import { PatientResponseDTO } from "src/patient/dto/patient-response.dto";
import { PhysicianResponseDTO } from "src/physician/dto/physician-response.dto";
import { format } from 'date-fns';

export class AppointmentResponseDTO{
    @Expose()
    @Transform(({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss'))
    startDate: Date;
    @Expose()
    @Transform(({ value }) => format(value, 'yyyy-MM-dd HH:mm:ss'))
    endDate: Date;
    @Expose()
    reason: string;
    @Expose()
    @Type(() => PatientResponseDTO)
    patient: PatientResponseDTO;
    @Expose()
    @Type(() => PhysicianResponseDTO)
    physician: PhysicianResponseDTO;
}