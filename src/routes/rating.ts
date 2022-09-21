import express from 'express';
import tokenMiddleware from '../middelwares/tokenMiddleware';
import ratingController from '../controllers/rating/index';
import createValidationMiddleware from '../middelwares/createValidationMiddleware';
import schemes from '../schemesValidate/index';

const router = express.Router();

router.use(tokenMiddleware);

router.post('/:bookId', createValidationMiddleware(schemes.ratingSchema), ratingController.addRating);

export default router;
