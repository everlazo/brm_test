import { DataTypes } from 'sequelize';
import { connection } from '../../infrastructure/config/dataContext.js';

export const Person = connection.define(
  'Person',
  {
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    name: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    document: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING }
  },
  {
    tableName: 'persons',
    timestamps: true,
  }
);

export const validateDocumentExist = async function(value) {
    const search = await Person.findOne({ where: { document: value } });
    return search != null
}