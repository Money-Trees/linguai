import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  AuthenticateOptionsGoogle,
  Profile,
  Strategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import { env } from '../../env';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  public constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService
  ) {
    super({
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_KEY,
      callbackURL: `${env.API_URL}/api/auth/redirect`,
      scope: ['email', 'profile'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const data = { ...profile._json, accessToken, refreshToken };
    const user = await this.authService.validateUser(data);
    done(null, user);
  }

  /**
   * This is important, to always use the google select account promt
   * @see https://stackoverflow.com/a/73784420
   */
  public authorizationParams(
    options: AuthenticateOptionsGoogle
  ): AuthenticateOptionsGoogle {
    return Object.assign(options, { prompt: 'select_account' });
  }
}
