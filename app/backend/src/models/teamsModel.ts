import ITeamsModel from '../Interfaces/Teams/ITeamsModel';
import Teams from '../database/models/SequelizeTeamsModel';
import ITeams from '../Interfaces/Teams/ITeams';

export default class TeamsModel implements ITeamsModel {
  private model = Teams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    console.log(dbData);
    return dbData;
  }
}
