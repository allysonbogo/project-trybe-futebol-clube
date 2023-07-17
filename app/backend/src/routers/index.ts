import { Router } from 'express';
import userRouter from './user.router';
import teamRouter from './team.router';
import matchRouter from './match.router';

const router = Router();

router.use('/login', userRouter);

router.use('/teams', teamRouter);

router.use('/matches', matchRouter);

export default router;
