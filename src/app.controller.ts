import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { FacebookAuthGuard } from './auth/facebook-auth.guard';
import { AuthService } from './auth/auth.service';

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
  @Get("auth/login/facebook/redirect")
  async facebookLoginRedirect(@Request() req): Promise<any> {
      return req.user;
  }
}
