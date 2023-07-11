import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '@naite/types';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    const hasAccess = context.switchToHttp().getRequest().isAuthenticated();
    const { user } = context.switchToHttp().getRequest();

    if (!user || !hasAccess) {
      throw new UnauthorizedException();
    }

    /* Filter all properties with the decorator 'Exclude()' from the response,
      if users role is not 'admin' */
    return next
      .handle()
      .pipe(
        map((data) => (user.role === Role.Admin ? data : instanceToPlain(data)))
      );
  }
}
