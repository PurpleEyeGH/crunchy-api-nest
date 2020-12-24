import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import IUser from 'src/users/user.interface';
import { config } from 'dotenv';

config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      failureRedirect: process.env.FAILURE_URL,
      scope: "email",
      profileFields: ['id', 'displayName', 'email', 'photos']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, displayName, emails, photos } = profile
    if( emails[0].value ) {
      const user: IUser = {
        username: displayName,
        userid: +id,
        email: emails[0].value,
        firstname: name.givenName,
        lastname: name.familyName,
        photo: photos[0].value
      }
      
      return user;
    }
    return Error('No Email found with your Facebook, take your mail adress in public please');
  }
}
