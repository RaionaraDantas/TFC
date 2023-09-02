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

  public async finishMatch(id: number) {
    await this.model.update(
      { inProgress: 0 },
      { where: { id } },
    );
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}
