import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable, map } from 'rxjs';

export class FilterFieldsInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        const req = ctx.switchToHttp().getRequest<FastifyRequest>();
        const { exclude, include } = req.query as any;
        const excludeFields = exclude?.split(',');
        const includeFields = include?.split(',');

        if (excludeFields?.length) {
          const filteredData = Array.isArray(data)
            ? data.map((item) => this.filter(item, excludeFields, true))
            : this.filter(data, excludeFields, true);

          return filteredData;
        }

        if (includeFields?.length) {
          const filteredData = Array.isArray(data)
            ? data.map((item) => this.filter(item, includeFields, false))
            : this.filter(data, includeFields, false);

          return filteredData;
        }

        return data;
      }),
    );
  }

  filter(item, fields, isExclude) {
    return Object.keys(item)
      .filter((key) =>
        isExclude ? !fields.includes(key) : fields.includes(key),
      )
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: item[key],
        };
      }, {});
  }
}
