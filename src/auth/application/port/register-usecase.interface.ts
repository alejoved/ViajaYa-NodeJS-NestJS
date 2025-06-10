import { AuthModel } from "src/auth/domain/model/auth-model";
import { RegisterCommand } from "../command/register-command";

export interface RegisterUseCaseInterface {
  execute(command: RegisterCommand): Promise<AuthModel>;
}