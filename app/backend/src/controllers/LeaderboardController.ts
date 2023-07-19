import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async totalPoints(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.teamsInfo();
    return res.status(200).json(serviceResponse.data);
  }
}
