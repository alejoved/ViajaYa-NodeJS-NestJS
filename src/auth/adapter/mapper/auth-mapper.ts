import { AuthModel } from "../../domain/model/auth";
import { AuthDTO } from "../../adapter/dto/auth-dto";
import { AuthResponseDTO } from "../../adapter/dto/auth-response-dto";
import { TokenResponseDTO } from "../../adapter/dto/token-response-dto";

export class AuthMapper{
    static dtoToModel(authDTO: AuthDTO): AuthModel {
        return {
            email: authDTO.email,
            password: authDTO.password,
        };
    }

    static modelToAuthResponseDTO(authModel: AuthModel): AuthResponseDTO {
        return {
            email: authModel.email,
            role : authModel.role
        };
    }

    static modelToTokenResponseDTO(token: string): TokenResponseDTO {
        return {
            token: token,
        };
    }
}