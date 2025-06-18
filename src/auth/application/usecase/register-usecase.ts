import { Inject, Injectable, Logger } from "@nestjs/common";
import { hashSync } from "bcrypt";
import { Role } from "../../../common/role";
import { AuthRepositoryInterface } from "../../domain/repository/auth-repository.interface";
import { RegisterUseCaseInterface } from "../interface/register-usecase.interface";
import { AuthModel } from "../../domain/model/auth-model";
import { AuthMapper } from "../../infrastructure/mapper/auth-mapper";


@Injectable()
export class RegisterUseCase implements RegisterUseCaseInterface{

    private readonly logger = new Logger("AuthService");

    constructor(@Inject('AuthRepositoryInterface') private readonly authRepositoryInterface: AuthRepositoryInterface
      ) {}

    async execute(authModel: AuthModel): Promise<AuthModel>{
      const password = hashSync(authModel.password!, 3);
      authModel.password = password;
      authModel.role = Role.ADMIN;
      const authEntity = AuthMapper.modelToEntity(authModel);
      await this.authRepositoryInterface.create(authEntity);
      const response = AuthMapper.entityToModel(authEntity);
      return response
    }
}