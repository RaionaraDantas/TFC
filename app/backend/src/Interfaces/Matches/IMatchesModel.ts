import IMatches from './IMatches';

export default interface IMatchesModel {
  findAllMatches(): Promise<IMatches[]>,
  findAllByQuery(inProgress: boolean): Promise<IMatches[]>,
  finishMatch(id: number): Promise<void>,
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
}
