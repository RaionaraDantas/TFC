import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import TeamsService from '../services/teamsService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
    private teamsService = new TeamsService(),
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
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    // Outra forma de fazer:
    // const arrayTeams = [homeTeamId, awayTeamId];
    // const teamsExist = await Promise
    //   .all(arrayTeams.map((team) => this.teamsService.getTeamsById(team)));

    // if (teamsExist.some(({ status }) => status === 'NOT_FOUND')) {
    //   return res.status(404).json({ message: 'There is no team with such id!' });
    // }

    const awayTeamExist = await this.teamsService.getTeamsById(awayTeamId);
    const homeTeamExist = await this.teamsService.getTeamsById(homeTeamId);
    if (awayTeamExist.status === 'NOT_FOUND' || homeTeamExist.status === 'NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const serviceResponse = await this.matchesService
      .createMatch(req.body);
    return res.status(201).json(serviceResponse.data);
  }
}
