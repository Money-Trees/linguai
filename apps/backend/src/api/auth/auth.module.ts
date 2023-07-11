import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GlobalInterceptor } from './global.interceptor';
import { GoogleStrategy } from './google.strategy';
import { RolesGuard } from './role.guard';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalInterceptor,
    },
  ],
})
export class AuthModule {}
