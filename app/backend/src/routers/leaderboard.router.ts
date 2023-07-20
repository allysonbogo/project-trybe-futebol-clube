import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.leaderboard(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.homeLeaderboard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.awayLeaderboard(req, res),
);

export default router;
