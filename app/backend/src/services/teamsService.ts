import { ServiceResponseType } from '../Interfaces/ServiceResponseType';
import ITeams from '../Interfaces/Teams/ITeams';
import ITeamsModel from '../Interfaces/Teams/ITeamsModel';
import TeamsModel from '../models/teamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAll(): Promise<ServiceResponseType<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamsById(id: number): Promise<ServiceResponseType<ITeams | null>> {
    const teamsOfId = await this.teamsModel.findById(id);
    console.log(teamsOfId);
    if (!teamsOfId) {
      return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: teamsOfId };
  }
}
