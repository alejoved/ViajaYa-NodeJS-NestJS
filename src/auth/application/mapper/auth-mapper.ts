import { AuthModel } from "src/auth/domain/model/auth-model";
import { AuthEntity } from "src/auth/infrastructure/persistence/entity/auth-entity";
import { AuthDTO } from "src/auth/interface/rest/dto/auth-dto";
import { AuthResponseDTO } from "src/auth/interface/rest/dto/auth-response-dto";
import { TokenResponseDTO } from "src/auth/interface/rest/dto/token-response-dto";

export class AuthMapper{
    static dtoToModel(authDTO: AuthDTO): AuthModel {
        return {
            email: authDTO.email,
            password: authDTO.password,
            role : undefined
        };
    }

    static modelToEntity(authModel: AuthModel): AuthEntity {
        return {
            email: authModel.email,
            password: authModel.password,
            role : undefined
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