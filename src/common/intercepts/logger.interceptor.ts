import { 
    ExecutionContext, 
    Injectable, 
    NestInterceptor, 
    CallHandler,
    InternalServerErrorException,
    HttpException,
    HttpStatus
} from "@nestjs/common";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
                map((data) => {
                    return {
                        data,
                        status: 'success',
                    };
                }), 
                catchError((err) => {
                    return throwError(new HttpException({
                        status: 'fail',
                        data: err,
                    }, HttpStatus.FORBIDDEN))
                })
            )
    }
}