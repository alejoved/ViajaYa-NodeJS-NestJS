import { LoginDTO } from "../dto/login.dto";
import { RegisterDTO } from "../dto/register.dto";
import { LoginResponseDTO } from "../dto/login-response.dto";
import { RegisterResponseDTO } from "../dto/register-response.dto";

export interface AuthInterface{
    login(loginDTO: LoginDTO): Promise<LoginResponseDTO>;
    register(registerDTO: RegisterDTO): Promise<RegisterResponseDTO>;
}