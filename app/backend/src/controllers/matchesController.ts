import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAllByQuery(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'false') {
      const serviceResponse = await this.matchesService.findAllByQuery(false);
      return res.status(200).json(serviceResponse.data);
    }
    if (inProgress === 'true') {
      const serviceResponse = await this.matchesService.findAllByQuery(true);
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchesService.findAllMatches();
    return res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.finishMatch(Number(id));
    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchesService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchesService
      .createMatch(req.body);
    return res.status(201).json(serviceResponse.data);
  }
}
