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

  public async findAllByQuery(req: Request, res: Response) {
    const { q } = req.query;

    const serviceResponse = await this.matchesService.findAllByQuery(q as string);
    return res.status(200).json(serviceResponse.data);
  }
}
