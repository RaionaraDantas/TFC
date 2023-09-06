import IMatches from '../Matches/IMatches';
import ITeams from '../Teams/ITeams';

export default interface ITeamsWithMatches extends ITeams {
  matchesHome: IMatches[],
}
