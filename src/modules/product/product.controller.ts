import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
