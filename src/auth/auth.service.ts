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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this._usersService.findOne(username);
    if( user && user.password === pass) {
        const { password, ...result } = user;
        return result;
    }
    return null;
  }

  async login(user: IUser) {
      const payload = { username: user.username, sub: user.userid };
      return {
          access_token: this._jwtService.sign(payload),
      }
  }
}
