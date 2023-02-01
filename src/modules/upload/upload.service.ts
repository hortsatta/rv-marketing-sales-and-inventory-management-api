import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

import { createDirectory } from '@/common/helpers';
import { UploadFileOptionsDto } from './dtos/upload-file-options.dto';

const MAX_HEIGHT = 1080;
const BASE_PATH = './uploads';

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

      const filePath = `${dir}/${fileName}.avif`;

      await sharp(value.buffer)
        .resize(null, MAX_HEIGHT, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFormat('avif')
        .toFile(filePath);

      uploaded.push(filePath.substring(2));
    }

    return uploaded;
  }
}
