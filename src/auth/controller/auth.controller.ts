import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDTO } from '../dto/register.dto';
import { LoginDTO } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){     
    }
    
    @Post("/login")
    public login(@Body() loginDTO: LoginDTO) {
        const loginResponseDTO = this.authService.login(loginDTO);
        return loginResponseDTO;
    }

    @Post("/register")
    register(@Body() registerDTO: RegisterDTO) {
        const registerResponseDTO = this.authService.register(registerDTO);
        return registerResponseDTO;
    }
}
