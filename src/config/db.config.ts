import { Sequelize } from 'sequelize';
import { Contacts } from '../models/contact'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const Contact = sequelize.define('Contact',Contacts);

const connectDB = async () => {
  await Contact.sync();
  console.log(':::::::::::::::::::: Syncing Table ::::::::::::::::::::');
}

export {
  connectDB,
  Contact
}
