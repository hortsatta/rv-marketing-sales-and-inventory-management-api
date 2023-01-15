import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // Load postgres databse for production, otherwise use sqlite
        ...(process.env.NODE_ENV === 'production'
          ? {
              type: 'postgres',
              host: configService.get<string>('DATABASE_HOST'),
              port: configService.get<number>('DATABASE_PORT'),
              username: configService.get<string>('DATABASE_USERNAME'),
              password: configService.get<string>('DATABASE_PASSWORD'),
              database: configService.get<string>('DATABASE_NAME'),
            }
          : {
              type: 'sqlite',
              database: configService.get<string>('DATABASE_NAME'),
            }),
        entities: [Product],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
  ],
})
export class DatabaseModule {}
