import { AuthDto } from "../dto/auth-dto";
import { AuthResponseDto } from "../dto/auth-response-dto";

export interface RegisterUseCaseInterface {
  execute(authDto: AuthDto): Promise<AuthResponseDto>;
}