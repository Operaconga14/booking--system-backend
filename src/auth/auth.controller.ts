import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResetPasswordInviteDto } from './dto/restetpassword-invite.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.userRegistration(registerAuthDto)
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.userLogin(loginAuthDto)
  }

  @Post('reset-link')
  resetLink(@Body() resetPasswordInviteDto: ResetPasswordInviteDto) {
    return this.authService.sendresetLink(resetPasswordInviteDto)
  }

  @Patch('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto)
  }
}
