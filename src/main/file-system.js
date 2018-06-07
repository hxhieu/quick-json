import fs from 'fs';
import path from 'path';
import minimatch from 'minimatch';

export const listDirs = (dirPath, pattern) =>
  new Promise((resolve, reject) => {
    const dirs = [];
    const files = [];
    fs.readdir(dirPath, (err, items) => {
      if (err) {
        reject(err);
      } else {
        items.forEach(x => {
          const target = path.join(dirPath, x);
          const stats = fs.statSync(target);
          if (stats.isDirectory()) {
            dirs.push({
              name: x,
              type: 'dir',
            });
          } else {
            if (minimatch(x, pattern || '*')) {
              files.push({
                name: x,
                type: 'file',
              });
            }
          }
        });

        resolve(dirs.sort().concat(files.sort()));
      }
    });
  });
