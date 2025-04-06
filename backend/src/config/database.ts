import { Sequelize } from 'sequelize';


const dbName = process.env.NODE_ENV === 'test' 
  ? 'agendamento_medico_test' 
  : 'agendamento_medico';       

const sequelize = new Sequelize(dbName, 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: process.env.NODE_ENV !== 'test' 
});

export default sequelize;