import fs from 'fs';
import path from 'path';

export function createDirectory(pathname: string, successMessage?: string) {
  const __dirname = path.resolve();
  pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '');
  fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, (e) => {
    if (e) {
      console.error(e);
    } else {
      console.log(successMessage || 'folder created');
    }
  });
}
