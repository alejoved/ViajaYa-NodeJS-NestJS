import { Auth } from "../../domain/model/auth";
import { AuthEntity } from "../entity/auth-entity";
import { AuthDTO } from "../../adapter/dto/auth-dto";
import { AuthResponseDTO } from "../../adapter/dto/auth-response-dto";
import { TokenResponseDTO } from "../../adapter/dto/token-response-dto";

export class AuthMapper{
    static modelToEntity(auth: Auth): AuthEntity {
        return {
            id: auth.id,
            email: auth.email,
            password: auth.password,
            role: auth.role!
        };
    }

    static entityToModel(authEntity: AuthEntity): Auth {
        return {
            id: authEntity.id,
            email: authEntity.email,
            password: authEntity.password,
            role : authEntity.role
        };
    }
}