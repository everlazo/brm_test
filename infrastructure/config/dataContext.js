import Sequelize from 'sequelize';
import enviroment from '../../enviroment.json' assert { type: "json" };

export const connection = new Sequelize(
    enviroment.db.database, 
    enviroment.db.username, 
    enviroment.db.password, 
    {
        host: enviroment.db.host,
        dialect: enviroment.db.dialect
    }
);

export const executeQuery = async (query) => {
    const result = await connection.query(query, { type: Sequelize.QueryTypes.SELECT });
    return result;
}