import { ICRUD } from "src/common/ICRUD";
import { PatientResponseDTO } from "../dto/patient-response.dto";
import { PatientDTO } from "../dto/patient.dto";

export interface PatientInterface extends ICRUD<PatientDTO,  PatientResponseDTO>{
    getByIdentification(id: string): Promise<PatientResponseDTO>
}