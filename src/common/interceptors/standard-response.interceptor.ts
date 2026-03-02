import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StandardResponseDTO } from '../dto/standard.response';

@Injectable()
export class StandardResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((response: unknown) => {
                if (response instanceof HttpException) {
                    return response;
                }

                if (response === undefined) {
                    return StandardResponseDTO.from({});
                }

                if (
                    response &&
                    typeof response === 'object' &&
                    'data' in response &&
                    'meta' in response
                ) {
                    return StandardResponseDTO.from(response.data, response.meta);
                }

                return StandardResponseDTO.from(response);
            }),
        );
    }
}
