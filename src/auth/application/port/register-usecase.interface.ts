import { AuthModel } from "src/auth/domain/model/auth-model";

export interface RegisterUseCaseInterface {
  execute(authModel: AuthModel): Promise<AuthModel>;
}