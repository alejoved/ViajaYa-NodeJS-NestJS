import { IsEnum, IsString } from "class-validator";
import { Role } from "src/utils/role";

export class RegisterDTO{
    @IsString()
    identification: string;
    @IsString()
    password: string;
    @IsEnum(Role)
    role: Role;
}