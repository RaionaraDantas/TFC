import { Model, QueryInterface, DataTypes } from 'sequelize';
import IUserModelSequelize from '../../Interfaces/Users/IUsersModelSequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUserModelSequelize>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};