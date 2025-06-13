import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { RegisterDTO } from '../dto/register-dto';
import { LoginDTO } from '../dto/login-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDTO } from '../dto/login-response-dto';
import { RegisterResponseDTO } from '../dto/register-response-dto';
import { RegisterCommand } from '../../../auth/application/command/register-command';
import { plainToInstance } from 'class-transformer';
import { LoginCommand } from '../../../auth/application/command/login-command';
import { LoginUseCaseInterface } from '../../../auth/application/port/login-usecase.interface';
import { RegisterUseCaseInterface } from '../../../auth/application/port/register-usecase.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(@Inject("RegisterUseCaseInterface") private registerUseCaseInterface: RegisterUseCaseInterface, 
                @Inject("LoginUseCaseInterface") private loginUseCaseInterface: LoginUseCaseInterface){     
    }
    
    @ApiOperation({ summary : "Sign up with credentials, identification and password" })
    @ApiResponse({status : 201, description : "Register credentials successfully", type: RegisterResponseDTO})
    @ApiResponse({status : 409, description : "User already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Post("/register")
    register(@Body() registerDTO: RegisterDTO) {
        const registerCommand = plainToInstance(RegisterCommand, registerDTO);
        const authModel = this.registerUseCaseInterface.execute(registerCommand);
        const registerResponseDTO = plainToInstance(RegisterResponseDTO, authModel, {excludeExtraneousValues: true});
        return registerResponseDTO;
    }

    @ApiOperation({ summary : "Sign in with credentials, identification and password" })
    @ApiResponse({status : 200, description : "Log in successfully", type: LoginResponseDTO})
    @ApiResponse({status : 404, description : "Identification or password not match"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Post("/login")
    @HttpCode(200)
    public login(@Body() loginDTO: LoginDTO) {
        const loginCommand = plainToInstance(LoginCommand, loginDTO);
        const token = this.loginUseCaseInterface.execute(loginCommand);
        const loginResponseDTO = plainToInstance(LoginResponseDTO, token, {excludeExtraneousValues: true});
        return loginResponseDTO;
    }
}
