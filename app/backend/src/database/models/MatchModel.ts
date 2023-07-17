import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import SequelizeTeam from './TeamModel';
import db from '.';

class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'home_team_id',
  as: 'homeTeam',
});

SequelizeTeam.hasMany(SequelizeMatch, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

SequelizeMatch.belongsTo(SequelizeTeam, {
  foreignKey: 'away_team_id',
  as: 'awayTeam',
});

export default SequelizeMatch;
