import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Constants } from "../../../common/constants";
import { AuthRepositoryInterface } from "src/auth/domain/repository/auth-repository.interface";
import { LoginUseCaseInterface } from "../port/login-usecase.interface";
import { Auth } from "../../domain/model/auth";
import { TokenResponseDto } from "../dto/token-response-dto";
import { AuthRestMapper } from "../mapper/auth-rest-mapper";

@Injectable()
export class LoginUseCase implements LoginUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('AuthRepositoryInterface')
        private readonly authRepositoryInterface: AuthRepositoryInterface,
        private readonly jwtService: JwtService
      ) {}

    async execute(authModel: Auth): Promise<TokenResponseDto>{
      const authModelExist = await this.authRepositoryInterface.getByEmail(authModel.email);
      if(!authModelExist){
        throw new NotFoundException(Constants.authNotFound);
      }
      if(!compareSync(authModel.password!, authModelExist.password!)){
        throw new UnauthorizedException(Constants.credentialsNotValid);
      }
      const token = this.jwtService.sign({email: authModel.email});
      const tokenResponseDto = AuthRestMapper.modelToTokenResponseDTO(token);
      return tokenResponseDto;
    }
}