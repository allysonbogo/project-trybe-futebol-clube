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

  async leaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await this.findAllTeams();
    const allMatches = await this.findAllFinished();

    return allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: LeaderboardUtils.totalPoints(team.id, allMatches),
      totalGames: LeaderboardUtils.totalGames(team.id, allMatches),
      totalVictories: LeaderboardUtils.totalVictories(team.id, allMatches),
      totalDraws: LeaderboardUtils.totalDraws(team.id, allMatches),
      totalLosses: LeaderboardUtils.totalLosses(team.id, allMatches),
      goalsFavor: LeaderboardUtils.goalsFavor(team.id, allMatches),
      goalsOwn: LeaderboardUtils.goalsOwn(team.id, allMatches),
      goalsBalance: LeaderboardUtils.goalsBalance(team.id, allMatches),
      efficiency: LeaderboardUtils.efficiency(team.id, allMatches),
    }));
  }

  async homeLeaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await this.findAllTeams();
    const allMatches = await this.findAllFinished();

    return allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: HomeLeaderboardUtils.totalPoints(team.id, allMatches),
      totalGames: HomeLeaderboardUtils.totalGames(team.id, allMatches),
      totalVictories: HomeLeaderboardUtils.totalVictories(team.id, allMatches),
      totalDraws: HomeLeaderboardUtils.totalDraws(team.id, allMatches),
      totalLosses: HomeLeaderboardUtils.totalLosses(team.id, allMatches),
      goalsFavor: HomeLeaderboardUtils.goalsFavor(team.id, allMatches),
      goalsOwn: HomeLeaderboardUtils.goalsOwn(team.id, allMatches),
      goalsBalance: HomeLeaderboardUtils.goalsBalance(team.id, allMatches),
      efficiency: HomeLeaderboardUtils.efficiency(team.id, allMatches),
    }));
  }

  async awayLeaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await this.findAllTeams();
    const allMatches = await this.findAllFinished();

    return allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: AwayLeaderboardUtils.totalPoints(team.id, allMatches),
      totalGames: AwayLeaderboardUtils.totalGames(team.id, allMatches),
      totalVictories: AwayLeaderboardUtils.totalVictories(team.id, allMatches),
      totalDraws: AwayLeaderboardUtils.totalDraws(team.id, allMatches),
      totalLosses: AwayLeaderboardUtils.totalLosses(team.id, allMatches),
      goalsFavor: AwayLeaderboardUtils.goalsFavor(team.id, allMatches),
      goalsOwn: AwayLeaderboardUtils.goalsOwn(team.id, allMatches),
      goalsBalance: AwayLeaderboardUtils.goalsBalance(team.id, allMatches),
      efficiency: AwayLeaderboardUtils.efficiency(team.id, allMatches),
    }));
  }
}
