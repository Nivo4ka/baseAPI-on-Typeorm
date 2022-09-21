import express from 'express';
import tokenMiddleware from '../middelwares/tokenMiddleware';
import favoriteController from '../controllers/favorite/index';
import createValidationMiddleware from '../middelwares/createValidationMiddleware';
import schemes from '../schemesValidate/index';

const router = express.Router();

router.use(tokenMiddleware);

router.post('/:bookId', createValidationMiddleware(schemes.favoriteSchema), favoriteController.addToFavorite);
router.delete('/:bookId', createValidationMiddleware(schemes.favoriteSchema), favoriteController.deleteFavorite);

export default router;
