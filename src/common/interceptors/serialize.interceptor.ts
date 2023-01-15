import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassContructor {
  // Accept any class
  new (...args: any[]): {};
}

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassContructor) {}

  intercept(_: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      // Convert object to instance before sending to client
      map((data: any) =>
        plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
