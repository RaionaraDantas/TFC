import IUsersModel from '../Interfaces/Users/IUsersModel';
import SequelizeUsersModel from '../database/models/SequelizeUsersModel';
import IUser from '../Interfaces/Users/IUser';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsersModel;

  async findByEmail(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (dbData === null) return null;
    return dbData;
  }
}
