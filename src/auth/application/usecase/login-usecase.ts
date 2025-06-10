import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compareSync } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Constants } from "../../../common/constants";
import { AuthRepositoryInterface } from "src/auth/domain/repository/auth-repository.interface";
import { LoginCommand } from "../command/login-command";
import { LoginUseCaseInterface } from "../port/login-usecase.interface";

@Injectable()
export class LoginUseCase implements LoginUseCaseInterface {

    private readonly logger = new Logger("AuthService");

    constructor(
        @Inject('AuthRepositoryInterface')
        private readonly authRepositoryInterface: AuthRepositoryInterface,
        private readonly jwtService: JwtService
      ) {}

    async execute(loginCommand: LoginCommand): Promise<string>{
      const authModel = await this.authRepositoryInterface.getByEmail(loginCommand.email);
      if(!authModel){
        throw new NotFoundException(Constants.authNotFound);
      }
      if(!compareSync(loginCommand.password, authModel.password)){
        throw new UnauthorizedException(Constants.credentialsNotValid);
      }
      const token = this.jwtService.sign({email: loginCommand.email});
      return token;
    }
}