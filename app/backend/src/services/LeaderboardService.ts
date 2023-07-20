import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  public async leaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeamsInfo = (await this.leaderboardModel.leaderboard())
      .sort((p1, p2) => p2.goalsFavor - p1.goalsFavor)
      .sort((p1, p2) => p2.goalsBalance - p1.goalsBalance)
      .sort((p1, p2) => p2.totalVictories - p1.totalVictories)
      .sort((p1, p2) => p2.totalPoints - p1.totalPoints);
    return { status: 'SUCCESSFUL', data: allTeamsInfo };
  }

  public async homeLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeamsInfo = (await this.leaderboardModel.homeLeaderboard())
      .sort((p1, p2) => p2.goalsFavor - p1.goalsFavor)
      .sort((p1, p2) => p2.goalsBalance - p1.goalsBalance)
      .sort((p1, p2) => p2.totalVictories - p1.totalVictories)
      .sort((p1, p2) => p2.totalPoints - p1.totalPoints);
    return { status: 'SUCCESSFUL', data: allTeamsInfo };
  }

  public async awayLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeamsInfo = (await this.leaderboardModel.awayLeaderboard())
      .sort((p1, p2) => p2.goalsFavor - p1.goalsFavor)
      .sort((p1, p2) => p2.goalsBalance - p1.goalsBalance)
      .sort((p1, p2) => p2.totalVictories - p1.totalVictories)
      .sort((p1, p2) => p2.totalPoints - p1.totalPoints);
    return { status: 'SUCCESSFUL', data: allTeamsInfo };
  }
}
