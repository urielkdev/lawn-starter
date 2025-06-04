import { LogsService } from './logs.service';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, finalize, tap } from 'rxjs';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const start = Date.now();
    let statusCode = 200;

    return next.handle().pipe(
      tap(() => {
        statusCode = response.statusCode;
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          statusCode = err.getStatus();
        } else {
          statusCode = 500;
        }

        throw err;
      }),
      finalize(() => {
        const duration = Date.now() - start;
        const logData = {
          route: request.route?.path || request.url,
          queryParams: JSON.stringify(request.query),
          routeParams: JSON.stringify(request.params),
          method: request.method,
          durationMs: duration,
          statusCode: statusCode,
        };

        this.logService.log(logData);
      }),
    );
  }
}
