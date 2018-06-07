import { remote } from 'electron'; // eslint-disable-line
const currentWindow = remote.getCurrentWindow();
const dialog = remote.dialog;

export const browseDir = () =>
  new Promise(resolve => {
    dialog.showOpenDialog(
      currentWindow,
      {
        properties: ['openDirectory'],
      },
      result => {
        if (result && result.length) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      },
    );
  });
