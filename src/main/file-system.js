import fs from 'fs';
import path from 'path';

export const listDirs = dirPath =>
  new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          files.filter(x => {
            const subDir = path.join(dirPath, x);
            const stats = fs.statSync(subDir);
            return stats.isDirectory();
          }) || [],
        );
      }
    });
  });
