import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/utils/role";

export class RegisterDTO{
    @IsNotEmpty()
    @IsString()
    identification: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}