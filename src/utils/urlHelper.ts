import config from '../config';

export const convertToFinalUrl = (fileName: string) => {
  if (fileName) {
    return `http://localhost:${config.port}/static/${fileName}`;
  }
  return fileName;
};
