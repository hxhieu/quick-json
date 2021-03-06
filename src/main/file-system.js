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
        //TODO: Sorting
        resolve(dirs.sort().concat(files.sort()));
      }
    });
  });

export const readTextFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

export const saveJsonFile = (path, obj, space) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(obj, null, space || 2), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
