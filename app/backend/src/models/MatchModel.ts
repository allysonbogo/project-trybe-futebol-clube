import SequelizeMatch from '../database/models/MatchModel';
import SequelizeTeam from '../database/models/TeamModel';
import { IMatch } from '../Interfaces/Matches/IMatch';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async findInProgress(inProgress: IMatch['inProgress']): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async findById(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id, {
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return !dbData ? null : dbData;
  }

  async finish(id: IMatch['id']): Promise<IMatch | null> {
    await this.model.update({
      inProgress: false,
    }, {
      where: { id },
    });
    const dbData = await this.findById(id);
    return dbData;
  }

  async update(
    id: IMatch['id'],
    homeTeamGoals: IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ): Promise<IMatch | null> {
    await this.model.update({
      homeTeamGoals, awayTeamGoals,
    }, {
      where: { id },
    });
    const dbData = await this.findById(id);
    return dbData;
  }

  async create(data: IMatch): Promise<IMatch> {
    const dbData = await this.model.create({ ...data, inProgress: true });
    return dbData;
  }
}
