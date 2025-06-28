import { AuthModel } from "../../domain/model/auth-model";

export interface RegisterUseCaseInterface {
  execute(authModel: AuthModel): Promise<AuthModel>;
}