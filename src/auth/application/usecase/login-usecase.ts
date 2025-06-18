import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compareSync, hashSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Constants } from "../../../common/constants";
import { AuthRepositoryInterface } from "src/auth/domain/repository/auth-repository.interface";
import { LoginUseCaseInterface } from "../interface/login-usecase.interface";
import { AuthModel } from "../../domain/model/auth-model";

@Injectable()
export class LoginUseCase implements LoginUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('AuthRepositoryInterface')
        private readonly authRepositoryInterface: AuthRepositoryInterface,
        private readonly jwtService: JwtService
      ) {}

    async execute(authModel: AuthModel): Promise<string>{
      const authModelExist = await this.authRepositoryInterface.getByEmail(authModel.email);
      if(!authModelExist){
        throw new NotFoundException(Constants.authNotFound);
      }
      if(!compareSync(authModel.password!, authModelExist.password!)){
        throw new UnauthorizedException(Constants.credentialsNotValid);
      }
      const token = this.jwtService.sign({email: authModel.email});
      return token;
    }
}