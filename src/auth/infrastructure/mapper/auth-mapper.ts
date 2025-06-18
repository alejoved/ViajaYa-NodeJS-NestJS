import { AuthModel } from "../../domain/model/auth-model";
import { Auth } from "../entity/auth";
import { AuthDTO } from "../../adapter/dto/auth-dto";
import { AuthResponseDTO } from "../../adapter/dto/auth-response-dto";
import { TokenResponseDTO } from "../../adapter/dto/token-response-dto";

export class AuthMapper{
    static modelToEntity(authModel: AuthModel): Auth {
        return {
            email: authModel.email,
            password: authModel.password,
            role: authModel.role!
        };
    }

    static entityToModel(auth: Auth): AuthModel {
        return {
            email: auth.email,
            password: auth.password,
            role : auth.role
        };
    }
}