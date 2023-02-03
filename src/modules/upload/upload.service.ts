import { Injectable } from '@nestjs/common';
import sharp, { FitEnum, FormatEnum } from 'sharp';

import { createDirectory } from '@/common/helpers';
import { UploadFileOptionsDto } from './dtos/upload-file-options.dto';

const BASE_PATH = './public/uploads';
const RESIZE_SET = [
  { width: null, height: 1080, fit: sharp.fit.inside },
  { width: null, height: 80, fit: sharp.fit.inside, outSuffix: '-thumb' },
];

@Injectable()
export class UploadService {
  async uploadImages(
    files: Express.Multer.File[],
    options: UploadFileOptionsDto,
  ) {
    const { baseName, folderName } = options || {};
    const [currentDate] = new Date().toISOString().replace(/-/g, '').split('T');
    let dir = BASE_PATH;
    // Create directory if it doesn't exist
    if (folderName) {
      dir = `${BASE_PATH}/images/${folderName}`;
      createDirectory(dir);
    }

    // Sequential file upload
    let uploaded = [];
    for (const [index, value] of files.entries()) {
      const fileName = `${baseName ? baseName + '-' : ''}${currentDate}${String(
        index + 1,
      ).padStart(2, '0')}`;

      const out = `${dir}/${fileName}`;

      await Promise.all(
        RESIZE_SET.map((size) =>
          this.resize(
            value.buffer,
            size.width,
            size.height,
            size.fit,
            'avif',
            out,
            size.outSuffix,
          ),
        ),
      );

      uploaded.push(`${out}.avif`.substring(2));
    }

    return uploaded;
  }

  resize(
    input: Buffer,
    width: number | null,
    height: number | null,
    fit: keyof FitEnum,
    format: keyof FormatEnum,
    out: string,
    outSuffix: string,
  ) {
    const fileOut = outSuffix
      ? `${out}${outSuffix}.${format}`
      : `${out}.${format}`;
    return sharp(input)
      .resize(width, height, {
        fit,
        withoutEnlargement: true,
      })
      .toFormat(format)
      .toFile(fileOut);
  }
}
