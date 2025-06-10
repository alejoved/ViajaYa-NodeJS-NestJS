import { LoginCommand } from "../command/login-command";

export interface LoginUseCaseInterface {
  execute(command: LoginCommand): Promise<string>;
}