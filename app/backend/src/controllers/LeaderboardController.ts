import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async leaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderboard('general');
    return res.status(200).json(serviceResponse.data);
  }

  public async homeLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderboard('home');
    return res.status(200).json(serviceResponse.data);
  }

  public async awayLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.leaderboard('away');
    return res.status(200).json(serviceResponse.data);
  }
}
