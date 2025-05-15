import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDTO } from '../dto/register.dto';
import { LoginDTO } from '../dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){     
    }
    
    @ApiOperation({ summary : "Sign in with credentials, identification and password" })
    @ApiResponse({status : 200, description : "Log in successfully"})
    @ApiResponse({status : 404, description : "Identification or password not match"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Post("/login")
    public login(@Body() loginDTO: LoginDTO) {
        const loginResponseDTO = this.authService.login(loginDTO);
        return loginResponseDTO;
    }
    @ApiOperation({ summary : "Sign up with credentials, identification and password" })
    @ApiResponse({status : 200, description : "Register credentials successfully"})
    @ApiResponse({status : 409, description : "User already exists"})
    @ApiResponse({status : 500, description : "Internal server error"})
    @Post("/register")
    register(@Body() registerDTO: RegisterDTO) {
        const registerResponseDTO = this.authService.register(registerDTO);
        return registerResponseDTO;
    }
}
