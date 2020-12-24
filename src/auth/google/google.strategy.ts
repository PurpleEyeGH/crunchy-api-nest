import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import IUser from 'src/users/user.interface';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      failureRedirect: process.env.FAILURE_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const { id, name, emails, photos } = profile
    const user: IUser = {
      username: name.givenName + ' ' + name.familyName,
      userid: +id,
      email: emails[0].value,
      firstname: name.givenName,
      lastname: name.familyName,
      photo: photos[0].value
    }
    return user;
  }
}