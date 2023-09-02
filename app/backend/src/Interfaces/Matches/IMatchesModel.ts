import IMatches from './IMatches';

export default interface IMatchesModel {
  findAllMatches(): Promise<IMatches[]>,
  findAllByQuery(inProgress: boolean): Promise<IMatches[]>,
  finishMatch(id: number): Promise<void>,
}
