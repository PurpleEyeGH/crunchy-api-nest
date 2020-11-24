import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { AuthService } from './auth.service';
import { LocalStategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { FacebookStrategy } from './facebook/facebook.strategy';
import { GoogleStrategy } from './google/google.strategy';
import { UsersModule } from '../users/users.module';

config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStategy, JwtStrategy, FacebookStrategy, GoogleStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
