import SequelizeMatch from '../database/models/MatchModel';
import SequelizeTeam from '../database/models/TeamModel';
import LeaderboardUtils from '../utils/leaderboardUtils';
import HomeLeaderboardUtils from '../utils/homeLeaderboardUtils';
import AwayLeaderboardUtils from '../utils/awayLeaderBoardUtils';
import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ITeam } from '../Interfaces/Teams/ITeam';
import { IMatch } from '../Interfaces/Matches/IMatch';

export default class LeaderboardModel {
  private matchModel = SequelizeMatch;
  private teamModel = SequelizeTeam;

  async findAllTeams(): Promise<ITeam[]> {
    const dbData = await this.teamModel.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findAllFinished(): Promise<IMatch[]> {
    const dbData = await this.matchModel.findAll({
      where: { inProgress: false },
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData.map(
      ({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }) => (
        { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
      ),
    );
  }

  async leaderboard(param: string): Promise<ILeaderboard[]> {
    const allTeams = await this.findAllTeams();
    const allMatches = await this.findAllFinished();

    switch (param) {
      case 'home': return allTeams.map((team) => ({
        name: team.teamName,
        ...HomeLeaderboardUtils.infostatistics(team.id, allMatches),
      }));
      case 'away': return allTeams.map((team) => ({
        name: team.teamName,
        ...AwayLeaderboardUtils.infostatistics(team.id, allMatches),
      }));
      default: return allTeams.map((team) => ({
        name: team.teamName,
        ...LeaderboardUtils.infostatistics(team.id, allMatches),
      }));
    }
  }
}
