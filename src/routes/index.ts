import express from 'express';
import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
