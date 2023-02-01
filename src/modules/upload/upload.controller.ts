import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFiles,
} from '@nestjs/common';
import { FastifyFilesInterceptor } from 'nest-fastify-multer';
import { UploadFileOptionsDto } from './dtos/upload-file-options.dto';

import { FileValidationPipe } from './pipes/file-validation.pipe';
import { UploadService } from './upload.service';

const imageValidationOptions = {
  maxSize: 12000000,
  fileTypes: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
};

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/images')
  @FastifyFilesInterceptor('files')
  async uploadImages(
    @UploadedFiles(new FileValidationPipe(imageValidationOptions))
    files: Express.Multer.File[],
    @Body() body: UploadFileOptionsDto,
  ): Promise<string[]> {
    try {
      const uploaded = await this.uploadService.uploadImages(files, body);
      return uploaded;
    } catch (error) {
      throw new InternalServerErrorException('an error has occured');
    }
  }
}
