import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Role } from "../../../common/role";

export class LoginResponseDTO{
    @ApiProperty({ description: "JWT Token encrypt" })
    @Expose()
    token: string;
}