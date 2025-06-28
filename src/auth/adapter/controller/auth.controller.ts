import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from '../dto/auth-dto';
import { AuthResponseDTO } from '../dto/auth-response-dto';
import { RegisterUseCaseInterface } from '../../application/port/register-usecase.interface';
import { LoginUseCaseInterface } from '../../application/port/login-usecase.interface';
import { AuthMapper } from '../mapper/auth-mapper';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(@Inject("RegisterUseCaseInterface") private registerUseCaseInterface: RegisterUseCaseInterface, 
                @Inject("LoginUseCaseInterface") private loginUseCaseInterface: LoginUseCaseInterface){     
    }
    
    @ApiOperation({ summary : "Sign up with credentials, identification and password" })
    @ApiResponse({status : 201, description : "Register credentials successfully", type: AuthResponseDTO})
    @ApiResponse({status : 409, description : "User already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Post("/register")
    async register(@Body() authDTO: AuthDTO) {
        const authModel = AuthMapper.dtoToModel(authDTO);
        const response = await this.registerUseCaseInterface.execute(authModel);
        const registerResponseDTO = AuthMapper.modelToAuthResponseDTO(response)
        return registerResponseDTO;
    }

    @ApiOperation({ summary : "Sign in with credentials, identification and password" })
    @ApiResponse({status : 200, description : "Log in successfully", type: AuthResponseDTO})
    @ApiResponse({status : 404, description : "Identification or password not match"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Post("/login")
    @HttpCode(200)
    async login(@Body() authDTO: AuthDTO) {
        const authModel = AuthMapper.dtoToModel(authDTO);
        const response = await this.loginUseCaseInterface.execute(authModel);
        const authResponseDTO = AuthMapper.modelToTokenResponseDTO(response);
        return authResponseDTO;
    }
}
