import ITeamsModel from '../Interfaces/Teams/ITeamsModel';
import Teams from '../database/models/SequelizeTeamsModel';
import ITeams from '../Interfaces/Teams/ITeams';
import SequelizeMatchesmodel from '../database/models/SequelizeMatchesModel';

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

  async teamsWithMatches(): Promise<ITeams[]> {
    const dbData = await this.model.findAll({
      include: {
        model: SequelizeMatchesmodel,
        as: 'matchesHome',
        foreignKey: 'homeTeamId',
        where: {
          inProgress: false,
        },
      },
    });
    return dbData;
  }
}
