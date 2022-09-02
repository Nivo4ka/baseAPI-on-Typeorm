import path from 'path';
import fs from 'fs';
import config from '../../config';
import db from '../../db';
import type { PatchUserImgHandlerType } from '../../handlerTypes';

const patchUserImg: PatchUserImgHandlerType = async (req, res, next) => {
  try {
    const { file } = req.body;
    const { user } = req;

    const fileData = file.split('base64,')[1];
    const fileType = file.split(';')[0].split('/')[1];

    let fileName = `${Date.now()}.${fileType}`;

    fs.writeFile(
      `${path.resolve(__dirname, '../../source/images/', fileName)}`,
      fileData,
      { encoding: 'base64' },
      (err) => { },
    );

    fileName = `http://localhost:${config.port}/${fileName}`;
    user.avatar = fileName;

    await db.user.save(user);
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

export default patchUserImg;
