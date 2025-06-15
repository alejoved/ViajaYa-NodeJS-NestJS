import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../../common/role";

export class AuthResponseDTO{
    @ApiProperty({ description: "Email user" })
    email: string;
    @ApiProperty({ description: "Role user" })
    role?: Role;
}