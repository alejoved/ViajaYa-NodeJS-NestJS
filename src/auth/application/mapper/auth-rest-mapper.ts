import { Auth } from "../../domain/model/auth";
import { AuthDto } from "../dto/auth-dto";
import { AuthResponseDto } from "../dto/auth-response-dto";
import { TokenResponseDto } from "../dto/token-response-dto";

export class AuthRestMapper{
    static dtoToModel(authDto: AuthDto): Auth {
        return {
            email: authDto.email,
            password: authDto.password,
        };
    }

    static modelToAuthResponseDto(auth: Auth): AuthResponseDto {
        return {
            email: auth.email,
            role : auth.role!
        };
    }

    static modelToTokenResponseDTO(token: string): TokenResponseDto {
        return {
            token: token,
        };
    }
}