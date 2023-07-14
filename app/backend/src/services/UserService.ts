import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import { ILogin, IUser } from '../Interfaces/Users/IUser';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async getAll(): Promise<ServiceResponse<IUser[]>> {
    const allUsers = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: allUsers };
  }

  public async getById(id: number): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findById(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };
    return { status: 'SUCCESSFUL', data: user };
  }

  public async getByEmail({ email, password }: ILogin): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findByEmail(email);

    if (!email || !password) {
      return { status: 'INVALID_DATA', data: { message: 'Some required fields are missing' } };
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCCESSFUL', data: user };
  }
}
