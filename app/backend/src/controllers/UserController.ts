import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';

export default class UserController {
  constructor(
    private jwt = new JWT(),
    private userService = new UserService(),
  ) { }

  public async getAll(_req: Request, res: Response) {
    const serviceResponse = await this.userService.getAll();
    res.status(200).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.userService.getById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async getByEmail(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.getByEmail(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json({ token: this.jwt.createToken(email) });
  }
}
