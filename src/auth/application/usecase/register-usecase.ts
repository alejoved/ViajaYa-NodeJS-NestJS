import { Inject, Injectable, Logger } from "@nestjs/common";
import { hashSync } from "bcrypt";
import { Role } from "../../../common/role";
import { AuthRepositoryInterface } from "../../domain/repository/auth-repository.interface";
import { RegisterUseCaseInterface } from "../port/register-usecase.interface";
import { AuthResponseDto } from "../dto/auth-response-dto";
import { AuthDto } from "../dto/auth-dto";
import { AuthRestMapper } from "../mapper/auth-rest-mapper";


@Injectable()
export class RegisterUseCase implements RegisterUseCaseInterface{

    private readonly logger = new Logger("AuthService");

    constructor(@Inject('AuthRepositoryInterface') private readonly authRepositoryInterface: AuthRepositoryInterface
      ) {}

    async execute(authDto: AuthDto): Promise<AuthResponseDto>{
      const auth = AuthRestMapper.dtoToModel(authDto);
      const password = hashSync(auth.password!, 3);
      auth.password = password;
      auth.role = Role.ADMIN;
      const response = await this.authRepositoryInterface.create(auth);
      const authResponseDto = AuthRestMapper.modelToAuthResponseDto(response);
      return authResponseDto;
    }
}