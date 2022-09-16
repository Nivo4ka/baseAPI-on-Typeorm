import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import bookRouter from './book';
import genreRouter from './genre';
import favoriteRouter from './favorite';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/genre', genreRouter);
router.use('/favorite', favoriteRouter);

export default router;
