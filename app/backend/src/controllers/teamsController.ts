import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAll();
    return res.status(200).json(serviceResponse.data);
  }
}
