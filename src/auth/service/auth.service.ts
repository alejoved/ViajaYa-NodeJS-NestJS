import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "src/auth/entity/auth.entity";
import { Repository } from "typeorm";
import { AuthInterface } from "./auth.interface";
import { LoginDTO } from "../dto/login.dto";
import { LoginResponseDTO } from "../dto/login-response.dto";
import { RegisterDTO } from "../dto/register.dto";
import { RegisterResponseDTO } from "../dto/register-response.dto";

@Injectable()
export class AuthService implements AuthInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @InjectRepository(Auth)
        private readonly userRepository: Repository<Auth>,
      ) {}

    async login(loginDTO: LoginDTO): Promise<LoginResponseDTO>{
        return new LoginResponseDTO();
    }
    async register(registerDTO: RegisterDTO): Promise<RegisterResponseDTO>{
        return new RegisterResponseDTO();
    }
}