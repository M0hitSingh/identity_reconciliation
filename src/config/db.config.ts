import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});



const connectDB = async () => {
  console.log('Syncing Table');
}

export {
  connectDB
}
