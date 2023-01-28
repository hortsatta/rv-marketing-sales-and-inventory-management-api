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
    const currentDate = new Intl.DateTimeFormat('sv-SE').format(new Date());
    let dir = BASE_PATH;
    // create directory if it doesn't exist
    if (folderName) {
      dir = `${BASE_PATH}/${folderName}`;
      createDirectory(dir);
    }

    await Promise.all(
      files.map(async (value, index) => {
        const fileName = `${baseName || value.originalname}-${currentDate}-${
          index + 1
        }`;

        await sharp(value.buffer)
          .resize(null, MAX_HEIGHT, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFormat('avif')
          .toFile(`${dir}/${fileName}.avif`);
      }),
    );
  }
}
