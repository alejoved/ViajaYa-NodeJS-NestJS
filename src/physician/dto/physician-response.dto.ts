import { Expose, Type } from "class-transformer";
import { AuthResponseDTO } from "src/auth/dto/auth-response.dto";

export class PhysicianResponseDTO{
    @Expose()
    name: string;
    @Expose()
    code: string;
    @Expose()
    speciality: string;
    @Expose()
    @Type(() => AuthResponseDTO)
    auth: AuthResponseDTO;
}