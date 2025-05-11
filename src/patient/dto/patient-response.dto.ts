import { Expose, Type } from "class-transformer";
import { AuthResponseDTO } from "src/auth/dto/auth-response.dto";

export class PatientResponseDTO{
    @Expose()
    name: string;
    @Expose()
    insurance: string;
    @Expose()
    @Type(() => AuthResponseDTO)
    auth: AuthResponseDTO;
}