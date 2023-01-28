import {
  PipeTransform,
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  // maxSize in bytes and fileTypes is array of strings
  constructor(private options?: { maxSize?: number; fileTypes?: string[] }) {}

  transform(value: Express.Multer.File[] | Express.Multer.File) {
    if (Array.isArray(value)) {
      this.validateFiles(value);
    } else {
      this.validateFile(value);
    }

    return value;
  }

  validateFiles(value: Express.Multer.File[]) {
    const { maxSize, fileTypes } = this.options || {};

    if (maxSize) {
      const maxKbSize = Math.floor(maxSize / 1024);
      for (const singleFile of value) {
        if (singleFile.size > maxSize) {
          throw new BadRequestException(
            `File size is more than ${maxKbSize} KB`,
          );
        }
      }
    }

    if (fileTypes) {
      for (const singleFile of value) {
        const isValid = fileTypes.some((ft) =>
          singleFile.mimetype.includes(ft),
        );
        if (!isValid) {
          throw new UnprocessableEntityException(
            `${singleFile.mimetype} format isn't supported`,
          );
        }
      }
    }
  }

  validateFile(value: Express.Multer.File) {
    const { maxSize, fileTypes } = this.options || {};

    if (maxSize) {
      const maxKbSize = Math.floor(maxSize / 1024);
      if (value.size > maxSize) {
        throw new BadRequestException(`File size is more than ${maxKbSize} KB`);
      }
    }

    if (fileTypes) {
      const isValid = fileTypes.some((ft) => value.mimetype.includes(ft));
      if (!isValid) {
        throw new UnprocessableEntityException(
          `${value.mimetype} format isn't supported`,
        );
      }
    }
  }
}
