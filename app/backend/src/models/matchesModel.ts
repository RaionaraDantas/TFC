import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import IMatches, { NewEntity } from '../Interfaces/Matches/IMatches';
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
      { inProgress: false },
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

  public async createMatch(body: NewEntity<IMatches>): Promise<IMatches> {
    const { homeTeamId, awayTeamGoals, awayTeamId, homeTeamGoals } = body;
    const newMatch = await this.model.create({
      homeTeamId,
      awayTeamGoals,
      awayTeamId,
      homeTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }
}
