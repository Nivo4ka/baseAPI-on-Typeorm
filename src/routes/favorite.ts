import express from 'express';
import tokenMiddleware from '../middelwares/tokenMiddleware';
import favoriteController from '../controllers/favorite/index';

const router = express.Router();

router.use(tokenMiddleware);

router.post('/:bookId', favoriteController.addToFavorite);
router.delete('/:bookId', favoriteController.deleteFavorite);

export default router;
