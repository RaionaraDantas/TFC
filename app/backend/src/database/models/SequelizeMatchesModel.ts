import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Teams from './SequelizeTeamsModel';
// import OtherModel from './OtherModel';

class Matches extends Model<InferAttributes<Matches>,
InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    field: 'home_team_id',
  },
  homeTeamGoals: DataTypes.INTEGER,
  awayTeamId: {
    type: DataTypes.INTEGER,
    field: 'away_team_id',
  },
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  // modelName: 'Matches',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeamId' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
