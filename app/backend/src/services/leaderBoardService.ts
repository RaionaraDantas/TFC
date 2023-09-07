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
    efficiency: 0,
  };

  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  private static calculateStatus(team: ITeamsWithMatches): IPotential {
    const teamsOfStatus = leaderBoardService.test(team);
    teamsOfStatus.name = team.teamName;
    teamsOfStatus.totalGames = team.matchesHome.length;
    teamsOfStatus.goalsBalance = teamsOfStatus.goalsFavor - teamsOfStatus.goalsOwn;
    teamsOfStatus.efficiency = +((teamsOfStatus.totalPoints
      / (teamsOfStatus.totalGames * 3)) * 100).toFixed(2);
    return teamsOfStatus;
  }

  public async potentialTeamsHome(): Promise<ServiceResponseType<IPotential[]>> {
    const allTeams = await this.teamsModel.teamsWithMatches() as ITeamsWithMatches[];
    const potencialOfTeams = allTeams.map(leaderBoardService.calculateStatus);
    return { status: 'SUCCESSFUL', data: leaderBoardService.orderTeams(potencialOfTeams) };
  }

  private static test(team: ITeamsWithMatches): IPotential {
    return team.matchesHome.reduce((acc, match) => {
      acc.goalsFavor += match.homeTeamGoals;
      acc.goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        acc.totalPoints += 3;
        acc.totalVictories += 1;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) { acc.totalLosses += 1; }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        acc.totalDraws += 1;
        acc.totalPoints += 1;
      }
      return acc;
    }, { ...leaderBoardService.leaderBoardTemplate });
  }

  static orderTeams(teams:IPotential[]) {
    const order = teams.sort((a, b): number => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return order;
  }
}
