import { DataTypes } from 'sequelize';
import { connection } from '../../infrastructure/config/dataContext.js';

export const Product = connection.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUserRegister: { type: DataTypes.INTEGER },
    lotNumber: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT },
    stock: { type: DataTypes.INTEGER }
  },
  {
    tableName: 'products',
    timestamps: true,
  }
);

export const validateNameExist = async function (value) {
  const search = await Product.findOne({ where: { name: value } });
  return search != null
}