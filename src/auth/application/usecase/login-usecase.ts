import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Constants } from "../../../common/constants";
import { AuthRepositoryInterface } from "src/auth/domain/repository/auth-repository.interface";
import { LoginUseCaseInterface } from "../port/login-usecase.interface";
import { AuthModel } from "src/auth/domain/model/auth-model";

@Injectable()
export class LoginUseCase implements LoginUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('AuthRepositoryInterface')
        private readonly authRepositoryInterface: AuthRepositoryInterface,
        private readonly jwtService: JwtService
      ) {}

    async execute(authModel: AuthModel): Promise<string>{
      const authEntity = await this.authRepositoryInterface.getByEmail(authModel.email);
      if(!authEntity){
        throw new NotFoundException(Constants.authNotFound);
      }
      if(!compareSync(authModel.password!, authEntity.password!)){
        throw new UnauthorizedException(Constants.credentialsNotValid);
      }
      const token = this.jwtService.sign({email: authModel.email});
      return token;
    }
}