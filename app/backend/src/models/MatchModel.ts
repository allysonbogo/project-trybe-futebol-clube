import SequelizeMatch from '../database/models/MatchModel';
import SequelizeTeam from '../database/models/TeamModel';
import { IMatch } from '../Interfaces/Matches/IMatch';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';

export default class UserModel implements IMatchModel {
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

  async findInProgress(inProgress: boolean): Promise<IMatch[]> {
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
}
