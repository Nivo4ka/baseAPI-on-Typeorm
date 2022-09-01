import express from 'express';
import userController from '../controllers/user/index';
import tokenMiddleware from '../middelwares/tokenMiddleware';
import createValidationMiddleware from '../middelwares/createValidationMiddleware';
import schemes from '../schemesValidate/index';

const router = express.Router();

router.use(tokenMiddleware);

router.get('/me', userController.getUser);
router.get('/all', userController.getAllUsers);
router.patch('/me', createValidationMiddleware(schemes.patchUserInfoSchema), userController.patchUserInfo);
router.patch('/password', createValidationMiddleware(schemes.patchUserPasswordSchema), userController.patchUserPassword);
router.delete('/me', userController.deleteUser);

export default router;
