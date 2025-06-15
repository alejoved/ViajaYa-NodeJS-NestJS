import { AuthModel } from "../../../auth/domain/model/auth-model";

export interface LoginUseCaseInterface {
  execute(authModel: AuthModel): Promise<string>;
}