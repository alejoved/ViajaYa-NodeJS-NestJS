import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthResponseDTO{
    @ApiProperty({ description: "Primary identification for the admin, patient, physician" })
    @Expose()
    identification: string;
}