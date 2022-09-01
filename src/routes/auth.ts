import express from 'express';
import authController from '../controllers/auth/index';
import createValidationMiddleware from '../middelwares/createValidationMiddleware';
import schemes from '../schemesValidate/index';

const router = express.Router();

router.post('/singup', createValidationMiddleware(schemes.singInSchema), authController.singUp);
router.post('/login', createValidationMiddleware(schemes.singInSchema), authController.singIn);

export default router;
