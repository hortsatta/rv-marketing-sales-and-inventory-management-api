import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './product/product.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
