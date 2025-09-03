import { Auth } from "../../domain/model/auth";
import { AuthEntity } from "../entity/auth-entity";

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