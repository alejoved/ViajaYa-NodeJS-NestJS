import { Inject, Injectable, Logger } from "@nestjs/common";
import { hashSync } from "bcrypt";
import { plainToInstance } from "class-transformer";
import { Role } from "../../../common/role";
import { AuthRepositoryInterface } from "../../domain/repository/auth-repository.interface";
import { RegisterCommand } from "../command/register-command";
import { RegisterUseCaseInterface } from "../port/register-usecase.interface";
import { Auth } from "../../../auth/infrastructure/model/auth";
import { AuthModel } from "../../../auth/domain/model/auth-model";

@Injectable()
export class RegisterUseCase implements RegisterUseCaseInterface{

    private readonly logger = new Logger("AuthService");

    constructor(@Inject('AuthRepositoryInterface') private readonly authRepositoryInterface: AuthRepositoryInterface
      ) {}

    async execute(registerCommand: RegisterCommand): Promise<AuthModel>{
      const password = hashSync(registerCommand.password, 3); 
      const auth = plainToInstance(Auth, registerCommand, {excludeExtraneousValues: true});
      auth.password = password;
      auth.role = Role.ADMIN;
      const authModel = await this.authRepositoryInterface.create(auth);
      return plainToInstance(AuthModel, authModel, {excludeExtraneousValues: true});
    }
}