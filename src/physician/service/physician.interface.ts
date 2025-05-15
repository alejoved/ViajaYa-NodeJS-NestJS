import { ICRUD } from "src/common/ICRUD";
import { PhysicianDTO } from "../dto/physician.dto";
import { PhysicianResponseDTO } from "../dto/physician-response.dto";

export interface PhysicianInterface extends ICRUD<PhysicianDTO,  PhysicianResponseDTO>{
    getByIdentification(id: string): Promise<PhysicianResponseDTO>
}