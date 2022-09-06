import path from 'path';
import fs from 'fs';
import db from '../../db';
import type { PatchUserImgHandlerType } from '../../handlerTypes';

const patchUserImg: PatchUserImgHandlerType = async (req, res, next) => {
  try {
    const { file } = req.body;
    const { user } = req;

    const fileData = file.split('base64,')[1];
    const fileType = file.split(';')[0].split('/')[1];

    const fileName = `${user.email.split('@')[0]}-${Date.now()}.${fileType}`;

    await fs.promises.writeFile(
      `${path.resolve(__dirname, '../../source/images/', fileName)}`,
      fileData,
      { encoding: 'base64' },
    );

    user.avatar = fileName;

    await db.user.save(user);
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

export default patchUserImg;
