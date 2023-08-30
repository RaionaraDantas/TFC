import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAll();
    return res.status(200).json(serviceResponse.data);
  }

  public async getTeamsById(req: Request, res: Response) {
    // const id = Number(req.params.id); assim tbm funciona
    const { id } = req.params;

    const serviceResponse = await this.teamsService.getTeamsById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
