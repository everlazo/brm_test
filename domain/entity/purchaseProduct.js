import { DataTypes } from 'sequelize';
import { connection } from '../../infrastructure/config/dataContext.js';
import { Purchase } from './purchase.js'; // Importa Purchase después de que esté definido
import { Product } from './product.js';

export const PurchaseProduct = connection.define(
  'PurchaseProduct',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idPurchase: { type: DataTypes.INTEGER },
    idProduct: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER },
    price: { type: DataTypes.FLOAT }
  },
  {
    tableName: 'purchase_products',
    timestamps: true,
  }
);

PurchaseProduct.belongsTo(Purchase, {
  targetKey: 'id',
  foreignKey: 'idPurchase'
});

PurchaseProduct.belongsTo(Product, {
  targetKey: 'id',
  foreignKey: 'idProduct'
});