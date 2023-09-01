import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import IMatches from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatchesModel;

  public async findAllMatches(q: string): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    console.log(matches);
    return matches;
  }

  public async findAllByQuery(q: string): Promise<IMatches[]> {
    console.log('CHEGUEI AQUI!!!!!');
    const associate = {
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        { all: true, attributes: { exclude: ['id'] } },
      ],
    };

    const inProgressMatche = q === 'true';

    const returnInProgressMatche = await this.model.findAll({
      where: {
        inProgress: inProgressMatche,
      },
      // attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    console.log(returnInProgressMatche);
    return returnInProgressMatche;
  }
}
