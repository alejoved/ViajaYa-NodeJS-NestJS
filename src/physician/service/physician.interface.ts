import { ICRUD } from "src/utils/ICRUD";
import { PhysicianDTO } from "../dto/physician.dto";
import { PhysicianResponseDTO } from "../dto/physician-response.dto";

export interface PhysicianInterface extends ICRUD<PhysicianDTO,  PhysicianResponseDTO>{
    
}