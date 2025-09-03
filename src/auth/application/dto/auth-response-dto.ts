import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../common/role";

export class AuthResponseDto{
    @ApiProperty({ description: "Email user" })
    email: string;
    @ApiProperty({ description: "Role user" })
    role: Role;
}