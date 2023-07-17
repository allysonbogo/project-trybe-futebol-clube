import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/Matches/IMatch';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class UserService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getInProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findInProgress(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getById(id: number): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.findById(id);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: match };
  }
}
