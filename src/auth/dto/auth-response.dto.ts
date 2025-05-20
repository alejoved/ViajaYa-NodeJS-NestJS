import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AuthResponseDTO{
    @ApiProperty({ description: "Primary email for the admin, patient, physician" })
    @Expose()
    email: string;
}