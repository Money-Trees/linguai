import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, User } from '@naite/types';
import { env } from '../../env';
import { AuthDto } from './auth.dto';
import { GoogleAuthGuard } from './google.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Get('status')
  @ApiOperation({ summary: 'Get auth state of current user' })
  @ApiOkResponse({ type: AuthDto })
  public async getAuth(@Request() req: Express.Request): Promise<Auth> {
    try {
      const user = req.user as User | undefined;

      return { authenticated: !!req.user, userId: user?.id };
    } catch {
      return { authenticated: false };
    }
  }

  @Get('login')
  @ApiOperation({
    summary: 'Login via Google OAuth 2.0',
    externalDocs: {
      url: 'https://developers.google.com/identity/protocols/oauth2',
    },
  })
  @ApiOkResponse()
  @UseGuards(GoogleAuthGuard)
  public async googleAuth(): Promise<{ message: string }> {
    return { message: 'Google Authentication' };
  }

  @Get('redirect')
  @ApiOperation({
    summary: 'Redirect callback after Google-OAuth was successfull',
  })
  @ApiOkResponse()
  @UseGuards(GoogleAuthGuard)
  @Redirect(env.APP_URL)
  public googleAuthRedirect(): {
    message: string;
  } {
    return { message: 'Ok' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout from session' })
  @ApiCreatedResponse()
  public async logout(
    @Request() req: Express.Request
  ): Promise<{ message: string }> {
    req.logout((error) => {
      if (error) {
        throw new InternalServerErrorException([error.message]);
      }
    });

    return { message: 'Bye!' };
  }
}
