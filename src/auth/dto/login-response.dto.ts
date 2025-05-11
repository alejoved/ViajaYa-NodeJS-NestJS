import { Expose } from "class-transformer";
import { Role } from "src/common/role";

export class LoginResponseDTO{
    @Expose()
    token: string;
    @Expose()
    role: Role;
}