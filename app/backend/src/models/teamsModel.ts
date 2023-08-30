import ITeamsModel from '../Interfaces/Teams/ITeamsModel';
import Teams from '../database/models/SequelizeTeamsModel';
import ITeams from '../Interfaces/Teams/ITeams';

export default class TeamsModel implements ITeamsModel {
  private model = Teams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;
    return dbData;
  }
}
