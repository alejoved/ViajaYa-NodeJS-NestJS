import { Auth } from "../../domain/model/auth";
import { AuthDTO } from "../../adapter/dto/auth-dto";
import { AuthResponseDTO } from "../../adapter/dto/auth-response-dto";
import { TokenResponseDTO } from "../../adapter/dto/token-response-dto";

export class AuthMapper{
    static dtoToModel(authDTO: AuthDTO): Auth {
        return {
            email: authDTO.email,
            password: authDTO.password,
        };
    }

    static modelToAuthResponseDTO(auth: Auth): AuthResponseDTO {
        return {
            email: auth.email,
            role : auth.role
        };
    }

    static modelToTokenResponseDTO(token: string): TokenResponseDTO {
        return {
            token: token,
        };
    }
}