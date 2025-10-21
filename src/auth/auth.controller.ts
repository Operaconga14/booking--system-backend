import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerAuthDto: RegisterAuthDto) {
        return this.authService.registerUser(registerAuthDto);
    }

    @Post('login')
    login(@Body() loginAuthDto: LoginAuthDto) {
        return this.authService.loginUser(loginAuthDto);
    }


}
