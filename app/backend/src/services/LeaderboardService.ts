import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  public async leaderboard(param: string): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeamsInfo = (await this.leaderboardModel.leaderboard(param))
      .sort((p1, p2) => p2.goalsFavor - p1.goalsFavor)
      .sort((p1, p2) => p2.goalsBalance - p1.goalsBalance)
      .sort((p1, p2) => p2.totalVictories - p1.totalVictories)
      .sort((p1, p2) => p2.totalPoints - p1.totalPoints);
    return { status: 'SUCCESSFUL', data: allTeamsInfo };
  }
}
