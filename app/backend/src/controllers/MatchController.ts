import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (!inProgress) {
      const serviceResponse = await this.matchService.getAll();
      return res.status(200).json(serviceResponse.data);
    }

    const param = inProgress ? inProgress === 'true' : false;

    const serviceResponse = await this.matchService.getInProgress(param);
    return res.status(200).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.getById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
