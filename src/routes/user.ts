import express from 'express';
import userController from '../controllers/user/index';
import isAuth from '../middelwares/isAuth';
import createValidationMiddleware from '../middelwares/createValidationMiddleware';
import schemes from '../schemesValidate/index';

const router = express.Router();

router.use(isAuth);

router.get('/me', userController.getUser);
router.get('/all', userController.getAllUsers);
router.patch('/me', createValidationMiddleware(schemes.patchUserSchema), userController.patchUser);
router.delete('/me', userController.deleteUser);

export default router;
