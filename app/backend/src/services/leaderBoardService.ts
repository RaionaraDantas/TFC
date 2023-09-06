import TeamsModel from '../models/teamsModel';
import ITeamsModel from '../Interfaces/Teams/ITeamsModel';
import { ServiceResponseType } from '../Interfaces/Teams/IServiceResponse';
import IPotential from '../Interfaces/leaderBoard/IPotential';
import ITeamsWithMatches from '../Interfaces/leaderBoard/teamWithMatches';

export default class leaderBoardService {
  private static leaderBoardTemplate = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
  };

  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  private static calculateStatus(team: ITeamsWithMatches): IPotential {
    const teamsOfStatus = { ...leaderBoardService.leaderBoardTemplate };
    teamsOfStatus.name = team.teamName;
    teamsOfStatus.totalGames = team.matchesHome.length;
    team.matchesHome.forEach((match) => {
      teamsOfStatus.goalsFavor += match.homeTeamGoals;
      teamsOfStatus.goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        teamsOfStatus.totalPoints += 3;
        teamsOfStatus.totalVictories += 1;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) { teamsOfStatus.totalLosses += 1; }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        teamsOfStatus.totalDraws += 1;
        teamsOfStatus.totalPoints += 1;
      }
    });
    teamsOfStatus.goalsBalance = teamsOfStatus.goalsFavor - teamsOfStatus.goalsOwn;
    return teamsOfStatus;
  }

  public async potentialTeamsHome(): Promise<ServiceResponseType<IPotential[]>> {
    const allTeams = await this.teamsModel.teamsWithMatches() as ITeamsWithMatches[];
    const potencialOfTeams = allTeams.map(leaderBoardService.calculateStatus);
    return { status: 'SUCCESSFUL', data: potencialOfTeams };
  }
}
