import { PatientResponseDTO } from "src/patient/dto/patient-response.dto";
import { PhysicianResponseDTO } from "src/physician/dto/physician-response.dto";

export class AppointmentResponseDTO{
    startDate: Date;
    endDate: Date;
    reason: string;
    patient: PatientResponseDTO;
    physician: PhysicianResponseDTO;
}