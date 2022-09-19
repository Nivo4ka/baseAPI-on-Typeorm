import express from 'express';
import tokenMiddleware from '../middelwares/tokenMiddleware';
import ratingController from '../controllers/rating/index';

const router = express.Router();

router.use(tokenMiddleware);

router.post('/:bookId', ratingController.addRating);

export default router;
