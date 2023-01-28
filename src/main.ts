import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-multer';

import { createDirectory } from './common/helpers';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  // create upload directory
  createDirectory('uploads/images', 'upload directory created!');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Append api prefix to your base url
  app.setGlobalPrefix('api');
  // Enable versioning on this api
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // Remove and return error if unwanted properties exists
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
      // Automatically transform payloads to be objects typed according to their DTO classes
      transform: true,
    }),
  );

  // Catch database specific errors/exception
  app.useGlobalFilters(new DatabaseExceptionFilter());

  await app.register(contentParser);
  await app.listen(3000);
}
bootstrap();
