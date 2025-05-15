import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { AuthResponseDTO } from "src/auth/dto/auth-response.dto";

export class PatientResponseDTO{
    @ApiProperty({ description: "Patient full name" })
    @Expose()
    name: string;
    @ApiProperty({ description: "Name of the heatlh insurance" })
    @Expose()
    insurance: string;
    @ApiProperty({ description: "Authentication data of the patient" }) 
    @Expose()
    @Type(() => AuthResponseDTO)
    auth: AuthResponseDTO;
}