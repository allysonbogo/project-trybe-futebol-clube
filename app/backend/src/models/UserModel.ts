import SequelizeUser from '../database/models/UserModel';
import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, username, role, email, password }) => (
      { id, username, role, email, password }
    ));
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const dbData = await this.model.findByPk(id);
    return !dbData ? null : dbData;
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return !dbData ? null : dbData;
  }
}
