import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public color?: string;
  public isFavorite!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'todo_list',
});

export default Todo;
