import { ApiProperty } from "@nestjs/swagger";

export class TokenResponseDTO{
    @ApiProperty({ description: "JWT Token encrypt" })
    token: string;
}