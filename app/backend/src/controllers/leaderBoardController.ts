import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  public async getPotencialteamsHome(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderBoardService.potentialTeamsHome();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
