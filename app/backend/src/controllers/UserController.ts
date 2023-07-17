import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/JWT';

export default class UserController {
  constructor(
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

    res.status(200).json({ token: JWT.createToken(email) });
  }

  public async returnRole(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    const token = authorization.split(' ')[1];
    const email = JWT.verifyToken(token) as string;

    const serviceResponse = await this.userService.returnRole(email);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json({ role: serviceResponse.data.role });
  }
}
