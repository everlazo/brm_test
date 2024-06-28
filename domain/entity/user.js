import { DataTypes } from 'sequelize';
import { connection } from '../../infrastructure/config/dataContext.js';
import { Person } from './person.js';

export const User = connection.define(
  'User',
  {
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    idPerson: { type: DataTypes.INTEGER },
    idRole: { type: DataTypes.INTEGER },
    username: { type: DataTypes.STRING },
    password	: { type: DataTypes.STRING }
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

User.belongsTo(Person, {
    targetKey: 'id',
    foreignKey:'idPerson'
});

export const validateUsernameExist = async function(value) {
    const search = await User.findOne({ where: { username: value } });
    return search != null
}