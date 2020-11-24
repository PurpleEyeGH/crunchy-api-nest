import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { FacebookAuthGuard } from './auth/facebook-auth.guard';
import { AuthService } from './auth/auth.service';
import { GoogleAuthGuard } from './auth/google-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(FacebookAuthGuard)
  @Get('auth/login/facebook')
  async facebookLogin(@Request() req): Promise<any> {
    return req.user;
  }

  @UseGuards(FacebookAuthGuard)
  @Get('auth/login/facebook/redirect')
  async facebookLoginRedirect(@Request() req): Promise<any> {
    console.log()
    return this.authService.login(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('auth/login/google')
  async googleLogin(@Request() req): Promise<any> {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('auth/login/google/redirect')
  async googleLoginRedirect(@Request() req): Promise<any> {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
