import express from 'express';
import tokenMiddleware from '../middelwares/tokenMiddleware';
import cartController from '../controllers/cart/index';
import createValidationMiddleware from '../middelwares/createValidationMiddleware';
import schemes from '../schemesValidate/index';

const router = express.Router();

router.use(tokenMiddleware);

router.post('/:bookId', createValidationMiddleware(schemes.cartSchema), cartController.addToCart);
router.patch('/:bookId', createValidationMiddleware(schemes.cartSchema), cartController.changeCount);
router.delete('/:bookId', createValidationMiddleware(schemes.cartSchema), cartController.deleteFromCart);

export default router;
