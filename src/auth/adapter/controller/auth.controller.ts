import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../../application/dto/auth-dto';
import { AuthResponseDto } from '../../application/dto/auth-response-dto';
import { RegisterUseCaseInterface } from '../../application/port/register-usecase.interface';
import { LoginUseCaseInterface } from '../../application/port/login-usecase.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(@Inject("RegisterUseCaseInterface") private registerUseCaseInterface: RegisterUseCaseInterface, 
                @Inject("LoginUseCaseInterface") private loginUseCaseInterface: LoginUseCaseInterface){     
    }
    
    @ApiOperation({ summary : "Sign up with credentials, identification and password" })
    @ApiResponse({status : 201, description : "Register credentials successfully", type: AuthResponseDto})
    @ApiResponse({status : 409, description : "User already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Post("/register")
    async register(@Body() authDto: AuthDto) {
        const authResponseDto = await this.registerUseCaseInterface.execute(authDto);
        return authResponseDto;
    }

    @ApiOperation({ summary : "Sign in with credentials, identification and password" })
    @ApiResponse({status : 200, description : "Log in successfully", type: AuthResponseDto})
    @ApiResponse({status : 404, description : "Identification or password not match"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Post("/login")
    @HttpCode(200)
    async login(@Body() authDto: AuthDto) {
        const authResponseDto = await this.loginUseCaseInterface.execute(authDto);
        return authResponseDto;
    }
}
