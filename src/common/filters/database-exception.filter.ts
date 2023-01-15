import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    // Set http status code and custom message base on error code
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    switch (exception['code']) {
      case '23505':
        httpStatus = HttpStatus.CONFLICT;
        const table = exception['table'];
        if (table && table.trim()) {
          message = `${table.charAt(0).toUpperCase()}${table.slice(
            1,
          )} is already present`;
        }
        break;
    }

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();

    return res.status(httpStatus).send({
      statusCode: httpStatus,
      message,
      error: HttpStatus[httpStatus].toLowerCase(),
    });
  }
}
