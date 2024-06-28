import { DataTypes } from 'sequelize';
import { connection, executeQuery } from '../../infrastructure/config/dataContext.js';

export const Purchase = connection.define(
  'Purchase',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: { type: DataTypes.INTEGER },
    totalPrice: { type: DataTypes.FLOAT }
  },
  {
    tableName: 'purchases',
    timestamps: true,
  }
);

export const getPurchaseHistoryByClient = async (idClient) => {
  const sql = `SELECT p.id, p.name, sum(pp.quantity) as quantity
  FROM purchase_products pp 
  LEFT JOIN products p ON p.id = pp.idProduct 
  LEFT JOIN purchases pr ON pr.id = pp.idPurchase 
  WHERE pr.idUser = ${idClient}
  GROUP BY 1, 2`;
  const result = await executeQuery(sql);
  return result;
}
