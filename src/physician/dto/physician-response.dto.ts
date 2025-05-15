import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { AuthResponseDTO } from "src/auth/dto/auth-response.dto";

export class PhysicianResponseDTO{
    @ApiProperty({ description: "Physician full name" })
    @Expose()
    name: string;
    @ApiProperty({ description: "General medical code" })
    @Expose()
    code: string;
    @ApiProperty({ description: "Speciality field of the physician" })
    @Expose()
    speciality: string;
    @ApiProperty({ description: "Authentication data of the physician" })
    @Expose()
    @Type(() => AuthResponseDTO)
    auth: AuthResponseDTO;
}