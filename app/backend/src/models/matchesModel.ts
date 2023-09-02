import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import IMatches from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatchesModel;

  public async findAllMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    // console.log(matches);
    return matches;
  }

  public async findAllByQuery(inProgress: boolean): Promise<IMatches[]> {
    console.log('CHEGUEI AQUI!!!!!');

    // const inProgressMatche = inProgress === 'true';

    const returnInProgressMatche = await this.model.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return returnInProgressMatche;
  }
}
