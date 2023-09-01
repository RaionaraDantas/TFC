import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../services/usersService';

export default class UserController {
  constructor(
    private userService = new UsersService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async verifyRole(req: Request, res: Response): Promise<Response> {
    console.log(req.body);
    const user = await this.userService.verifyRole(req.body.user.email);

    if (user.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(user.status)).json(user.data);
    }
    // const { role } = user as IUser['role'];

    return res.status(200).json({ role: user.data });
  }
}
