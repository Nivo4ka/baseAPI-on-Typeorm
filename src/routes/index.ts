import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import bookRouter from './book';
import genreRouter from './genre';
import favoriteRouter from './favorite';
import ratingRouter from './rating';
import cartRouter from './cart';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/genre', genreRouter);
router.use('/favorite', favoriteRouter);
router.use('/rating', ratingRouter);
router.use('/cart', cartRouter);

export default router;
