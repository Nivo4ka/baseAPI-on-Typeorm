import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import bookRouter from './book';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/book', bookRouter);

export default router;
