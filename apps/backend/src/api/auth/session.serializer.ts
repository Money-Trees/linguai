import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@naite/types';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  public constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService
  ) {
    super();
  }

  public serializeUser(
    user: User,
    done: (err: Error | null, user: User) => void
  ): void {
    done(null, user);
  }

  public async deserializeUser(
    payload: User,
    done: (err: Error | null, user?: User) => void
  ): Promise<void> {
    try {
      const user = await this.authService.getUser(payload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
