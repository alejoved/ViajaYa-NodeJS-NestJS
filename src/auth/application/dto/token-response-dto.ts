import { ApiProperty } from "@nestjs/swagger";

export class TokenResponseDto{
    @ApiProperty({ description: "JWT Token encrypt" })
    token: string;
}