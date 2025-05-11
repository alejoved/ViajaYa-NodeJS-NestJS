import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "src/auth/entity/auth.entity";
import { Repository } from "typeorm";
import { AuthInterface } from "./auth.interface";
import { LoginDTO } from "../dto/login.dto";
import { LoginResponseDTO } from "../dto/login-response.dto";
import { RegisterDTO } from "../dto/register.dto";
import { RegisterResponseDTO } from "../dto/register-response.dto";
import { compareSync, hashSync } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { JwtService } from "@nestjs/jwt";
import { Constants } from "src/common/constants";
import { Role } from "src/common/role";

@Injectable()
export class AuthService implements AuthInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly jwtService: JwtService
      ) {}

    async register(registerDTO: RegisterDTO): Promise<RegisterResponseDTO>{
        try {
            const password = hashSync(registerDTO.password, 3); 
            const auth = plainToInstance(Auth, registerDTO, {excludeExtraneousValues: true});
            auth.password = password;
            auth.role = Role.ADMIN;
            this.authRepository.create(auth);
            await this.authRepository.save(auth);
            return plainToInstance(RegisterResponseDTO, auth, {excludeExtraneousValues: true});
        } catch(error){
            this.logger.error(error.message);
            throw new InternalServerErrorException();
        }
    }
    async login(loginDTO: LoginDTO): Promise<LoginResponseDTO>{
        try {
              const auth = await this.authRepository.findOneBy({identification: loginDTO.identification});
              if(!auth){
                throw new NotFoundException(Constants.authNotFound);
              }
              if(!compareSync(loginDTO.password, auth.password)){
                throw new UnauthorizedException(Constants.credentialsNotValid);
              }
              const token = this.jwtService.sign({identification: loginDTO.identification});
              return plainToInstance(LoginResponseDTO, {...auth, token},{
                excludeExtraneousValues: true,
              });
            } catch(error){
              this.logger.error(error);
              if(error instanceof UnauthorizedException){
                throw error;
              }
            throw new InternalServerErrorException();
          }
    }
}