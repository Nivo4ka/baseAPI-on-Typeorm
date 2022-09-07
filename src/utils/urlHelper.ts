import config from '../config';

export const convertToFinalUrl = (fileName: string, folder: string) => {
  if (fileName) {
    return `http://localhost:${config.port}/static/${folder}/${fileName}`;
  }
  return fileName;
};
