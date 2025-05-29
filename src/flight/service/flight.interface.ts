import { ICRUD } from "../../common/ICRUD";
import { FlightDTO } from "../dto/fligth.dto";
import { FlightResponseDTO } from "../dto/fligth-response.dto";

export interface FlightInterface extends ICRUD<FlightDTO,  FlightResponseDTO>{
    getByOriginAndDestiny(origin: string, destiny: string): Promise<FlightResponseDTO[]>
}