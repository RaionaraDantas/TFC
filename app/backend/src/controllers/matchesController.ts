import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchesService.findAllMatches();
    return res.status(200).json(serviceResponse.data);
  }
}
