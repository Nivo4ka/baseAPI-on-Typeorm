import path from 'path';
import fs from 'fs';
import db from '../../db';
import type { PatchUserImgHandlerType } from '../../handlerTypes';
import { convertToFinalUrl } from '../../utils/urlHelper';

const patchUserImg: PatchUserImgHandlerType = async (req, res, next) => {
  try {
    const { file } = req.body;
    const { user } = req;

    const fileData = file.split('base64,')[1];
    const fileType = file.split(';')[0].split('/')[1];

    const fileName = `${user.email.split('@')[0]}-${Date.now()}.${fileType}`;

    await fs.promises.unlink(
      `${path.resolve(__dirname, '../../source/images/users', user.avatar.split('static/users/')[1])}`,
    );

    await fs.promises.writeFile(
      `${path.resolve(__dirname, '../../source/images/users', fileName)}`,
      fileData,
      { encoding: 'base64' },
    );

    user.avatar = fileName;

    await db.user.save(user);
    user.avatar = convertToFinalUrl(user.avatar, 'users');
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

export default patchUserImg;
