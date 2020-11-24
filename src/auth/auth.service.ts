import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import IUser from 'src/users/user.interface';

@Injectable()
export class AuthService {

  private _usersService: UsersService;
  private _jwtService: JwtService;

  constructor(usersService: UsersService, jwtService: JwtService) {
    this._usersService = usersService;
    this._jwtService = jwtService;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this._usersService.findOne(email);
    if( user && user.password === pass) {
        const { password, ...result } = user;
        return result;
    }
    return null;
  }

  async login(user: IUser) {
      //await this.register(user);
      const payload = { email: user.email, sub: user.userid };
      return {
          access_token: this._jwtService.sign(payload),
      }
  }

  async register(user: IUser) {
    
    this._usersService.findOne(user.email)
  }
}
