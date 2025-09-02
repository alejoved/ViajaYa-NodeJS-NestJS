import { Auth } from "../../domain/model/auth";

export interface LoginUseCaseInterface {
  execute(auth: Auth): Promise<string>;
}