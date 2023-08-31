import * as bcrypt from 'bcryptjs';
import IUsersModel from '../Interfaces/Users/IUsersModel';
import UsersModel from '../models/UsersModel';
import JWT from '../utils/JWT';
import { ServiceResponseType } from '../Interfaces/ServiceResponseType';
import IToken from '../Interfaces/token/IToken';
import IUserLogin from '../Interfaces/Users/IUserLogin';

export default class UsersService {
  constructor(
    private userModel: IUsersModel = new UsersModel(),
  ) {}

  public async login(data: IUserLogin): Promise<ServiceResponseType<IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) return { status: 'INVALID_DATA', data: { message: 'All fields must be filled' } };
    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'INVALID_DATA', data: { message: 'All fields must be filled' } };
    }
    const token = JWT.sign({ email: data.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
