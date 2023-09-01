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
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = JWT.sign({ email: data.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async verifyRole(email: string): Promise<ServiceResponseType<string>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email' } };
    }
    return { status: 'SUCCESSFUL', data: user.role };
    // return user.role as string;
  }
}
