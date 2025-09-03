import { Auth } from "../../domain/model/auth";
import { TokenResponseDto } from "../dto/token-response-dto";

export interface LoginUseCaseInterface {
  execute(auth: Auth): Promise<TokenResponseDto>;
}