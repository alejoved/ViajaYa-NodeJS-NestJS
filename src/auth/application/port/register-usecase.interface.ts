import { Auth } from "../../domain/model/auth";

export interface RegisterUseCaseInterface {
  execute(auth: Auth): Promise<Auth>;
}