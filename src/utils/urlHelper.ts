import config from '../config';

export const convertToFinalUrl = (fileName: string | null, folder: string) => {
  if (!fileName) {
    return null``;
  }

  const baseUrl = `${config.domenName}/static/${folder}/${fileName}`;
  return baseUrl;
};
