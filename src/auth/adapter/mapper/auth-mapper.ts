import { AuthModel } from "../../domain/model/auth-model";
import { AuthEntity } from "../../infrastructure/entity/auth-entity";
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

    static modelToEntity(authModel: AuthModel): AuthEntity {
        return {
            email: authModel.email,
            password: authModel.password,
            role: authModel.role!
        };
    }

    static entityToModel(authEntity: AuthEntity): AuthModel {
        return {
            email: authEntity.email,
            password: authEntity.password,
            role : authEntity.role
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