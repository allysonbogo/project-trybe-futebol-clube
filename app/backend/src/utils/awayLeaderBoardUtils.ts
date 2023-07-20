import { IMatch } from '../Interfaces/Matches/IMatch';

export default class AwayLeaderboardUtils {
  static totalPoints(id: number, matches: IMatch[]): number {
    let totalPoints = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) totalPoints += 3;
      if (match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
      return totalPoints;
    });
    return totalPoints;
  }

  static totalGames(id: number, matches: IMatch[]): number {
    let totalGames = 0;
    matches.map((match) => {
      if (match.awayTeamId === id) totalGames += 1;
      return totalGames;
    });
    return totalGames;
  }

  static totalVictories(id: number, matches: IMatch[]): number {
    let totalVictories = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) totalVictories += 1;
      return totalVictories;
    });
    return totalVictories;
  }

  static totalDraws(id: number, matches: IMatch[]): number {
    let totalDraws = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) totalDraws += 1;
      return totalDraws;
    });
    return totalDraws;
  }

  static totalLosses(id: number, matches: IMatch[]): number {
    let totalLosses = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) totalLosses += 1;
      return totalLosses;
    });
    return totalLosses;
  }

  static goalsFavor(id: number, matches: IMatch[]): number {
    let goalsFavor = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      goalsFavor += match.awayTeamGoals;
      return goalsFavor;
    });
    return goalsFavor;
  }

  static goalsOwn(id: number, matches: IMatch[]): number {
    let goalsOwn = 0;
    const teamMatches = matches.filter((match) => match.awayTeamId === id);
    teamMatches.map((match) => {
      goalsOwn += match.homeTeamGoals;
      return goalsOwn;
    });
    return goalsOwn;
  }

  static goalsBalance(id: number, matches: IMatch[]): number {
    const goalsBalance = this.goalsFavor(id, matches) - this.goalsOwn(id, matches);
    return goalsBalance;
  }

  static efficiency(id: number, matches: IMatch[]): number {
    const efficiency = (this.totalPoints(id, matches) / (this.totalGames(id, matches) * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }
}
