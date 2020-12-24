import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { FacebookAuthGuard } from './facebook/facebook-auth.guard';
import { GoogleAuthGuard } from './google/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(FacebookAuthGuard)
  @Get('login/facebook')
  async facebookLogin(@Request() req): Promise<any> {}

  @UseGuards(FacebookAuthGuard)
  @Get('login/facebook/redirect')
  async facebookLoginRedirect(@Request() req): Promise<any> {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  async googleLogin(@Request() req): Promise<any> {}

  @UseGuards(GoogleAuthGuard)
  @Get('login/google/redirect')
  async googleLoginRedirect(@Request() req): Promise<any> {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
