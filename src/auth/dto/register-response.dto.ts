import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class RegisterResponseDTO{
    @ApiProperty({ description: "Primary identification for the sign up" })
    @Expose()
    email: string;
}