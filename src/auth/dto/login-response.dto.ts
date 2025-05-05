import { Expose } from "class-transformer";
import { Role } from "src/utils/role";

export class LoginResponseDTO{
    @Expose()
    token: string;
    @Expose()
    role: Role;
}