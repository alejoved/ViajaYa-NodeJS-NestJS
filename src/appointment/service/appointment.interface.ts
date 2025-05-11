import { ICRUD } from "src/common/ICRUD";
import { AppointmentResponseDTO } from "../dto/appointment-response.dto";
import { AppointmentDTO } from "../dto/appointment.dto";

export interface AppointmentInterface extends ICRUD<AppointmentDTO,  AppointmentResponseDTO>{
    
}