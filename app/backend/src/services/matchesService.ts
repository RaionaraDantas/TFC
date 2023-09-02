import { ServiceResponseType } from '../Interfaces/ServiceResponseType';
import IMatches from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/matchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async findAllMatches(): Promise<ServiceResponseType<IMatches[]>> {
    const allMatches = await this.matchesModel.findAllMatches();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findAllByQuery(inProgress: boolean): Promise<ServiceResponseType<IMatches[]>> {
    const matches = await this.matchesModel.findAllByQuery(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }
}
